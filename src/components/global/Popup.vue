<template>
    <v-dialog v-for="(popup, i) in popupList" :key="i" v-model="popup.display" persistent width="max-content">
        <v-card class="theCard">
            <v-card-title class="pa-0">
                <v-sheet 
                    class="py-1 px-3"
                    :color="popup.color" 
                >
                    {{ popup.title }}
                </v-sheet>
            </v-card-title>
            <v-card-text>
                <template v-if="popup.loader">
                    <div class="loaderWrapper">
                        <div class="loader">
                            <div class="dot" v-for="i in 25"></div>
                        </div>
                    </div>
                    <div class="loaderText" v-html="popup.text"></div>
                </template>
                <template v-else>
                    <div v-html="popup.text"></div>
                </template>
            </v-card-text>
            <v-card-actions class="justify-end" v-if="!popup.loader">
                <v-btn v-if="!popup.singleBtn" color="error" @click="popup.cancel()">{{ popup.btnCancel }}</v-btn>
                <v-btn variant="outlined" color="success" @click="popup.ok()">{{ popup.btnOk }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
 
<script setup lang="ts">
import { popupList } from '@/service/popup';

</script>
 
<style scoped>
.theCard{
    width: max-content;
    min-width: 300px;
}
</style>

