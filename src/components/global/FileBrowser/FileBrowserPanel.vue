<template>
    <v-btn
       @click="showDialog = !showDialog"
       color="primary"
	   class="w-100"
    >
		<v-icon>mdi-folder-search</v-icon>
       Filebrowser
    </v-btn>
	<v-dialog v-model="showDialog" persistent height=90vh>
		<div class="bg-primary d-flex justify-space-between align-center">
			<div class="pl-3">Filebrowser</div>
            <v-btn
               @click="showDialog = false"
               color="error"
               size="32"
            >
               <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>
		<v-sheet class="pa-3 h-100" style="overflow-y: scroll">
			<div class="d-flex gap-1 font-weight-bold text-h6 mb-3 align-center">
				Selected:
				<div>
					{{selectedFolderEntity?.filename}}
				</div>
				<div>
					<ToolTip text="Upload to this folder">
						<v-btn
							@click=""
							color="primary"
							size="28"
						>
						<v-icon size="28">mdi-upload</v-icon>
						</v-btn>
					</ToolTip>
				</div>
			</div>
			<TreeView :tree="folderStructure" />
		</v-sheet>
	</v-dialog>
</template>
 
<script setup lang="ts">
import { type Ref, ref } from "vue";
import TreeView from "./TreeView/TreeView.vue";
import { folderStructure, selectedFolderEntity } from "@/service/file";
import ToolTip from '@/components/buttons/ToolTip.vue';

const showDialog: Ref<boolean> = ref(false);
 
</script>
 
<style scoped>
 
</style>
