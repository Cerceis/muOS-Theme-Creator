/**
 * All theme related logic.
 * Basically the main file.
 */
import { Generate } from "cerceis-lib";
import { type Ref, ref, computed } from "vue";

type MUOSTheme = {
    id: string,
    zipName: string,
    author: string,
    values: MUOSThemeValues[]
}
export type MUOSThemeValues = {
    label: string,
    des?: string,
    child: {
        label: string,
        property: string,
        des: string,
        value: any,
        format?: string,
    }[]
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
                label: "background",
                child: [
                    {
                        label: "BACKGROUND (HEX)", property: "BACKGROUND", value: "100808",
                        des: "Background colours baby! shows as right to left gradient if you use a wallpaper image"
                    },
                    {
                        label: "BACKGROUND_ALPHA", property: "BACKGROUND_ALPHA", value: "0",
                        des: "How visible you want the background to be"
                    },
                ]
            },
            {
                label: "font",
                child: [
                    {
                        label: "FONT_PAD_TOP", property: "FONT_PAD_TOP", value: "0",
                        des: "Space above font"
                    },
                    {
                        label: "FONT_PAD_BOTTOM", property: "FONT_PAD_BOTTOM", value: "0",
                        des: "Space below font"
                    },
                    {
                        label: "FONT_LIST_PAD_TOP", property: "FONT_LIST_PAD_TOP", value: "-1",
                        des: "Space ?? font"
                    },
                    {
                        label: "FONT_LIST_PAD_BOTTOM", property: "FONT_LIST_PAD_BOTTOM", value: "0",
                        des: "Space ?? font"
                    },
                ]
            },
            {
                label: "battery",
                child: [
                    {
                        "label": "BATTERY_NORMAL",
                        "property": "BATTERY_NORMAL",
                        "value": "F7E318",
                        "des": "battery colour"
                    },
                    {
                        "label": "BATTERY_ACTIVE",
                        "property": "BATTERY_ACTIVE",
                        "value": "85F718",
                        "des": "charging battery colour"
                    },
                    {
                        "label": "BATTERY_LOW",
                        "property": "BATTERY_LOW",
                        "value": "D35C54",
                        "des": "low battery colour"
                    },
                    {
                        "label": "BATTERY_NORMAL_ALPHA",
                        "property": "BATTERY_NORMAL_ALPHA",
                        "value": "255",
                        "des": "battery transparency"
                    },
                    {
                        "label": "BATTERY_ACTIVE_ALPHA",
                        "property": "BATTERY_ACTIVE_ALPHA",
                        "value": "255",
                        "des": "charging battery transparency"
                    },
                    {
                        "label": "BATTERY_LOW_ALPHA",
                        "property": "BATTERY_LOW_ALPHA",
                        "value": "255",
                        "des": "low battery transparency"
                    }
                ]
            },
            {
                label: "network",
                child: [
                    {
                        "label": "NETWORK_NORMAL",
                        "property": "NETWORK_NORMAL",
                        "value": "F7E318",
                        "des": "network icon colour"
                    },
                    {
                        "label": "NETWORK_ACTIVE",
                        "property": "NETWORK_ACTIVE",
                        "value": "85F718",
                        "des": "network in-use colour"
                    },
                    {
                        "label": "NETWORK_NORMAL_ALPHA",
                        "property": "NETWORK_NORMAL_ALPHA",
                        "value": "255",
                        "des": "network colour transparency"
                    },
                    {
                        "label": "NETWORK_ACTIVE_ALPHA",
                        "property": "NETWORK_ACTIVE_ALPHA",
                        "value": "255",
                        "des": "network in-use colour transparency"
                    }
                ]
            },
            {
                label: "bluetooth",
                child: [
                    {
                        "label": "BLUETOOTH_NORMAL",
                        "property": "BLUETOOTH_NORMAL",
                        "value": "F7E318",
                        "des": "bluetooth colour"
                    },
                    {
                        "label": "BLUETOOTH_ACTIVE",
                        "property": "BLUETOOTH_ACTIVE",
                        "value": "85F718",
                        "des": "bluetooth in-use colour"
                    },
                    {
                        "label": "BLUETOOTH_NORMAL_ALPHA",
                        "property": "BLUETOOTH_NORMAL_ALPHA",
                        "value": "255",
                        "des": "bluetooth transparency"
                    },
                    {
                        "label": "BLUETOOTH_ACTIVE_ALPHA",
                        "property": "BLUETOOTH_ACTIVE_ALPHA",
                        "value": "255",
                        "des": "bluetooth in-use transparency"
                    }
                ]
            },
            {
                label: "date",
                child: [
                    {
                        "label": "DATETIME_TEXT",
                        "property": "DATETIME_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "DATETIME_ALPHA",
                        "property": "DATETIME_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                label: "footer",
                child: [
                    {
                        "label": "FOOTER_BACKGROUND",
                        "property": "FOOTER_BACKGROUND",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "FOOTER_TEXT",
                        "property": "FOOTER_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "FOOTER_TEXT_ALPHA",
                        "property": "FOOTER_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                label: "header",
                child: [
                    {
                        "label": "HEADER_BACKGROUND",
                        "property": "HEADER_BACKGROUND",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "HEADER_TEXT",
                        "property": "HEADER_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "HEADER_TEXT_ALPHA",
                        "property": "HEADER_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                label: "help",
                child: [
                    {
                        "label": "HELP_BACKGROUND",
                        "property": "HELP_BACKGROUND",
                        "value": "0D0803",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "HELP_BACKGROUND_ALPHA",
                        "property": "HELP_BACKGROUND_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "HELP_BORDER",
                        "property": "HELP_BORDER",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "HELP_BORDER_ALPHA",
                        "property": "HELP_BORDER_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "HELP_CONTENT",
                        "property": "HELP_CONTENT",
                        "value": "A5B2B5",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "HELP_TITLE",
                        "property": "HELP_TITLE",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "HELP_RADIUS",
                        "property": "HELP_RADIUS",
                        "value": "3",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                label: "navigation",
                child: [
                    {
                        "label": "NAV_A_GLYPH",
                        "property": "NAV_A_GLYPH",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_A_GLYPH_ALPHA",
                        "property": "NAV_A_GLYPH_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_A_TEXT",
                        "property": "NAV_A_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_A_TEXT_ALPHA",
                        "property": "NAV_A_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_B_GLYPH",
                        "property": "NAV_B_GLYPH",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_B_GLYPH_ALPHA",
                        "property": "NAV_B_GLYPH_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_B_TEXT",
                        "property": "NAV_B_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_B_TEXT_ALPHA",
                        "property": "NAV_B_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_C_GLYPH",
                        "property": "NAV_C_GLYPH",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_C_GLYPH_ALPHA",
                        "property": "NAV_C_GLYPH_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_C_TEXT",
                        "property": "NAV_C_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_C_TEXT_ALPHA",
                        "property": "NAV_C_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_X_GLYPH",
                        "property": "NAV_X_GLYPH",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_X_GLYPH_ALPHA",
                        "property": "NAV_X_GLYPH_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_X_TEXT",
                        "property": "NAV_X_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_X_TEXT_ALPHA",
                        "property": "NAV_X_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_Y_GLYPH",
                        "property": "NAV_Y_GLYPH",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_Y_GLYPH_ALPHA",
                        "property": "NAV_Y_GLYPH_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_Y_TEXT",
                        "property": "NAV_Y_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_Y_TEXT_ALPHA",
                        "property": "NAV_Y_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_Z_GLYPH",
                        "property": "NAV_Z_GLYPH",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_Z_GLYPH_ALPHA",
                        "property": "NAV_Z_GLYPH_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_Z_TEXT",
                        "property": "NAV_Z_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_Z_TEXT_ALPHA",
                        "property": "NAV_Z_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_MENU_GLYPH",
                        "property": "NAV_MENU_GLYPH",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_MENU_GLYPH_ALPHA",
                        "property": "NAV_MENU_GLYPH_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_MENU_TEXT",
                        "property": "NAV_MENU_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "NAV_MENU_TEXT_ALPHA",
                        "property": "NAV_MENU_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                label: "list",
                child: [
                    {
                        "label": "LIST_DEFAULT_BACKGROUND",
                        "property": "LIST_DEFAULT_BACKGROUND",
                        "value": "A5B2B5",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_DEFAULT_BACKGROUND_ALPHA",
                        "property": "LIST_DEFAULT_BACKGROUND_ALPHA",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_DEFAULT_GRADIENT_START",
                        "property": "LIST_DEFAULT_GRADIENT_START",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_DEFAULT_GRADIENT_STOP",
                        "property": "LIST_DEFAULT_GRADIENT_STOP",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_DEFAULT_INDICATOR",
                        "property": "LIST_DEFAULT_INDICATOR",
                        "value": "A5B2B5",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_DEFAULT_INDICATOR_ALPHA",
                        "property": "LIST_DEFAULT_INDICATOR_ALPHA",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_DEFAULT_TEXT",
                        "property": "LIST_DEFAULT_TEXT",
                        "value": "A5B2B5",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_DEFAULT_TEXT_ALPHA",
                        "property": "LIST_DEFAULT_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_DISABLED_TEXT",
                        "property": "LIST_DISABLED_TEXT",
                        "value": "808080",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_DISABLED_TEXT_ALPHA",
                        "property": "LIST_DISABLED_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_FOCUS_BACKGROUND",
                        "property": "LIST_FOCUS_BACKGROUND",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_FOCUS_BACKGROUND_ALPHA",
                        "property": "LIST_FOCUS_BACKGROUND_ALPHA",
                        "value": "25",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_FOCUS_GRADIENT_START",
                        "property": "LIST_FOCUS_GRADIENT_START",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_FOCUS_GRADIENT_STOP",
                        "property": "LIST_FOCUS_GRADIENT_STOP",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_FOCUS_INDICATOR",
                        "property": "LIST_FOCUS_INDICATOR",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_FOCUS_INDICATOR_ALPHA",
                        "property": "LIST_FOCUS_INDICATOR_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_FOCUS_TEXT",
                        "property": "LIST_FOCUS_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "LIST_FOCUS_TEXT_ALPHA",
                        "property": "LIST_FOCUS_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                label: "image list",
                child: [
                    {
                        "label": "IMAGE_LIST_BORDER",
                        "property": "IMAGE_LIST_BORDER",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "IMAGE_LIST_BORDER_ALPHA",
                        "property": "IMAGE_LIST_BORDER_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "IMAGE_LIST_RADIUS",
                        "property": "IMAGE_LIST_RADIUS",
                        "value": "3",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "IMAGE_LIST_SHADOW",
                        "property": "IMAGE_LIST_SHADOW",
                        "value": "FF00FF",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "IMAGE_LIST_SHADOW_ALPHA",
                        "property": "IMAGE_LIST_SHADOW_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "IMAGE_LIST_RECOLOUR",
                        "property": "IMAGE_LIST_RECOLOUR",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "IMAGE_LIST_RECOLOUR_ALPHA",
                        "property": "IMAGE_LIST_RECOLOUR_ALPHA",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "IMAGE_PREVIEW_BORDER",
                        "property": "IMAGE_PREVIEW_BORDER",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "IMAGE_PREVIEW_BORDER_ALPHA",
                        "property": "IMAGE_PREVIEW_BORDER_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "IMAGE_PREVIEW_RADIUS",
                        "property": "IMAGE_PREVIEW_RADIUS",
                        "value": "3",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "IMAGE_PREVIEW_SHADOW",
                        "property": "IMAGE_PREVIEW_SHADOW",
                        "value": "FF00FF",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "IMAGE_PREVIEW_SHADOW_ALPHA",
                        "property": "IMAGE_PREVIEW_SHADOW_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "IMAGE_PREVIEW_RECOLOUR",
                        "property": "IMAGE_PREVIEW_RECOLOUR",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "IMAGE_PREVIEW_RECOLOUR_ALPHA",
                        "property": "IMAGE_PREVIEW_RECOLOUR_ALPHA",
                        "value": "0",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                label: "charging",
                child: [
                    {
                        "label": "CHARGER_BACKGROUND",
                        "property": "CHARGER_BACKGROUND",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "CHARGER_BACKGROUND_ALPHA",
                        "property": "CHARGER_BACKGROUND_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "CHARGER_TEXT",
                        "property": "CHARGER_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "CHARGER_TEXT_ALPHA",
                        "property": "CHARGER_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "CHARGER_Y_POS",
                        "property": "CHARGER_Y_POS",
                        "value": "165",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                label: "verbose",
                child: [
                    {
                        "label": "VERBOSE_BOOT_BACKGROUND",
                        "property": "VERBOSE_BOOT_BACKGROUND",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "VERBOSE_BOOT_BACKGROUND_ALPHA",
                        "property": "VERBOSE_BOOT_BACKGROUND_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "VERBOSE_BOOT_TEXT",
                        "property": "VERBOSE_BOOT_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "VERBOSE_BOOT_TEXT_ALPHA",
                        "property": "VERBOSE_BOOT_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "VERBOSE_BOOT_Y_POS",
                        "property": "VERBOSE_BOOT_Y_POS",
                        "value": "165",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                label: "keyboard",
                child: [
                    {
                        "label": "OSK_BACKGROUND",
                        "property": "OSK_BACKGROUND",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_BACKGROUND_ALPHA",
                        "property": "OSK_BACKGROUND_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_BORDER",
                        "property": "OSK_BORDER",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_BORDER_ALPHA",
                        "property": "OSK_BORDER_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_RADIUS",
                        "property": "OSK_RADIUS",
                        "value": "3",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_TEXT",
                        "property": "OSK_TEXT",
                        "value": "A5B2B5",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_TEXT_ALPHA",
                        "property": "OSK_TEXT_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_TEXT_FOCUS",
                        "property": "OSK_TEXT_FOCUS",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_TEXT_FOCUS_ALPHA",
                        "property": "OSK_TEXT_FOCUS_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_ITEM_BACKGROUND",
                        "property": "OSK_ITEM_BACKGROUND",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_ITEM_BACKGROUND_ALPHA",
                        "property": "OSK_ITEM_BACKGROUND_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_ITEM_BACKGROUND_FOCUS",
                        "property": "OSK_ITEM_BACKGROUND_FOCUS",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_ITEM_BACKGROUND_FOCUS_ALPHA",
                        "property": "OSK_ITEM_BACKGROUND_FOCUS_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_ITEM_BORDER",
                        "property": "OSK_ITEM_BORDER",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_ITEM_BORDER_ALPHA",
                        "property": "OSK_ITEM_BORDER_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_ITEM_BORDER_FOCUS",
                        "property": "OSK_ITEM_BORDER_FOCUS",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_ITEM_BORDER_FOCUS_ALPHA",
                        "property": "OSK_ITEM_BORDER_FOCUS_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "OSK_ITEM_RADIUS",
                        "property": "OSK_ITEM_RADIUS",
                        "value": "3",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                label: "notification",
                child: [
                    {
                        "label": "MSG_BACKGROUND",
                        "property": "MSG_BACKGROUND",
                        "value": "100808",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "MSG_BACKGROUND_ALPHA",
                        "property": "MSG_BACKGROUND_ALPHA",
                        "value": "175",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "MSG_BORDER",
                        "property": "MSG_BORDER",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "MSG_BORDER_ALPHA",
                        "property": "MSG_BORDER_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "MSG_RADIUS",
                        "property": "MSG_RADIUS",
                        "value": "3",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "MSG_TEXT",
                        "property": "MSG_TEXT",
                        "value": "F7E318",
                        "des": "No description available yet. Check back soon!"
                    },
                    {
                        "label": "MSG_TEXT_ALPHA",
                        "property": "MSG_TEXT_ALPHA",
                        "value": "255",
                        "des": "No description available yet. Check back soon!"
                    }
                ]
            },
            {
                label: "images",
                child: [
                    {
                        "label": "Bootlogo (bmp only):",
                        "property": "bootlogoFile",
                        "value": "C:\\fakepath\\RG35XX Bootscreen.bmp",
                        "format": ".bmp",
                        "des": ""
                    },
                    {
                        "label": "Wallpaper (png only):",
                        "property": "wallpaperFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Footer (png only):",
                        "property": "footerFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Header (png only):",
                        "property": "headerFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Core Assignment Wallpaper:",
                        "property": "muxassignFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Charging Wallpaper:",
                        "property": "muxchargeFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Config Screen Wallpaper:",
                        "property": "muxconfigFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Credits Screen Wallpaper:",
                        "property": "muxcreditsFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Device Selection Screen Wallpaper:",
                        "property": "muxdeviceFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Favourites Wallpaper:",
                        "property": "muxfavouriteFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "History Wallpaper:",
                        "property": "muxhistoryFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Information Screen Wallpaper:",
                        "property": "muxinfoFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Home Screen Wallpaper:",
                        "property": "muxlaunchFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Network Configuration Screen Wallpaper:",
                        "property": "muxnetworkFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Explore Content Wallpaper:",
                        "property": "muxploreFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Reset Screen Wallpaper:",
                        "property": "muxresetFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "RTC Configuration Wallpaper:",
                        "property": "muxrtcFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Verbose Boot Startup Wallpaper:",
                        "property": "muxstartFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "System Information Wallpaper:",
                        "property": "muxsysinfoFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Input Tester Wallpaper:",
                        "property": "muxtesterFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Theme Manager Wallpaper:",
                        "property": "muxthemeFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Time Zone Configuration Wallpaper:",
                        "property": "muxtimezoneFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Activity Tracker Wallpaper:",
                        "property": "muxtrackerFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Advanced Settings Wallpaper:",
                        "property": "muxtweakadvFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "General Settings Wallpaper:",
                        "property": "muxtweakgenFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    },
                    {
                        "label": "Web Services Wallpaper:",
                        "property": "muxwebservFile",
                        "value": "",
                        "format": ".png",
                        "des": ""
                    }
                ]
            },
            {
                label: "sounds",
                child: [
                    {
                        "label": "Shutdown sound:",
                        "property": "shutdownFile",
                        "value": "",
                        "format": "",
                        "des": ""
                    },
                    {
                        "label": "Reboot sound:",
                        "property": "rebootFile",
                        "value": "",
                        "format": "",
                        "des": ""
                    },
                    {
                        "label": "Navigate sound:",
                        "property": "navigateFile",
                        "value": "",
                        "format": "",
                        "des": ""
                    },
                    {
                        "label": "Confirm sound:",
                        "property": "confirmFile",
                        "value": "",
                        "format": "",
                        "des": ""
                    },
                    {
                        "label": "Back sound:",
                        "property": "backFile",
                        "value": "",
                        "format": "",
                        "des": ""
                    }
                ]
            },
            {
                label: "music",
                child: [
                    {
                        "label": "music file:",
                        "property": "musicFile",
                        "value": "",
                        "format": ".mp3",
                        "des": ""
                    }
                ]
            },
            // TODO: fonts
        ] as MUOSThemeValues[]
    }
}

// TODO:
/**
 * Replace all value,
 * from x to y,
 * nice when you want to change your theme color.
 */