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
 *          ...preDefinedChildElement.header <- Use "Spread operator"
 *       ]
 *     }
 */
export const preDefinedChildElement = {
	header:[
		// Need to investigate how we can use the FONT_HEADER items for offsets here.... - jupy <3
		{
			type: "box",
			row: 0,
			expand: { x: true },
			size: { h: 30 * 1.2 },
			style: {
				background: ["33.1"], backgroundAlpha: ["33.2"],
			}
		},
		{
			type: "text",
			text: `17:45`,
			row: 0,
			col: 0,
			style: {
				font: ["27"], fontAlpha: ["28"],
				padTop: ["4.1"],
			}
		},
		{
			type: "icon",
			icon: "fa-brands fa-bluetooth-b",
			col: 18,
			style: {
				font: ["22"], fontAlpha: ["24"],
				padTop: ["4.3"],
			}
		},
		{
			type: "icon",
			icon: "fa-solid fa-wifi",
			col: 18.75,
			style: {
				font: ["17"], fontAlpha: ["19"],
				padTop: ["4.3"],
			}
		},
		{
			type: "icon",
			icon: "fa-solid fa-battery-three-quarters",
			col: 20,
			style: {
				font: ["10"], fontAlpha: ["13"],
				padTop: ["4.3"],
			}
		},
	],
	footer:[
		{
			type: "box",
			row: 14.8,
			expand: { x: true },
			size: { h: 30 * 1.2 },
			style: {
				background: ["29.1"], backgroundAlpha: ["29.2"],
			}
		},
	]
}