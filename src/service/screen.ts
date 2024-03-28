import { type Ref, ref } from "vue";
import { Generate } from "cerceis-lib";

/* Some reference on the real screen */
export const REAL_SIZE_REF = {
    screen: { w: 640, h: 480 },
    headerFooter: { w: 640, h: 42 },
    font: { size: 20, padding: 10 },
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
    "Theme Manager",
    "Time Zone Configuration",
    "Activity Tracker",
    "Advanced Settings",
    "General Settings",
    "Web Services",
] as const

type ScreenType = typeof screenList[number];
/**
 * ╔═.✵.══════════╗
 *    Look here!
 * ╚══════════.✵.═╝
 * To add a new screen / component on the screen
 * you should only make changes to screenData.
 * Also also check out type ScreenContent for more info.

 * - See theme.ts for the id.
 * - The order of the id matter when in an array,
 *   [least important, ... ,most important]
 */
export interface ScreenData{
    title: ScreenType
    preview: boolean
    wallpaper: string[],
    child: ScreenContent[]
}
//{[key in ScreenType]: ScreenData}
type NewScreenContentOptions = {
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
    }
}
const newScreenContent = (type: ScreenContentType, options: NewScreenContentOptions = {}): ScreenContent => {
    const op = {
        id: Generate.objectId(),
        type,
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
// Could group the child together and apply to each screen for same child: ex) header/footer
export const screenData: any = {
    "Boot": {
        title: "Boot",
        preview: true,
        wallpaper: ["148","149"],
        child: []
    },
    "Home": {
        title: "Home",
        preview: true,
        wallpaper: ["160", "149"],
        child: [
            newScreenContent("text",
                {
                    text: "muOS MAIN MENU",
                    style: {
                        font: ["35"], fontAlpha: ["36"]
                    }
                }
            ),
            newScreenContent("text",
                {
                    text:  `
                        Explore Content <br>
                    `
                    ,
                    row: 1,
                    style: {
                        font: ["91"], fontAlpha: ["92"],
                    }
                }
            ),
            // Highlight
            newScreenContent("box",
                {
                    row: 1,
                    expand: { x: true },
                    style: {
                        background: ["85"], backgroundAlpha: ["86"],
                    }
                }
            ),
            // Indicator
            newScreenContent("box",
                {
                    row: 1,
                    size: { w: 5 },
                    style: {
                        background: ["89"], backgroundAlpha: ["90"],
                    }
                }
            ),
            newScreenContent("text",
                {
                    text:  `
                        Favourites <br>
                        History <br>
                        Information <br>
                        Configuration <br>
                        PortMaster <br>
                        RetroArch <br>
                        Reboot <br>
                        Shutdown <br>
                    `,
                    row: 2,
                    style: {
                        font: ["81"], fontAlpha: ["82"],
                    }
                }
            ),
            // Highlight
            newScreenContent("box",
                {
                    row: 2,
                    expand: { x: true },
                    size: { h: 30 * 8 },
                    style: {
                        background: ["75"], backgroundAlpha: ["76"],
                    }
                }
            ),
            newScreenContent("text",
                {
                    text:  `17:45`,
                    col: 18.5,
                    style: {
                        font: ["27"], fontAlpha: ["28"],
                    }
                }
            ),
            newScreenContent("icon",
                {
                    icon: "fa-brands fa-bluetooth-b",
                    col: 13,
                    style: {
                        font: ["23"], fontAlpha: ["25"],
                    }
                }
            ),
            newScreenContent("icon",
                {
                    icon: "fa-solid fa-wifi",
                    col: 13.75,
                    style: {
                        font: ["18"], fontAlpha: ["20"],
                    }
                }
            ),
            newScreenContent("icon",
                {
                    icon: "fa-solid fa-battery-three-quarters",
                    col: 15,
                    style: {
                        font: ["10"], fontAlpha: ["13"],
                    }
                }
            ),
            newScreenContent("text",
                {
                    text:  `Confirm Help`,
                    row: 14.25,
                    style: {
                        font: ["31"], fontAlpha: ["32"],
                    }
                }
            ),
        ]
    },
    "Charging": {
        title: "Charging",
        preview: true,
        wallpaper: ["153", "149"],
        child: [],
        /*
        imageAssets: [],
        textAssets: {
            charging: "I forgot what the charging screen looks like  4.08v 99%"
        },
        */
    },
    "Core Assignment": {
        title: "Core Assignment",
        preview: false,
        wallpaper: ["152", "149"],
        child: []
    },
    "Config Screen": {
        title: "Config Screen",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "Credits Screen": {
        title: "Credit Screen",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "Device Selection Screen": {
        title: "Device Selection Screen",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "Favourites": {
        title: "Favourites",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "History": {
        title: "History",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "Information Screen": {
        title: "Information Screen",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "Network Configuration Screen": {
        title: "Network Configuration Screen",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "Explore Content": {
        title: "Explore Content",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "Reset Screen": {
        title: "Reset Screen",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "RTC Configuration": {
        title: "RTC Configuration",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "Verbose Boot Startup": {
        title: "Verbose Boot Startup",
        preview: true,
        wallpaper: ["165", "149"],
        child: [],
    },
    "System Information": {
        title: "System Information",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "Input Tester": {
        title: "Input Tester",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "Theme Manager": {
        title: "Theme Manager",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "Time Zone Configuration": {
        title: "Time Zone Configuration",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "Activity Tracker": {
        title: "Activity Tracker",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "Advanced Settings": {
        title: "Advanced Settings",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "General Settings": {
        title: "General Settings",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
    "Web Services": {
        title: "Web Services",
        preview: false,
        wallpaper: ["149"],
        child: [],
    },
}

export interface Screen extends ScreenData{
    id: string,
}

export type ScreenContentType = 
"text" | "image" | "icon" | "box" | "list"

/**
 * type     : The type of the child, will render accordingly.
 * row      : The screen is virtually split into col and row for easy placement.
 * col      : The screen is virtually split into col and row for easy placement.
 * offset   : When row/col is not accurate enough, adjust this offset for more precision.
 * expand   : Expand it's width or height to fill the screen.
   Here a some rough visual reference for display row/col placement.
  C 0| 1| 2| 3| 4| 5| 6| 7| 8| 9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31 
R ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
0 │                                      Header Around here                                       │
1 │-----------------------------------------------------------------------------------------------│
2 │                                                                                               │
3 │                                                                                               │
4 │                                                                                               │
4 │                                                                                               │
5 │                                                                                               │
6 │                                                                                               │
7 │                                                                                               │
8 │                                                                                               │
9 │                                                                                               │
10│                                          The Screen                                           │
11│                                                                                               │
12│                                                                                               │
13│                                                                                               │
14│                                                                                               │
15│                                                                                               │
16│                                                                                               │
17│                                                                                               │
18│                                                                                               │
19│                                                                                               │
20│                                                                                               │
21│                                                                                               │
22│-----------------------------------------------------------------------------------------------│
23│                                       Footer around here                                      │
  └───────────────────────────────────────────────────────────────────────────────────────────────┘                                                                 
 */
export type ScreenContent = {
    id: string,
    type: ScreenContentType,
    text: string,
    row: number,
    col: number,
    offset: {  x: number, y: number },
    expand: { x: boolean, y: boolean }
    size: {  w: number, h: number },
    zIndex: number,
    icon: string,
    style: {
        background?: string[],
        backgroundAlpha?: string[],
        font?: string[],
        fontAlpha?: string[],
        imageSrc?: string[],
        imageAlpha?: string[],
    }
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
            ..._screenData,
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

