import { type ScreenData, type ScreenType } from "@/service/screen";
/**
 * type     : The type of the child, will render accordingly.
 * row      : The screen is virtually split into col and row for easy placement.
 * col      : The screen is virtually split into col and row for easy placement.
 * offset   : When row/col is not accurate enough, adjust this offset for more precision.
 * expand   : Expand it's width or height to fill the screen.
   Here a some rough visual reference for display row/col placement.
  C 0| 1| 2| 3| 4| 5| 6| 7| 8| 9|10|11|12|13|14|15|16|17|18|19|20|21|22 
R ┌────────────────────────────────────────────────────────────────────┐
0 │                          Header Around here                        │
1 │--------------------------------------------------------------------│
2 │                                                                    │
3 │                                                                    │
4 │                                                                    │
4 │                                                                    │
5 │                                                                    │
6 │                             The Screen                             │
7 │                                                                    │
8 │                                                                    │
9 │                                                                    │
10│                                                                    │
11│                                                                    │
12│                                                                    │
13│--------------------------------------------------------------------│
14│                           Footer around here                       │
  └────────────────────────────────────────────────────────────────────┘
 */
export type ScreenContentType = 
"text" | "image" | "icon" | "box" | "list"
  
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
// Could group the child together and apply to each screen for same child: ex) header/footer
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
				text: `Confirm Help`,
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