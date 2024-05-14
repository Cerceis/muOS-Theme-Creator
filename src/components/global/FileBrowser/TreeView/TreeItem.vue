<template>
	<div :class="`${selectedFolderEntity?.id === treeItem.id ? 'highlight' : ''} treeItem d-flex`" @click="selectEntity">
		<div v-if="depth > 1" class="visual-bar">
			
		</div>
		<div class="treeItemCell" style="width: 40px">
			<v-icon v-if="treeItem.type === 'folder'" color="blue">mdi-folder</v-icon>
			<v-icon v-else>mdi-file</v-icon>
		</div>
		<div class="treeItemCell" style="width: 280px">
			{{ treeItem.filename }}
		</div>
		<div class="treeItemCell" style="width: 80px">
			{{ treeItem.type }}
		</div>
		<div class="treeItemCell" style="width: 40px">
			<ToolTip v-if="treeItem.locked" text="This content is locked and can't be modified. Or edit it in the UI panel.">
				<v-icon color="yellow">mdi-lock</v-icon>
			</ToolTip>
		</div>
		<div class="treeItemCell" style="width: 40px">
			<ToolTip text="Delete">
				<v-btn
					@click=""
					color="error"
					size="40"
					variant="text"
					:disabled="treeItem.locked"
				>
				
					<v-icon v-if="treeItem.locked" size="40">mdi-delete-off</v-icon>
					<v-icon v-else size="40">mdi-delete</v-icon>
				</v-btn>
			</ToolTip>
		</div>
		<div class="treeItemCell text-center" style="width: 80px">
			<template v-if="treeItem.type === 'folder'" class="text-center">files: {{ treeItem.children.length }}</template>
		</div>
	</div>
	<div v-if="treeItem.type === 'folder' && treeItem.children.length > 0 && treeItem.expand">
		<TreeView :tree="treeItem.children" :depth="depth" />
	</div>
</template>
 
<script setup lang="ts">
import ToolTip from '@/components/buttons/ToolTip.vue';
import TreeView from './TreeView.vue';
import { selectedFolderEntity } from "@/service/file";
import { type PropType } from "vue";

const props = defineProps({
    treeItem: {
        type: Object as PropType<any>,
        required: true
    },
	depth: {
		type: Number,
		default: 0
	}
})

const selectEntity = () => {
	selectedFolderEntity.value = props.treeItem;
	if(selectedFolderEntity.value && selectedFolderEntity.value.type === 'folder'){
		(selectedFolderEntity.value as any).expand = !(selectedFolderEntity.value as any).expand;
	}
}
 
</script>
 
<style scoped>
.treeItemCell{
	display: flex;
	align-items: center;
	white-space: nowrap;
	overflow: hidden;
	padding: 0 .25em;
	height: 40px;
	font-size: 24px;
} 
.treeItem{
	position: relative;
	border-top: 1px solid rgb(150, 150, 150);
	border-bottom: 1px solid rgb(150, 150, 150);
}
.treeItem:hover{
	background: rgba(255,255,255,.5);
	cursor: pointer;
}
.visual-bar{
	position: relative;
	left: 0;
	top: 20px;
	width: 18px;
	height: 1px;
	background: rgb(150, 150, 150);
}
.highlight{
	background: rgb(100, 100, 100);
}
</style>