import { z } from 'zod';
export declare const black = "#000000";
export declare const white = "#ffffff";
export declare const Theme: z.ZodEnum<["dark", "light"]>;
export declare type ThemeType = z.infer<typeof Theme>;
export declare const fallbackColors: {
    dark: string;
    light: string;
};
export declare function isBlackOrWhite(color: string): boolean;
export declare function isChill(color: string, background?: string): boolean;
export default function makeColorMoreChill(color: string, background?: string): string;
