<template>
    <div style="display:grid; place-items:center; height:90vh;">
        <div>
            <div style="text-align:center;">画像の比率自動的に変換する</div>
            <v-radio-group v-model="inputCheck">
                <v-radio
                    v-for="n in 2"
                    :key="n"
                    :label="`${n == 1? '幅指定' : n==2 ? '高さ指定': null}`"
                    :value="n"
                ></v-radio>
            </v-radio-group>
            <div class="d-flex my-3">
                
                <v-text-field
                    dense
                    outlined
                    :error-messages="errorMsg.width"
                    type="number"
                    label="幅"
                    :disabled="disabled.width"
                    v-model="inputWidth"
                >
                </v-text-field>
                <v-spacer />
                <v-text-field
                    dense
                    outlined
                    :error-messages="errorMsg.height"
                    type="number"
                    label="高さ"
                    :disabled="disabled.height"
                    v-model="inputHeight"
                >
                </v-text-field>
                <img id="text" src="" alt="">
            </div>
            <custom-uploader @convert="convert"/>
        </div>
        
    </div>
</template>

<script>
// TODO: ported from old project, make it cleaner.
import CustomUploader from '@/components/CustomUploader.vue'
import JSZip from 'jszip'
export default {
    components:{
        CustomUploader,
    },
    data:()=>({
        inputWidth:0,
        inputHeight:0,
        inputRatio:0,
        inputCheck:1,
        errorMsg:{
            width:"",
            height:"",
        },
        disabled:{
            width:false,
            height:true
        }
    }),
    watch:{
        inputCheck(){
            if(this.inputCheck === 1){
                this.disabled.width = false
                this.disabled.height = true
            }else if(this.inputCheck === 2){
                this.disabled.width = true
                this.disabled.height = false
            }
                
        },
    },
    methods:{
        toBase64(file){
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            })
        },
        initDownload(){

        },
        convert(e){
            this.inputWidth = Number(this.inputWidth)
            this.inputHeight = Number(this.inputHeight)
            if(
                (this.disabled.width && this.inputHeight > 0) ||
                (this.disabled.height && this.inputWidth > 0)
            ){
                this.errorMsg.width = ""
                this.errorMsg.height = ""
                let resultFileList = []
                let processedImage = 0
                e.forEach(async image => {
                    let img = new Image()
                    img.onload = ()=>{
                        let imageRatio = Number(img.width)/Number(img.height)
                        let imageWidth = this.disabled.width ? Number(this.inputHeight)*imageRatio : Number(this.inputWidth)
                        let imageHeight = this.disabled.height ? Number(this.inputWidth)/imageRatio : Number(this.inputHeight)
                        let canvas = document.createElement('canvas')
                        canvas.width = imageWidth
                        canvas.height = imageHeight
                        let ctx = canvas.getContext('2d')
                        ctx.drawImage(img, 0, 0, imageWidth.toFixed(0), imageHeight.toFixed(0))
                        let result = canvas.toDataURL(image.type)
                        resultFileList.push({
                            name:image.name,
                            data:result
                        })
                        processedImage ++
                        if(processedImage === e.length){
                            if(resultFileList.length > 0 ){
                                if(resultFileList.length === 1){
                                    let tmpLink = document.createElement('a')
                                    tmpLink.href = resultFileList[0].data
                                    tmpLink.download = resultFileList[0].name
                                    tmpLink.click()
                                }else{
                                    let zip = new JSZip()
                                    let imgZip = zip.folder("images");
                                    for(let i = 0 ; i<resultFileList.length ; i++){
                                        imgZip.file(resultFileList[i].name, resultFileList[i].data.split(",")[1], {base64: true})
                                    }
                                    zip.generateAsync({type:"blob"})
                                    .then((content)=>{                                      
                                        let tmpLink = document.createElement('a')
                                        tmpLink.href = window.URL.createObjectURL(content)
                                        tmpLink.download = "images.zip"
                                        tmpLink.click()
                                    })
                                }
                            }
                        }
                    };
                    img.src = await this.toBase64(image)
                })

            }else{
                this.errorMsg.width = "０以上の値を入れてください"
                this.errorMsg.height = "０以上の値を入れてください"
            }
        }
    }
}
</script>

<style>

</style>