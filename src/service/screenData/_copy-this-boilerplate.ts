import { preDefinedChildElement } from "@/service/screenData/preDefinedChildElements";
import { type ScreenData } from "@/service/screen";

export const CHANGETHISNAME: ScreenData = {
    title: "",
    preview: false,
    wallpaper: [],
    child: [
        /*
        Examples)
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
        */
    ]
}