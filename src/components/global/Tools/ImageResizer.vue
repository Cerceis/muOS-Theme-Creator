<template>
    <div style="display:grid; place-items:center;">
        <div class="py-3">
			Convert to
            <div class="d-flex my-3 align-center">
                <v-text-field
                    density="compact"
                    variant="outlined"
                    :error-messages="errorMsg.width"
                    type="number"
                    label="Width"
                    v-model="inputWidth"
                >
                </v-text-field>
                <v-spacer />
                <v-text-field
					density="compact"
                    variant="outlined"
                    :error-messages="errorMsg.height"
                    type="number"
                    label="Height"
                    v-model="inputHeight"
                >
                </v-text-field>
                <img id="text" src="" alt="">
            </div>
			<v-file-input
				variant="outlined"
				density="compact"
				label="Image"
				:accept="['.png', '.jpg', '.jpeg', '.bmp']"
				@change="convert($event)"
			/>
        </div>
    </div>
	<v-dialog v-model="convertResult.show" persistent :max-width="`${inputWidth + 24}px`">
		<v-sheet class="pa-3">
			<img :src="convertResult.base64" :width="inputWidth">
			<div class="d-flex justify-end gap-1">
				<v-btn color="error" size="36" @click="resetResult">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
				<v-btn color="primary" 
					@click="assetFunc.addBase64(
						convertResult.base64,
						convertResult.name,
						convertResult.type
					); resetResult()"
				>
					Save to asset?
				</v-btn>
			</div>
		</v-sheet>
	</v-dialog>
</template>

<script setup lang="ts">
import { type Ref, ref, watch } from "vue";
import { fileToBase64, base64ToFile } from "@/service/assets";
import { assetFunc } from "@/service/assets";

const inputWidth: Ref<number> = ref(640);
const inputHeight: Ref<number> = ref(480);
const inputRatio: Ref<number> = ref(0);
const inputCheck: Ref<number> = ref(0);
const errorMsg: Ref<{width: string, height: string}> = ref({
	width:"", height:"",
});
const convertResult: Ref<{base64: string, show: boolean, name: string, type: string}> = ref({
	base64: "", show: false, name: "", type: ""
})

const resetResult = () => {
	convertResult.value = {
		base64: "", show: false, name: "", type: ""
	}
}

const convert = async(e: any) => {
	if(!e || !e.target || !e.target.files) return;
	inputWidth.value = Number(inputWidth.value)
	inputHeight.value = Number(inputHeight.value)
	if(
		(inputHeight.value > 0) ||
		(inputWidth.value > 0)
	){
		errorMsg.value.width = ""
		errorMsg.value.height = ""
		let resultFileList: {name: string, data: string}[] = []
		let processedImage = 0
		for(let i = 0; i < e.target.files.length; i++){
			const image = e.target.files[i];
			let img = new Image()
			img.onload = ()=>{
				let imageRatio = Number(img.width)/Number(img.height)
				let imageWidth = Number(inputWidth.value)
				let imageHeight = Number(inputHeight.value)
				let canvas = document.createElement('canvas')
				canvas.width = imageWidth
				canvas.height = imageHeight
				let ctx = canvas.getContext('2d')
				ctx?.drawImage(img, 0, 0, Number(imageWidth.toFixed(0)), Number(imageHeight.toFixed(0)))
				const result = canvas.toDataURL(image.type)
				if(result){
					convertResult.value.base64 = result;
					convertResult.value.show = true;
					convertResult.value.name = image.name;
					convertResult.value.type = image.type;
				}
			};
			img.src = await fileToBase64(image);
		}
	}else{
		errorMsg.value.width = "Input value larger than 0"
		errorMsg.value.height = "Input value larger than 0"
	}
}
</script>

<style>

</style>