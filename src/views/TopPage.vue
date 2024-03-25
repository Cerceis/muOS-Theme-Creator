<template>
    <div class="d-flex ma-3">
        <div class="left-menu">
            <v-sheet class="pa-3">
                <v-text-field 
                    variant="outlined"
                    density="compact"
                    label="zip name"
                    v-model="selectedTheme.zipName"
                />
                <v-text-field 
                    variant="outlined"
                    density="compact"
                    label="author"
                    v-model="selectedTheme.author"
                />
                <div class="d-flex gap-1">
                    <v-btn
                       @click=""
                       color="primary"
                    >
                        <v-icon>mdi-download</v-icon>
                       GENERATE
                    </v-btn>
                    <v-btn
                       @click=""
                       color="primary"
                    >
                        <v-icon>mdi-download</v-icon>
                       Scheme
                    </v-btn>
                </div>
            </v-sheet>
            <v-divider class="my-2"/>

            <v-sheet class="px-3 pt-3">
                <v-text-field 
                    variant="outlined"
                    density="compact"
                    prepend-inner-icon="mdi-magnify"
                    placeholder="Search..."
                    hide-details
                />
            </v-sheet>
            <v-list>
                <v-list-item
                    v-for="l in selectedTheme.values"
                    :key="l.label"
                    :title="l.label"
                    @click="selectedValueGroupLabel = l.label"
                ></v-list-item>
            </v-list>
        </div>
        <v-sheet class="ml-2 pa-3 w-100">
            <div v-if="selectedValueGroup">
                <div class="text-h4">{{ selectedValueGroup.label }}</div>
                <div v-if="selectedValueGroup.des">
                    {{ selectedValueGroup.des }}
                </div>
                <v-divider />
                <div class="mt-3">
                    <div v-for="child in selectedValueGroup.child" >
                        <div>{{ child.label }}</div>
                        <div class="caption">
                            {{ child.des }}
                        </div>
                        <div class="d-flex">
                            <v-text-field
                                variant="outlined"
                                density="compact"
                                v-model="child.value"
                                :accept="child.format ? child.format : ''"
                            />
                            <v-menu
                                v-if="isHexColor(child.value)" 
                                :close-on-content-click="false"
                            >
                                <template v-slot:activator="{ props }">
                                    <div 
                                        class="colorPreview ml-3"
                                        v-bind="props"
                                        :style="{
                                            backgroundColor: `#${child.value}`
                                        }"
                                    >
                                    </div>
                                </template>
                                <ColorPicker v-model="child.value" />
                            </v-menu>  
                        </div>
                    </div>
                </div>
            </div>
        </v-sheet>
    </div>
</template>
 
<script setup lang="ts">
import { selectedTheme } from "@/service/theme";
import { ref, type Ref, computed } from "vue";
import ColorPicker from "@/components/global/ColorPicker.vue"

const selectedValueGroupLabel: Ref<string> = ref("");
const selectedValueGroup = computed(() => {
    if(selectedValueGroupLabel.value === "") return null;
    const foundGroup = selectedTheme.value.values.find(group => group.label === selectedValueGroupLabel.value);
    if(!foundGroup) return null;
    return foundGroup;
})

const isHexColor = (value: string): boolean => {
    // Check if the value starts with '#' and has either 3 or 6 characters
    if (/^[0-9A-F]{6}$/i.test(value)) {
        return true;
    }
    return false;
}

 
</script>
 
<style scoped>
.left-menu{
    min-width: 300px
}
.colorPreview{
    width: 39px;
    height: 39px;
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.4);
}
</style>