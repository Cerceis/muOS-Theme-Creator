import { type Ref, ref } from "vue";
import { Generate } from "cerceis-lib";

type ScreenType = typeof screenList[number];
export type ScreenImageAssetType = 
"header" | "footer"
export type ScreenTextAssetType = 
"title"
export type Screen = {
    id: string,
    title: ScreenType
    wallpaper: string[],
    imageAssets: {identifier: ScreenImageAssetType, id: string}[],
    textAssets: {
        [key: string]: string
    }
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
    "Theme Manager",
    "Time Zone Configuration",
    "Activity Tracker",
    "Advanced Settings",
    "General Settings",
    "Web Services",
] as const
export type ScreenData = {
    [key: string]: {
        preview: boolean,
        wallpaper: string[],
        imageAssets: {identifier: ScreenImageAssetType, id: string}[],
        textAssets: {
            [key: string]: string
        }
    }
}
/**
 * Use this to bind the corresponding data id field.
 * See theme.ts for the id.
 * The order of the id matter,
 * the screen will always look at order from left to right,
 * if the first wallpaper is empty, it will move on to the next one
 */
export const screenData: ScreenData = {
    "Boot": {
        preview: true,
        wallpaper: ["148"],
        imageAssets: [],
        textAssets: {},
    },
    "Home": {
        preview: true,
        wallpaper: ["160", "149"],
        imageAssets: [],
        textAssets: {
            title: "muOS MAIN MENU"
        },
    },
    "Core Assignment": {
        preview: false,
        wallpaper: ["152", "149"],
        imageAssets: [],
        textAssets: {},
    },
    "Charging": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Config Screen": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Credits Screen": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Device Selection Screen": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Favourites": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "History": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Information Screen": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Network Configuration Screen": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Explore Content": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Reset Screen": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "RTC Configuration": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Verbose Boot Startup": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "System Information": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Input Tester": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Theme Manager": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Time Zone Configuration": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Activity Tracker": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Advanced Settings": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "General Settings": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
    "Web Services": {
        preview: false,
        wallpaper: ["149"],
        imageAssets: [],
        textAssets: {},
    },
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
        return {
            id: Generate.objectId(),
            title: screenType,
            wallpaper: _screenData ? _screenData.wallpaper : [],
            imageAssets: _screenData ? _screenData.imageAssets: [],
            textAssets: _screenData ? _screenData.textAssets: [],
        } as Screen
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

