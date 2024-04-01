<template>
    <div class="d-flex ma-3">
        <!----Left Menu------->
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
				<v-menu location="right">
					<template v-slot:activator="{ props }">
						<v-btn v-bind="props" color="primary" class="w-100">
							<v-icon>mdi-download</v-icon>
							DOWNLOAD
						</v-btn>
					</template>
					<v-list density="compact">
						<v-list-item @click="generateZipTheme">
							<template v-slot:prepend>
								<v-icon>mdi-download</v-icon>
								<v-icon>mdi-folder-zip</v-icon>
							</template>
							Theme
						</v-list-item>
						<ToolTip text="All your image will be resized and minimized to reduce file size automatically" location="right">
							<v-list-item disabled>
									<template v-slot:prepend>
										<v-icon>mdi-download</v-icon>
										<v-icon>mdi-folder-zip</v-icon>
									</template>
									Optimized Theme
							</v-list-item>
						</ToolTip>
						<ToolTip text="Generate a preview image for your theme, place it into /theme/preview/" location="right">
							<v-list-item @click="downloadPreviewImage">
								<template v-slot:prepend>
									<v-icon>mdi-download</v-icon>
									<v-icon>mdi-image</v-icon>
								</template>
								Preview Image
							</v-list-item>
						</ToolTip>
						<v-list-item @click="" disabled>
							<template v-slot:prepend>
								<v-icon>mdi-download</v-icon>
								<v-icon>mdi-file</v-icon>
							</template>
							Scheme
						</v-list-item>
					</v-list>
				</v-menu>
            </v-sheet>
            <v-divider class="my-2"/>
            <!----Group Menu------->
            <v-sheet class="px-3 py-3">
                <v-text-field 
                    v-model="keyword"
                    variant="outlined"
                    density="compact"
                    prepend-inner-icon="mdi-magnify"
                    placeholder="Search..."
                    hide-details
                />
            </v-sheet>
            <v-list class="groupMenu-panel">
                <v-list-item
                    v-for="l in filteredList"
                    :key="l.label"
                    :title="l.label"
                    @click="selectedValueGroupLabel = l.label"
                >
                    <template v-slot:prepend>
                        <v-avatar v-if="l.preview" color="primary" size="x-small">
                            <span class="font-weight-bold">P</span>
                        </v-avatar>
                    </template>
                </v-list-item>
            </v-list>
        </div>    
        <!----Center------->
        <v-sheet class="w-100 mx-2 py-3">
            <div>
                <PreviewPanel />
            </div>
            <v-divider class="mt-1" />
            <div v-if="selectedValueGroup">
                <div class="text-h4 px-3 d-flex gap-1 align-center">
                    <div>{{ selectedValueGroup.label }}</div>
                    <v-chip 
                        v-if="selectedValueGroup.preview"
                        color="primary"
                        size="small"
                    >PREVIEW Available</v-chip>
                    <!-----Group specific previews----->
                    <GroupPreview :group-id="selectedValueGroup.id" />
                </div>
                <div v-if="selectedValueGroup.des">
                    {{ selectedValueGroup.des }}
                </div>
                <v-divider />
                <div class="centerBtm-panel mt-3 px-3">
                    <div v-for="child in selectedValueGroup.child" >
                        <div class="d-flex align-center gap-1">
                            {{ child.label }}
                            <v-chip v-if="child.preview" color="primary" size="x-small">
                                <span class="font-weight-bold">P</span>
                            </v-chip>
                        </div>
                        <div class="caption">
                            {{ child.des }} [ID: {{ child.id }}]
                        </div>
                        <div class="d-flex">
                            <template v-if="
                                child.format === '.png' || child.format === '.bmp' ||
                                child.format === '.mp3' // TODO: Font
                            ">
                                <div class="d-flex gap-1 w-100">
                                    <v-file-input
                                        variant="outlined"
                                        density="compact"
                                        v-model="child.value"
                                        :accept="child.format ? child.format : ''"
                                        @change="addToAsset($event)"
                                    />
                                    <ToolTip location="top" text="Load from asset">
                                        <v-btn
                                            @click="assetSelector.new(child.id)"
                                            color="primary"
                                            size="40"
                                        >
                                            <v-icon size="large">mdi-folder-image</v-icon>
                                        </v-btn>
                                    </ToolTip>
                                </div>
                            </template>
                            <template v-else>
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    v-model="child.value"
                                    :accept="child.format ? child.format : ''"
                                />    
                            </template>
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

        <!----Right Menu------->
        <v-sheet class="pa-3">
            <ToolsPanel />
        </v-sheet>
    </div>
    <AssetSelectionPanel />
</template>
 
<script setup lang="ts">
// TODO: Could take time splitting the UI into smaller part.
import { 
    selectedTheme, 
    type MUOSThemeValues,
    selectedValueGroupLabel, selectedValueGroup,
} from "@/service/theme";
import { ref, computed } from "vue";
import type { ComputedRef, Ref } from "vue";
import { generateZipTheme, downloadPreviewImage } from "@/service/file";
import ColorPicker from "@/components/global/ColorPicker.vue";
import ToolsPanel from "@/components/global/Tools/ToolsPanel.vue";
import { isHexColor } from "@/service/shared";
import PreviewPanel from "@/components/global/Preview/PreviewPanel.vue";
import ToolTip from "@/components/buttons/ToolTip.vue";
import AssetSelectionPanel from "@/components/global/Tools/AssetSelectionPanel.vue";
import { assetSelector, assetFunc } from "@/service/assets";
import GroupPreview from "@/components/global/Preview/GroupPreview/GroupPreview.vue";

// Filtering
const keyword: Ref<string> = ref("");
const filteredList: ComputedRef<MUOSThemeValues[]> = computed(() => {
    if(!selectedTheme.value.values) return [] as MUOSThemeValues[];
    const upperKW = keyword.value.toUpperCase();
    return selectedTheme.value.values.filter(group => {
        return (
            group.label.toUpperCase().includes(upperKW) ||
            (group.des && group.des.toUpperCase().includes(upperKW)) ||
            group.child.some(child => {
                return (
                    child.label.toUpperCase().includes(upperKW) ||
                    child.des.toUpperCase().includes(upperKW)
                )
            })
        )
    })
})

const addToAsset = (e: any) => {
    if(!e || !e.target || !e.target.files) return;
    if(e.target.files.length === 0) return;
    assetFunc.add(e.target.files[0]);
}

</script>
 
<style scoped>
.left-menu{
    min-width: 250px
}
.center-con{
    
}
.centerBtm-panel{
    height: calc(100vh - 60px - 12px - 320px - 12px - 12px - 12px - 16px);
    overflow-y: scroll;
}
.groupMenu-panel{
    height: calc(100vh - 60px - 12px - 184px - 64px - 24px);
    overflow-y: scroll;
}
</style>