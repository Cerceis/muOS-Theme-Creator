<template>
    <div>
        <div class="font-weight-bold">TOOLS</div>
        <v-divider class="my-2"/>
        
        <div class="grid gap-1">
            <div class="nowrap d-flex gap-1">
                Replace color
                <ToolTip text="Replace ALL the color from EVERYWHERE">
                    <v-icon>mdi-help-circle</v-icon>
                </ToolTip>
            </div>
            <div class="d-flex justify-space-between align-center">
                from: 
                <v-menu
                    :close-on-content-click="false"
                >
                    <template v-slot:activator="{ props }">
                        <div 
                            class="colorPreview ml-3"
                            v-bind="props"
                            :style="{ backgroundColor: `#${fromColor}` }"
                        >
                        </div>
                    </template>
                    <ColorPicker v-model="fromColor"  />
                </v-menu>  
            </div>
            <div class="d-flex justify-space-between align-center">
                to: 
                <v-menu
                    :close-on-content-click="false"
                >
                    <template v-slot:activator="{ props }">
                        <div 
                            class="colorPreview ml-3"
                            v-bind="props"
                            :style="{ backgroundColor: `#${toColor}` }"
                        >
                        </div>
                    </template>
                    <ColorPicker v-model="toColor"  />
                </v-menu>  
            </div>
            <v-btn
               @click=""
               color="primary"
            >
               Confirm
            </v-btn>
            <v-divider />
            <div class="nowrap d-flex gap-1">
                Theme palette
                <ToolTip text="List of colors used in your theme">
                    <v-icon>mdi-help-circle</v-icon>
                </ToolTip>
            </div>
            <div class="colorPaletteGrid">
                <div v-for="(path, hex) in myColors">
                    <ToolTip>
                        <div 
                            class="colorPreview ml-3"
                            :style="{ backgroundColor: `#${hex}` }"
                        >
                        </div>
                        <template v-slot:text>
                            <div class="pa-3">
                                <ol>
                                    <li v-for="l in path">{{l}}</li>
                                </ol>
                            </div> 
                        </template>
                    </ToolTip>
                </div>
            </div>
            
        </div>
    </div>
</template>
 
<script setup lang="ts">
import ToolTip from "@/components/buttons/ToolTip.vue";
import ColorPicker from "@/components/global/ColorPicker.vue";
import { type Ref, ref } from "vue";
import { myColors } from "@/service/tools";

// Replace color
const fromColor: Ref<string> = ref("");
const toColor: Ref<string> = ref("");

 
</script>
 
<style scoped>
.colorPaletteGrid{
    display: grid;
    grid-template-columns: repeat( auto-fit, 40px );
}
</style>