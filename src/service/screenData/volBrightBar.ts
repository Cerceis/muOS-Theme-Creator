import { preDefiendChildElement } from "@/service/screenData/preDefinedChildElements";
import { type ScreenData } from "@/service/screen";

export const volBrightBar: ScreenData = {
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
                borderRadius: ["140.5"]
            }
        },
        { 	// Box container
            type: "box",
            row: 12.5,
            col: .5,
            size: { h: 35 * 1, w: 30 * 20.3},
            style: {
                background: ["140.1"], backgroundAlpha: ["140.2"],
                borderRadius: ["140.5"]
            }
        },
        {	// Inside bar
            type: "box",
            row: 12.85,
            col: 2,
            size: { h: 15 * 1, w: 30 * 18.4},
            style: {
                background: ["140.6"], backgroundAlpha: ["140.7"],
                borderRadius: ["140.10"]
            }
        },
        {	// "Moving / Active" bar
            type: "box",
            row: 12.85,
            col: 2,
            size: { h: 15 * 1, w: 30 * 10},
            style: {
                background: ["140.8"], backgroundAlpha: ["140.9"],
                borderLeft: ["140.10"]
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
        // Highlight
        {
            type: "box",
            row: 1,
            expand: { x: true },
            style: {
                background: ["85"], backgroundAlpha: ["86"],
            }
        },
        // First words on screen
        {
            type: "text",
            text: `<i class="fa-solid fa-chess-rook"></i> Explore Content <br>`,
            row: 1,
            style: {
                font: ["91"], fontAlpha: ["92"],
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
                <i class="fa-solid fa-star"></i> Favourites <br>
                <i class="fa-solid fa-history"></i> History <br>
                <i class="fa-solid fa-shapes"></i> Applications <br>
                <i class="fa-solid fa-info-circle"></i> Information <br>
                <i class="fa-solid fa-cog"></i> Configuration <br>
                <i class="fa-solid fa-arrows-rotate"></i> Reboot <br>
                <i class="fa-solid fa-power-off"></i> Shutdown <br>
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
}