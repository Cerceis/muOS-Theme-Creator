<template>
    <v-btn
       @click="showImageEditor = !showImageEditor"
       color="primary"
       disabled
    >
        <v-icon>mdi-image</v-icon>
        Image Editor
        <v-icon>mdi-brush</v-icon>
    </v-btn>
    <v-dialog v-model="showImageEditor" persistent fullscreen >
        <div class="bg-primary d-flex px-3 align-center justify-space-between">
            Image Editor (It's mostly not working yet, i am tired & hungry give me some time lol)
            <v-btn
               @click="showImageEditor = false"
               color="error"
               size="20"
            >
               <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>
        <div>
            <v-sheet class="controls-bar">
                <div class="d-flex">
                    <template v-for="c in controls">
                        <v-menu :close-on-content-click="false">
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    @click=""
                                    color="primary"
                                    size="small"
                                    variant="text"
                                    v-bind="props"
                                >
                                    {{c.title}}
                                </v-btn>
                            </template>
                            <v-list variant="text" class="border">
                                <v-list-item 
                                    v-for="child in c.child"
                                    @click="child.func"
                                    density="compact"
                                >
                                    {{ child.title }}
                                    <template v-if="child.icon" v-slot:prepend>
                                        <v-icon>{{ child.icon }}</v-icon>
                                    </template>
                                </v-list-item>
                            </v-list>
                        </v-menu>  
                        <v-divider vertical />
                    </template>
                    <div class="d-flex gap-1 align-center mx-3">
                        <div>Scale: {{ (canvasInfo.scale*100).toFixed(2) }}%</div>
                    </div>
                </div>
                <v-divider />
            </v-sheet>
            <v-sheet class="main-wrapper">
                <!---- #Left Panel  ---->
                <div class="left-panel pa-3">
                    <ImagePreview 
                        :width="196" :height="196"
                    />
                    <v-divider class="my-1" />
                    <div>Mode: {{ selectedTool?.title }}</div>
                    <v-divider class="my-1" />
                    <div class="tools-grid">
                        <ToolTip v-for="t in tools" :text="t.title">
                            <v-btn
                                @click="initSelectedTool(t)"
                                color="primary"
                                size="36"
                                variant="outlined"
                            >
                                <v-icon size="large">{{ t.icon }}</v-icon>
                            </v-btn>
                        </ToolTip>
                    </div>
                    <v-divider class="my-1" />
                    <v-list>
                        <v-list-item 
                            @click="canvasControlFunc.cropAll"
                            density="compact"
                        >
                            <template v-slot:prepend>
                                <v-icon size="large">mdi-crop</v-icon> 
                            </template>
                            <div class="text-body-2">Crop selected images</div>
                        </v-list-item>
                        <v-list-item 
                            @click="canvasControlFunc.crop"
                            density="compact"
                        >
                            <template v-slot:prepend>
                                <v-icon size="large">mdi-crop</v-icon> 
                            </template>
                            <div class="text-body-2">Crop current images</div>
                        </v-list-item>
                        <v-divider class="my-2"/>
                        <div class="grid align-start">
                            <v-radio-group 
                                label="Resize option"
                                v-model="resizeInputCheck"
                                hide-details
                            >
                                <v-radio
                                    v-for="n in 3"
                                    :key="n"
                                    :label="`${
                                        n == 1? 'Resize to width' : 
                                        n == 2 ? 'Resize to height': 
                                        n == 3 ? 'Free (Stretch)': 
                                        null
                                    }`"
                                    :value="n"
                                ></v-radio>
                            </v-radio-group> 
                        </div>
                        <div class="grid gap-1">
                            <v-text-field
                                density="compact"
                                variant="outlined"
                                hide-details
                                type="number"
                                label="Width(px)"
                                v-model="resizeInputWidth"
                                :disabled="disabled.width"
                            >
                            </v-text-field>
                            <v-text-field
                                density="compact"
                                variant="outlined"
                                hide-details
                                type="number"
                                label="Height(px)"
                                v-model="resizeInputHeight"
                                :disabled="disabled.height"
                            >
                            </v-text-field>
                        </div>
                        <v-list-item 
                            @click="canvasControlFunc.resize"
                            density="compact"
                        >
                            <template v-slot:prepend>
                                <v-icon size="large">mdi-resize</v-icon> 
                            </template>
                            <div class="text-body-2">Resize selected images</div>
                        </v-list-item>
                        <v-list-item 
                            @click="canvasControlFunc.resizeAll"
                            density="compact"
                        >
                            <template v-slot:prepend>
                                <v-icon size="large">mdi-resize</v-icon> 
                            </template>
                            <div class="text-body-2">Resize current images</div>
                        </v-list-item>
                    </v-list>

                </div>
                <v-divider vertical />
                <!---- #Center Panel  ---->
                <div class="center-panel">
                    <!-----#Canvas--------->
                    <div 
                        ref="canvasWrapper" 
                        class="canvas-wrapper"
                        @contextmenu="eventsHandler.contextmenu"
                        @mousedown="eventsHandler.wrapperMouseDown"
                        @mousemove="eventsHandler.wrapperMouseMove"
                        @mouseup="eventsHandler.wrapperMouseUp"
                        @click="triggerCanvasToolFuncs"
                    >
                        <div 
                            class="canvas-padder"
                            :style="{
                                
                            }"
                        >
                            <canvas 
                                ref="canvas" 
                                class="main-canvas"
                                :style="{
                                    width: `${canvasInfo.w}px`,
                                    height: `${canvasInfo.h}px`,
                                    transform: `scale(${canvasInfo.scale})`
                                }"
                            >
                            </canvas>
                        </div>
                    </div>
                </div>
                <v-divider vertical />
                <div class="right-panel">
                    <div class="d-flex align-end mx-2">
                        <!---#Asset Search bar---->
                        <v-text-field 
                            v-model="keyword"
                            class="mx-3 mt-3"
                            variant="outlined"
                            density="compact"
                            prepend-inner-icon="mdi-magnify"
                            placeholder="Search..."
                            hide-details
                        />
                        <v-menu :close-on-content-click="false" location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    color="primary"
                                    size="40"
                                    v-bind="props"
                                >
                                    <v-icon>mdi-cog</v-icon>
                                </v-btn>
                            </template>
                            <v-list class="border">
                                <v-list-item 
                                    v-for="aMC in assetMainControls"
                                    @click="aMC.func"
                                    density="compact"
                                >
                                    <template v-slot:prepend>
                                        <v-icon>{{ aMC.icon }}</v-icon> 
                                    </template>
                                    {{ aMC.title }}
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                    <v-divider class="my-3" />
                    <!------#Asset grid------>
                    <div class="asset-panel pa-3 grid justify-center text-center align-start">
                        <div v-for="a in filteredAsset">
                            <v-menu :close-on-content-click="false" location="left">
                                <template v-slot:activator="{ props }">
                                    <div class="asset-item">
                                        <div class="text-caption">
                                            <v-checkbox 
                                                :label="`${ a.filename }.${a.format}`.slice(0,12) + '...'"
                                                hide-details
                                                density="compact"
                                                :value="a.id"
                                                v-model="selectedAssets"
                                            >
                                            </v-checkbox>
                                        </div>
                                        <ToolTip :text="`${ a.filename }.${a.format}`" location="left">
                                            <ImagePreview 
                                                v-bind="props"
                                                :src="a.base64"
                                                :width="160"
                                                :height="120"
                                            />
                                            <v-divider class="my-1"/>
                                        </ToolTip>
                                    </div>
                                </template>
                                <v-list class="border">
                                    <v-list-item 
                                        v-for="aC in assetControls"
                                        @click="aC.func(a)"
                                        density="compact"
                                    >
                                        <template v-slot:prepend>
                                            <v-icon>{{ aC.icon }}</v-icon> 
                                        </template>
                                        {{ aC.title }}
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                    </div>
                    <div class="pa-3">
                        <div class="text-caption">Layers</div>
                        <v-divider />
                        <v-list class="layer-list">
                            <v-list-item
                                v-for="l in canvasLayers"
                                density="compact"
                                @click=""
                            >
                                <div class="pl-3">{{ l.name }}</div>
                                <template v-slot:prepend>
                                    <ImagePreview :src="l.asset ? l.asset.base64 : ''" :width="36" :height="36"/>
                                </template>
                            </v-list-item>
                        </v-list>
                    </div>
                </div>
            </v-sheet>
        </div>
        <!------Transform element------->
            
        <!-----Mouse Chaser------->
        <v-btn 
            v-if="mouseChaser.show && mouseChaser.t"
            color="primary"
            size="36"
            variant="outlined"
            :style="{
                position: 'fixed',
                top: `${mouseChaser.y}px`,
                left: `${mouseChaser.x}px`,
            }"
        >
            <v-icon size="large">{{mouseChaser.t.icon }}</v-icon>
        </v-btn>
    </v-dialog>
</template>
 
<script setup lang="ts">
import { type Ref, ref, computed, watch, nextTick } from "vue";
import { assets, type Asset, assetFunc, base64ToFile } from "@/service/assets";
import { promptOpenFile, promptDownload, promptDownloadZip } from "@/service/file";
import ImagePreview from "@/components/global/Preview/ImagePreview.vue";
import ToolTip from "@/components/buttons/ToolTip.vue";
import { Generate } from "cerceis-lib";

const showImageEditor: Ref<boolean> = ref(false);
const selectedAssets: Ref<string[]> = ref([]);
const controls = [
    {
        title: "File",
        child: [
            {
                title: "Open image",
                icon: "mdi-folder-open",
                func(){
                    promptOpenFile();
                }
            },
            {
                title: "Download all selected",
                icon: "mdi-download",
                func(){
                    if(selectedAssets.value.length === 0) return;
                    promptDownloadZip(
                        assets.value
                        .filter( a => selectedAssets.value.includes(a.id))
                        .map( a => {
                            return base64ToFile(
                                a.base64.split(",")[1], 
                                `${a.filename}.${a.format}`,
                                a.type
                            )
                        }),
                        `images-${Generate.currentDateTime()}`
                    )
                }
            }
        ]
    },
]
const assetMainControls = [
    {
        title: "Select all",
        icon: "mdi-select-all",
        func(){
            selectedAssets.value = assets.value.map(a => a.id);
        }
    },
    {
        title: "Unselect all",
        icon: "mdi-select-off",
        func(){
            selectedAssets.value = [];
        }
    },
    {
        title: "Delete selected",
        icon: "mdi-delete",
        func(){
            
        }
    },
]
const assetControls = [
    {
        title: "Load",
        icon: "mdi-arrow-left-bold-box",
        func(a: Asset){
            loadToCanvas(a)
        }
    },
    {
        title: "Download",
        icon: "mdi-download",
        func(a: Asset){
            promptDownload(
                assetFunc.getByID(a.id).asFile(),
                `${a?.filename}.${a?.format}`
            )
        }
    }
]

// Canvas controls START
const resizeInputCheck: Ref<number> = ref(3);
const resizeInputWidth: Ref<number> = ref(640);
const resizeInputHeight: Ref<number> = ref(480);
const disabled: Ref<{width: boolean, height: boolean}> = ref({
	width: false, height: false,
});
watch(
    () => resizeInputCheck.value,
    () => {
        if(resizeInputCheck.value === 1){
            disabled.value.width = false;
            disabled.value.height = true;
        }else if(resizeInputCheck.value === 2){
            disabled.value.width = true;
            disabled.value.height = false;
        }else{
            disabled.value.width = false;
            disabled.value.height = false;
        }    
    }
)
const canvasControlFunc = {
    "crop": () => {},
    "cropAll": () => {},
    "resize": () => {},
    "resizeAll": () => {},
}
// Canvas controls END
// Tools START
const selectedTool: Ref<Tool | null> = ref(null);
const initSelectedTool = (t: Tool) => {
    selectedTool.value = t;
    mouseChaser.value.show = true;
    mouseChaser.value.t = t;
    document.addEventListener("mousemove", eventsHandler.mouseChaser);
}
const resetSelectedTool = () => {
    selectedTool.value = null;
    mouseChaser.value.show = false;
    mouseChaser.value.t = null;
    mouseChaser.value.x = 0;
    mouseChaser.value.y = 0;
    document.removeEventListener("mousemove", eventsHandler.mouseChaser);
}
type Tool = {
    id: number, title: string, icon: string,
    func: Function
}
const tools: Tool[] = [
    {
        id:1,
        title: "Magnify(+)",
        icon: "mdi-magnify-plus",
        func(){
            canvasInfo.value.scale += 0.1;
        }
    },
    {
        id:2,
        title: "Magnify(-)",
        icon: "mdi-magnify-minus",
        func(){
            canvasInfo.value.scale -= 0.1;
        }
    },
]
// Tools END
// Mouse Chaser
const mouseChaser = ref({
    t: null as null | Tool,
    show: false,
    x: 0, y: 0
})

// Filters
const keyword: Ref<string> = ref("");
const filteredAsset = computed(() => {
    return assets.value.filter(a => a.filename.toUpperCase().includes(keyword.value.toUpperCase()))
})
// Main logic
const centerDisplayType: Ref<"single" | "grid"> = ref("single");
const resultPreviewBase64: Ref<string> = ref("");

// Canvas related
const canvas: Ref<HTMLCanvasElement | null> = ref(null);
const canvasWrapper: Ref<HTMLDivElement | null> = ref(null);
const canvasInfo = ref({
    scale: 1,
    w: 640,
    h: 480,
})

watch(
    () => showImageEditor.value,
    () => {
        if(showImageEditor.value === true){
            initCanvas();
        }
    }
)

const initCanvas = async() => {
    await nextTick();
    // Set to center
    if(canvasWrapper.value){
        canvasWrapper.value.scrollTop = canvasWrapper.value.scrollHeight/4;
        canvasWrapper.value.scrollLeft = canvasWrapper.value.scrollWidth/3.15;
    }
    if(!canvas.value) return;
    const ctx = canvas.value.getContext('2d');
    if(!ctx) return;
    const canvasBg = canvasLayersFunc.new(null, "background", false);
    canvasBg.type = "bg";
    canvasBg.locked = true;
    canvasBg.bg = "rgb(55,55,55)";
    refreshCanvas()
}

type CanvasLayer = {
    name: string,
    type: "asset" | "bg",
    bg: string , // Only if's type === bg
    draw: boolean,
    asset: Asset | null,
    locked: boolean,
    transform: boolean
}
const canvasLayers: Ref<CanvasLayer[]> = ref([])
const canvasLayersFunc = {
    new(a: Asset | null = null, name: string = `${canvasLayers.value.length}`, transform: boolean = true){
        const tmp: CanvasLayer = {
            name,
            type: "asset",
            bg: "",
            draw: true,
            asset: a,
            locked: false,
            transform,
        }
        canvasLayers.value.push(tmp);
        return tmp
    }
}

const refreshCanvas = () => {
    if(!canvas.value) return;
    const ctx = canvas.value.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    for(let i = 0; i < canvasLayers.value.length; i++) {
        const l = canvasLayers.value[i];
        if(!l.draw) continue;
        if(l.transform) continue;
        if(l.type === "bg"){
            ctx.fillStyle = l.bg;
            ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
        }
        if(l.type === "asset" && l.asset){
            const image = new Image();
            image.onload = () => {
                // Draw the image onto the canvas
                ctx.drawImage(image, 0, 0);
            };
            // Set the base64 image source
            image.src = l.asset.base64;
        }
    }
}

const loadToCanvas = (a: Asset) => {
    if(!canvas.value) return;
    const ctx = canvas.value.getContext('2d');
    if (!ctx) return;
    canvasLayersFunc.new(a, a.filename);
    refreshCanvas();
}

const triggerCanvasToolFuncs = (e: MouseEvent) => {
    if(!selectedTool.value) return;
    selectedTool.value.func(e);
}

const wrapperDragData = ref({
    triggered: false,
    startX: 0, startY: 0,
});
const eventsHandler = {
    wrapperMouseDown: (e: MouseEvent) => {
        if (e.button === 2) {
            wrapperDragData.value.triggered = true;
            wrapperDragData.value.startX = e.clientX;
            wrapperDragData.value.startY = e.clientY;
        }
    },
    wrapperMouseMove: (e: MouseEvent) => {
        if(
            wrapperDragData.value.triggered &&
            canvasWrapper.value
        ){
            const deltaX = e.clientX - wrapperDragData.value.startX;
            const deltaY = e.clientY - wrapperDragData.value.startY;
            canvasWrapper.value.scrollTop += -deltaY/40;
            canvasWrapper.value.scrollLeft += -deltaX/40;
        }
    },
    wrapperMouseUp: (e: MouseEvent) => {
        wrapperDragData.value.triggered = false;
    },
    contextmenu: (e: MouseEvent) => {
        e.preventDefault();
        resetSelectedTool();
    },
    mouseChaser: (e: MouseEvent) => {
        mouseChaser.value.x = e.clientX + 10;
        mouseChaser.value.y = e.clientY + 10;
    }
}
 
 
</script>
 
<style scoped>
.main-wrapper {
    height: calc(100vh - 28px - 24px);
    display: flex;
}
.left-panel {
    min-width: 220px;
}
.center-panel {
    width: 100%;
    display: grid;
    place-items: center;
}
.right-panel {
    min-width: 220px;
}
.asset-panel{
    height: calc(100vh - 28px - 24px - 40px - 24px - 350px);
    overflow-y: scroll;
}
.asset-item{
    cursor: pointer;
}
.asset-item:hover{
    filter: brightness(150%);
}
.tools-grid{
    display: grid;
    gap: .25em;
    grid-template-columns: repeat( auto-fill, 36px );
    justify-content: center;
}


.canvas-wrapper{
    position: relative;
    border: 1px solid rgba(255,255,255,.1);
    width: 100%;
    height: 100%;
    overflow: scroll;
}
.canvas-padder{
    position: absolute;
    display: grid;
    place-items: center;
    background-color: rgba(20,20,20);
    width: 2560px;
    height: 1920px;
}
.main-canvas{
    
}
</style>