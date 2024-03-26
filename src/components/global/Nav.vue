<template>
    <v-sheet class="d-flex justify-space-between pa-3 align-center">
        <div class="font-weight-bold text-h5">
            muOS Theme Creator <span class="caption">v{{ VERSION }}</span>
        </div>
        <div class="d-flex gap-1 align-center">
            <ToolTip text="Load theme">
                <v-btn
                    @click=""
                    color="primary"
                    size="36"
                >
                    <v-icon size="large">mdi-folder-open</v-icon>
                </v-btn>
            </ToolTip>
            <v-btn
               @click="showDevLog = !showDevLog"
               color="primary"
               size="36"
            >
                <v-badge color=red content="!">
                    <v-icon icon="mdi-bell" size="large"></v-icon>
                </v-badge>   
            </v-btn>
            <ToolTip text="Discord">
                <v-btn
                    @click="openURL('https://discord.gg/USS5ybVtDz')"
                    color="primary"
                    size="36"
                >
                    <img width="24" src="data:image/png;base64,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">
                </v-btn>
            </ToolTip>
            <ToolTip text="Support muOS">
                <v-btn
                    @click="openURL('https://ko-fi.com/xonglebongle')"
                    color="primary"
                    size="36"
                >
                    <v-icon size="large">mdi-coffee</v-icon>
                </v-btn>
            </ToolTip>
            <ToolTip text="Debug, please don't press it you monster!">
                <v-btn
                    @click="debug()"
                    color="primary"
                    size="36"
                >
                    <v-icon size="large">mdi-diamond-stone</v-icon>
                </v-btn>
            </ToolTip>
        </div>
    </v-sheet>
    <v-dialog v-model="showDevLog" max-width="800px">
        <div class="bg-primary d-flex justify-end align-center">
            <v-btn
               @click="showDevLog = false"
               color="error"
               size="32"
            >
               <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>
        <v-sheet class="grid gap-1 pa-3">
            <v-card v-for="log in devLog" elevation="3">
                <v-card-title>{{ log.date }}</v-card-title>
                <v-card-subtitle>{{ log.version }}</v-card-subtitle>
                <v-card-text v-html="log.text"></v-card-text>
            </v-card>
        </v-sheet>
    </v-dialog>
</template>
 
<script setup lang="ts">
import { ref, type Ref } from "vue";
import { VERSION } from "@/service/shared";
import { devLog } from "@/service/devLog";
import ToolTip from "@/components/buttons/ToolTip.vue";
import { debug } from "@/service/debug";

const showDevLog: Ref<boolean> = ref(false);

const openURL = (url: string) => {
    window.open(url, "_blank");
}
    
 
</script>
 
<style scoped>
 
</style>