import { type Ref, ref } from "vue";
import { Generate } from "cerceis-lib";
import { screenData, type ScreenContent } from "@/service/screenData";

/* Some reference on the real screen */
export const REAL_SIZE_REF = {
    screen: { w: 640, h: 480 },
    headerFooter: { w: 640, h: 42 },
    font: { size: 20, padding: {x: 10, y: 0} },
    charging: { yPos: 350 },
    icon: { size: 24 }
}
export const screenList = [
    "Boot", "Home",
    "Core Assignment",
    "Charging",
    "Config Screen",
    "Credits Screen",
    "Device Selection Screen",
    "Favourites",
    "History",
    "Information Screen",
    "Network Configuration Screen",
    "Explore Content",
    "Reset Screen",
    "RTC Configuration",
    "Verbose Boot Startup",
    "System Information",
    "Input Tester",
    "Theme Picker",
    "Time Zone Configuration",
    "Activity Tracker",
    "Advanced Settings",
    "General Settings",
    "Web Services",
    "Vol/Bright Bar",
    "Notifications",
] as const

export type ScreenType = typeof screenList[number];
/**
 * # Look here Section 1
 * ╔═.✵.══════════╗
 *    Look here!
 * ╚══════════.✵.═╝
 * To add a new screen / component on the screen
 * you should only make changes to screenData.
 * Also also check out type ScreenContent for more info.

 * - See theme.ts for the id.
 * - The order of the id matter when in an array,
 *   [most important, ... , least important]
 */
export interface ScreenData{
    title: ScreenType | ""
    preview: boolean
    wallpaper: string[]
    child: any[]
}
//{[key in ScreenType]: ScreenData}
type NewScreenContentOptions = {
	type?: ScreenType,
    text?: string,
    row?: number, col?: number,
    offset?: { x?: number, y?: number },
    expand?: { x?: boolean, y?: boolean },
    size?: { w?: number, h?: number },
    zIndex?: number
    icon?: string,
    style?: {
        background?: string[],
        backgroundAlpha?: string[],
        font?: string[],
        fontAlpha?: string[],
        imageSrc?: string[],
        imageAlpha?: string[],
        textAlign?: "center" | "left" | "right",
        // lol need to update
    }
}
export const newScreenContent = (options: NewScreenContentOptions = {}): ScreenContent => {
    const op = {
        id: Generate.objectId(),
        type: "text",
        text: "",
        row: 0, col: 0,
        offset: {  x: 0, y: 0 },
        expand: { x: false, y: false },
        size: { w: 10, h: 30 },
        zIndex: 1,
        icon: "",
        style: {},
        ...options,
    }
    if(op.offset && op.offset.x === undefined) op.offset.x = 0;
    if(op.offset && op.offset.y === undefined) op.offset.x = 0;
    if(op.offset && op.expand.x === undefined) op.expand.x = false;
    if(op.offset && op.expand.y === undefined) op.expand.y = false;
    if(op.size && op.size.w === undefined) op.size.w = 10;
    if(op.size && op.size.h === undefined) op.size.h = 30;
    return op as ScreenContent;
}

export interface Screen extends ScreenData{
    id: string,
	child: ScreenContent[],
}

export const screen = ref({
    map: {} as { [key: string]: Screen },
    initiated: false as boolean,
    init() {
        for (let i = 0; i < screenList.length; i++) {
            this.map[screenList[i]] = this.new(screenList[i]);
        }
        // Pick default screen in history
        // It's prepend
        // [Home, Boot, Charging]
        this.addToHistory(this.map["Charging"]);
        this.addToHistory(this.map["Boot"]);
        this.addToHistory(this.map["Home"]);
        this.initiated = true;
    },
    new(screenType: ScreenType) {
        const _screenData = screenData[screenType];
		const mergedScreenData = {
            id: Generate.objectId(),
            ..._screenData,
        }
		mergedScreenData.child = mergedScreenData.child.map(c => newScreenContent(c));
        return mergedScreenData;
    },
    focus(screenType: ScreenType) {
        this.addToHistory(this.map[screenType])
    },
    /**
     * 3 split screen, 1 big, 2 small
     * - History only has length 3.
     * - Will pop the last one if > 3.
     * - Will swap if the screen is already in the history.
     */
    history: [] as Screen[],
    addToHistory(screen: Screen) {
        // If exist
        for (let i = 0; i < this.history.length; i++) {
            if (this.history[i].title === screen.title && i === 0) {
                return;
            }
            if (this.history[i].title === screen.title && i !== 0) {
                this.history[i] = this.history[0];
                this.history[0] = screen;
                return;
            }
        }
        this.history = [screen, ...this.history];
        if (this.history.length > 3)
            this.history.pop();
    },
})