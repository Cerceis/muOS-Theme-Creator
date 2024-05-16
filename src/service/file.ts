import JSZip, { file } from "jszip";
import { type MUOSThemeChild, type MUOSThemeValues, selectedTheme, themeFunc, whitelistSchemeLabels } from "@/service/theme";
import { TEXT_CREDIT, TEXT_SCHEME } from "@/service/text";
import { assetFunc, assets, defaultFixedImageAssetInfo, } from "./assets";
import { screen } from "@/service/screen";
import html2canvas from "html2canvas";
import { base64ToFile, fileToBase64 } from "@/service/assets";
import { Delay, Generate, Is } from "cerceis-lib";
import { ref, type Ref, watch } from "vue";
/**
 * Generate a zipped theme
 * file list:
 * 
 * credits.txt
 * - font
 * - image
 *     bootlogo.bmp
 *     - footer
 *         default.png
 *     - header
 *         default.png
 *     - wall
 *         default.png
 *         muxcharge.png
 *         muxconfig.png
 *         muxcredits.png
 *         muxfavourite.png
 *         muxhistory.png
 *         muxinfo.png
 *         muxlaunch.png
 *         muxplore.png
 *         muxreset.png
 *         muxtheme.png
 *         muxassign.png
 *         muxdevice.png
 *         muxnetwork.png
 *         muxrtc.png
 *         muxstart.png
 *         muxsysinfo.png
 *         muxtester.png
 *         muxtimezone.png
 *         muxtracker.png
 *         muxtweakadv.png
 *         muxtweakgen.png
 *         muxwebserv.png
 * - music
 * - scheme
 *     default.txt
 * - sound
 */
export type FolderEntityType = "folder" | "file";
export interface FolderEntityInfo{
	id: string
    type: FolderEntityType,
	filename: string, // act as id.
    locked: boolean,
}
export interface FolderFileEntity extends FolderEntityInfo{
    assetId: string | null
}
export interface FolderFolderEntity extends FolderEntityInfo{
	expand: boolean,
    children: (FolderFileEntity | FolderFolderEntity)[];
}
export const folderStructure: Ref<(FolderFileEntity | FolderFolderEntity)[]> = ref([]);

export type newEntityOptions = {
	filename?: string, locked?: boolean, assetId?: string

}

export const selectedFolderEntity: Ref<FolderFileEntity | FolderFolderEntity | null> = ref(null)

type themeFolderFunctions = {
	_folderCounter: 0, _fileCounter: 0,
    new:(entityType: FolderEntityType, options?: newEntityOptions) => FolderFileEntity | FolderFolderEntity,
	_fixPath: (path: string) => string[],
	addTo: (path: string, entity: FolderFileEntity | FolderFolderEntity) => boolean,
	delete: (path: string, filename: string) => boolean,
}
export const themeFolderFunctions: themeFolderFunctions = {
	_folderCounter: 0,
	_fileCounter: 0,
    new(entityType, options: newEntityOptions = {}){
		const appliedOptions = {
			filename: "",
			locked: false,
			... options
		}
        if(entityType === "file"){
            const tmpFile: FolderFileEntity = {
				id: Generate.objectId(),
                type: "file",
				filename: appliedOptions.filename ?? `New Folder ${this._folderCounter++}`,
                locked: appliedOptions.locked,
                assetId: appliedOptions.assetId ?? null,
            }
            return tmpFile
        }
        const tmpFolder: FolderFolderEntity = {
			id: Generate.objectId(),
            type: "folder",
			filename: appliedOptions.filename ?? `New Folder ${this._fileCounter++}`,
            locked: appliedOptions.locked,
			expand: false,
            children: []
        }
        return tmpFolder
    },
	_fixPath(path: string){
		/**
		 * path parsing
		 * ex) /image/wall/
		 * Remove the 1st and trailing "/"
		 */
		let _path = path;
		if(_path.at(0) === "/"){ _path = _path.slice(1,_path.length)}
		if(_path.at(-1) === "/"){ _path = _path.slice(0,_path.length-1)}

		return _path.split("/");
	},
	addTo(path: string, entity: FolderFileEntity | FolderFolderEntity){
		// root
		if(path === ""){
			folderStructure.value.push(entity)
			return true;
		}
		
		const pathArr = this._fixPath(path);
		
		const _internalLoop = (rootFolder: (FolderFileEntity | FolderFolderEntity)[], pArr: string[]) => {
			const currentPath = pArr.shift();
			if(!currentPath){
				rootFolder.push(entity);
				return;
			}
			// 1. Find the target child
			const target = rootFolder.find(e => e.filename === currentPath && e.type === "folder") as undefined | FolderFolderEntity;
			// Automatically creates new folder
			if(!target){
				const _tmp = themeFolderFunctions.new("folder", {filename: currentPath, locked: false}) as FolderFolderEntity;
				rootFolder.push(_tmp);
				return _internalLoop(_tmp.children, pArr);
			}
			return _internalLoop(target.children, pArr);
		}
	
		_internalLoop(folderStructure.value, pathArr);
	
		return true;
	},
	delete(path: string, filename: string){
		const _searchAndDestroy = (rootFolder: (FolderFileEntity | FolderFolderEntity)[]) => {
			for(let i = 0; i < rootFolder.length; i++){
				if(rootFolder[i].filename === filename){
					rootFolder.splice(i,1);
					return;
				}
			}
		}
		// root
		if(path === ""){
			_searchAndDestroy(folderStructure.value);
			return true;
		}
		
		const pathArr = this._fixPath(path);
		const _internalLoop = (rootFolder: (FolderFileEntity | FolderFolderEntity)[], pArr: string[]) => {
			const currentPath = pArr.shift();
			if(!currentPath){
				// Root
				_searchAndDestroy(rootFolder);
				return;
			}
			// 1. Find the target child
			const target = rootFolder.find(e => e.filename === currentPath && e.type === "folder") as undefined | FolderFolderEntity;
			if(!target) return false;
			return _internalLoop(target.children, pArr);
		}
	
		_internalLoop(folderStructure.value, pathArr);

		return true;
	}
}

// Folder Structure initiation.
/**
 * FUNC: generateZipTheme should generate based on this folder structure.
					┌───────────────────┐
		┌───────────│  Theme Structure  │
		│           └───────────────────┘
		│                     │
		│ Generate on         │   One way bind
		│   demand            │unless, subscribed.
		│                     │
		▼                     ▼
	┌─────────┐      ┌───────────────────┐
	│ Schema  │─────▶│ Folder Structure  │
	└─────────┘      └───────────────────┘
		│                     │
		│ Export              │ Export
		▼                     ▼
	┌───────────┐            ┌─────┐
	│Text output│            │ ZIP │
	└───────────┘            └─────┘
 */
export let folderStructureInitiated = false;
export const initFolderStructureLogic = () => {
	if(folderStructureInitiated) return;
	folderStructureInitiated = true;
	themeFolderFunctions.addTo("/", themeFolderFunctions.new("file", {filename: "credits.txt", locked: true}));
	themeFolderFunctions.addTo("/", themeFolderFunctions.new("folder", {filename: "font", locked: true}));
	themeFolderFunctions.addTo("/", themeFolderFunctions.new("folder", {filename: "image", locked: true}));
	themeFolderFunctions.addTo("/", themeFolderFunctions.new("folder", {filename: "music", locked: true}));
	themeFolderFunctions.addTo("/", themeFolderFunctions.new("folder", {filename: "scheme", locked: true}));
	themeFolderFunctions.addTo("/", themeFolderFunctions.new("folder", {filename: "sound", locked: true}));

	themeFolderFunctions.addTo("/image", themeFolderFunctions.new("folder", {filename: "wall", locked: true}));

	// Subscribe functions
	const newThemeChildSubscribeFunction = () => {
		let previouslyStoreFilename: string = "";
		return (v: MUOSThemeChild) => {
			if(!v.folderPath || !v.value || !Is.array(v.value) || !(v.value[0] instanceof File)) {
				console.log("delete")
				console.log (v.folderPath)
				console.log(previouslyStoreFilename);
				if(v.folderPath)
					themeFolderFunctions.delete(v.folderPath.join("/"), previouslyStoreFilename);
				return;
			}
			const tmpFile = v.value[0] as File;
			const fileFormat = tmpFile.name.split(".").pop();
			const joinedPath = v.folderPath.join("/");
			previouslyStoreFilename = `${v.property}.${fileFormat}`;
			themeFolderFunctions.addTo(joinedPath, themeFolderFunctions.new("file", {filename: `${v.property}.${fileFormat}`, locked: true}));
		}
	}
	
	const listOfThemeChildIdToSubscribe: string[] = ["148"];
	for(let i = 1; i <= defaultFixedImageAssetInfo.length; i++){
		listOfThemeChildIdToSubscribe.push(`148.${i}`)
	}
	// Do the same for fonts sounds and music
	const assetGroup = ["fonts", "sounds", "music"]
        assetGroup.forEach(aG => {
            const targetGroup = selectedTheme.value.values.find(group => group.label === aG);
            if(targetGroup){
                for(let i = 0; i < targetGroup.child.length; i++){
                    const child = targetGroup.child[i];
                    listOfThemeChildIdToSubscribe.push(child.id);
                }
            }
		})
	for(let i = 0; i < listOfThemeChildIdToSubscribe.length; i++){
		themeFunc.subscribeToChild(listOfThemeChildIdToSubscribe[i])?.subject.subscribe({
			next: newThemeChildSubscribeFunction(),
		});	
	}

} 
/**
 * 
 * @param returnFile Instead of downloading it, return the generated file.
 */
export const generateZipTheme = async(returnFile: boolean = false) => {
    try{
		const zip = new JSZip();
		zip.file("credits.txt", TEXT_CREDIT(selectedTheme.value.author));
		zip.file("scheme/default.txt", TEXT_SCHEME(selectedTheme.value.values));
        
        /* 
            Take note that actual folder name is singular name.
        */
        const assetGroup = ["images", "fonts", "sounds", "music"]
        assetGroup.forEach(aG => {
            const targetGroup = selectedTheme.value.values.find(group => group.label === aG);
            if(targetGroup){
                for(let i = 0; i < targetGroup.child.length; i++){
                    const child = targetGroup.child[i];
                    if(
                        !child.value || !child.folderPath ||
                        child.value.length === 0 
                    ) continue;
                    const sourceFileFormat = ((child.value[0] as File).name.split(".")).pop();
                    const extendedFilename = `${child.property}.${sourceFileFormat}`;
                    if(child.folderPath.length === 0){
                        zip.file(`${extendedFilename}`, child.value[0]);
                        continue;
                    }
                    zip.file(`${child.folderPath.join('/')}/${extendedFilename}`, child.value[0]);
                }
            }
            // Create a "static folder in images"
            if(aG === 'images'){
                zip.folder("/image/static")
            }
        })
        const content = await zip.generateAsync({type:"blob"})
        if(returnFile){
            return content;
        }
        else{
            promptDownload(content, `${selectedTheme.value.zipName}.zip`);
        }
		
    }catch(err){
        console.log(err)
    }
}

export const generateArchiveZipTheme = async() => {
    const themeName = `${selectedTheme.value.zipName}.zip`;
    const themeZip = await generateZipTheme(true) as Blob;
    const zip = new JSZip();
    zip.file(`mnt/mmc/MUOS/theme/${themeName}`, themeZip);
    zip.file(`mnt/mmc/MUOS/theme/preview/${selectedTheme. value.zipName}.png`, await downloadPreviewImage(true) as Blob);
    const content = await zip.generateAsync({type:"blob"});
    promptDownload(content, `${selectedTheme.value.zipName}.archive.zip`);
}

export const downloadScheme = () => {
    promptDownload(
        new Blob([TEXT_SCHEME(selectedTheme.value.values)], {type: 'text/plain'}),
        "default.txt"
    )   
}
/**
 * 
 * @param fileData 
 * @param filename name with extension
 */
export const promptDownload = (fileData: Blob, filename: string) => {
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(fileData);
    elem.download = filename;        
    elem.target = "_blank";
    document.body.appendChild(elem);
    elem.click();        
    document.body.removeChild(elem);
}
/**
 * 
 * @param files List of files
 * @param zipname Name without .zip extension
 */
export const promptDownloadZip = (files: File[], zipname: string) => {
    const zip = new JSZip();
    for(let i = 0; i < files.length; i++) {
        zip.file(files[i].name, files[i]);
    }
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        promptDownload(content, `${zipname}.zip`)
    });
}
export const promptOpenFile = (accepts: string[] = ["image/*"], multiple: boolean = true, addToAsset: boolean = true): Promise<File[]> => {
    return new Promise((resolve) => {
        const tmpInput = document.createElement('input');
        tmpInput.accept = accepts.join(",");
        tmpInput.style.display = "none";
        tmpInput.type = "file";
        tmpInput.multiple = multiple;
        document.body.appendChild(tmpInput);
        tmpInput.click();
        tmpInput.onchange = async(e: any) => {
            if(!e || !e.target || !e.target.files) return;
            if(e.target.files.length === 0) return;
            if(addToAsset){
                for(let i = 0; i < e.target.files.length; i++){
                    await assetFunc.add(e.target.files[i]);
                }
            }
            resolve(e.target.files);
            document.body.removeChild(tmpInput);
        }
    })
}

// Generate a preview image & download
export const downloadPreviewImage = async(returnFile: boolean = false) => {
    return new Promise(async(resolve, reject) => {
        screen.value.focus("Home");
        await Delay(500);
        const previewElement = document.getElementById('mainPreviewScreen')?.getElementsByClassName("previewCon");
        if(!previewElement) return;
        const resultCanvas = await html2canvas(previewElement[0] as any);
        const b64 = resultCanvas.toDataURL();
        const filename = `${selectedTheme.value.zipName}.png`;
        const img = new Image()
        img.onload = ()=>{
            const imageWidth = 288;
            const imageHeight = 216
            const canvas = document.createElement('canvas')
            canvas.width = imageWidth
            canvas.height = imageHeight
            const ctx = canvas.getContext('2d')
            ctx?.drawImage(img, 0, 0, Number(imageWidth.toFixed(0)), Number(imageHeight.toFixed(0)))
                const _file = base64ToFile(canvas.toDataURL().split(",")[1], filename, "image/png");
                if(returnFile) resolve(_file)
                else{
                    promptDownload(
                        _file,
                        filename,
                    )
                    resolve(true)
                }
        };
        const previewFile = base64ToFile(b64.split(",")[1], filename, "image/png");
        img.src = await fileToBase64(previewFile);
    })
}

// Loading
export const initLoadingSequence = async() => {
    const files = await promptOpenFile(["application/zip", "text/plain"], false, false);
    if(!files || files.length === 0) return;
    const file = files[0];
    if(file.type === "text/plain"){
        const reader = new FileReader();
        reader.onload = () => {
            const fileContent = reader.result as string;
            loadSchemeFile(fileContent)
        };
        reader.readAsText(file);
    }
    if(file.type === "application/zip"){
        await loadZipFile(file);
    }
}


export const extractLabelContext = (input: string): string[] => {
    const regex = /\[(.*?)\]/g;
    const matches: string[] = [];
    let match;
    while ((match = regex.exec(input)) !== null) {
        matches.push(match[1]);
    }
    return matches;
}
export const loadSchemeFile = async(schemeText: string) => {
    const schemeArr = schemeText.split("\n");
    let currentGroup: MUOSThemeValues | null = null;
    for(let i = 0; i < schemeArr.length; i++){
        if(!schemeArr[i]) continue;
        const extractedLabel = extractLabelContext(schemeArr[i])[0];
        if(whitelistSchemeLabels.includes(extractedLabel)){
            const targetGroup = selectedTheme.value.values.find(group => group.label === extractedLabel);
            if(targetGroup) currentGroup = targetGroup;
            continue;
        }
        if(currentGroup){
            // Extract value;
            const lineArr = schemeArr[i].split("=");
            const propertyName = lineArr[0].trim();
            const valueString = lineArr[1].trim();
            for(let j = 0; j < currentGroup.child.length; j++){
                if(currentGroup.child[j].property === propertyName){
                    currentGroup.child[j].value = valueString;
                }
            }
        }
    }
}

// Some expected mimetype
const mimetypeConversionMap: any = {
    "bmp": "image/bmp",
    "png": "image/png",
    "mp3": "audio/mp3",
}
export const loadZipFile = async(f: File) => {
    const loadedZip = await JSZip.loadAsync(f);
    const whitelistFiles = [
        { path: "image/bootlogo.bmp", bindId: "148"},
        { path: "image/wall/default.png", bindId: "149"},
        { path: "image/wall/muxcharge.png", bindId: "153"},
        { path: "image/wall/muxconfig.png", bindId: "154"},
        { path: "image/wall/muxcredits.png", bindId: "155"},
        { path: "image/wall/muxfavourite.png", bindId: "157"},
        { path: "image/wall/muxhistory.png", bindId: "158"},
        { path: "image/wall/muxinfo.png", bindId: "159"},
        { path: "image/wall/muxlaunch.png", bindId: "160"},
        { path: "image/wall/muxplore.png", bindId: "162"},
        { path: "image/wall/muxreset.png", bindId: "163"},
        { path: "image/wall/muxtheme.png", bindId: "168"},
        { path: "image/wall/muxassign.png", bindId: "152"},
        { path: "image/wall/muxdevice.png", bindId: "156"},
        { path: "image/wall/muxnetwork.png", bindId: "161"},
        { path: "image/wall/muxrtc.png", bindId: "164"},
        { path: "image/wall/muxstart.png", bindId: "165"},
        { path: "image/wall/muxsysinfo.png", bindId: "166"},
        { path: "image/wall/muxtester.png", bindId: "167"},
        { path: "image/wall/muxtimezone.png", bindId: "169"},
        { path: "image/wall/muxtracker.png", bindId: "170"},
        { path: "image/wall/muxtweakadv.png", bindId: "171"},
        { path: "image/wall/muxtweakgen.png", bindId: "172"},
        { path: "image/wall/muxwebserv.png", bindId: "173"},
        { path: "sound/shutdown.mp3", bindId: "175"},
        { path: "sound/reboot.mp3", bindId: "176"},
        { path: "sound/navigate.mp3", bindId: "177"},
        { path: "sound/confirm.mp3", bindId: "178"},
        { path: "sound/back.mp3", bindId: "179"},
        { path: "music/default.mp3", bindId: "181"},
        { path: "font/default.bin", bindId: "190.1"},
    ];
    // Reset default groups value;
    themeFunc.resetGroup("images");
    themeFunc.resetGroup("sounds");
    themeFunc.resetGroup("music")
    themeFunc.resetGroup("fonts")
    loadedZip.forEach(async(relativePath, zipEntry) => {
        //Schema
        if(zipEntry.name === "scheme/default.txt"){
            loadSchemeFile(await zipEntry.async("text"))
        }
        const foundWhiteListData = whitelistFiles.find(wLF => wLF.path === zipEntry.name);
        if(foundWhiteListData){    
            const filename = zipEntry.name.split("/").pop();
            const format = zipEntry.name.split(".").pop();
            if(filename && format && mimetypeConversionMap[format]){
                const cleanBlobFile = await zipEntry.async("blob")
                const blob = new Blob([cleanBlobFile], { type: mimetypeConversionMap[format] });
                const newFile = new File([blob], filename, { type: mimetypeConversionMap[format] });
                assetFunc.add(new File([blob], filename, { type: mimetypeConversionMap[format] }));
                const targetChild = themeFunc.getChild(foundWhiteListData.bindId);
                if(targetChild){
                    targetChild.value = [newFile];
                }
            }           
        }
    }); 
}