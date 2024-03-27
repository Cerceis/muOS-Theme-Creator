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
                >
                </v-list-item>
            </v-list>
        </v-sheet>
    </v-menu>  
</template>
 
<script setup lang="ts">

const toollist = [
    {title: "Image resizer", disabled: false, des: "Resize an image"},
    {title: "Image cropper", disabled: false, des: "Crop an image"},
    {title: "Header & Footer maker", disabled: false, des: "Create your H/F and bind it to an image"},
]
 
</script>
 
<style scoped>
</style>