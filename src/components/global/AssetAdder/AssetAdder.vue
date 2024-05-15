<template>
	<div>
		<div class="d-flex align-center gap-1">
			<div v-html="bootlogoValue.label"></div>
			<v-chip v-if="bootlogoValue.preview" color="primary" size="x-small">
				<span class="font-weight-bold">P</span>
			</v-chip>
		</div>
		<div class="caption">
			{{ bootlogoValue.des }} [ID: {{ bootlogoValue.id }}]
		</div>
		<div class="d-flex gap-1 w-100">
			<v-file-input
				variant="outlined"
				density="compact"
				v-model="bootlogoValue.value as unknown as File[]"
				:accept="bootlogoValue.format ? bootlogoValue.format : ''"
				@change="addToAsset($event)"
			/>
			<ToolTip location="top" text="Load from asset">
				<v-btn
					@click="assetSelector.new(bootlogoValue.id)"
					color="primary"
					size="40"
				>
					<v-icon size="large">mdi-folder-image</v-icon>
				</v-btn>
			</ToolTip>
		</div>
		<div class="d-flex align-center gap-1">
			Other images:
		</div>
		<div class="caption">
			All the files will be autimatically dropped into /image/wall/
		</div> 
		<v-select
			variant="outlined"
			:items=filteredDefaultFixedImageAssetInfo
			item-title="label"
			return-object
			v-model="selectedProperty"
			density="compact"
			hide-details
		>
			<template v-slot:prepend-item>
				<v-text-field 
					density="compact"
					variant="outlined"
					placeholder="Search..."
					v-model="keyword"
				/>
				<v-divider class="mt-2"></v-divider>
			</template>
			<template v-slot:selection="{item}">
				{{ item.title }}
			</template>
			<template v-slot:item="{item, props}">
				<v-list-item v-bind="props">
					{{ item.raw.property }}
				</v-list-item>
			</template>
		</v-select>
		<div class="d-flex gap-1 mt-3">
			<v-file-input
				variant="outlined"
				density="compact"
				v-model="computedThemeChild.value as unknown as File[]"
				:accept="computedThemeChild.format"
				@change="addToAsset($event)"
			/>
			<ToolTip location="top" text="Load from asset">
				<v-btn
					@click="assetSelector.new(`148.${selectedProperty.id}`)"
					color="primary"
					size="40"
				>
					<v-icon size="large">mdi-folder-image</v-icon>
				</v-btn>
			</ToolTip>
		</div>
		<div>
			Path: {{ `${selectedProperty.path.join("/")}/${selectedProperty.property}.[format]` }} [ID: {{ `148.${selectedProperty.id}` }}]
		</div>
	</div>
</template>

<script setup lang="ts">
//child.value as unknown as File[]
//assetSelector.new(child.id)
// The title might be abit confusing.
import { type PropType, type Ref, ref, computed } from "vue";
import { type MUOSThemeChild, type MUOSThemeValues, themeFunc } from '@/service/theme';
import { 
	assetFunc, assetSelector, defaultFixedImageAssetInfo,
	type DefaultFixedImageAssetInfoItem,
} from "@/service/assets";
import ToolTip from "@/components/buttons/ToolTip.vue";

const props = defineProps({
	themeGroup: {
		type: Object as PropType<MUOSThemeValues>,
		required: true,
	}
})

const selectedProperty: Ref<DefaultFixedImageAssetInfoItem> = ref(defaultFixedImageAssetInfo[0]);
const computedThemeChild = computed(() => {
	const tmp = themeFunc.getChild(`148.${selectedProperty.value.id}`) as MUOSThemeChild;
	return tmp;
})

const keyword: Ref<string> = ref("");
const filteredDefaultFixedImageAssetInfo = computed(() => {
	return defaultFixedImageAssetInfo.filter(dfiai => {
		return (
			dfiai.label.toUpperCase().includes(keyword.value.toUpperCase()) ||
			dfiai.property.toUpperCase().includes(keyword.value.toUpperCase())
		)
	})
})

// Why have i done this...
const bootlogoValue = computed(() => {
	return themeFunc.getChild("148") as MUOSThemeChild
});

const addToAsset = (e: any) => {
	if(!e || !e.target || !e.target.files) return;
	if(e.target.files.length === 0) return;
	assetFunc.add(e.target.files[0]);
}


</script>

<style scoped></style>