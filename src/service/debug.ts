import { ref } from "vue";
import { selectedTheme } from "./theme" 

export const tmpKey = ref(1)
export const debug = () => {
    console.log(selectedTheme.value)
    tmpKey.value ++;
}
