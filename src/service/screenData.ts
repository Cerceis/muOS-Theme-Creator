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
		// Need to investigate how we can use the FONT_HEADER items for offsets here.... - jupy <3
		{
			type: "box",
			expand: { x: true },
			size: { h: 30 * 1 },
			style: {
				background: ["33.1"], backgroundAlpha: ["33.2"],
			}
		},
		{
			type: "text",
			text: `17:45`,
			col: 0,
			style: {
				font: ["27"], fontAlpha: ["28"],
			}
		},
		{
			type: "icon",
			icon: "fa-brands fa-bluetooth-b",
			col: 18,
			style: {
				font: ["22"], fontAlpha: ["24"],
			}
		},
		{
			type: "icon",
			icon: "fa-solid fa-wifi",
			col: 18.75,
			style: {
				font: ["17"], fontAlpha: ["19"],
			}
		},
		{
			type: "icon",
			icon: "fa-solid fa-battery-three-quarters",
			col: 20,
			style: {
				font: ["10"], fontAlpha: ["13"],
			}
		},
	],
	footer:[
		{
			type: "box",
			row: 14,
			expand: { x: true },
			size: { h: 30 * 1.5 },
			style: {
				background: ["29.1"], backgroundAlpha: ["29.2"],
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
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "muOS MAIN MENU",
				col: 6.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
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
			// Additional Text
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
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇓</i>`,
				row: 14.25,
				style: {
					font: ["46"], fontAlpha: ["47"],
				}
			},
			{
				type: "text",
				text: `Confirm`,
				row: 14.25,
				col: 1,
				style: {
					font: ["48"], fontAlpha: ["49"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 4.3,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Help`,
				row: 14.25,
				col: 5.3,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
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
		preview: true,
		wallpaper: ["152", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "ASSIGN - Name - Name",
				col: 6,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-server"></i> Core name <br>`,
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
			// Additional Text
			{
				type: "text",
				text: `
					<i class="fa-solid fa-server"></i> Core name <br>
					<i class="fa-solid fa-server"></i> Core name <br>
					<i class="fa-solid fa-server"></i> Core name <br>
					<i class="fa-solid fa-server"></i> Core name <br>
					<i class="fa-solid fa-server"></i> Core name <br>
					<i class="fa-solid fa-server"></i> Core name <br>
					<i class="fa-solid fa-server"></i> Core name <br>
					<i class="fa-solid fa-server"></i> Core name <br>
					<i class="fa-solid fa-server"></i> Core name <br>
					<i class="fa-solid fa-server"></i> Core name <br>
					<i class="fa-solid fa-server"></i> Core name <br>
					<i class="fa-solid fa-server"></i> Core name <br>
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
				size: { h: 30 * 12 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇓</i>`,
				row: 14.25,
				style: {
					font: ["46"], fontAlpha: ["47"],
				}
			},
			{
				type: "text",
				text: `Confirm`,
				row: 14.25,
				col: 1,
				style: {
					font: ["48"], fontAlpha: ["49"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				col: 4.3,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Back`,
				row: 14.25,
				col: 5.3,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 7.3,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Info`,
				row: 14.25,
				col: 8.3,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
	"Config Screen": {
		title: "Config Screen",
		preview: true,
		wallpaper: ["154", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "CONFIGURATION",
				col: 6.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `General Settings <br>`,
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
			// Additional Text
			{
				type: "text",
				text: `
					Theme Picker <br>
					Archive Manager <br>
					Wi-Fi Network <br>
					Web Services <br>
					Date and Time <br>
					Device Type <br>
					System Refresh <br>
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
				size: { h: 30 * 7 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇓</i>`,
				row: 14.25,
				style: {
					font: ["46"], fontAlpha: ["47"],
				}
			},
			{
				type: "text",
				text: `Confirm`,
				row: 14.25,
				col: 1,
				style: {
					font: ["48"], fontAlpha: ["49"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				col: 4.3,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Back`,
				row: 14.25,
				col: 5.3,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 7.3,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Help`,
				row: 14.25,
				col: 8.3,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
	"Credits Screen": {
		title: "Credits Screen",
		preview: true,
		wallpaper: ["155", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "SUPPORTERS",
				col: 7.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-chess-knight"></i> garlicOS <br>`,
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
					<i class="fa-solid fa-chess-knight"></i> Batocera <br>
					<i class="fa-solid fa-chess-knight"></i> minUI <br>
					<i class="fa-solid fa-chess-knight"></i> Anbernic <br>
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
				size: { h: 30 * 3 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Back`,
				row: 14.25,
				col: 1,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 3,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Quote`,
				row: 14.25,
				col: 4,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
	"Device Selection Screen": {
		title: "Device Selection Screen",
		preview: true,
		wallpaper: ["156", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "DEVICE TYPE",
				col: 7.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-gamepad"></i> RG35XX - H <br>`,
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
			// Additional Text
			{
				type: "text",
				text: `
				<i class="fa-solid fa-gamepad"></i> RG35XX - OG <br>
				<i class="fa-solid fa-gamepad"></i> RG35XX - PLUS <br>
				<i class="fa-solid fa-gamepad"></i> RG35XX - 2024 <br>
				<i class="fa-solid fa-gamepad"></i> RG35XX - FLIP <br>
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
				size: { h: 30 * 4 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇣</i>`,
				row: 14.25,
				style: {
					font: ["58"], fontAlpha: ["59"],
				}
			},
			{
				type: "text",
				text: `Confirm`,
				row: 14.25,
				col: 1,
				style: {
					font: ["60"], fontAlpha: ["61"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 4.25,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Help`,
				row: 14.25,
				col: 5.25,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
	"Favourites": {
		title: "Favourites",
		preview: true,
		wallpaper: ["157", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "FAVOURITES",
				col: 7.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-file"></i> Content Name <br>`,
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
					<i class="fa-solid fa-file"></i> Content Name <br>
					<i class="fa-solid fa-file"></i> Content Name <br>
					<i class="fa-solid fa-file"></i> Content Name <br>
					<i class="fa-solid fa-file"></i> Content Name <br>
					<i class="fa-solid fa-file"></i> Content Name <br>
					<i class="fa-solid fa-file"></i> Content Name <br>
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
				size: { h: 30 * 6 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇓</i>`,
				row: 14.25,
				style: {
					font: ["46"], fontAlpha: ["47"],
				}
			},
			{
				type: "text",
				text: `Open`,
				row: 14.25,
				col: 1,
				style: {
					font: ["48"], fontAlpha: ["49"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				col: 3.25,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Back`,
				row: 14.25,
				col: 4.25,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇣</i>`,
				row: 14.25,
				col: 6.25,
				style: {
					font: ["58"], fontAlpha: ["59"],
				}
			},
			{
				type: "text",
				text: `Remove`,
				row: 14.25,
				col: 7.25,
				style: {
					font: ["60"], fontAlpha: ["61"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 10.25,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Info`,
				row: 14.25,
				col: 11.25,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]	
	},
	"History": {
		title: "History",
		preview: true,
		wallpaper: ["158", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "HISTORY",
				col: 8.25,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-file"></i> Content Name <br>`,
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
					<i class="fa-solid fa-file"></i> Content Name <br>
					<i class="fa-solid fa-file"></i> Content Name <br>
					<i class="fa-solid fa-file"></i> Content Name <br>
					<i class="fa-solid fa-file"></i> Content Name <br>
					<i class="fa-solid fa-file"></i> Content Name <br>
					<i class="fa-solid fa-file"></i> Content Name <br>
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
				size: { h: 30 * 6 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Back`,
				row: 14.25,
				col: 1,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇣</i>`,
				row: 14.25,
				col: 3.25,
				style: {
					font: ["58"], fontAlpha: ["59"],
				}
			},
			{
				type: "text",
				text: `Remove`,
				row: 14.25,
				col: 4.25,
				style: {
					font: ["60"], fontAlpha: ["61"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 7.5,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Info`,
				row: 14.25,
				col: 8.5,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]	
	},
	"Information Screen": {
		title: "Information Screen",
		preview: true,
		wallpaper: ["159", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "INFORMATION",
				col: 7.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-gamepad"></i> Input Tester <br>`,
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
					<i class="fa-solid fa-laptop-medical"></i> System Details <br>
					<i class="fa-solid fa-users"></i> Supporters <br>
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
				size: { h: 30 * 2 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇓</i>`,
				row: 14.25,
				style: {
					font: ["46"], fontAlpha: ["47"],
				}
			},
			{
				type: "text",
				text: `Confirm`,
				row: 14.25,
				col: 1,
				style: {
					font: ["48"], fontAlpha: ["49"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				col: 4,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Back`,
				row: 14.25,
				col: 5,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 7,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Help`,
				row: 14.25,
				col: 8,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
	"Network Configuration Screen": {
		title: "Network Configuration Screen",
		preview: true,
		wallpaper: ["161", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "WI-FI NETWORK",
				col: 7,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-check-square"></i> Enabled <br>`,
				row: 1,
				style: {
					font: ["91"], fontAlpha: ["92"],
				}
			},
			{
				type: "text",
				text: `True`,
				row: 1,
				col: 19,
				style: {
					font: ["91"], fontAlpha: ["92"], textAlign: ["right"]
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
			// Additional Text
			{
				type: "text",
				text: `
					<i class="fa-solid fa-globe"></i> Identifier <br>
					<i class="fa-solid fa-key"></i> Linux Kernel <br>
					<i class="fa-solid fa-network-wired"></i> System Uptime <br>
					<i class="fa-solid fa-hashtag"></i> Device IP <br>
					<i class="fa-solid fa-hashtag"></i> Subnet CIDR <br>
					<i class="fa-solid fa-hashtag"></i> Gateway IP <br>
					<i class="fa-solid fa-hashtag"></i> DNS Server <br>
					<i class="fa-solid fa-magic"></i> Status <br>
					<i class="fa-solid fa-house-signal"></i> Connect <br>
				`,
				
				row: 2,
				style: {
					font: ["81"], fontAlpha: ["82"],
				}
			},
			{
				type: "text",
				text: `
					SSID <br>
					******* <br>
					DHCP <br>
					192.168.0.123 <br>
					24 <br>
					192.168.0.1 <br>
					1.1.1.1 <br>
					Connected - 192.168.X.X <br>
				`,
				row: 2,
				col: 11.5,
				style: {
					font: ["81"], fontAlpha: ["82"], textAlign: ["right"],
				}
			},
			{
				type: "box",
				row: 2,
				expand: { x: true },
				size: { h: 30 * 9 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Back`,
				row: 14.25,
				col: 1,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇣</i>`,
				row: 14.25,
				col: 3,
				style: {
					font: ["58"], fontAlpha: ["59"],
				}
			},
			{
				type: "text",
				text: `Scan`,
				row: 14.25,
				col: 4,
				style: {
					font: ["60"], fontAlpha: ["61"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 6,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Help`,
				row: 14.25,
				col: 7,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
	"Explore Content": {
		title: "Explore Content",
		preview: true,
		wallpaper: ["162", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "EXPLORE",
				col: 8.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-folder"></i> SD1 (mmc) <br>`,
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
			// Additional Text - unsure about the USB1 name, might need to change it later - jupy <3
			{
				type: "text",
				text: `
					<i class="fa-solid fa-folder"></i> SD2 (sdcard) <br>
					<i class="fa-solid fa-folder"></i> USB1 (USB) <br>
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
				size: { h: 30 * 2 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇓</i>`,
				row: 14.25,
				style: {
					font: ["46"], fontAlpha: ["47"],
				}
			},
			{
				type: "text",
				text: `Open`,
				row: 14.25,
				col: 1,
				style: {
					font: ["48"], fontAlpha: ["49"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				col: 3.5,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Back`,
				row: 14.25,
				col: 4.5,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 6.5,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Info`,
				row: 14.25,
				col: 7.5,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
	"Reset Screen": {
		title: "Reset Screen",
		preview: true,
		wallpaper: ["163", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "SYSTEM REFRESH",
				col: 6.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-spray-can"></i> Clear Favourite Items <br>`,
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
			// Additional Text
			{
				type: "text",
				text: `
				<i class="fa-solid fa-spray-can"></i> Clear History Items <br>
				<i class="fa-solid fa-spray-can"></i> Clear Activity Tracker <br>
				<i class="fa-solid fa-spray-can"></i> Clear System Configuration <br>
				<i class="fa-solid fa-spray-can"></i> Clear System Cache <br>
				<i class="fa-solid fa-right-from-bracket"></i> Restore RetroArch Configuration <br>
				<i class="fa-solid fa-right-from-bracket"></i> Restore Network Configuration <br>
				<i class="fa-solid fa-right-from-bracket"></i> Restore PortMaster <br>
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
				size: { h: 30 * 7 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Back`,
				row: 14.25,
				col: 1,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇣</i>`,
				row: 14.25,
				col: 3,
				style: {
					font: ["58"], fontAlpha: ["59"],
				}
			},
			{
				type: "text",
				text: `Confirm`,
				row: 14.25,
				col: 4,
				style: {
					font: ["60"], fontAlpha: ["61"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 7.3,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Help`,
				row: 14.25,
				col: 8.3,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]	
	},
	"RTC Configuration": {
		title: "RTC Configuration",
		preview: true,
		wallpaper: ["164", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "DATE AND TIME",
				col: 7,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-calendar"></i> Year <br>`,
				row: 1,
				style: {
					font: ["91"], fontAlpha: ["92"],
				}
			},
			{
				type: "text",
				text: `2024`,
				row: 1,
				col: 18.75,
				style: {
					font: ["91"], fontAlpha: ["92"], textAlign: ["right"]
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
			// Additional Text
			{
				type: "text",
				text: `
					<i class="fa-solid fa-calendar"></i> Month <br>
					<i class="fa-solid fa-calendar"></i> Day <br>
					<i class="fa-solid fa-clock"></i> Hour <br>
					<i class="fa-solid fa-clock"></i> Minute <br>
					<i class="fa-solid fa-clock"></i> Time Notation <br>
					<i class="fa-solid fa-map-marked-alt"></i> Set Timezone <br>
				`,
				row: 2,
				style: {
					font: ["81"], fontAlpha: ["82"],
				}
			},
			{
				type: "text",
				text: `
					03 <br>
					30 <br>
					22 <br>
					15 <br>
					24 Hour <br>
				`,
				row: 2,
				col: 17.5,
				style: {
					font: ["81"], fontAlpha: ["82"], textAlign: ["right"],
				}
			},
			{
				type: "box",
				row: 2,
				expand: { x: true },
				size: { h: 30 * 6 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Save`,
				row: 14.25,
				col: 1,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 3.3,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Help`,
				row: 14.25,
				col: 4.3,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]	
	},
	"Verbose Boot Startup": {
		title: "Verbose Boot Startup",
		preview: true,
		wallpaper: ["165", "149"], 
		// Is it possible to use a style here for the verbose boot background (id: bg:115, alpha:116) that will take over only if no image has been uploaded to id 165? - jupy <3
		// wallpaper: ["165", "115", 149"],
		child: [
            {
                type: "text",
                text: `
						muOS is now starting <br>
                        Please wait...
						<br>
                `,
				offset: { y: "119" },
                expand: { x: true },
                style: {
                    font: ["117"], fontAlpha: ["118"],
					background: ["115"], backgroundAlpha: ["116"],
                    textAlign: "center",
                }
            }
        ],
	},
	"System Information": {
		title: "System Information",
		preview: true,
		wallpaper: ["166", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "SYSTEM DETAILS",
				col: 6.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-server"></i> muOS Version <br>`,
				row: 1,
				style: {
					font: ["91"], fontAlpha: ["92"],
				}
			},
			{
				type: "text",
				text: `2404 PLUSH v11`,
				row: 1,
				col: 14.4,
				style: {
					font: ["91"], fontAlpha: ["92"], textAlign: ["right"]
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
			// Additional Text
			{
				type: "text",
				text: `
					<i class="fa-solid fa-ghost"></i> RetroArch Config <br>
					<i class="fa-solid fa-robot"></i> Linux Kernel <br>
					<i class="fa-solid fa-stopwatch"></i> System Uptime <br>
					<i class="fa-solid fa-microchip"></i> CPU Information <br>
					<i class="fa-solid fa-microchip"></i> CPU Speed <br>
					<i class="fa-solid fa-microchip"></i> CPU Governor <br>
					<i class="fa-solid fa-memory"></i> RAM Usage <br>
					<i class="fa-solid fa-thermometer-empty"></i> Temperature <br>
					<i class="fa-solid fa-database"></i> Running Services <br>
					<i class="fa-solid fa-battery-three-quarters"></i> Battery Capacity <br>
					<i class="fa-solid fa-battery-three-quarters"></i> Battery Voltage <br>
				`,
				
				row: 2,
				style: {
					font: ["81"], fontAlpha: ["82"],
				}
			},
			{
				type: "text",
				text: `
					Original <br>
					Linux 4.9.170 <br>
					3 Hours 33 Minutes <br>
					Cortex A53 <br>
					1512 <br>
					performance <br>
					50.84 MB / 973.50 MB <br>
					43.23 <br>
					18 <br>
					69% (Offset: 0) <br>
					3.80v <br>
				`,
				row: 2,
				col: 12.2,
				style: {
					font: ["81"], fontAlpha: ["82"], textAlign: ["right"],
				}
			},
			{
				type: "box",
				row: 2,
				expand: { x: true },
				size: { h: 30 * 11 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Back`,
				row: 14.25,
				col: 1,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 3.3,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Help`,
				row: 14.25,
				col: 4.3,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
	"Input Tester": {
		// This one needs someone to just test or ask what the glyphs shown on screen are from and how they are themed - jupy <3
		title: "Input Tester",
		preview: true,
		wallpaper: ["167", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "INPUT TESTER",
				col: 7.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `Press POWER to finish testing`,
				row: 14.25,
				style: {
					font: ["31"], fontAlpha: ["82"],
				}
			},
		]
	},
	"Theme Picker": {
		title: "Theme Picker",
		preview: true,
		wallpaper: ["168", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "THEME PICKER",
				col: 6.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-palette"></i> Your brand new theme name! <br>`,
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
			// Additional Text
			{
				type: "text",
				text: `
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
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
				size: { h: 30 * 12 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇓</i>`,
				row: 14.25,
				style: {
					font: ["46"], fontAlpha: ["47"],
				}
			},
			{
				type: "text",
				text: `Confirm`,
				row: 14.25,
				col: 1,
				style: {
					font: ["48"], fontAlpha: ["49"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				col: 4.3,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Back`,
				row: 14.25,
				col: 5.3,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 7.3,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Info`,
				row: 14.25,
				col: 8.3,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
	"Time Zone Configuration": {
		title: "Time Zone Configuration",
		preview: true,
		wallpaper: ["169", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "TIMEZONE",
				col: 8,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-globe"></i> Africa/Abidjan <br>`,
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
			// Additional Text
			{
				type: "text",
				text: `
					<i class="fa-solid fa-globe"></i> Africa/Accra <br> 
					<i class="fa-solid fa-globe"></i> Africa/Addis_Ababa <br>
					<i class="fa-solid fa-globe"></i> Africa/Algiers <br>
					<i class="fa-solid fa-globe"></i> Africa/Asmara <br>
					<i class="fa-solid fa-globe"></i> Africa/Asmera <br>
					<i class="fa-solid fa-globe"></i> Africa/Bamako <br>
					<i class="fa-solid fa-globe"></i> Africa/Bangui <br>
					<i class="fa-solid fa-globe"></i> Africa/Banjul <br>
					<i class="fa-solid fa-globe"></i> Africa/Bissau <br>
					<i class="fa-solid fa-globe"></i> Africa/Blantyre <br>
					<i class="fa-solid fa-globe"></i> Africa/Brazzaville <br>
					<i class="fa-solid fa-globe"></i> Africa/Bujumbura <br>
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
				size: { h: 30 * 12 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇓</i>`,
				row: 14.25,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Confirm`,
				row: 14.25,
				col: 1,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 4.3,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Help`,
				row: 14.25,
				col: 5.3,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
	"Activity Tracker": {
		// Not found in latest v11?
		title: "Activity Tracker",
		preview: false,
		wallpaper: ["170", "149"],
		child: [],
	},
	"Advanced Settings": {
		title: "Advanced Settings",
		preview: true,
		wallpaper: ["171", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "ADVANCED SETTINGS",
				col: 6.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-gamepad"></i> Gamepad Wait <br>`,
				row: 1,
				style: {
					font: ["91"], fontAlpha: ["92"],
				}
			},
			{
				type: "text",
				text: `Disabled`,
				row: 1,
				col: 17.2,
				style: {
					font: ["91"], fontAlpha: ["92"], textAlign: ["right"]
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
			// Additional Text
			{
				type: "text",
				text: `
					<i class="fa-solid fa-fire"></i> Thermal Zone Control <br>
					<i class="fa-solid fa-font"></i> Interface Font Type <br>
					<i class="fa-solid fa-square-pen"></i> Verbose Boot <br>
					<i class="fa-solid fa-volume-down"></i> Low Volume Boost <br>
					<i class="fa-solid fa-battery-three-quarters"></i> Battery Offset <br>
				`,
				row: 2,
				style: {
					font: ["81"], fontAlpha: ["82"],
				}
			},
			{
				type: "text",
				text: `
					Disabled <br>
					Theme Controlled <br>
					Enabled <br>
					Enabled <br>
					0 <br>
				`,
				row: 2,
				col: 13.7,
				style: {
					font: ["81"], fontAlpha: ["82"], textAlign: ["right"],
				}
			},
			{
				type: "box",
				row: 2,
				expand: { x: true },
				size: { h: 30 * 5 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Save`,
				row: 14.25,
				col: 1,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 3.3,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Help`,
				row: 14.25,
				col: 4.3,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
	"General Settings": {
		title: "General Settings",
		preview: true,
		wallpaper: ["172", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "GENERAL SETTINGS",
				col: 6.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-sharp fa-solid fa-circle-play"></i> Launcher Sound <br>`,
				row: 1,
				style: {
					font: ["91"], fontAlpha: ["92"],
				}
			},
			{
				type: "text",
				text: `Disabled`,
				row: 1,
				col: 17.2,
				style: {
					font: ["91"], fontAlpha: ["92"], textAlign: ["right"]
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
			// Additional Text
			{
				type: "text",
				text: `
					<i class="fa-solid fa-star"></i> Device Startup <br>
					<i class="fa-solid fa-moon"></i> Idle Sleep <br>
					<i class="fa-solid fa-power-off"></i> Idle Shutdown <br>
					<i class="fa-solid fa-battery-three-quarters"></i> Low Battery Indicator <br>
					<i class="fa-solid fa-eye"></i> Night Mode <br>
					<i class="fa-solid fa-rectangle-xmark"></i> Interface Options <br>
					<i class="fa-solid fa-gears"></i> Advanced <br>
				`,
				row: 2,
				style: {
					font: ["81"], fontAlpha: ["82"],
				}
			},
			{
				type: "text",
				text: `
					Main Launcher <br>
					30 Minutes <br>
					30 Minutes <br>
					30 Percent <br>
					Disabled <br>
				`,
				row: 2,
				col: 15,
				style: {
					font: ["81"], fontAlpha: ["82"], textAlign: ["right"],
				}
			},
			{
				type: "box",
				row: 2,
				expand: { x: true },
				size: { h: 30 * 7 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Save`,
				row: 14.25,
				col: 1,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 3.3,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Help`,
				row: 14.25,
				col: 4.3,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
	"Web Services": {
		title: "Web Services",
		preview: true,
		wallpaper: ["173", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "GENERAL SETTINGS",
				col: 6.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-terminal"></i> Secure Shell <br>`,
				row: 1,
				style: {
					font: ["91"], fontAlpha: ["92"],
				}
			},
			{
				type: "text",
				text: `Disabled`,
				row: 1,
				col: 17.2,
				style: {
					font: ["91"], fontAlpha: ["92"], textAlign: ["right"]
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
			// Additional Text
			{
				type: "text",
				text: `
					<i class="fa-solid fa-desktop"></i> SFTP + Filebrowser <br>
					<i class="fa-solid fa-laptop-code"></i> Virtual Terminal <br>
					<i class="fa-solid fa-rotate"></i> Syncthing <br>
					<i class="fa-solid fa-clock"></i> Network Time Sync <br>
				`,
				row: 2,
				style: {
					font: ["81"], fontAlpha: ["82"],
				}
			},
			{
				type: "text",
				text: `
					Disabled <br>
					Disabled <br>
					Disabled <br>
					Enabled <br>
				`,
				row: 2,
				col: 17.2,
				style: {
					font: ["81"], fontAlpha: ["82"], textAlign: ["right"],
				}
			},
			{
				type: "box",
				row: 2,
				expand: { x: true },
				size: { h: 30 * 4 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Save`,
				row: 14.25,
				col: 1,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 3.3,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Help`,
				row: 14.25,
				col: 4.3,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
	"Vol/Bright Bar": {
		title: "Vol/Bright Bar",
		preview: true,
		wallpaper: ["160", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "muOS MAIN MENU",
				col: 6.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			// Volume/Brightness box - these have to stay in this order or Bad Things Will Happen.
			{ // Box border
				type: "box",
				row: 12.4,
				col: .40,
				size: { h: 40 * 1, w: 30 * 20.5},
				style: {
					background: ["140.3"], backgroundAlpha: ["140.4"],
				}
			},
			{ 	// Box container
				type: "box",
				row: 12.5,
				col: .5,
				size: { h: 35 * 1, w: 30 * 20.3},
				style: {
					background: ["140.1"], backgroundAlpha: ["140.2"],
				}
			},
			{	// Inside bar
				type: "box",
				row: 12.85,
				col: 2,
				size: { h: 15 * 1, w: 30 * 18.4},
				style: {
					background: ["140.6"], backgroundAlpha: ["140.7"],
				}
			},
			{	// "Moving / Active" bar
				type: "box",
				row: 12.85,
				col: 2,
				size: { h: 15 * 1, w: 30 * 10},
				style: {
					background: ["140.8"], backgroundAlpha: ["140.9"],
				}
			},
			{ // Sound icon - need to figure out how to get it smaller, as fa-2xs is not working.
				type: "icon",
				icon: "fa-solid fa-volume-off fa-2xs",
				row: 13,
				col: .5,
				style: {
					font: ["140.11"], fontAlpha: ["140.12"],
				}
			},
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
			// Additional Text
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
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇓</i>`,
				row: 14.25,
				style: {
					font: ["46"], fontAlpha: ["47"],
				}
			},
			{
				type: "text",
				text: `Confirm`,
				row: 14.25,
				col: 1,
				style: {
					font: ["48"], fontAlpha: ["49"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 4.3,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Help`,
				row: 14.25,
				col: 5.3,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
	"Notifications": {
		title: "Notifications",
		preview: true,
		wallpaper: ["168", "149"],
		child: [
			// Header
			...preDefiendChildElement.header,
			{
				type: "text",
				text: "THEME PICKER",
				col: 6.5,
				style: {
					font: ["35"], fontAlpha: ["36"]
				}
			},
			{
				type: "text",
				text: `<i class="fa-solid fa-palette"></i> Your brand new theme name! <br>`,
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
			// Additional Text
			{
				type: "text",
				text: `
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
					<i class="fa-solid fa-palette"></i> Theme name <br>
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
				size: { h: 30 * 12 },
				style: {
					background: ["75"], backgroundAlpha: ["76"],
				}
			},
			// Notification box - these have to stay in this order or Bad Things Will Happen.
			{ // Box border
				type: "box",
				row: 12.4,
				col: .40,
				size: { h: 42 * 1, w: 30 * 20.5},
				style: {
					background: ["139.3"], backgroundAlpha: ["139.4"],
				}
			},
			{ 	// Box container
				type: "box",
				row: 12.5,
				col: .5,
				size: { h: 37 * 1, w: 30 * 20.3},
				style: {
					background: ["139.1"], backgroundAlpha: ["139.2"],
				}
			},
			{	// 
				type: "text",
				text: `Loading Theme`,
				row: 12.5,
				col: .5,
				style: {
					font: ["139.6"], fontAlpha: ["139.7"],
				}
			},
			// Footer
			...preDefiendChildElement.footer,
			{
				type: "text",
				text: `<i class=glyph>⇓</i>`,
				row: 14.25,
				style: {
					font: ["46"], fontAlpha: ["47"],
				}
			},
			{
				type: "text",
				text: `Confirm`,
				row: 14.25,
				col: 1,
				style: {
					font: ["48"], fontAlpha: ["49"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇒</i>`,
				row: 14.25,
				col: 4.3,
				style: {
					font: ["50"], fontAlpha: ["51"],
				}
			},
			{
				type: "text",
				text: `Back`,
				row: 14.25,
				col: 5.3,
				style: {
					font: ["52"], fontAlpha: ["53"],
				}
			},
			{
				type: "text",
				text: `<i class=glyph>⇥</i>`,
				row: 14.25,
				col: 7.3,
				style: {
					font: ["70"], fontAlpha: ["71"],
				}
			},
			{
				type: "text",
				text: `Info`,
				row: 14.25,
				col: 8.3,
				style: {
					font: ["72"], fontAlpha: ["73"],
				}
			},
		]
	},
}