import { atomWithStorage } from "jotai/utils";

export enum ThemeMode {
    Light = "light",
    Dark = "dark"
}

export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode',ThemeMode.Light);