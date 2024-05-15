import { preDefiendChildElement } from "@/service/screenData/preDefinedChildElements";
import { type ScreenData } from "@/service/screen";

export const home: ScreenData = {
    title: "Home",
    preview: true,
    wallpaper: ["160", "148.1"],
    child: [
        // Header
        ...preDefiendChildElement.header,
        {
            type: "text",
            text: "muOS MAIN MENU",
            col: 6.5,
            style: {
                font: ["35"], fontAlpha: ["36"],
                padTop: ["4.1"]
            }
        },
        // Highlight
        {
            type: "box",
            row: 1,
            expand: { x: true },
            style: {
                background: ["85"], backgroundAlpha: ["86"],
                borderRadius: ["140.5"]
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