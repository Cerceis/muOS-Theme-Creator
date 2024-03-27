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
                    @click=""
                    :title="t.title"
                    :subtitle="t.des"
                    :disabled="t.disabled"
                >
                </v-list-item>
            </v-list>
        </v-sheet>
    </v-menu>  
</template>
 
<script setup lang="ts">
import { type Ref, ref, type Component } from "vue";
import ImageResizer from "@/components/global/Tools/ImageResizer.vue";

const selectedTool: Ref<Component | null> = ref(null);


const toollist = [
    {title: "Image resizer", disabled: false, des: "Resize an image"},
    {title: "Image cropper", disabled: true, des: "Crop an image"},
    {title: "Header & Footer maker", disabled: true, des: "Create your H/F and bind it to an image"},
]
 
</script>
 
<style scoped>
</style>