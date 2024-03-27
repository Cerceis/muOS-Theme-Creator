<template>
    <div>
        <v-dialog v-for="aSelector in assetSelectorList" :key="aSelector.id" persistent v-model="aSelector.show" max-width="1200px">
            <v-sheet>
                <div class="bg-primary d-flex justify-space-between px-3 py-1">
                    <div class="font-weight-bold text-h5">Assets</div>
                    <v-btn
                       @click="assetSelector.destroy(aSelector)"
                       color="error"
                       size="36"
                    >
                        <v-icon size="large">mdi-close</v-icon>
                    </v-btn>
                </div>
                <!---v-text-field 
                    class="mx-3 mt-3"
                    v-model="keyword"
                    variant="outlined"
                    density="compact"
                    prepend-inner-icon="mdi-magnify"
                    placeholder="Search..."
                    hide-details
                /--->
                <div class="asset-selection-grid pa-3">
                    <div
                        v-for="a in assets"
                        class="asset-selection-item"
                        @click="applyValue(aSelector, a)"
                        :style="{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backgroundImage: `url('${a.base64}')`,
                            backgroundSize: '100%',
                            backgroundPosition: 'center'
                        }"
                        @mouseenter="focusedId = a.id"
                        @mouseleave="focusedId = ''"
                    >
                        <div :class="`file-info ${focusedId === a.id ? 'file-info-focused' : ''}`">
                            {{ `${a.filename}.${a.type.split('/')[1]}` }}
                        </div>
                    </div>
                </div>
            </v-sheet>
        </v-dialog>
    </div>
</template>
 
<script setup lang="ts">

import { type Ref, ref } from "vue";
import { 
    type AssetSelector, type Asset,
    assets, assetSelectorList, assetSelector,
    base64ToFile
} from "@/service/assets";
import { themeFunc } from "@/service/theme";

const keyword: Ref<string> = ref("");
const focusedId: Ref<string> = ref("");

const applyValue = (selector: AssetSelector, a: Asset) => {
    const child = themeFunc.getChild(selector.target);
    if(!child) return;
    child.value = [base64ToFile(a.base64.split(',')[1], `${a.filename}.${a.format}`, a.type)]
    assetSelector.destroy(selector);
}
 
</script>
 
<style scoped>
.asset-selection-grid{
    display: grid;
    gap: .25em;
    grid-template-columns: repeat( auto-fill, 256px );
    justify-content: center;
}
.asset-selection-item{
    cursor: pointer;
    height: 192px;
    width: 256px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, .1);
    position: relative;
}
.file-info{
    position: absolute;
    display: grid;
    place-items: center;
    bottom: 0px;
    background-color: rgba(255, 255, 255, .2);
    width:100%;
    height: 24px;
    transition: all .4s;
}
.file-info-focused{
    height: 48px !important;
}
</style>