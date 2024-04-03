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
			row: -0.34,
			expand: { x: true },
			size: { h: 30 * 1.34 },
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