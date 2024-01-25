
export function rgbToHex(red, green, blue) {
    console.log(red,green, blue)
    const toHex = (c) => c.toString(16).padStart(2, '0');
    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

export function getRgbString(red, green, blue) {
    return `rgb(${red}, ${green}, ${blue})`;
}
