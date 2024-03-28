<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                color="primary"
                size="36"
            >
                <v-icon size="large">mdi-tools</v-icon>
            </v-btn>
        </template>
        <v-sheet class="border rounded">
            <v-list>
                <v-list-item
                    v-for="t in toollist"
                    @click="selectedTool = t; showTool = true"
                    :title="t.title"
                    :subtitle="t.des"
                    :disabled="t.disabled"
                >
                </v-list-item>
            </v-list>
        </v-sheet>
    </v-menu>  
	<v-dialog
		v-model="showTool" 
		persistent
		max-width="900px"
	>
		<v-sheet v-if="selectedTool">
			<div class="bg-primary d-flex justify-space-between px-3 py-1">
				<div class="font-weight-bold text-h5">
					{{selectedTool.title}}
				</div>
				<v-btn
					@click="showTool = false"
					color="error"
					size="36"
				>
					<v-icon size="large">mdi-close</v-icon>
				</v-btn>
			</div>
			<component :is="selectedTool.component"></component>
		</v-sheet>
	</v-dialog>
</template>
 
<script setup lang="ts">
import { type Ref, ref, type Component } from "vue";
import ImageResizer from "@/components/global/Tools/ImageResizer.vue";
import ImageCropper from "@/components/global/Tools/ImageCropper.vue";

let selectedTool: any = null;
const showTool: Ref<boolean> = ref(false);

const toollist = [
    {title: "Image resizer", disabled: false, des: "Resize an image", component: ImageResizer},
    {title: "Image cropper", disabled: false, des: "Crop an image", component: ImageCropper},
    {title: "Header & Footer maker", disabled: true, des: "Create your H/F and bind it to an image", component: null},
]
 
</script>
 
<style scoped>
</style>