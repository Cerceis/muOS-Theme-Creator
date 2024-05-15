/**
 * Asset manager
 */
import { type Ref, ref } from "vue";
import axios from 'axios';
import { Generate } from "cerceis-lib";
import { themeFunc } from "./theme";

const defaultAssetData = [
    { filename: "bootlogo.bmp", path: new URL('@/assets/images/defaultImages/bootlogo.bmp', import.meta.url), type: "image/bmp" },
    { filename: "default-wallpaper.png", path: new URL('@/assets/images/defaultImages/wall/default.png', import.meta.url), type: "image/png" },
    { filename: "default-muxcharge.png", path: new URL('@/assets/images/defaultImages/wall/muxcharge.png', import.meta.url), type: "image/png" },
    { filename: "default-muxstart.png", path: new URL('@/assets/images/defaultImages/wall/muxstart.png', import.meta.url), type: "image/png" },
    // Fonts
    { filename: "Comicsans.bin", path: new URL('@/assets/images/defaultImages/font/comicsans.bin', import.meta.url), type: "application/octet-stream" },
    { filename: "Helvetica.bin", path: new URL('@/assets/images/defaultImages/font/helvetica.bin', import.meta.url), type: "application/octet-stream" },
    { filename: "OpenDyslexicNerdFont-Regular.bin", path: new URL('@/assets/images/defaultImages/font/OpenDyslexicNerdFont-Regular.bin', import.meta.url), type: "application/octet-stream" },
    { filename: "Papyrus.bin", path: new URL('@/assets/images/defaultImages/font/Papyrus.bin', import.meta.url), type: "application/octet-stream" },
    { filename: "ProductSans-Regular.bin", path: new URL('@/assets/images/defaultImages/font/ProductSans-Regular.bin', import.meta.url), type: "application/octet-stream" },
    { filename: "Roboto-Light.bin", path: new URL('@/assets/images/defaultImages/font/Roboto-Light.bin', import.meta.url), type: "application/octet-stream" },
    { filename: "SpaceMonoNerdFont-Regular.bin", path: new URL('@/assets/images/defaultImages/font/SpaceMonoNerdFont-Regular.bin', import.meta.url), type: "application/octet-stream" },
]

export type DefaultFixedImageAssetInfoItem = {
	id: number, label: string, property: string, path: string[],
}
export const defaultFixedImageAssetInfo: DefaultFixedImageAssetInfoItem[] = [
    {
        "id": 1,
        "label": "Default",
        "property": "default",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 2,
        "label": "Apps",
        "property": "muxapps",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 3,
        "label": "Apps - Portmaster",
        "property": "portmaster",
        "path": [
            "image",
            "wall",
            "muxapps"
        ]
    },
    {
        "id": 4,
        "label": "Apps - Retroarch",
        "property": "retroarch",
        "path": [
            "image",
            "wall",
            "muxapps"
        ]
    },
    {
        "id": 5,
        "label": "Apps - Dingux",
        "property": "dingux",
        "path": [
            "image",
            "wall",
            "muxapps"
        ]
    },
    {
        "id": 6,
        "label": "Apps - Assign",
        "property": "muxassign",
        "path": [
            "image",
            "wall",
            "muxapps"
        ]
    },
    {
        "id": 7,
        "label": "Apps - Charge",
        "property": "muxcharge",
        "path": [
            "image",
            "wall",
            "muxapps"
        ]
    },
    {
        "id": 8,
        "label": "Config",
        "property": "muxconfig",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 9,
        "label": "Config - General",
        "property": "general",
        "path": [
            "image",
            "wall",
            "muxconfig"
        ]
    },
    {
        "id": 10,
        "label": "Config - Theme",
        "property": "theme",
        "path": [
            "image",
            "wall",
            "muxconfig"
        ]
    },
    {
        "id": 11,
        "label": "Config - Archive",
        "property": "archive",
        "path": [
            "image",
            "wall",
            "muxconfig"
        ]
    },
    {
        "id": 12,
        "label": "Config - Network",
        "property": "network",
        "path": [
            "image",
            "wall",
            "muxconfig"
        ]
    },
    {
        "id": 13,
        "label": "Config - Service",
        "property": "service",
        "path": [
            "image",
            "wall",
            "muxconfig"
        ]
    },
    {
        "id": 14,
        "label": "Config - Clock",
        "property": "clock",
        "path": [
            "image",
            "wall",
            "muxconfig"
        ]
    },
    {
        "id": 15,
        "label": "Config - Device",
        "property": "device",
        "path": [
            "image",
            "wall",
            "muxconfig"
        ]
    },
    {
        "id": 16,
        "label": "Config - Refresh",
        "property": "refresh",
        "path": [
            "image",
            "wall",
            "muxconfig"
        ]
    },
    {
        "id": 17,
        "label": "Credits",
        "property": "muxcredits",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 18,
        "label": "Device",
        "property": "muxdevice",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 19,
        "label": "Device - rg28xx",
        "property": "rg28xx",
        "path": [
            "image",
            "wall",
            "muxdevice"
        ]
    },
    {
        "id": 20,
        "label": "Device - rg35xx-h",
        "property": "rg35xx-h",
        "path": [
            "image",
            "wall",
            "muxdevice"
        ]
    },
    {
        "id": 21,
        "label": "Device - rg35xx-plus",
        "property": "rg35xx-plus",
        "path": [
            "image",
            "wall",
            "muxdevice"
        ]
    },
    {
        "id": 22,
        "label": "Device - rg35xx-2024",
        "property": "rg35xx-2024",
        "path": [
            "image",
            "wall",
            "muxdevice"
        ]
    },
    {
        "id": 23,
        "label": "Favourite",
        "property": "muxfavourite",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 24,
        "label": "History",
        "property": "muxhistory",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 25,
        "label": "Info",
        "property": "muxinfo",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 26,
        "label": "Info - Tracker",
        "property": "tracker",
        "path": [
            "image",
            "wall",
            "muxinfo"
        ]
    },
    {
        "id": 27,
        "label": "Info - Tester",
        "property": "tester",
        "path": [
            "image",
            "wall",
            "muxinfo"
        ]
    },
    {
        "id": 28,
        "label": "Info - System",
        "property": "system",
        "path": [
            "image",
            "wall",
            "muxinfo"
        ]
    },
    {
        "id": 29,
        "label": "Info - Credit",
        "property": "credit",
        "path": [
            "image",
            "wall",
            "muxinfo"
        ]
    },
    {
        "id": 30,
        "label": "Launch (Main)",
        "property": "muxlaunch",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 31,
        "label": "Launch - Explore",
        "property": "explore",
        "path": [
            "image",
            "wall",
            "muxlaunch"
        ]
    },
    {
        "id": 32,
        "label": "Launch - Favourite",
        "property": "favourite",
        "path": [
            "image",
            "wall",
            "muxlaunch"
        ]
    },
    {
        "id": 33,
        "label": "Launch - History",
        "property": "history",
        "path": [
            "image",
            "wall",
            "muxlaunch"
        ]
    },
    {
        "id": 34,
        "label": "Launch - Apps",
        "property": "apps",
        "path": [
            "image",
            "wall",
            "muxlaunch"
        ]
    },
    {
        "id": 35,
        "label": "Launch - Info",
        "property": "info",
        "path": [
            "image",
            "wall",
            "muxlaunch"
        ]
    },
    {
        "id": 36,
        "label": "Launch - Config",
        "property": "config",
        "path": [
            "image",
            "wall",
            "muxlaunch"
        ]
    },
    {
        "id": 37,
        "label": "Launch - Reboot",
        "property": "reboot",
        "path": [
            "image",
            "wall",
            "muxlaunch"
        ]
    },
    {
        "id": 38,
        "label": "Launch - Shutdown",
        "property": "shutdown",
        "path": [
            "image",
            "wall",
            "muxlaunch"
        ]
    },
    {
        "id": 39,
        "label": "Netscan",
        "property": "muxnetscan",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 40,
        "label": "Network",
        "property": "muxnetwork",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 41,
        "label": "Network - Enable",
        "property": "enable",
        "path": [
            "image",
            "wall",
            "muxnetwork"
        ]
    },
    {
        "id": 42,
        "label": "Network - Identifier",
        "property": "identifier",
        "path": [
            "image",
            "wall",
            "muxnetwork"
        ]
    },
    {
        "id": 43,
        "label": "Network - Password",
        "property": "password",
        "path": [
            "image",
            "wall",
            "muxnetwork"
        ]
    },
    {
        "id": 44,
        "label": "Network - Type",
        "property": "type",
        "path": [
            "image",
            "wall",
            "muxnetwork"
        ]
    },
    {
        "id": 45,
        "label": "Network - Address",
        "property": "address",
        "path": [
            "image",
            "wall",
            "muxnetwork"
        ]
    },
    {
        "id": 46,
        "label": "Network - Subnet",
        "property": "subnet",
        "path": [
            "image",
            "wall",
            "muxnetwork"
        ]
    },
    {
        "id": 47,
        "label": "Network - Gateway",
        "property": "gateway",
        "path": [
            "image",
            "wall",
            "muxnetwork"
        ]
    },
    {
        "id": 48,
        "label": "Network - Dns",
        "property": "dns",
        "path": [
            "image",
            "wall",
            "muxnetwork"
        ]
    },
    {
        "id": 49,
        "label": "Network - Status",
        "property": "status",
        "path": [
            "image",
            "wall",
            "muxnetwork"
        ]
    },
    {
        "id": 50,
        "label": "Network - Connect",
        "property": "connect",
        "path": [
            "image",
            "wall",
            "muxnetwork"
        ]
    },
    {
        "id": 51,
        "label": "Explore",
        "property": "muxplore",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 52,
        "label": "Reset",
        "property": "muxreset",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 53,
        "label": "Reset - Favourite",
        "property": "favourite",
        "path": [
            "image",
            "wall",
            "muxreset"
        ]
    },
    {
        "id": 54,
        "label": "Reset - History",
        "property": "history",
        "path": [
            "image",
            "wall",
            "muxreset"
        ]
    },
    {
        "id": 55,
        "label": "Reset - Activity",
        "property": "activity",
        "path": [
            "image",
            "wall",
            "muxreset"
        ]
    },
    {
        "id": 56,
        "label": "Reset - Config",
        "property": "config",
        "path": [
            "image",
            "wall",
            "muxreset"
        ]
    },
    {
        "id": 57,
        "label": "Reset - Cache",
        "property": "cache",
        "path": [
            "image",
            "wall",
            "muxreset"
        ]
    },
    {
        "id": 58,
        "label": "Reset - Retroarch",
        "property": "retroarch",
        "path": [
            "image",
            "wall",
            "muxreset"
        ]
    },
    {
        "id": 59,
        "label": "Reset - Network",
        "property": "network",
        "path": [
            "image",
            "wall",
            "muxreset"
        ]
    },
    {
        "id": 60,
        "label": "Reset - Portmaster",
        "property": "portmaster",
        "path": [
            "image",
            "wall",
            "muxreset"
        ]
    },
    {
        "id": 61,
        "label": "RTC",
        "property": "muxrtc",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 62,
        "label": "RTC - Year",
        "property": "year",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 63,
        "label": "RTC - Month",
        "property": "month",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 64,
        "label": "RTC - Day",
        "property": "day",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 65,
        "label": "RTC - Hour",
        "property": "hour",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 66,
        "label": "RTC - Minute",
        "property": "minute",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 67,
        "label": "RTC - Notation",
        "property": "notation",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 68,
        "label": "RTC - Timezone",
        "property": "timezone",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 69,
        "label": "Start",
        "property": "muxstart",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 70,
        "label": "System Info",
        "property": "muxsysinfo",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 71,
        "label": "System Info - Version",
        "property": "version",
        "path": [
            "image",
            "wall",
            "muxsysinfo"
        ]
    },
    {
        "id": 72,
        "label": "System Info - Retroarch",
        "property": "retroarch",
        "path": [
            "image",
            "wall",
            "muxsysinfo"
        ]
    },
    {
        "id": 73,
        "label": "System Info - Kernel",
        "property": "kernel",
        "path": [
            "image",
            "wall",
            "muxsysinfo"
        ]
    },
    {
        "id": 74,
        "label": "System Info - Uptime",
        "property": "uptime",
        "path": [
            "image",
            "wall",
            "muxsysinfo"
        ]
    },
    {
        "id": 75,
        "label": "System Info - CPU",
        "property": "cpu",
        "path": [
            "image",
            "wall",
            "muxsysinfo"
        ]
    },
    {
        "id": 76,
        "label": "System Info - Speed",
        "property": "speed",
        "path": [
            "image",
            "wall",
            "muxsysinfo"
        ]
    },
    {
        "id": 77,
        "label": "System Info - Governor",
        "property": "governor",
        "path": [
            "image",
            "wall",
            "muxsysinfo"
        ]
    },
    {
        "id": 78,
        "label": "System Info - Memory",
        "property": "memory",
        "path": [
            "image",
            "wall",
            "muxsysinfo"
        ]
    },
    {
        "id": 79,
        "label": "System Info - Temp",
        "property": "temp",
        "path": [
            "image",
            "wall",
            "muxsysinfo"
        ]
    },
    {
        "id": 80,
        "label": "System Info - Service",
        "property": "service",
        "path": [
            "image",
            "wall",
            "muxsysinfo"
        ]
    },
    {
        "id": 81,
        "label": "System Info - Capacity",
        "property": "capacity",
        "path": [
            "image",
            "wall",
            "muxsysinfo"
        ]
    },
    {
        "id": 82,
        "label": "System Info - Voltage",
        "property": "voltage",
        "path": [
            "image",
            "wall",
            "muxsysinfo"
        ]
    },
    {
        "id": 83,
        "label": "Input Tester",
        "property": "muxtester",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 84,
        "label": "Theme",
        "property": "muxtheme",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 85,
        "label": "Timezone",
        "property": "muxtimezone",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 86,
        "label": "Tracker",
        "property": "muxtracker",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 87,
        "label": "Tweak Advance",
        "property": "muxtweakadv",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 88,
        "label": "Tweak Advance - Swap",
        "property": "swap",
        "path": [
            "image",
            "wall",
            "muxtweakadv"
        ]
    },
    {
        "id": 89,
        "label": "Tweak Advance - Thermal",
        "property": "thermal",
        "path": [
            "image",
            "wall",
            "muxtweakadv"
        ]
    },
    {
        "id": 90,
        "label": "Tweak Advance - Font",
        "property": "font",
        "path": [
            "image",
            "wall",
            "muxtweakadv"
        ]
    },
    {
        "id": 91,
        "label": "Tweak Advance - Verbose",
        "property": "verbose",
        "path": [
            "image",
            "wall",
            "muxtweakadv"
        ]
    },
    {
        "id": 92,
        "label": "Tweak Advance - Volume",
        "property": "volume",
        "path": [
            "image",
            "wall",
            "muxtweakadv"
        ]
    },
    {
        "id": 93,
        "label": "Tweak Advance - Offset",
        "property": "offset",
        "path": [
            "image",
            "wall",
            "muxtweakadv"
        ]
    },
    {
        "id": 94,
        "label": "Tweak General",
        "property": "muxtweakgen",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 95,
        "label": "Tweak General - Sound",
        "property": "sound",
        "path": [
            "image",
            "wall",
            "muxtweakgen"
        ]
    },
    {
        "id": 96,
        "label": "Tweak General - Startup",
        "property": "startup",
        "path": [
            "image",
            "wall",
            "muxtweakgen"
        ]
    },
    {
        "id": 97,
        "label": "Tweak General - Sleep",
        "property": "sleep",
        "path": [
            "image",
            "wall",
            "muxtweakgen"
        ]
    },
    {
        "id": 98,
        "label": "Tweak General - Shutdown",
        "property": "shutdown",
        "path": [
            "image",
            "wall",
            "muxtweakgen"
        ]
    },
    {
        "id": 99,
        "label": "Tweak General - Battery",
        "property": "battery",
        "path": [
            "image",
            "wall",
            "muxtweakgen"
        ]
    },
    {
        "id": 100,
        "label": "Tweak General - Night",
        "property": "night",
        "path": [
            "image",
            "wall",
            "muxtweakgen"
        ]
    },
    {
        "id": 101,
        "label": "Tweak General - Interface",
        "property": "interface",
        "path": [
            "image",
            "wall",
            "muxtweakgen"
        ]
    },
    {
        "id": 102,
        "label": "Tweak General - Advanced",
        "property": "advanced",
        "path": [
            "image",
            "wall",
            "muxtweakgen"
        ]
    },
    {
        "id": 103,
        "label": "Visual",
        "property": "muxvisual",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 104,
        "label": "Visual - Battery",
        "property": "battery",
        "path": [
            "image",
            "wall",
            "muxvisual"
        ]
    },
    {
        "id": 105,
        "label": "Visual - Network",
        "property": "network",
        "path": [
            "image",
            "wall",
            "muxvisual"
        ]
    },
    {
        "id": 106,
        "label": "Visual - Bluetooth",
        "property": "bluetooth",
        "path": [
            "image",
            "wall",
            "muxvisual"
        ]
    },
    {
        "id": 107,
        "label": "Visual - Clock",
        "property": "clock",
        "path": [
            "image",
            "wall",
            "muxvisual"
        ]
    },
    {
        "id": 108,
        "label": "Web Services",
        "property": "muxwebserv",
        "path": [
            "image",
            "wall"
        ]
    },
    {
        "id": 109,
        "label": "Web Services - Shell",
        "property": "shell",
        "path": [
            "image",
            "wall",
            "muxwebserv"
        ]
    },
    {
        "id": 110,
        "label": "Web Services - Browser",
        "property": "browser",
        "path": [
            "image",
            "wall",
            "muxwebserv"
        ]
    },
    {
        "id": 111,
        "label": "Web Services - Terminal",
        "property": "terminal",
        "path": [
            "image",
            "wall",
            "muxwebserv"
        ]
    },
    {
        "id": 112,
        "label": "Web Services - Sync",
        "property": "sync",
        "path": [
            "image",
            "wall",
            "muxwebserv"
        ]
    },
    {
        "id": 113,
        "label": "Web Services - NTP",
        "property": "ntp",
        "path": [
            "image",
            "wall",
            "muxwebserv"
        ]
    }
]
export type Asset = {
    id: string,
    filename: string, // Name with format.
    base64: string,
    bin: File | Blob | null,
    type: string,
    format: string,
}
export const assets: Ref<Asset[]> = ref([])
export const assetFunc = {
    _selectedAsset: null as null | Asset,
    async add(f: File){
        assets.value.unshift({
            id: Generate.objectId(),
            filename: f.name,
            base64: await fileToBase64(f), 
			bin: f.type.includes("font") ? f : null, 
            type: f.type,
            format: f.type.split("/")[1]
        } as Asset)
    },
	async addBase64(base64: string, name: string, type: string){
        const nameArr = name.split(".")
        nameArr.pop();
        const filename = nameArr.join(""); 
        assets.value.unshift({
            id: Generate.objectId(),
            filename: filename,
            base64: base64, bin: null, 
            type: type,
            format: type.split("/")[1]
        })
    },
	delete(a: Asset){
		for(let i = 0; i < assets.value.length; i++){
			if(assets.value[i].id === a.id){
				assets.value.splice(i, 1);
				return;
			}
		}
	},
	getByID(id: string){
        for(let i = 0; i < assets.value.length; i++){
            if(assets.value[i].id === id){
                this._selectedAsset = assets.value[i];
                break;
            }
        }
        return this;
    },
    getByFilename(filename: string){
        for(let i = 0; i < assets.value.length; i++){
            if(assets.value[i].filename === filename){
                this._selectedAsset = assets.value[i];
                break;
            }
        }
        return this;
    },
    getByValue(base64: string){
        for(let i = 0; i < assets.value.length; i++){
            if(assets.value[i].base64 === base64){
                this._selectedAsset = assets.value[i];
                break;
            }
        }
        return this;
    },
    asB64(){ return this._selectedAsset; },
    asFile(){
        if(!this._selectedAsset){
            return new File([new Blob([], { type: "text/plain" })], "error", {type: "text/plain"});
        }
        return base64ToFile(
            this._selectedAsset.base64.split(",")[1],
            `${this._selectedAsset.filename}`,
            this._selectedAsset.type
        )
    }
}

export const downloadAndConvertToBase64 = async(url: any, type: string): Promise<string> => {
    try {
        // Make HTTP GET request to download the file
        const response = await axios.get(url, {
            responseType: 'arraybuffer', // Ensure response data is treated as binary data
        });
        const blob = new Blob([response.data], {type});
        const base64String = fileToBase64(blob);
        return base64String;
    } catch (error) {
        console.error('Error downloading or converting file:', error);
        throw error;
    }
}

export const loadDefaultAssets = async() => {
    for(let i = 0; i < defaultAssetData.length; i++) {
        const rs = await downloadAndConvertToBase64(defaultAssetData[i].path, defaultAssetData[i].type);
        assets.value.push({
            id: Generate.objectId(),
            filename: defaultAssetData[i].filename,
            base64: rs, bin: null, 
            type: defaultAssetData[i].type,
            format: defaultAssetData[i].type.split("/")[1]
        })
    }

	// Apply to themeValue
	const assetBindingMap = {
		"148": "bootlogo.bmp",
		"148.1": "default-wallpaper.png",
		"148.7": "default-muxcharge.png"
	}
	for(let childId in assetBindingMap){
		const _child = themeFunc.getChild(childId);
		if(!_child) continue;
		_child.value = [assetFunc.getByFilename(assetBindingMap[childId as keyof typeof assetBindingMap]).asFile()];
	}
}

export const fileToBase64 = (file: File | Blob): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		if(!file) return resolve("");
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const base64String = reader.result as string;
			return resolve(base64String);
		};
	})
}
/**
 * 
 * @param base64 Without the datatype !
 * @returns 
 */
export const base64ToFile = (base64: string, filename: string, mimetype: string): File => {
    // Decode the base64 string to binary data
    const binaryString = atob(base64);
    // Convert the binary string to a Uint8Array
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }
    // Create a Blob object from the Uint8Array
    const blob = new Blob([byteArray], { type: mimetype });
    // Create a File object from the Blob
    return new File([blob], filename, { type: mimetype });
}

export type AssetSelector = {
    id: string,
    show: boolean,
    target: string, // target child id
}
export const assetSelectorList: Ref<AssetSelector[]> = ref([])
export const assetSelector = {
	/**
	 * childId = theme child id;
	 */
    new(childId: string){
        assetSelectorList.value.push({
            id: Generate.objectId(),
            show: true,
            target: childId,
        })
    },
    destroy(selector: AssetSelector){
        for(let i = 0; i < assetSelectorList.value.length; i++){
            if(assetSelectorList.value[i].id === selector.id){
                assetSelectorList.value.splice(i,1);
                return;
            }
        }
    }
}