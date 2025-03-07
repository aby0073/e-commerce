import { atom } from "jotai";

const storedTheme =
  typeof window !== "undefined" ? localStorage.getItem("theme") === "dark" : false;

export const darkModeAtom = atom(storedTheme);
