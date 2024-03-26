import { type Ref, ref } from "vue";
import { Generate } from "cerceis-lib";

type ScreenType = typeof screenList[number];
export type Screen = {
    id: string,
    title: ScreenType
    wallpaper: string[],
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
    }
}
export const screenData: ScreenData = {
    "Boot": {
        preview: true,
        wallpaper: ["148"]
    }
}
export const screen = ref({
    map: {} as { [key: string]: Screen },
    initiated: false as boolean,
    init(){
        for(let i = 0; i < screenList.length; i++){
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
    new(screenType: ScreenType){
        const _screenData = screenData[screenType];
        return {
            id: Generate.objectId(),
            title: screenType,
            wallpaper: _screenData ? _screenData.wallpaper : [],
        } as Screen
    },
    focus(screenType: ScreenType){
        this.addToHistory(this.map[screenType])
    },
    /**
     * 3 split screen, 1 big, 2 small
     * - History only has length 3.
     * - Will pop the last one if > 3.
     * - Will swap if the screen is already in the history.
     */
    history: [] as Screen[],
    addToHistory(screen: Screen){
        // If exist
        for(let i = 0; i < this.history.length; i++){
            if(this.history[i].title === screen.title && i !== 0){
                this.history[i] = this.history[0];
                this.history[0] = screen;
                return;
            }
        }
        this.history = [screen, ...this.history];
        if(this.history.length > 3)
            this.history.pop();
    },
})

