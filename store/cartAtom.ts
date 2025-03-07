import { atomWithStorage } from "jotai/utils";
import { CartItem } from "../lib/types";

export const cartAtom = atomWithStorage<CartItem[]>("cart", []);