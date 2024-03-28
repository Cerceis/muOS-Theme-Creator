<template>
    <div class="d-flex gap-1 justify-space-between w-100">
        <div style="min-width:250px">
            <div class="px-3 py-3">
                <v-text-field 
                    v-model="keyword"
                    variant="outlined"
                    density="compact"
                    prepend-inner-icon="mdi-magnify"
                    placeholder="Search..."
                    hide-details
                />
            </div>
            <v-list class="screen-selection-panel">
                <v-list-item
                    v-for="(s, i) in filterdScreenList"
                    :key="i"
                    @click="screen.focus(s)"
                >
                    <template v-slot:prepend>
                        <v-avatar v-if="screenData[s] && screenData[s].preview" color="primary" size="x-small">
                            <span class="font-weight-bold">P</span>
                        </v-avatar>
                    </template>
                    {{ s }}
                </v-list-item>
            </v-list>
        </div>
        <div v-if="screen.initiated" class="d-flex gap-1 justify-center w-100" :key="`preview-${viewKey}`">
            <div class="previewWrapper" style="width: 348px; height: 261px">
                <div class="text-center text-caption">{{ screen.history[0].title }}</div>
                <Screen :key="screen.history[0].id" :screen="screen.history[0]" :scale="0.54375" />
            </div>
            <div>
                <div class="previewWrapper" style="width: 160px; height: 120px">
                    <div class="text-center text-caption">{{ screen.history[1].title }}</div>
                    <Screen :key="screen.history[1].id" :screen="screen.history[1]" :scale="0.25"/>
                </div>
                <div class="previewWrapper" style="width: 160px; height: 120px; top: 20px">
                    <div class="text-center text-caption">{{ screen.history[2].title }}</div>
                    <Screen :key="screen.history[2].id" :screen="screen.history[2]" :scale="0.25"/>
                </div>
            </div>
        </div>
    </div>
	<div class="text-center caption mt-1 text-error">
		※ Previews does not represent the actual screen, but act as a simple reference.
	</div>
</template>
 
<script setup lang="ts">
import Screen from "@/components/global/Preview/Screen.vue";
import { type Ref, ref, watch, computed, onMounted } from "vue";
import { selectedTheme } from "@/service/theme";
import { screen, screenList, screenData } from "@/service/screen";

onMounted(() => screen.value.init())

const keyword: Ref<string> = ref("");
const filterdScreenList = computed(() => {
    return screenList.filter(s => s.toUpperCase().includes(keyword.value.toUpperCase()))
})

const viewKey: Ref<number> = ref(1);
watch(
    () => selectedTheme.value,
    () => {
        viewKey.value ++;
    },
    { deep: true }
)

</script>
 
<style scoped>
.screen-selection-panel{
    height: calc(281px - 24px - 40px);
    overflow-y: scroll;
}
.previewWrapper{
    position: relative;
}
</style>

