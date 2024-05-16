/**
 * All theme related logic.
 * Basically the main file.
 */
import { Generate, Is } from "cerceis-lib";
import { type Ref, ref, computed, watch } from "vue";
import { assetFunc, defaultFixedImageAssetInfo } from "@/service/assets";
import { Subject } from 'rxjs';

type MUOSTheme = {
    id: string,
    zipName: string,
    author: string,
    values: MUOSThemeValues[]
}
export type MUOSThemeValues = {
    id: string,
    label: string,
    des?: string,
    preview?: boolean
    child: MUOSThemeChild[]
}
export type MUOSThemeChild = {
    id: string,
    label: string,
    property: string,
    des: string,
    value: string | File[],
    format?: string[],
    folderPath?: string[],
    preview?: boolean,
}
export const themes: Ref<MUOSTheme[]> = ref([]);
export const selectedThemeId: Ref<string> = ref("");
export const selectedTheme = computed(() => {
    if (themes.value.length === 0) {
        themeFunc.new();
        return themes.value[0];
    }
    const foundTheme = themes.value.find(t => t.id === selectedThemeId.value);
    if (!foundTheme) {
		return themes.value[0];
	}
    return foundTheme;
})

export const whitelistSchemeLabels = [
    "background", "font", "battery", "network", "bluetooth", "date",
    "footer", "header", "help", "navigation", "list", "image_list",
    "charging", "verbose", "keyboard", "notification", "bar", "meta",
	"misc"
];

export const themeFunc = {
    new: () => {
        const tmp: MUOSTheme = {
            id: Generate.objectId(),
            zipName: "muOS Theme",
            author: "muOS Theme Creator",
            values: themeFunc.newValues(),
        }
        themes.value.push(tmp);
    },
    newValues: () => {
        const tmp: MUOSThemeValues[] = [
            {
                id: "1",
                label: "background",
                preview: true,
                child: [
                    {
                        id: "2",
                        label: "BACKGROUND", property: "BACKGROUND", value: "F8BBD0",
                        des: "(Hex without #) Background colours baby! Shows as right to left gradient if you use a wallpaper image",
                        preview: true,
                    },
                    {
                        id: "3",
                        label: "BACKGROUND_ALPHA", property: "BACKGROUND_ALPHA", value: "255",
                        des: "(0 ~ 255) How visible you want the background to be",
                        preview: true,
                    },
                ]
            },
            {
                id: "4",
                label: "font",
                child: [
                    {
                        id: "4.1",
                        label: "FONT_HEADER_PAD_TOP", property: "FONT_HEADER_PAD_TOP", value: "8",
                        des: "Padding space for the top of your header text."
                    },
                    {
                        id: "4.2",
                        label: "FONT_HEADER_PAD_BOTTOM", property: "FONT_HEADER_PAD_BOTTOM", value: "0",
                        des: "Padding space for the bottom of your header text."
                    },
                    {
                        id: "4.3",
                        label: "FONT_HEADER_ICON_PAD_TOP", property: "FONT_HEADER_ICON_PAD_TOP", value: "0",
                        des: "Padding space for the top of icons located in the header."
                    },
                    {
                        id: "4.4",
                        label: "FONT_HEADER_ICON_PAD_BOTTOM", property: "FONT_HEADER_ICON_PAD_BOTTOM", value: "0",
                        des: "Padding space for the bottom of icons located in the header."
                    },
                    {
                        id: "4.5",
                        label: "FONT_FOOTER_PAD_TOP", property: "FONT_FOOTER_PAD_TOP", value: "0",
                        des: "Padding space for the top of your footer text."
                    },
                    {
                        id: "4.6",
                        label: "FONT_FOOTER_PAD_BOTTOM", property: "FONT_FOOTER_PAD_BOTTOM", value: "0",
                        des: "Padding space for the bottom of your footer text."
                    },
                    {
                        id: "4.7",
                        label: "FONT_FOOTER_ICON_PAD_TOP", property: "FONT_FOOTER_ICON_PAD_TOP", value: "0",
                        des: "Padding space for the top of icons located in the footer."
                    },
                    {
                        id: "4.8",
                        label: "FONT_FOOTER_ICON_PAD_BOTTOM", property: "FONT_FOOTER_ICON_PAD_BOTTOM", value: "0",
                        des: "Padding space for the bottom of icons located in the footer."
                    },
                    {
                        id: "4.9",
                        label: "FONT_MESSAGE_PAD_TOP", property: "FONT_MESSAGE_PAD_TOP", value: "0",
                        des: "Padding space for the top of your message text."
                    },
                    {
                        id: "4.10",
                        label: "FONT_MESSAGE_PAD_BOTTOM", property: "FONT_MESSAGE_PAD_BOTTOM", value: "0",
                        des: "Padding space for the bottom of your message text."
                    },
                    {
                        id: "4.11",
                        label: "FONT_MESSAGE_ICON_PAD_TOP", property: "FONT_MESSAGE_ICON_PAD_TOP", value: "0",
                        des: "Padding space for the top of icons located within messages."
                    },
                    {
                        id: "4.12",
                        label: "FONT_MESSAGE_ICON_PAD_BOTTOM", property: "FONT_MESSAGE_ICON_PAD_BOTTOM", value: "0",
                        des: "Padding space for the bottom of icons located within messages."
                    },
                    {
                        id: "4.13",
                        label: "FONT_LIST_PAD_TOP", property: "FONT_LIST_PAD_TOP", value: "-3",
                        des: "Padding space for the top of your list text."
                    },
                    {
                        id: "4.14",
                        label: "FONT_LIST_PAD_BOTTOM", property: "FONT_LIST_PAD_BOTTOM", value: "0",
                        des: "Padding space for the bottom of your list text."
                    },
                    {
                        id: "4.15",
                        label: "FONT_LIST_ICON_PAD_TOP", property: "FONT_LIST_ICON_PAD_TOP", value: "5",
                        des: "Padding space for the top of icons located within lists."
                    },
                    {
                        id: "4.16",
                        label: "FONT_LIST_ICON_PAD_BOTTOM", property: "FONT_LIST_ICON_PAD_BOTTOM", value: "0",
                        des: "Padding space for the bottom of icons located within lists."
                    },
                ]
            },
			{
				id: "5",
                label: "status",
                child: [
                    {
                        id: "5.1",
                        label: "PADDING_RIGHT", 
						property: "PADDING_RIGHT", 
						value: "0",
                        des: ""
                    },
                ]
			},
            {
                id: "9",
                label: "battery",
                preview: true,
                child: [
                    {
                        id: "10",
                        "label": "BATTERY_NORMAL",
                        "property": "BATTERY_NORMAL",
                        "value": "F7E318",
                        "des": "(HEX without #) Battery colour",
                        "preview": true,
                    },
                    {
                        id: "11",
                        "label": "BATTERY_ACTIVE",
                        "property": "BATTERY_ACTIVE",
                        "value": "85F718",
                        "des": "(HEX without #) Charging battery colour",
                        "preview": true,
                    },
                    {
                        id: "12",
                        "label": "BATTERY_LOW",
                        "property": "BATTERY_LOW",
                        "value": "D35C54",
                        "des": "(HEX without #) Low battery colour",
                        "preview": true,
                    },
                    {
                        id: "13",
                        "label": "BATTERY_NORMAL_ALPHA",
                        "property": "BATTERY_NORMAL_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Battery transparency",
                        "preview": true,
                    },
                    {
                        id: "14",
                        "label": "BATTERY_ACTIVE_ALPHA",
                        "property": "BATTERY_ACTIVE_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Charging battery transparency",
                        "preview": true,
                    },
                    {
                        id: "15",
                        "label": "BATTERY_LOW_ALPHA",
                        "property": "BATTERY_LOW_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Low battery transparency",
                        "preview": true,
                    }
                ]
            },
            {
                id: "16",
                label: "network",
                preview: true,
                child: [
                    {
                        id: "17",
                        "label": "NETWORK_NORMAL",
                        "property": "NETWORK_NORMAL",
                        "value": "F7E318",
                        "des": "(HEX without #) Network icon colour",
                        preview: true,
                    },
                    {
                        id: "18",
                        "label": "NETWORK_ACTIVE",
                        "property": "NETWORK_ACTIVE",
                        "value": "85F718",
                        "des": "(HEX without #) Network in-use colour",
                        preview: true,
                    },
                    {
                        id: "19",
                        "label": "NETWORK_NORMAL_ALPHA",
                        "property": "NETWORK_NORMAL_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Network colour transparency",
                        preview: true,
                    },
                    {
                        id: "20",
                        "label": "NETWORK_ACTIVE_ALPHA",
                        "property": "NETWORK_ACTIVE_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Network in-use colour transparency",
                        preview: true,
                    }
                ]
            },
            {
                id: "21",
                label: "bluetooth",
                preview: true,
                child: [
                    {
                        id: "22",
                        "label": "BLUETOOTH_NORMAL",
                        "property": "BLUETOOTH_NORMAL",
                        "value": "F7E318",
                        "des": "(Hex without #) Bluetooth colour",
                        preview: true,
                    },
                    {
                        id: "23",
                        "label": "BLUETOOTH_ACTIVE",
                        "property": "BLUETOOTH_ACTIVE",
                        "value": "85F718",
                        "des": "(Hex without #) Bluetooth in-use colour",
                        preview: true,
                    },
                    {
                        id: "24",
                        "label": "BLUETOOTH_NORMAL_ALPHA",
                        "property": "BLUETOOTH_NORMAL_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Bluetooth transparency",
                        preview: true,
                    },
                    {
                        id: "25",
                        "label": "BLUETOOTH_ACTIVE_ALPHA",
                        "property": "BLUETOOTH_ACTIVE_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Bluetooth in-use transparency",
                        preview: true,
                    }
                ]
            },
            {
                id: "26",
                label: "date",
                preview: true,
                child: [
                    {
                        id: "27",
                        "label": "DATETIME_TEXT",
                        "property": "DATETIME_TEXT",
                        "value": "FFFFFF",
                        "des": "(Hex without #) Color of the datetime text",
                        preview: true,
                    },
                    {
                        id: "28",
                        "label": "DATETIME_ALPHA",
                        "property": "DATETIME_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Transparency of the datetime text",
                        preview: true,
                    },
					{
                        id: "26.3",
                        "label": "PADDING_LEFT",
                        "property": "PADDING_LEFT",
                        "value": "0",
                        "des": "(INT > 0) Left padding for the date",
                        preview: false,
                    },
					
                ]
            },
            {
                id: "29",
                label: "footer",
                child: [
                    {
                        id: "29.1",
                        "label": "FOOTER_BACKGROUND",
                        "property": "FOOTER_BACKGROUND",
                        "value": "100808",
                        "des": "(Hex without #) Changes the colour of the footer background."
                    },
                    {
                        id: "29.2",
                        "label": "FOOTER_BACKGROUND_ALPHA",
                        "property": "FOOTER_BACKGROUND_ALPHA",
                        "value": "185",
                        "des": "(0 ~ 255) Changes the transparency of the footer background."
                    },
                    {
                        id: "31",
                        "label": "FOOTER_TEXT",
                        "property": "FOOTER_TEXT",
                        "value": "F7E318",
                        "des": "(Hex without #) Changes the colour of footer text."
                    },
                    {
                        id: "32",
                        "label": "FOOTER_TEXT_ALPHA",
                        "property": "FOOTER_TEXT_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of footer text."
                    }
                ]
            },
            {
                id: "33",
                label: "header",
                child: [
                    {
                        id: "33.1",
                        "label": "HEADER_BACKGROUND",
                        "property": "HEADER_BACKGROUND",
                        "value": "100808",
                        "des": "(Hex without #) Changes the colour of the header background."
                    },
                    {
                        id: "33.2",
                        "label": "HEADER_BACKGROUND_ALPHA",
                        "property": "HEADER_BACKGROUND_ALPHA",
                        "value": "185",
                        "des": "(0 ~ 255) Changes the transparency of the header background."
                    },
                    {
                        id: "35",
                        "label": "HEADER_TEXT",
                        "property": "HEADER_TEXT",
                        "value": "F7E318",
                        "des": "(Hex without #) Changes the colour of header text."
                    },
                    {
                        id: "36",
                        "label": "HEADER_TEXT_ALPHA",
                        "property": "HEADER_TEXT_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of header text."
                    }
                ]
            },
            {
                id: "37",
                label: "help",
                child: [
                    {
                        id: "38",
                        "label": "HELP_BACKGROUND",
                        "property": "HELP_BACKGROUND",
                        "value": "0D0803",
                        "des": "(Hex without #) Changes the background colour of the help-box popup."
                    },
                    {
                        id: "39",
                        "label": "HELP_BACKGROUND_ALPHA",
                        "property": "HELP_BACKGROUND_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of the help-box popup."
                    },
                    {
                        id: "40",
                        "label": "HELP_BORDER",
                        "property": "HELP_BORDER",
                        "value": "F7E318",
                        "des": "(Hex without #) Changes the colour of the border for the help-box popup."
                    },
                    {
                        id: "41",
                        "label": "HELP_BORDER_ALPHA",
                        "property": "HELP_BORDER_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of the border for the help-box popup."
                    },
                    {
                        id: "42",
                        "label": "HELP_CONTENT",
                        "property": "HELP_CONTENT",
                        "value": "A5B2B5",
                        "des": "(Hex without #) Changes the colour for the content text of the help-box popup."
                    },
                    {
                        id: "43",
                        "label": "HELP_TITLE",
                        "property": "HELP_TITLE",
                        "value": "F7E318",
                        "des": "(Hex without #) Changes the colour for the title text of the help-box popup."
                    },
                    {
                        id: "44",
                        "label": "HELP_RADIUS",
                        "property": "HELP_RADIUS",
                        "value": "3",
                        "des": "(Unit: pixels) Changes the corner-radius for the help-box popup background."
                    }
                ]
            },
            {
                id: "45",
                label: "navigation",
                child: [
					{
                        id: "45.2",
                        "label": "ALIGNMENT",
                        "property": "ALIGNMENT",
                        "value": "0",
                        "des": "(INT > 0) Alignment of gylph"
                    },
                    {
                        id: "46",
                        "label": "NAV_A_GLYPH",
                        "property": "NAV_A_GLYPH",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "47",
                        "label": "NAV_A_GLYPH_ALPHA",
                        "property": "NAV_A_GLYPH_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "48",
                        "label": "NAV_A_TEXT",
                        "property": "NAV_A_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "49",
                        "label": "NAV_A_TEXT_ALPHA",
                        "property": "NAV_A_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "50",
                        "label": "NAV_B_GLYPH",
                        "property": "NAV_B_GLYPH",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "51",
                        "label": "NAV_B_GLYPH_ALPHA",
                        "property": "NAV_B_GLYPH_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "52",
                        "label": "NAV_B_TEXT",
                        "property": "NAV_B_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "53",
                        "label": "NAV_B_TEXT_ALPHA",
                        "property": "NAV_B_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "54",
                        "label": "NAV_C_GLYPH",
                        "property": "NAV_C_GLYPH",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "55",
                        "label": "NAV_C_GLYPH_ALPHA",
                        "property": "NAV_C_GLYPH_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "56",
                        "label": "NAV_C_TEXT",
                        "property": "NAV_C_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "57",
                        "label": "NAV_C_TEXT_ALPHA",
                        "property": "NAV_C_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "58",
                        "label": "NAV_X_GLYPH",
                        "property": "NAV_X_GLYPH",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "59",
                        "label": "NAV_X_GLYPH_ALPHA",
                        "property": "NAV_X_GLYPH_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "60",
                        "label": "NAV_X_TEXT",
                        "property": "NAV_X_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "61",
                        "label": "NAV_X_TEXT_ALPHA",
                        "property": "NAV_X_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "62",
                        "label": "NAV_Y_GLYPH",
                        "property": "NAV_Y_GLYPH",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "63",
                        "label": "NAV_Y_GLYPH_ALPHA",
                        "property": "NAV_Y_GLYPH_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "64",
                        "label": "NAV_Y_TEXT",
                        "property": "NAV_Y_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "65",
                        "label": "NAV_Y_TEXT_ALPHA",
                        "property": "NAV_Y_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "66",
                        "label": "NAV_Z_GLYPH",
                        "property": "NAV_Z_GLYPH",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "67",
                        "label": "NAV_Z_GLYPH_ALPHA",
                        "property": "NAV_Z_GLYPH_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "68",
                        "label": "NAV_Z_TEXT",
                        "property": "NAV_Z_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "69",
                        "label": "NAV_Z_TEXT_ALPHA",
                        "property": "NAV_Z_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "70",
                        "label": "NAV_MENU_GLYPH",
                        "property": "NAV_MENU_GLYPH",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "71",
                        "label": "NAV_MENU_GLYPH_ALPHA",
                        "property": "NAV_MENU_GLYPH_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "72",
                        "label": "NAV_MENU_TEXT",
                        "property": "NAV_MENU_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "73",
                        "label": "NAV_MENU_TEXT_ALPHA",
                        "property": "NAV_MENU_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                id: "74",
                label: "list",
                preview: true,
                child: [
                    {
                        id: "75",
                        "label": "LIST_DEFAULT_BACKGROUND",
                        "property": "LIST_DEFAULT_BACKGROUND",
                        "value": "A5B2B5",
                        "des": "(Hex without #) Changes background colour for default-state list items.",
                        preview: true,
                    },
                    {
                        id: "76",
                        "label": "LIST_DEFAULT_BACKGROUND_ALPHA",
                        "property": "LIST_DEFAULT_BACKGROUND_ALPHA",
                        "value": "0",
                        "des": "(0 ~ 255) Changes transparency for the background of default-state list items.",
                        preview: true,
                    },
                    {
                        id: "77",
                        "label": "LIST_DEFAULT_GRADIENT_START",
                        "property": "LIST_DEFAULT_GRADIENT_START",
                        "value": "0",
                        "des": "(Horizontal axis, 0px -> 640px) Sets/changes start location for colour gradient on default-state list items."
                    },
                    {
                        id: "78",
                        "label": "LIST_DEFAULT_GRADIENT_STOP",
                        "property": "LIST_DEFAULT_GRADIENT_STOP",
                        "value": "200",
                        "des": "(Horizontal axis, 0px -> 640px) Sets/changes stop location for colour gradient on default-state list items."
                    },
                    {
                        id: "79",
                        "label": "LIST_DEFAULT_INDICATOR",
                        "property": "LIST_DEFAULT_INDICATOR",
                        "value": "A5B2B5",
                        "des": "(Hex without #) Changes the colour of the indicator located on default-state list items."
                    },
                    {
                        id: "80",
                        "label": "LIST_DEFAULT_INDICATOR_ALPHA",
                        "property": "LIST_DEFAULT_INDICATOR_ALPHA",
                        "value": "0",
                        "des": "(0 ~ 255) Changes the transparency of the indicator located on default-state list items."
                    },
                    {
                        id: "81",
                        "label": "LIST_DEFAULT_TEXT",
                        "property": "LIST_DEFAULT_TEXT",
                        "value": "A5B2B5",
                        "des": "(Hex without #) Changes colour of text within default-state list items.",
                        "preview": true,
                    },
                    {
                        id: "82",
                        "label": "LIST_DEFAULT_TEXT_ALPHA",
                        "property": "LIST_DEFAULT_TEXT_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes transparency of text withiun default-state list items.",
                        "preview": true,
                    },
                    {
                        id: "83",
                        "label": "LIST_DISABLED_TEXT",
                        "property": "LIST_DISABLED_TEXT",
                        "value": "808080",
                        "des": "(Hex without #) Changes colour of text within disabled-state list items."
                    },
                    {
                        id: "84",
                        "label": "LIST_DISABLED_TEXT_ALPHA",
                        "property": "LIST_DISABLED_TEXT_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes transparency of text within disabled-state list items."
                    },
                    {
                        id: "85",
                        "label": "LIST_FOCUS_BACKGROUND",
                        "property": "LIST_FOCUS_BACKGROUND",
                        "value": "F7E318",
                        "des": "(Hex without #) Changes background colour of focus-state list items.",
                        "preview": true,
                    },
                    {
                        id: "86",
                        "label": "LIST_FOCUS_BACKGROUND_ALPHA",
                        "property": "LIST_FOCUS_BACKGROUND_ALPHA",
                        "value": "25",
                        "des": "(0 ~ 255) Changes transparency of the background of focus-state list items.",
                        "preview": true,
                    },
                    {
                        id: "87",
                        "label": "LIST_FOCUS_GRADIENT_START",
                        "property": "LIST_FOCUS_GRADIENT_START",
                        "value": "0",
                        "des": "(Horizontal axis, 0px -> 640px) Sets/changes gradient start location for focus-state list items."
                    },
                    {
                        id: "88",
                        "label": "LIST_FOCUS_GRADIENT_STOP",
                        "property": "LIST_FOCUS_GRADIENT_STOP",
                        "value": "200",
                        "des": "(Horizontal axis, 0px -> 640px) Sets/changes gradient stop location for focus-state list items."
                    },
                    {
                        id: "89",
                        "label": "LIST_FOCUS_INDICATOR",
                        "property": "LIST_FOCUS_INDICATOR",
                        "value": "F7E318",
                        "des": "(Hex without #) Changes the colour of the indicator located on focus-state list items.",
                        "preview": true,
                    },
                    {
                        id: "90",
                        "label": "LIST_FOCUS_INDICATOR_ALPHA",
                        "property": "LIST_FOCUS_INDICATOR_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of the indicator located on focus-state list items.",
                        "preview": true,
                    },
                    {
                        id: "91",
                        "label": "LIST_FOCUS_TEXT",
                        "property": "LIST_FOCUS_TEXT",
                        "value": "F7E318",
                        "des": "(Hex without #) Changes the colour of text located on focus-state list items.",
                        "preview": true,
                    },
                    {
                        id: "92",
                        "label": "LIST_FOCUS_TEXT_ALPHA",
                        "property": "LIST_FOCUS_TEXT_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of text located on focus-state list items.",
                        "preview": true,
                    }
                ]
            },
            {
                id: "93",
                label: "image_list",
                child: [
                    {
                        id: "93.1",
                        "label": "IMAGE_LIST_RADIUS",
                        "property": "IMAGE_LIST_RADIUS",
                        "value": "3",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "93.2",
                        "label": "IMAGE_LIST_RECOLOUR",
                        "property": "IMAGE_LIST_RECOLOUR",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "93.3",
                        "label": "IMAGE_LIST_RECOLOUR_ALPHA",
                        "property": "IMAGE_LIST_RECOLOUR_ALPHA",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "93.4",
                        "label": "IMAGE_PREVIEW_RADIUS",
                        "property": "IMAGE_PREVIEW_RADIUS",
                        "value": "3",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "93.5",
                        "label": "IMAGE_PREVIEW_RECOLOUR",
                        "property": "IMAGE_PREVIEW_RECOLOUR",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "93.6",
                        "label": "IMAGE_PREVIEW_RECOLOUR_ALPHA",
                        "property": "IMAGE_PREVIEW_RECOLOUR_ALPHA",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                id: "108",
                label: "charging",
                preview: true,
                child: [
                    {
                        id: "109",
                        "label": "CHARGER_BACKGROUND",
                        "property": "CHARGER_BACKGROUND",
                        "value": "100808",
                        "des": "(Hex without #) Background color for text on charging screen."
                    },
                    {
                        id: "110",
                        "label": "CHARGER_BACKGROUND_ALPHA",
                        "property": "CHARGER_BACKGROUND_ALPHA",
                        "value": "175",
                        "des": "(0 ~ 255) Background transparency for text on charging screen."
                    },
                    {
                        id: "111",
                        "label": "CHARGER_TEXT",
                        "property": "CHARGER_TEXT",
                        "value": "F7E318",
                        "des": "(Hex without #) Color of the charging text",
                        "preview": true
                    },
                    {
                        id: "112",
                        "label": "CHARGER_TEXT_ALPHA",
                        "property": "CHARGER_TEXT_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Transparency of the charging text",
                        "preview": true
                    },
                    {
                        id: "113",
                        "label": "CHARGER_Y_POS",
                        "property": "CHARGER_Y_POS",
                        "value": "165",
                        "des": "(0px ~ 480px) Changes the y-position of the charging text",
                        "preview": true
                    }
                ]
            },
            {
                id: "114",
                label: "verbose",
                child: [
                    {
                        id: "115",
                        "label": "VERBOSE_BOOT_BACKGROUND",
                        "property": "VERBOSE_BOOT_BACKGROUND",
                        "value": "100808",
                        "des": "(Hex without #) Changes the background colour of the verbose-boot background."
                    },
                    {
                        id: "116",
                        "label": "VERBOSE_BOOT_BACKGROUND_ALPHA",
                        "property": "VERBOSE_BOOT_BACKGROUND_ALPHA",
                        "value": "175",
                        "des": "(0 ~ 255) Changes the transparency of the verbose-boot background."
                    },
                    {
                        id: "117",
                        "label": "VERBOSE_BOOT_TEXT",
                        "property": "VERBOSE_BOOT_TEXT",
                        "value": "F7E318",
                        "des": "(Hex) Changes the colour of the text displayed during verbose-boot."
                    },
                    {
                        id: "118",
                        "label": "VERBOSE_BOOT_TEXT_ALPHA",
                        "property": "VERBOSE_BOOT_TEXT_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of the text during verbose-boot."
                    },
                    {
                        id: "119",
                        "label": "VERBOSE_BOOT_Y_POS",
                        "property": "VERBOSE_BOOT_Y_POS",
                        "value": "165",
                        "des": "(0px ~ 480px) Changes the y-position of text displayed during verbose-boot."
                    }
                ]
            },
            {
                id: "120",
                label: "keyboard",
                child: [
                    {
                        id: "120.1",
                        "label": "OSK_BACKGROUND",
                        "property": "OSK_BACKGROUND",
                        "value": "100808",
                        "des": "(Hex without #) Changes the background colour of the on-screen keyboard."
                    },
                    {
                        id: "120.2",
                        "label": "OSK_BACKGROUND_ALPHA",
                        "property": "OSK_BACKGROUND_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of the background of the on-screen keyboard."
                    },
                    {
                        id: "120.3",
                        "label": "OSK_BORDER",
                        "property": "OSK_BORDER",
                        "value": "F7E318",
                        "des": "(Hex without #) Changes the colour of the border of the on-screen keyboard."
                    },
                    {
                        id: "120.4",
                        "label": "OSK_BORDER_ALPHA",
                        "property": "OSK_BORDER_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of the border of the on-screen keyboard."
                    },
                    {
                        id: "120.5",
                        "label": "OSK_RADIUS",
                        "property": "OSK_RADIUS",
                        "value": "3",
                        "des": "(Unit: pixels) Changes the corner radius of the background of the on-screen keyboard."
                    },
                    {
                        id: "120.6",
                        "label": "OSK_TEXT",
                        "property": "OSK_TEXT",
                        "value": "A5B2B5",
                        "des": "(Hex without #) Changes the colour of the text of the on-screen keyboard."
                    },
                    {
                        id: "120.7",
                        "label": "OSK_TEXT_ALPHA",
                        "property": "OSK_TEXT_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of the text of the on-screen keyboard."
                    },
                    {
                        id: "120.8",
                        "label": "OSK_TEXT_FOCUS",
                        "property": "OSK_TEXT_FOCUS",
                        "value": "F7E318",
                        "des": "(Hex without #) Changes the colour of text for the on-screen keyboard in focus-state."
                    },
                    {
                        id: "120.9",
                        "label": "OSK_TEXT_FOCUS_ALPHA",
                        "property": "OSK_TEXT_FOCUS_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of text for the on-screen keyboard in focus state."
                    },
                    {
                        id: "120.10",
                        "label": "OSK_ITEM_BACKGROUND",
                        "property": "OSK_ITEM_BACKGROUND",
                        "value": "100808",
                        "des": "(Hex without #) Changes the background colour of keys located on the on-screen keyboard."
                    },
                    {
                        id: "120.11",
                        "label": "OSK_ITEM_BACKGROUND_ALPHA",
                        "property": "OSK_ITEM_BACKGROUND_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of the background of keys located on the on-screen keyboard."
                    },
                    {
                        id: "120.12",
                        "label": "OSK_ITEM_BACKGROUND_FOCUS",
                        "property": "OSK_ITEM_BACKGROUND_FOCUS",
                        "value": "100808",
                        "des": "(Hex without #) Changes the colour of the background of focus-state keys on the on-screen keyboard."
                    },
                    {
                        id: "120.13",
                        "label": "OSK_ITEM_BACKGROUND_FOCUS_ALPHA",
                        "property": "OSK_ITEM_BACKGROUND_FOCUS_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of the background of focus-state keys on the on-screen keyboard."
                    },
                    {
                        id: "120.14",
                        "label": "OSK_ITEM_BORDER",
                        "property": "OSK_ITEM_BORDER",
                        "value": "F7E318",
                        "des": "(Hex without #) Changes the colour of the border for keys located on the on-screen keyboard."
                    },
                    {
                        id: "120.15",
                        "label": "OSK_ITEM_BORDER_ALPHA",
                        "property": "OSK_ITEM_BORDER_ALPHA",
                        "value": "175",
                        "des": "(0 ~ 255) Changes the transparency of the border for keys located on the on-screen keyboard."
                    },
                    {
                        id: "120.16",
                        "label": "OSK_ITEM_BORDER_FOCUS",
                        "property": "OSK_ITEM_BORDER_FOCUS",
                        "value": "F7E318",
                        "des": "(Hex without #) Changes the colour of the border for focus-state keys on the on-screen keyboard."
                    },
                    {
                        id: "120.17",
                        "label": "OSK_ITEM_BORDER_FOCUS_ALPHA",
                        "property": "OSK_ITEM_BORDER_FOCUS_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of the border for focus-state keys on the on-screen keyboard."
                    },
                    {
                        id: "120.18",
                        "label": "OSK_ITEM_RADIUS",
                        "property": "OSK_ITEM_RADIUS",
                        "value": "3",
                        "des": "(Unit: pixels) Changes the corner radius for keys on the on-screen keyboard."
                    }
                ]
            },
            {
                id: "139",
                label: "notification",
                child: [
                    {
                        id: "139.1",
                        "label": "MSG_BACKGROUND",
                        "property": "MSG_BACKGROUND",
                        "value": "100808",
                        "des": "(Hex without #) Changes the background colour of notifications."
                    },
                    {
                        id: "139.2",
                        "label": "MSG_BACKGROUND_ALPHA",
                        "property": "MSG_BACKGROUND_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of notification backgrounds."
                    },
                    {
                        id: "139.3",
                        "label": "MSG_BORDER",
                        "property": "MSG_BORDER",
                        "value": "F7E318",
                        "des": "(Hex without #) Changes the border colour of notifications."
                    },
                    {
                        id: "139.4",
                        "label": "MSG_BORDER_ALPHA",
                        "property": "MSG_BORDER_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of notification borders."
                    },
                    {
                        id: "139.5",
                        "label": "MSG_RADIUS",
                        "property": "MSG_RADIUS",
                        "value": "3",
                        "des": "(Unit: pixels) Determines the radius for the corners of the notification box."
                    },
                    {
                        id: "139.6",
                        "label": "MSG_TEXT",
                        "property": "MSG_TEXT",
                        "value": "F7E318",
                        "des": "(Hex without #) Changes the colour of notification text."
                    },
                    {
                        id: "139.7",
                        "label": "MSG_TEXT_ALPHA",
                        "property": "MSG_TEXT_ALPHA",
                        "value": "255",
                        "des": "(0 ~ 255) Changes the transparency of notification text."
                    }
                ]
            },
            {
                id: "140",
                label: "bar",
                preview: true,
                child: [
                    {   id: "140.1",
                        label: "BAR_BACKGROUND", property: "BAR_BACKGROUND", value: "100808",
                        des: "(Hex without #) The background color of the bar",
                        preview: true,
                    },
                    {   id: "140.2",
                        label: "BAR_BACKGROUND_ALPHA", property: "BAR_BACKGROUND_ALPHA", value: "255",
                        des: "(0 ~ 255) The transparency of the background",
                        preview: true,
                    },
                    {   id: "140.3",
                        label: "BAR_BORDER", property: "BAR_BORDER", value: "F7E318",
                        des: "(Hex without #) The background color of the bar border",
                        preview: true,
                    },
                    {   id: "140.4",
                        label: "BAR_BORDER_ALPHA", property: "BAR_BORDER_ALPHA", value: "255",
                        des: "(0 ~ 255) The transparency of the border",
                        preview: true,
                    },
                    {   id: "140.5",
                        label: "BAR_RADIUS", property: "BAR_RADIUS", value: "3",
                        des: "(INT >= 0) THe border radius of the bar in pixel",
                        preview: true,
                    },
                    {   id: "140.6",
                        label: "BAR_PROGRESS_BACKGROUND", property: "BAR_PROGRESS_BACKGROUND", value: "7E730C",
                        des: "(Hex without #) The color of the progress bar's background",
                        preview: true,
                    },
                    {   id: "140.7",
                        label: "BAR_PROGRESS_BACKGROUND_ALPHA", property: "BAR_PROGRESS_BACKGROUND_ALPHA", value: "255",
                        des: "(0 ~ 255) The transparency of the progress bar's background",
                        preview: true,
                    },
                    {   id: "140.8",
                        label: "BAR_PROGRESS_ACTIVE_BACKGROUND", property: "BAR_PROGRESS_ACTIVE_BACKGROUND", value: "F7E318",
                        des: "(Hex without #) The color of the progress bar",
                        preview: true,
                    },
                    {   id: "140.9",
                        label: "BAR_PROGRESS_ACTIVE_BACKGROUND_ALPHA", property: "BAR_PROGRESS_ACTIVE_BACKGROUND_ALPHA", value: "255",
                        des: "(0 ~ 255) The transparency of the progress bar",
                        preview: true,
                    },
                    {   id: "140.10",
                        label: "BAR_PROGRESS_RADIUS", property: "BAR_PROGRESS_RADIUS", value: "3",
                        des: "(INT >= 0) The border radius of the progress bar in pixel",
                        preview: true,
                    },
                    {   id: "140.11",
                        label: "BAR_ICON", property: "BAR_ICON", value: "F7E318",
                        des: "(Hex without #) The color of the bar icon",
                        preview: true,
                    },
                    {   id: "140.12",
                        label: "BAR_ICON_ALPHA", property: "BAR_ICON_ALPHA", value: "255",
                        des: "(0 ~ 255) The transparency of the bar icon",
                        preview: true,
                    },

                ]
            },
            {
                id: "141",
                label: "meta",
                child: [
                    {   id: "141.1",
                        label: "META_CUT", property: "META_CUT", value: "40",
                        des: `(INT >= 0) "decides how many characters on each line before making a new one !" said Jupy.`
                    },
                ]
            },
			{
                id: "142",
                label: "misc",
                child: [
                    {   id: "142.0",
                        label: "STATIC_ALIGNMENT", property: "STATIC_ALIGNMENT", value: "4",
                        des: `
                            (0 ~ 4) Change the functionality of the static image, similar to how it works with content box images
                            0 = Bottom + Front, 1 = Middle + Front, 2 = Top + Front, 3 = Fullscreen + Behind, 4 = Fullscreen + Front
                        `
                    },
                    {   id: "142.1",
                        label: "ANIMATED_BACKGROUND", property: "ANIMATED_BACKGROUND", value: "0",
                        des: `(0 or 1) Trigger background image format. 0 = PNG, 1 = GIF`
                    },
					{   id: "142.2",
						label: "NAVIGATION_TYPE", property: "NAVIGATION_TYPE", value: "0",
						des: `(0 or 1) Navigtion direction. 0 = Up & Down, 1 = Left & Right`
					},
					{   id: "142.3",
						label: "CONTENT_PADDING_LEFT", property: "CONTENT_PADDING_LEFT", value: "0",
						des: `(INT >= 0) Left content padding`
					},
					{   id: "142.4",
						label: "CONTENT_WIDTH", property: "CONTENT_WIDTH", value: "0",
						des: `(INT >= 0) Width of content`
					},
                ]
            },
			{
                id: "143",
                label: "roll",
                child: [
                    {   id: "143.0",
                        label: "ROLL_TEXT", property: "ROLL_TEXT", value: "7E730C",
                        des: `(Hex without #)`
                    },
					{   id: "143.1",
                        label: "ROLL_TEXT_ALPHA", property: "ROLL_TEXT_ALPHA", value: "175",
                        des: `(0 ~ 255) Transparency`
                    },
					{   id: "143.2",
                        label: "ROLL_BACKGROUND", property: "ROLL_BACKGROUND", value: "100808",
                        des: `(Hex without #)`
                    },
					{   id: "143.3",
                        label: "ROLL_BACKGROUND_ALPHA", property: "ROLL_BACKGROUND_ALPHA", value: "0",
                        des: `(0 ~ 255) Transparency`
                    },
					{   id: "143.4",
                        label: "ROLL_RADIUS", property: "ROLL_RADIUS", value: "3",
                        des: `(INT >= 0) Border radius in pixel`
                    },
					{   id: "143.5",
                        label: "ROLL_SELECT_TEXT", property: "ROLL_SELECT_TEXT", value: "F7E318",
                        des: `(Hex without #)`
                    },
					{   id: "143.6",
                        label: "ROLL_SELECT_TEXT_ALPHA", property: "ROLL_SELECT_TEXT_ALPHA", value: "255",
                        des: `(0 ~ 255) Transparency`
                    },
					{   id: "143.7",
                        label: "ROLL_SELECT_BACKGROUND", property: "ROLL_SELECT_BACKGROUND", value: "7E730C",
                        des: `(Hex without #)`
                    },
					{   id: "143.8",
                        label: "ROLL_SELECT_BACKGROUND_ALPHA", property: "ROLL_SELECT_BACKGROUND_ALPHA", value: "175",
                        des: `(0 ~ 255) Transparency`
                    },
					{   id: "143.9",
                        label: "ROLL_SELECT_RADIUS", property: "ROLL_SELECT_RADIUS", value: "3",
                        des: `(INT >= 0) Border radius in pixel`
                    },
					{   id: "143.10",
                        label: "ROLL_BORDER_COLOUR", property: "ROLL_BORDER_COLOUR", value: "F7E318",
                        des: `(Hex without #)`
                    },
					{   id: "143.11",
						label: "ROLL_BORDER_ALPHA", property: "ROLL_BORDER_ALPHA", value: "175",
						des: `(0 ~ 255) Transparency`
					},
					{   id: "143.12",
						label: "ROLL_BORDER_RADIUS", property: "ROLL_BORDER_RADIUS", value: "3",
						des: `(INT >= 0) Border radius in pixel`
					},
                ]
            },
			// Assets
            {
                id: "147",
                label: "images",
				preview: true,
                child: [
                    {
                        id: "148",
                        "label": "Bootlogo:",
                        "property": "bootlogo",
                        "value": [],
                        "format": [".bmp"],
                        "des": "(.bmp) Your boot logo",
                        "folderPath": ["image"],
						"preview": true,
                    },
					...defaultFixedImageAssetInfo.map((dfiai, i) => {
						return {
							id: `148.${i+1}`,
							label: dfiai.label,
							property: dfiai.property,
							value: [],
							format: [".png", ".gif"],
							des: "",
							folderPath: dfiai.path,
							preview: false
						} as MUOSThemeChild
					}),
                ]
            },
            { 
                id: "174",
                label: "sounds",
                child: [
                    {
                        id: "175",
                        "label": "Shutdown sound:",
                        "property": "shutdown",
                        "value": [],
                        "format": [".mp3"],
                        "folderPath": ["sound"],
                        "des": "(.mp3) Your shudown sound"
                    },
                    {
                        id: "176",
                        "label": "Reboot sound:",
                        "property": "reboot",
                        "value": [],
                        "format": [".mp3"],
                        "folderPath": ["sound"],
                        "des": "(.mp3) Your reboot sound"
                    },
                    {
                        id: "177",
                        "label": "Navigate sound:",
                        "property": "navigate",
                        "value": [],
                        "format": [".mp3"],
                        "folderPath": ["sound"],
                        "des": "(.mp3) Your navigation sound"
                    },
                    {
                        id: "178",
                        "label": "Confirm sound:",
                        "property": "confirm",
                        "value": [],
                        "format": [".mp3"],
                        "folderPath": ["sound"],
                        "des": "(.mp3) Your 「confirm」 sound"
                    },
                    {
                        id: "179",
                        "label": "Back sound:",
                        "property": "back",
                        "value": [],
                        "format": [".mp3"],
                        "folderPath": ["sound"],
                        "des": "(.mp3) Your 「back」 sound"
                    }
                ]
            },
            { 
                id: "180",
                label: "music",
                child: [
                    {
                        id: "181",
                        "label": "music file:",
                        "property": "default",
                        "value": [], 
                        "format": [".mp3"],
                        "folderPath": ["music"],
                        "des": "(.mp3) Your music"
                    }
                ]
            },
            {
                id: "190",
                label: "fonts",
                child: [
                    {
                        id: "190.1",
                        "label": "Font (See: <a href=https://muos.dev/help/theme/font target=__blank>here !</a>)",
                        "property": "default",
                        "value": [],
                        "format": [".bin"],
                        "folderPath": ["font"],
                        "des": "(.bin) A binary file of a converted font file"
                    }
                ]
            },
        ]
        return tmp
    },
	subscribeToChild(id: string){
		for(let i = 0; i < selectedTheme.value.values.length; i++){
            for(let j = 0; j < selectedTheme.value.values[i].child.length; j++){
                if(selectedTheme.value.values[i].child[j].id === id){
					const tmpSub = new Subject<MUOSThemeChild>();
					const watcherDestroyer = watch(
						() => selectedTheme.value.values[i].child[j].value,
						() => {
							tmpSub.next(selectedTheme.value.values[i].child[j]);
						}
					)
					return {
						subject: tmpSub,
						destroy: () => {
							watcherDestroyer();
							tmpSub.complete();
						}
					}
				}
            }
        }
		return null;
	},
    getChild(id: string){
        for(let i = 0; i < selectedTheme.value.values.length; i++){
            for(let j = 0; j < selectedTheme.value.values[i].child.length; j++){
                if(selectedTheme.value.values[i].child[j].id === id)
                    return selectedTheme.value.values[i].child[j];
            }
        }
        return null;
    },
    resetGroup(groupLabel: string){
        for(let i = 0; i < selectedTheme.value.values.length; i++){
            if(selectedTheme.value.values[i].label === groupLabel){
                for(let j = 0; j < selectedTheme.value.values[i].child.length; j++){
                    if(Is.array(selectedTheme.value.values[i].child[j].value)){
                        selectedTheme.value.values[i].child[j].value = []
                        continue;
                    }
                    selectedTheme.value.values[i].child[j].value = "";
                }
                return;
            }
        }
    }
}

export const selectedValueGroupLabel: Ref<string> = ref("");
export const selectedValueGroup = computed(() => {
    if(selectedValueGroupLabel.value === "") return null;
    const foundGroup = selectedTheme.value.values.find(group => group.label === selectedValueGroupLabel.value);
    if(!foundGroup) return null;
    return foundGroup;
})