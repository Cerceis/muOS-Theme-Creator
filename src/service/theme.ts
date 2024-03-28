/**
 * All theme related logic.
 * Basically the main file.
 */
import { Generate } from "cerceis-lib";
import { type Ref, ref, computed } from "vue";
import { assetFunc } from "@/service/assets";

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
    value: any,
    format?: string,
    folderPath?: string[],
    preview?: boolean
}
export const themes: Ref<MUOSTheme[]> = ref([]);
export const selectedThemeId: Ref<string> = ref("");
export const selectedTheme = computed(() => {
    if (themes.value.length === 0) {
        themeFunc.new();
        return themes.value[0];
    }
    const foundTheme = themes.value.find(t => t.id === selectedThemeId.value);
    if (!foundTheme) return themes.value[0];
    return foundTheme;
})

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
        return [
            {
                id: "1",
                label: "background",
                preview: true,
                child: [
                    {
                        id: "2",
                        label: "BACKGROUND", property: "BACKGROUND", value: "F8BBD0",
                        des: "(HEX) Background colours baby! shows as right to left gradient if you use a wallpaper image",
                        preview: true,
                    },
                    {
                        id: "3",
                        label: "BACKGROUND_ALPHA", property: "BACKGROUND_ALPHA", value: "255",
                        des: "(0~255) How visible you want the background to be",
                        preview: true,
                    },
                ]
            },
            {
                id: "4",
                label: "font",
                child: [
                    {
                        id: "5",
                        label: "FONT_PAD_TOP", property: "FONT_PAD_TOP", value: "0",
                        des: "Space above font"
                    },
                    {
                        id: "6",
                        label: "FONT_PAD_BOTTOM", property: "FONT_PAD_BOTTOM", value: "0",
                        des: "Space below font"
                    },
                    {
                        id: "7",
                        label: "FONT_LIST_PAD_TOP", property: "FONT_LIST_PAD_TOP", value: "-1",
                        des: "Space ?? font"
                    },
                    {
                        id: "8",
                        label: "FONT_LIST_PAD_BOTTOM", property: "FONT_LIST_PAD_BOTTOM", value: "0",
                        des: "Space ?? font"
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
                        "des": "battery colour",
                        "preview": true,
                    },
                    {
                        id: "11",
                        "label": "BATTERY_ACTIVE",
                        "property": "BATTERY_ACTIVE",
                        "value": "85F718",
                        "des": "charging battery colour",
                        "preview": true,
                    },
                    {
                        id: "12",
                        "label": "BATTERY_LOW",
                        "property": "BATTERY_LOW",
                        "value": "D35C54",
                        "des": "low battery colour",
                        "preview": true,
                    },
                    {
                        id: "13",
                        "label": "BATTERY_NORMAL_ALPHA",
                        "property": "BATTERY_NORMAL_ALPHA",
                        "value": "255",
                        "des": "battery transparency",
                        "preview": true,
                    },
                    {
                        id: "14",
                        "label": "BATTERY_ACTIVE_ALPHA",
                        "property": "BATTERY_ACTIVE_ALPHA",
                        "value": "255",
                        "des": "charging battery transparency",
                        "preview": true,
                    },
                    {
                        id: "15",
                        "label": "BATTERY_LOW_ALPHA",
                        "property": "BATTERY_LOW_ALPHA",
                        "value": "255",
                        "des": "low battery transparency",
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
                        "des": "network icon colour",
                        preview: true,
                    },
                    {
                        id: "18",
                        "label": "NETWORK_ACTIVE",
                        "property": "NETWORK_ACTIVE",
                        "value": "85F718",
                        "des": "network in-use colour",
                        preview: true,
                    },
                    {
                        id: "19",
                        "label": "NETWORK_NORMAL_ALPHA",
                        "property": "NETWORK_NORMAL_ALPHA",
                        "value": "255",
                        "des": "network colour transparency",
                        preview: true,
                    },
                    {
                        id: "20",
                        "label": "NETWORK_ACTIVE_ALPHA",
                        "property": "NETWORK_ACTIVE_ALPHA",
                        "value": "255",
                        "des": "network in-use colour transparency",
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
                        "des": "bluetooth colour",
                        preview: true,
                    },
                    {
                        id: "23",
                        "label": "BLUETOOTH_ACTIVE",
                        "property": "BLUETOOTH_ACTIVE",
                        "value": "85F718",
                        "des": "bluetooth in-use colour",
                        preview: true,
                    },
                    {
                        id: "24",
                        "label": "BLUETOOTH_NORMAL_ALPHA",
                        "property": "BLUETOOTH_NORMAL_ALPHA",
                        "value": "255",
                        "des": "bluetooth transparency",
                        preview: true,
                    },
                    {
                        id: "25",
                        "label": "BLUETOOTH_ACTIVE_ALPHA",
                        "property": "BLUETOOTH_ACTIVE_ALPHA",
                        "value": "255",
                        "des": "bluetooth in-use transparency",
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
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!",
                        preview: true,
                    },
                    {
                        id: "28",
                        "label": "DATETIME_ALPHA",
                        "property": "DATETIME_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!",
                        preview: true,
                    }
                ]
            },
            {
                id: "29",
                label: "footer",
                child: [
                    {
                        id: "30",
                        "label": "FOOTER_BACKGROUND",
                        "property": "FOOTER_BACKGROUND",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "31",
                        "label": "FOOTER_TEXT",
                        "property": "FOOTER_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "32",
                        "label": "FOOTER_TEXT_ALPHA",
                        "property": "FOOTER_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                id: "33",
                label: "header",
                child: [
                    {
                        id: "34",
                        "label": "HEADER_BACKGROUND",
                        "property": "HEADER_BACKGROUND",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "35",
                        "label": "HEADER_TEXT",
                        "property": "HEADER_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "36",
                        "label": "HEADER_TEXT_ALPHA",
                        "property": "HEADER_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
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
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "39",
                        "label": "HELP_BACKGROUND_ALPHA",
                        "property": "HELP_BACKGROUND_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "40",
                        "label": "HELP_BORDER",
                        "property": "HELP_BORDER",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "41",
                        "label": "HELP_BORDER_ALPHA",
                        "property": "HELP_BORDER_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "42",
                        "label": "HELP_CONTENT",
                        "property": "HELP_CONTENT",
                        "value": "A5B2B5",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "43",
                        "label": "HELP_TITLE",
                        "property": "HELP_TITLE",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "44",
                        "label": "HELP_RADIUS",
                        "property": "HELP_RADIUS",
                        "value": "3",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                id: "45",
                label: "navigation",
                child: [
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
                        "des": "No description available yet. Check back soon!",
                        preview: true,
                    },
                    {
                        id: "76",
                        "label": "LIST_DEFAULT_BACKGROUND_ALPHA",
                        "property": "LIST_DEFAULT_BACKGROUND_ALPHA",
                        "value": "0",
                        "des": "No description available yet. Check back soon!",
                        preview: true,
                    },
                    {
                        id: "77",
                        "label": "LIST_DEFAULT_GRADIENT_START",
                        "property": "LIST_DEFAULT_GRADIENT_START",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "78",
                        "label": "LIST_DEFAULT_GRADIENT_STOP",
                        "property": "LIST_DEFAULT_GRADIENT_STOP",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "79",
                        "label": "LIST_DEFAULT_INDICATOR",
                        "property": "LIST_DEFAULT_INDICATOR",
                        "value": "A5B2B5",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "80",
                        "label": "LIST_DEFAULT_INDICATOR_ALPHA",
                        "property": "LIST_DEFAULT_INDICATOR_ALPHA",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "81",
                        "label": "LIST_DEFAULT_TEXT",
                        "property": "LIST_DEFAULT_TEXT",
                        "value": "A5B2B5",
                        "des": "No description available yet. Check back soon!",
                        "preview": true,
                    },
                    {
                        id: "82",
                        "label": "LIST_DEFAULT_TEXT_ALPHA",
                        "property": "LIST_DEFAULT_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!",
                        "preview": true,
                    },
                    {
                        id: "83",
                        "label": "LIST_DISABLED_TEXT",
                        "property": "LIST_DISABLED_TEXT",
                        "value": "808080",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "84",
                        "label": "LIST_DISABLED_TEXT_ALPHA",
                        "property": "LIST_DISABLED_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "85",
                        "label": "LIST_FOCUS_BACKGROUND",
                        "property": "LIST_FOCUS_BACKGROUND",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!",
                        "preview": true,
                    },
                    {
                        id: "86",
                        "label": "LIST_FOCUS_BACKGROUND_ALPHA",
                        "property": "LIST_FOCUS_BACKGROUND_ALPHA",
                        "value": "25",
                        "des": "No description available yet. Check back soon!",
                        "preview": true,
                    },
                    {
                        id: "87",
                        "label": "LIST_FOCUS_GRADIENT_START",
                        "property": "LIST_FOCUS_GRADIENT_START",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "88",
                        "label": "LIST_FOCUS_GRADIENT_STOP",
                        "property": "LIST_FOCUS_GRADIENT_STOP",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "89",
                        "label": "LIST_FOCUS_INDICATOR",
                        "property": "LIST_FOCUS_INDICATOR",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!",
                        "preview": true,
                    },
                    {
                        id: "90",
                        "label": "LIST_FOCUS_INDICATOR_ALPHA",
                        "property": "LIST_FOCUS_INDICATOR_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!",
                        "preview": true,
                    },
                    {
                        id: "91",
                        "label": "LIST_FOCUS_TEXT",
                        "property": "LIST_FOCUS_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!",
                        "preview": true,
                    },
                    {
                        id: "92",
                        "label": "LIST_FOCUS_TEXT_ALPHA",
                        "property": "LIST_FOCUS_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!",
                        "preview": true,
                    }
                ]
            },
            {
                id: "93",
                label: "image list",
                child: [
                    {
                        id: "94",
                        "label": "IMAGE_LIST_BORDER",
                        "property": "IMAGE_LIST_BORDER",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "95",
                        "label": "IMAGE_LIST_BORDER_ALPHA",
                        "property": "IMAGE_LIST_BORDER_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "96",
                        "label": "IMAGE_LIST_RADIUS",
                        "property": "IMAGE_LIST_RADIUS",
                        "value": "3",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "97",
                        "label": "IMAGE_LIST_SHADOW",
                        "property": "IMAGE_LIST_SHADOW",
                        "value": "FF00FF",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "98",
                        "label": "IMAGE_LIST_SHADOW_ALPHA",
                        "property": "IMAGE_LIST_SHADOW_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "99",
                        "label": "IMAGE_LIST_RECOLOUR",
                        "property": "IMAGE_LIST_RECOLOUR",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "100",
                        "label": "IMAGE_LIST_RECOLOUR_ALPHA",
                        "property": "IMAGE_LIST_RECOLOUR_ALPHA",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "101",
                        "label": "IMAGE_PREVIEW_BORDER",
                        "property": "IMAGE_PREVIEW_BORDER",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "102",
                        "label": "IMAGE_PREVIEW_BORDER_ALPHA",
                        "property": "IMAGE_PREVIEW_BORDER_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "103",
                        "label": "IMAGE_PREVIEW_RADIUS",
                        "property": "IMAGE_PREVIEW_RADIUS",
                        "value": "3",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "104",
                        "label": "IMAGE_PREVIEW_SHADOW",
                        "property": "IMAGE_PREVIEW_SHADOW",
                        "value": "FF00FF",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "105",
                        "label": "IMAGE_PREVIEW_SHADOW_ALPHA",
                        "property": "IMAGE_PREVIEW_SHADOW_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "106",
                        "label": "IMAGE_PREVIEW_RECOLOUR",
                        "property": "IMAGE_PREVIEW_RECOLOUR",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "107",
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
                child: [
                    {
                        id: "109",
                        "label": "CHARGER_BACKGROUND",
                        "property": "CHARGER_BACKGROUND",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "110",
                        "label": "CHARGER_BACKGROUND_ALPHA",
                        "property": "CHARGER_BACKGROUND_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "111",
                        "label": "CHARGER_TEXT",
                        "property": "CHARGER_TEXT",
                        "value": "F7E318",
                        "des": "(Hex) Color of the charging text",
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
                        "des": "No description available yet. Check back soon!"
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
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "116",
                        "label": "VERBOSE_BOOT_BACKGROUND_ALPHA",
                        "property": "VERBOSE_BOOT_BACKGROUND_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "117",
                        "label": "VERBOSE_BOOT_TEXT",
                        "property": "VERBOSE_BOOT_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "118",
                        "label": "VERBOSE_BOOT_TEXT_ALPHA",
                        "property": "VERBOSE_BOOT_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "119",
                        "label": "VERBOSE_BOOT_Y_POS",
                        "property": "VERBOSE_BOOT_Y_POS",
                        "value": "165",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                id: "120",
                label: "keyboard",
                child: [
                    {
                        id: "121",
                        "label": "OSK_BACKGROUND",
                        "property": "OSK_BACKGROUND",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "122",
                        "label": "OSK_BACKGROUND_ALPHA",
                        "property": "OSK_BACKGROUND_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "123",
                        "label": "OSK_BORDER",
                        "property": "OSK_BORDER",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "124",
                        "label": "OSK_BORDER_ALPHA",
                        "property": "OSK_BORDER_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "125",
                        "label": "OSK_RADIUS",
                        "property": "OSK_RADIUS",
                        "value": "3",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "126",
                        "label": "OSK_TEXT",
                        "property": "OSK_TEXT",
                        "value": "A5B2B5",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "127",
                        "label": "OSK_TEXT_ALPHA",
                        "property": "OSK_TEXT_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "128",
                        "label": "OSK_TEXT_FOCUS",
                        "property": "OSK_TEXT_FOCUS",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "129",
                        "label": "OSK_TEXT_FOCUS_ALPHA",
                        "property": "OSK_TEXT_FOCUS_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "130",
                        "label": "OSK_ITEM_BACKGROUND",
                        "property": "OSK_ITEM_BACKGROUND",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "131",
                        "label": "OSK_ITEM_BACKGROUND_ALPHA",
                        "property": "OSK_ITEM_BACKGROUND_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "132",
                        "label": "OSK_ITEM_BACKGROUND_FOCUS",
                        "property": "OSK_ITEM_BACKGROUND_FOCUS",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "133",
                        "label": "OSK_ITEM_BACKGROUND_FOCUS_ALPHA",
                        "property": "OSK_ITEM_BACKGROUND_FOCUS_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "134",
                        "label": "OSK_ITEM_BORDER",
                        "property": "OSK_ITEM_BORDER",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "135",
                        "label": "OSK_ITEM_BORDER_ALPHA",
                        "property": "OSK_ITEM_BORDER_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "136",
                        "label": "OSK_ITEM_BORDER_FOCUS",
                        "property": "OSK_ITEM_BORDER_FOCUS",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "137",
                        "label": "OSK_ITEM_BORDER_FOCUS_ALPHA",
                        "property": "OSK_ITEM_BORDER_FOCUS_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "138",
                        "label": "OSK_ITEM_RADIUS",
                        "property": "OSK_ITEM_RADIUS",
                        "value": "3",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                id: "139",
                label: "notification",
                child: [
                    {
                        id: "140",
                        "label": "MSG_BACKGROUND",
                        "property": "MSG_BACKGROUND",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "141",
                        "label": "MSG_BACKGROUND_ALPHA",
                        "property": "MSG_BACKGROUND_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "142",
                        "label": "MSG_BORDER",
                        "property": "MSG_BORDER",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "143",
                        "label": "MSG_BORDER_ALPHA",
                        "property": "MSG_BORDER_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "144",
                        "label": "MSG_RADIUS",
                        "property": "MSG_RADIUS",
                        "value": "3",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "145",
                        "label": "MSG_TEXT",
                        "property": "MSG_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        id: "146",
                        "label": "MSG_TEXT_ALPHA",
                        "property": "MSG_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                id: "147",
                label: "images",
				preview: true,
                child: [
                    {
                        id: "148",
                        "label": "Bootlogo:",
                        "property": "bootlogo",
                        "value": [assetFunc.getByFilename("bootlogo").asFile()],
                        "format": ".bmp",
                        "des": "(.bmp) Your boot logo",
                        "folderPath": ["image"],
						"preview": true,
                    },
                    {
                        id: "149",
                        "label": "Wallpaper (png only):",
                        "property": "default",
                        "value": [assetFunc.getByFilename("default-wallpaper").asFile()],
                        "format": ".png",
                        "des": "",
                        "folderPath": ["image", "wall"],
						"preview": true,
                    },
                    {
                        id: "150",
                        "label": "[Depreciated on v11] Footer:",
                        "property": "default",
                        "value": [],
                        "format": ".png",
                        "des": "",
                        "folderPath": ["image", "footer"]
                    },
                    {
                        id: "151",
                        "label": "[Depreciated on v11] Header:",
                        "property": "default",
                        "value": [],
                        "format": ".png",
                        "des": "",
                        "folderPath": ["image", "header"]
                    },
                    {
                        id: "152",
                        "label": "Core Assignment Wallpaper:",
                        "property": "muxassign",
                        "value": [],
                        "format": ".png",
                        "des": "",
                        "folderPath": ["image", "wall"],
                        "preview": true
                    },
                    {
                        id: "153",
                        "label": "Charging Wallpaper:",
                        "property": "muxcharge",
                        "value": [assetFunc.getByFilename("default-muxcharge").asFile()],
                        "format": ".png",
                        "des": "",
                        "folderPath": ["image", "wall"],
                        "preview": true
                    },
                    {
                        id: "154",
                        "label": "Config Screen Wallpaper:",
                        "property": "muxconfig",
                        "value": [],
                        "format": ".png",
                        "des": "",
                        "folderPath": ["image", "wall"]
                    },
                    {
                        id: "155",
                        "label": "Credits Screen Wallpaper:",
                        "property": "muxcredits",
                        "value": [],
                        "format": ".png",
                        "des": "",
                        "folderPath": ["image", "wall"]
                    },
                    {
                        id: "156",
                        "label": "Device Selection Screen Wallpaper:",
                        "property": "muxdevice",
                        "value": [],
                        "format": ".png",
                        "des": "",
                        "folderPath": ["image", "wall"]
                    },
                    {
                        id: "157",
                        "label": "Favourites Wallpaper:",
                        "property": "muxfavourite",
                        "value": [],
                        "format": ".png",
                        "des": "",
                        "folderPath": ["image", "wall"]
                    },
                    {
                        id: "158",
                        "label": "History Wallpaper:",
                        "property": "muxhistory",
                        "value": [],
                        "format": ".png",
                        "des": "",
                        "folderPath": ["image", "wall"]
                    },
                    {
                        id: "159",
                        "label": "Information Screen Wallpaper:",
                        "property": "muxinfo",
                        "value": [],
                        "format": ".png",
                        "des": "",
                        "folderPath": ["image", "wall"]
                    },
                    {
                        id: "160",
                        "label": "Home Screen Wallpaper:",
                        "property": "muxlaunch",
                        "value": [],
                        "format": ".png",
                        "des": "",
                        "folderPath": ["image", "wall"],
						"preview": true,
                    },
                    {
                        id: "161",
                        "label": "Network Configuration Screen Wallpaper:",
                        "property": "muxnetwork",
                        "value": [],
                        "format": ".png",
                        "des": "",
                        "folderPath": ["image", "wall"]
                    },
                    {
                        id: "162",
                        "label": "Explore Content Wallpaper:",
                        "property": "muxplore",
                        "value": [],
                        "format": ".png",
                        "des": "", 
                        "folderpath": ["image", "wall"]
                    },
                    {
                        id: "163",
                        "label": "Reset Screen Wallpaper:",
                        "property": "muxreset",
                        "value": [],
                        "format": ".png",
                        "des": "", 
                        "folderpath": ["image", "wall"]
                    },
                    {
                        id: "164",
                        "label": "RTC Configuration Wallpaper:",
                        "property": "muxrtc",
                        "value": [],
                        "format": ".png",
                        "des": "", 
                        "folderpath": ["image", "wall"]
                    },
                    {
                        id: "165",
                        "label": "Verbose Boot Startup Wallpaper:",
                        "property": "muxstart",
                        "value": [assetFunc.getByFilename("default-muxcharge").asFile()],
                        "format": ".png",
                        "des": "", 
                        "folderpath": ["image", "wall"],
                        "preview": true
                    },
                    {
                        id: "166",
                        "label": "System Information Wallpaper:",
                        "property": "muxsysinfo",
                        "value": [],
                        "format": ".png",
                        "des": "", 
                        "folderpath": ["image", "wall"]
                    },
                    {
                        id: "167",
                        "label": "Input Tester Wallpaper:",
                        "property": "muxtester",
                        "value": [],
                        "format": ".png",
                        "des": "", 
                        "folderpath": ["image", "wall"]
                    },
                    {
                        id: "168",
                        "label": "Theme Manager Wallpaper:",
                        "property": "muxtheme",
                        "value": [],
                        "format": ".png",
                        "des": "", 
                        "folderpath": ["image", "wall"]
                    },
                    {
                        id: "169",
                        "label": "Time Zone Configuration Wallpaper:",
                        "property": "muxtimezone",
                        "value": [],
                        "format": ".png",
                        "des": "", 
                        "folderpath": ["image", "wall"]
                    },
                    {
                        id: "170",
                        "label": "Activity Tracker Wallpaper:",
                        "property": "muxtracker",
                        "value": [],
                        "format": ".png",
                        "des": "", 
                        "folderpath": ["image", "wall"]
                    },
                    {
                        id: "171",
                        "label": "Advanced Settings Wallpaper:",
                        "property": "muxtweakadv",
                        "value": [],
                        "format": ".png",
                        "des": "", 
                        "folderpath": ["image", "wall"]
                    },
                    {
                        id: "172",
                        "label": "General Settings Wallpaper:",
                        "property": "muxtweakgen",
                        "value": [],
                        "format": ".png",
                        "des": "", 
                        "folderpath": ["image", "wall"]
                    },
                    {
                        id: "173",
                        "label": "Web Services Wallpaper:",
                        "property": "muxwebserv",
                        "value": [],
                        "format": ".png",
                        "des": "", 
                        "folderpath": ["image", "wall"]
                    }
                ]
            },
            { // TODO: 
                id: "174",
                label: "sounds",
                child: [
                    {
                        id: "175",
                        "label": "Shutdown sound:",
                        "property": "shutdown",
                        "value": [],
                        "format": "",
                        "des": ""
                    },
                    {
                        id: "176",
                        "label": "Reboot sound:",
                        "property": "reboot",
                        "value": [],
                        "format": "",
                        "des": ""
                    },
                    {
                        id: "177",
                        "label": "Navigate sound:",
                        "property": "navigate",
                        "value": [],
                        "format": "",
                        "des": ""
                    },
                    {
                        id: "178",
                        "label": "Confirm sound:",
                        "property": "confirm",
                        "value": [],
                        "format": "",
                        "des": ""
                    },
                    {
                        id: "179",
                        "label": "Back sound:",
                        "property": "back",
                        "value": [],
                        "format": "",
                        "des": ""
                    }
                ]
            },
            { // TODO: 
                id: "180",
                label: "music",
                child: [
                    {
                        id: "181",
                        "label": "music file:",
                        "property": "musicFile",
                        "value": [],
                        "format": ".mp3",
                        "des": ""
                    }
                ]
            },
            // TODO: fonts
        ] as MUOSThemeValues[]
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
}

export const selectedValueGroupLabel: Ref<string> = ref("");
export const selectedValueGroup = computed(() => {
    if(selectedValueGroupLabel.value === "") return null;
    const foundGroup = selectedTheme.value.values.find(group => group.label === selectedValueGroupLabel.value);
    if(!foundGroup) return null;
    return foundGroup;
})