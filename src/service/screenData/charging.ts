import { preDefiendChildElement } from "@/service/screenData/preDefinedChildElements";
import { type ScreenData } from "@/service/screen";

export const charging: ScreenData = {
    title: "Charging",
    preview: true,
    wallpaper: ["153", "148.7"],
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
}