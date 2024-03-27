<template>
    <div class="asset-grid">
        <ToolTip v-for="a in assets" location="top" :text="`${a.filename}.${a.type.split('/')[1]}`">
            <div
                class="asset-item"
                @click="selectedImage = a; showImage = true"
                :style="{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backgroundImage: `url('${a.base64}')`,
                    backgroundSize: '100%',
                    backgroundPosition: 'center'
                }"
            ></div>
        </ToolTip>
        <v-dialog v-model="showImage" max-width="800px">
            <v-sheet>
                <div class="d-flex justify-center">
                    <div
                        :style="{
                            width: '640px',
                            height: '480px',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backgroundImage: `url('${selectedImage?.base64}')`,
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center'
                        }"
                    >
                </div>
                </div>
                <v-divider />
                <div class="d-flex gap-1 pa-3 justify-end align-center">
                    <div>{{ `${selectedImage?.filename}.${selectedImage?.type.split('/')[1]}` }}</div>
                    <v-btn
                        @click=""
                        color="error"
                        size="36"
                    >
                       <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn
                       @click="showImage = false"
                       color="primary"
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
import { type Ref, ref } from "vue";
import { assets, type Asset } from "@/service/assets";
import ToolTip from "@/components/buttons/ToolTip.vue";

const showImage: Ref<boolean> = ref(false);
const selectedImage: Ref<Asset | null> = ref(null);
 
</script>
 
<style scoped>
.asset-grid{
    display: grid;
    gap: .25em;
    grid-template-columns: repeat( auto-fill, 68px );
    justify-content: center;
}
.asset-item{
    height: 64px;
    width: 64px;
    border-radius: 4px;
    transition: all 0.4s
}

</style>