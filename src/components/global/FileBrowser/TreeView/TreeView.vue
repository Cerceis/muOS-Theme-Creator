<template>
    <div class="tree-container">
		<template v-for="(treeItem, i) in tree">
			<div 
				v-if="depth > 0" 
				class="visual-bar"
				:style="{
					top: `${i > 0 ? '20' : '0'}px`,
					height: `calc(100% - 40px)`
				}"
			></div>
			<TreeItem :tree-item="treeItem" :depth="depth+1">
				<template v-slot="{item}">
					<slot :item="item"></slot>
				</template>
			</TreeItem>
		</template>
    </div>
</template>
 
<script setup lang="ts">
import { type PropType, computed } from "vue";
import TreeItem from "./TreeItem.vue";
import { type FolderFileEntity, type FolderFolderEntity } from "@/service/file";

const props = defineProps({
    tree: {
        type: Array as PropType<(FolderFileEntity | FolderFolderEntity)[]>,
        required: true,
    },
	depth: {
		type: Number,
		default: 0,
	} 
})

</script>
 
<style scoped>
.tree-container{
	position: relative;
	margin-left: 24px;
}
.visual-bar{
	top: 0;
	position: absolute;
	width: 1px;
	background: rgb(150, 150, 150);
}
</style>