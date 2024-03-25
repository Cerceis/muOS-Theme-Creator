import JSZip from "jszip";
import { selectedTheme } from "@/service/theme";
import { TEXT_CREDIT, TEXT_SCHEME } from "@/service/text";

/**
 * Generate a zipped theme
 * file list:
 * 
 * credits.txt
 * - font
 * - image
 * - music
 * - scheme
 *     default.txt
 * - sound
 */
export const generateZipTheme = () => {
    try{
        const zip = new JSZip();
        const filename = selectedTheme.value.zipName;
        const rootFolder = zip.folder(filename);
        if(!rootFolder) throw "ERROR NULL";

        // Creates all neccesary folders
        const font = rootFolder.folder("font");
        const image = rootFolder.folder("image");
        const music = rootFolder.folder("music");
        const scheme = rootFolder.folder("scheme");
        const sound = rootFolder.folder("sound");
        if(!font || !image || !music || !scheme || !sound) throw "ERROR NULL";

        rootFolder.file("credits.txt", TEXT_CREDIT(selectedTheme.value.author));    
        scheme.file("default.txt", TEXT_SCHEME(selectedTheme.value.values));
        
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            promptDownload(content, `${filename}.zip`)
        });
    }catch(err){
        console.log(err)
    }
}
/*
const img = zip.folder("images");
img.file("smile.gif", imgData, {base64: true});
*/
export const promptDownload = (fileData: Blob, filename: string) => {
    const blob = new Blob([fileData]);
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;        
    elem.target = "_blank";
    document.body.appendChild(elem);
    elem.click();        
    document.body.removeChild(elem);
}