'use client'
import * as m3utils from '@material/material-color-utilities'
import {Theme} from '@material/material-color-utilities'

/**
 * All available color tokens
 */
let tokens = Object.keys(m3utils.MaterialDynamicColors);
tokens = tokens.filter(token => token !== 'contentAccentToneDelta');

/**
 * Generate custom color group from source and target color
 *
 * @param source Source color
 * @param color Custom color
 * @param variant Scheme variant, equal to scheme class name (SchemeMonochrome, SchemeNeutral, SchemeTonalSpot,...)
 * @param contrastLevel Contrast level between -1.0 and 1.0
 * @return Custom color group
 *
 * @link https://m3.material.io/styles/color/the-color-system/color-roles
 */
export function customColor(source: number, color: { value: number; blend?: boolean; }, variant = 'SchemeTonalSpot', contrastLevel = 0.0) {
    let value = color.value;
    if (color.blend) {
        // from -> to
        value = m3utils.Blend.harmonize(value, source);
    }
    const hct = m3utils.Hct.fromInt(value);
    // @ts-ignore
    const scheme = new m3utils[variant](hct, false, contrastLevel);
    // @ts-ignore
    const darkScheme = new m3utils[variant](hct, true, contrastLevel);
    // @ts-ignore
    const getDynamicColor = (token: string, scheme: any) => m3utils.MaterialDynamicColors[token].getArgb(scheme);
    return {
        color,
        value,
        light: {
            color: getDynamicColor('primary', scheme),
            onColor: getDynamicColor('onPrimary', scheme),
            colorContainer: getDynamicColor('primaryContainer', scheme),
            onColorContainer: getDynamicColor('onPrimaryContainer', scheme),
        },
        dark: {
            color: getDynamicColor('primary', darkScheme),
            onColor: getDynamicColor('onPrimary', darkScheme),
            colorContainer: getDynamicColor('primaryContainer', darkScheme),
            onColorContainer: getDynamicColor('onPrimaryContainer', darkScheme),
        },
    };
}

/**
 * Generate a theme from a source color
 *
 * @param source Source color
 * @param customColors Array of custom colors
 * @param variant Scheme variant, equal to scheme class name (SchemeMonochrome, SchemeNeutral, SchemeTonalSpot,...)
 * @param contrastLevel Contrast level between -1.0 and 1.0
 * @return Theme object
 */
export function themeFromSourceColor(source: number, variant = 'SchemeTonalSpot', contrastLevel = 0.0, customColors = []) {
    const hct = m3utils.Hct.fromInt(source);
    // @ts-ignore
    const scheme = new m3utils[variant](hct, false, contrastLevel);
    // @ts-ignore
    const darkScheme = new m3utils[variant](hct, true, contrastLevel);
    // @ts-ignore
    const getDynamicColors = (scheme: any) => Object.fromEntries(tokens.map(token => [token, m3utils.MaterialDynamicColors[token]?.getArgb(scheme)]));

    let theme = {
        source,
        schemes: {
            light: getDynamicColors(scheme),
            dark: getDynamicColors(darkScheme),
        },
        palettes: {
            primary: scheme.primaryPalette,
            secondary: scheme.secondaryPalette,
            tertiary: scheme.tertiaryPalette,
            neutral: scheme.neutralPalette,
            neutralVariant: scheme.neutralVariantPalette,
            error: scheme.errorPalette,
        },
        customColors: customColors.map((c) => customColor(source, c, variant, contrastLevel)),
    };

    // @ts-ignore
    theme.schemes.__proto__.toJSON = function() {
        return this;
    }

    return theme as Theme;
}

/**
 * Generate a theme from an image source
 *
 * @param image Image element
 * @param variant Scheme variant, equal to scheme class name (SchemeMonochrome, SchemeNeutral, SchemeTonalSpot,...)
 * @param contrastLevel Contrast level between -1.0 and 1.0
 * @param customColors Array of custom colors
 * @return Theme object
 */
export async function themeFromImage(image: HTMLImageElement, variant = 'SchemeTonalSpot', contrastLevel = 0.0, customColors = []) {
    const source = await m3utils.sourceColorFromImage(image);
    return themeFromSourceColor(source, variant, contrastLevel, customColors);
}