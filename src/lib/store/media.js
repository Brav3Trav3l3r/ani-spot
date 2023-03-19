import { writable } from "svelte/store";
import { browser } from "$app/environment"

export const storeVolume = writable(100)

export const isDubbed = writable(browser && localStorage.getItem("isDubbed") || "false")
isDubbed.subscribe((val) => { browser && (localStorage.isDubbed = val)})

export const provider = writable(browser && localStorage.getItem("provider") || "gogo")
provider.subscribe((val) => { browser && (localStorage.provider = val)})