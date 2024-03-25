import { computed } from "vue";
import { selectedTheme } from "@/service/theme";
import { isHexColor } from "@/service/shared";

export const replaceAllColor = (f: string, t: string) => {

}


// key = hex without #
export type UsedColorMap = {
    [key: string]: string[]
}
// Gather all color used in theme
export const myColors = computed(() => {
    // key = hex without #
    const myColors: UsedColorMap = {}; 
    for(let i = 0; i < selectedTheme.value.values.length; i++) {
        const group = selectedTheme.value.values[i];
        for(let j = 0; j < group.child.length; j++) {
            const c = group.child[j];
            if(!c.value || !isHexColor(c.value)) continue;
            if(!myColors[c.value]) myColors[c.value] = [];
            myColors[c.value].push(`${group.label} - ${c.label}`)
        }
    }  
    return myColors;
})

