export const VERSION: string = "0.2";

export const isHexColor = (value: string): boolean => {
    // Check if the value starts with '#' and has either 3 or 6 characters
    if (/^[0-9A-F]{6}$/i.test(value)) {
        return true;
    }
    return false;
}
