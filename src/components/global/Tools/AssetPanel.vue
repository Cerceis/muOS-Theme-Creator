<template>
    <div>
        <div class="d-flex gap-1">
            <v-text-field 
                v-model="keyword"
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-magnify"
                placeholder="Search..."
                hide-details
            />
            <v-menu :close-on-content-click="false" location="left">
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
                        v-for="aSC in assetSelectedControls"
                        @click="aSC.func"
                        density="compact"
                        :disabled="aSC.disabled"
                    >
                        <template v-slot:prepend>
                            <v-icon>{{ aSC.icon }}</v-icon> 
                        </template>
                        {{ aSC.title }}
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
        <v-list density="compact">
            <v-list-item v-for="a in filteredAsset" class="px-0">
                <template v-slot:prepend>
                    <v-checkbox-btn v-model="selectedAssetIds" :value="a.id"/>
                </template>
                <v-list-item-subtitle>
                    <div class="d-flex align-center">
                        <div 
                            v-if="a.type.includes('audio/')"
                            class="asset-item-default rounded"
                        >   
                            <v-icon size="x-large">mdi-music</v-icon>
                        </div>
                        <div 
                            v-else-if="a.type.includes('application/')"
                            class="asset-item-default rounded"
                        >   
                            <v-icon size="x-large">mdi-format-font</v-icon>
                        </div>
                        <ImagePreview 
                            v-else
                            class="asset-item rounded"
                            @click="selectedImage = a; showImage = true"
                            :src="a.base64" :width="48" :height="48"
                        />
                        <ToolTip :text="a.filename" location="bottom">
                            <div class="ml-3 nowrap">{{ a.filename.slice(0,8) }}...</div>
                        </ToolTip>
                    </div>
                </v-list-item-subtitle>
            </v-list-item>


        </v-list>

        <v-dialog v-model="showImage" max-width="800px">
            <v-sheet v-if="selectedImage">
                <div class="d-flex justify-center">
                    <ImagePreview 
                        :src="selectedImage?.base64"
                        :width="640" :height="480"
                    />
                </div>
                <v-divider />
                <div class="d-flex gap-1 pa-3 justify-end align-center">
                    <div>{{ `${selectedImage?.filename}` }}</div>
                    <v-btn
                        @click="showImage = false"
                        color="error"
                        size="36"
                    >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </v-sheet>
        </v-dialog>
    </div>
</template>
 
<script setup lang="ts">
import { type Ref, ref, computed } from "vue";
import { assets, type Asset } from "@/service/assets";
import ToolTip from "@/components/buttons/ToolTip.vue";
import { assetFunc, base64ToFile } from "@/service/assets";
import { promptDownloadZip } from "@/service/file";
import ImagePreview from "@/components/global/Preview/ImagePreview.vue";
import { Popup } from "@/service/popup";

const showImage: Ref<boolean> = ref(false);
const selectedImage: Ref<Asset | null> = ref(null);
const selectedAssetIds: Ref<string[]> = ref([]);

const assetSelectedControls = ref([
    {
        id: 2,
        title: "Select All", icon: "mdi-select",
        disabled: false, 
        func(){
            const _this = assetSelectedControls.value.find(i => i.id === 2);
            if(!_this) return;
            if(selectedAssetIds.value.length < filteredAsset.value.length){
                selectedAssetIds.value = filteredAsset.value.map(a => a.id);
                _this.title = "Unselect All";
                return;
            }
            if(selectedAssetIds.value.length === filteredAsset.value.length){
                selectedAssetIds.value = [];
                _this.title = "Select All";
                return;
            }
        }
    },
    {
        id: 3,
        title: "Delete Selected", icon: "mdi-delete",
        disabled: computed(()=> selectedAssetIds.value.length === 0), 
        async func(){
            const confirmDelete = new Popup({
                title: "Delete",
                text: `Are you sure you want to delete ${selectedAssetIds.value.length} item ?`
            })
            const confirmed = await confirmDelete.prompt();
            if(confirmed){
                for(let i = 0; i < selectedAssetIds.value.length; i++){
                    const foundTarget = assets.value.find(a => a.id === selectedAssetIds.value[i]);
                    if(!foundTarget) continue;
                    assetFunc.delete(foundTarget as unknown as Asset);
                }
            }
            selectedAssetIds.value = [];
        }
    },
    {
        id: 4,
        title: "Download Selected", icon: "mdi-delete",
        disabled: computed(()=> selectedAssetIds.value.length === 0), 
        func(){
            const files: File[] = [];
            for(let i = 0; i < assets.value.length; i++){
                if(selectedAssetIds.value.includes(assets.value[i].id)){
                    files.push(
                        base64ToFile(
                            assets.value[i].base64.split(",")[1],
                            assets.value[i].filename,
                            assets.value[i].type
                        )   
                    )
                }
            }
            promptDownloadZip(files, `theme-maker-files`);
        }
    }
])

const keyword: Ref<string> = ref("");
const filteredAsset = computed(() => {
    return assets.value.filter(a => a.filename.toUpperCase().includes(keyword.value.toUpperCase()));
})
 
</script>
 
<style scoped>
.asset-item-default{
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    background-color: rgba(255,255,255,0.2);
}
</style>