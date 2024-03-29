import { type ScreenData, type ScreenType } from "@/service/screen";
/**
 * type [string]    : The type(ScreenContentType) of the child, will render accordingly.
 * text [string]    : The text, html is allowed. Should only worked with "text" child.
 * row  [int/float] : The screen is virtually split into col and row for easy placement.
 * col  [int/float] : The screen is virtually split into col and row for easy placement.
 * offset           : When row/col is not accurate enough, adjust this offset for more precision.
 *                    Offset accept either number or string. When it's a string, it's refering to
 *                    a theme's ID (See service/theme.ts). When it's a number, it will be offset by
 *                    that much pixel.
 * expand           : Expand it's width or height to fill the screen.
 * size             : The size of the element, usually used with "box" child.
 * zIndex           : z-index, order of display.
 * style            : Style related options
 * icon: [string]   : Font awesome string, check out https://fontawesome.com/icons ex) "fa-solid fa-wifi"
 
   Here a some rough visual REFERENCE(Not entired accurate) for display row/col placement.

  C 0| 1| 2| 3| 4| 5| 6| 7| 8| 9|10|11|12|13|14|15|16|17|18|19|20|21|22 
R ┌────────────────────────────────────────────────────────────────────┐
0 │                        Header Around here                          │
1 │--------------------------------------------------------------------│
2 │                                                                    │
3 │                                                                    │
4 │                                                                    │
4 │                                                                    │
5 │                                                                    │
6 │                           The Screen                               │
7 │                                                                    │
8 │                                                                    │
9 │                                                                    │
10│                                                                    │
11│                                                                    │
12│                                                                    │
13│--------------------------------------------------------------------│
14│                        Footer around here                          │
  └────────────────────────────────────────────────────────────────────┘

    How to use glyph ?
    Sometimes the "icon" you see are not images, they are UNICODE glyph string.
    See for https://shinmera.github.io/promptfont/ more info and how to use it.
    PromptFont by Yukari "Shinmera" Hafner.

    Example) The glyph ⇓ will be converted into a circular "A" button.
    To display it, use a "text" type ScreenContent and include:
    「 <i class=glyph>⇓</i> 」in the text.
    {
        text: `<i class=glyph>⇓</i> Confirm <i class=glyph>⇥</i> Help`,
    }
 */
export type ScreenContentType = 
"text" | "image" | "icon" | "box"
export type ScreenContent = {
    id: string,
    type: ScreenContentType,
    text: string,
    row: number,
    col: number,
    offset: {  x: number | string, y: number | string },
    expand: { x: boolean, y: boolean }
    size: {  w: number, h: number },
    zIndex: number,
    icon: string,
    style: {
        /**
         * If it's string[], it's refering to list of theme id.
         * More info see 「# Look here Section 1」at service/screen.ts
         */
        // backgroud color
        background?: string[],
        // background alpha
        backgroundAlpha?: string[],
        // font color
        font?: string[],
        // font alpha
        fontAlpha?: string[],
        imageSrc?: string[],    // Not implemented yet, still no uses.
        imageAlpha?: string[],  // Not implemented yet, still no uses.
        // text alignment
        textAlign?: "center" | "left" | "right"
    }
}
/**
 * These are some pre-defined child group map,
 * like the header bar/ footer bar that's present 
 * on most of the screen.
 * To use these, just append it into the child field:
 * Example) 
 *     {
 *       ...other sutff,
 *       child: [
 *          ... other child,
 *          ...preDefiendChildElement.header <- Use "Spread operator"
 *       ]
 *     }
 */
export const preDefiendChildElement = {
	header:[
		{
			type: "text",
			text: "muOS MAIN MENU",
			style: {
				font: ["35"], fontAlpha: ["36"]
			}
		},
		{
			type: "text",
			text: `17:45`,
			col: 18.5,
			style: {
				font: ["27"], fontAlpha: ["28"],
			}
		},
		{
			type: "icon",
			icon: "fa-brands fa-bluetooth-b",
			col: 13,
			style: {
				font: ["23"], fontAlpha: ["25"],
			}
		},
		{
			type: "icon",
			icon: "fa-solid fa-wifi",
			col: 13.75,
			style: {
				font: ["18"], fontAlpha: ["20"],
			}
		},
		{
			type: "icon",
			icon: "fa-solid fa-battery-three-quarters",
			col: 15,
			style: {
				font: ["10"], fontAlpha: ["13"],
			}
		},
	]
}
export const screenData: {[key in ScreenType]: ScreenData} = {
	"Boot": {
		title: "Boot",
		preview: true,
		wallpaper: ["148", "149"],
		child: []
	},
	"Home": {
		title: "Home",
		preview: true,
		wallpaper: ["160", "149"],
		child: [
			{
				type: "text",
				text: `Explore Content <br>`,
				row: 1,
				style: {
					font: ["91"], fontAlpha: ["92"],
				}
			},
			// Highlight
			{
				type: "box",
				row: 1,
				expand: { x: true },
				style: {
					background: ["85"], backgroundAlpha: ["86"],
				}
			},
			// Indicator
			{
				type: "box",
				row: 1,
				size: { w: 5 },
				style: {
					background: ["89"], backgroundAlpha: ["90"],
				}
			},
			{
				type: "text",
				text: `
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
			},
			{
				type: "box",
				row: 2,
				expand: { x: true },
				size: { h: 30 * 8 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇓</i> Confirm <i class=glyph>⇥</i> Help`,
				row: 14.25,
				style: {
					font: ["31"], fontAlpha: ["32"],
				}
			},
			...preDefiendChildElement.header
		]
	},
	"Charging": {
		title: "Charging",
		preview: true,
		wallpaper: ["153", "149"],
		child: [
            {
                type: "text",
                text: `Capacity: 75%    Voltage: 4.7v   Health: Good <br>
                        Press POWER button to continue booting...
                `,
                offset: { y: "113" },
                expand: { x: true },
                style: {
                    font: ["111"], fontAlpha: ["112"],
                    background: ["109"], backgroundAlpha: ["110"],
                    textAlign: "center"
                }
            }
        ],
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
		title: "Credits Screen",
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