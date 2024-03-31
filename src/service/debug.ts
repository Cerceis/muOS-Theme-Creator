import { ref } from "vue";
import { selectedTheme } from "./theme" 
import { promptOpenFile } from "./file";
import { assets } from "./assets";

export const tmpKey = ref(1)
export const debug = () => {
	/*
	promptOpenFile(["font/*"]);
	console.log(assets.value)
	*/
}
