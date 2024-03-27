export const VERSION: string = "0.5";

export const REAL_SIZE_REF = {
    screen: { w: 640, h: 480 },
    headerFooter: { w: 640, h: 42 },
    font: { size: 20 },
    charging: { yPos: 350 },
    icon: { size: 24 }
}

export const isHexColor = (value: string): boolean => {
    // Check if the value starts with '#' and has either 3 or 6 characters
    if (/^[0-9A-F]{6}$/i.test(value)) {
        return true;
    }
    return false;
}

export const hexToRgba = (hex: string, alpha: number = 1): string => {
    // Remove '#' if present
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}