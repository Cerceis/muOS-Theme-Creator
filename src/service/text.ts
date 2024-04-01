import { type MUOSThemeValues, whitelistSchemeLabels } from "@/service/theme"

export const TEXT_CREDIT = (author: string) => {
return (
`Created by ${author}.
Generated from muOS Theme Maker.
Contributes by:
┎┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈୨❈୧┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┒

            jupy <3 
            Cerceis ◝(⁰▿⁰)◜

┖┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈୨❈୧┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┚
Make your own theme at: https://theme.muos.dev/create`
)
}

export const TEXT_SCHEME = (themeValue: MUOSThemeValues[]) => {
    let resultString = "";
    
    for(let i = 0; i < themeValue.length; i++) {
        const tV = themeValue[i];
        if(whitelistSchemeLabels.every(wLL => wLL !== tV.label)) continue;
        if(resultString !== "") resultString += "\n";
        resultString += `[${tV.label}]\n`;
        for(let j = 0; j < tV.child.length; j++){
            resultString += `${tV.child[j].property}=${tV.child[j].value}\n`;
        }
    }
    return resultString;
}