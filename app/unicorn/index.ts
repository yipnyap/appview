/**
 * Takes a dynamic style object and converts it to --md-sys-* css variables
 * @param styleObject
 * @param dark
 * @returns boolean
 */

export const setStyle = (styleObject: {
    light: {
        [key: string]: string;
    };
    dark: {
        [key: string]: string
    };
    // check media
}, dark?: boolean) => {
    // Default to media
    dark = dark || window.matchMedia('(prefers-color-scheme: dark)').matches;
    const matchedObject = dark ? styleObject.dark : styleObject.light;
    let newStyleObject: {
        [key: string]: string;
    } = {};

    // They're camelCase, so we need to convert them to kebab-case, replacing the key in the object
    Object.keys(matchedObject).forEach((key) => {
        const newKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
        newStyleObject[newKey] = matchedObject[key];
    })

    // Set the variables
    Object.keys(newStyleObject).forEach((key) => {
        // Convert hex to RGB (space separated)
        if (newStyleObject[key].startsWith('#')) {
            const hex = newStyleObject[key].replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            newStyleObject[key] = `${r} ${g} ${b}`;
        }

        document.documentElement.style.setProperty(`--md-sys-${key}`, newStyleObject[key]);
    })

    // Add data-unicorn-engine
    document.documentElement.setAttribute('data-unicorn-engine', 'true');

    return true;
}