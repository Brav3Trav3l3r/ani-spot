import { writable } from "svelte/store";
import { browser } from "$app/environment"


export const epId = writable(browser && sessionStorage.getItem("epId") || null)
epId.subscribe((val) => { browser && (sessionStorage.epId = val)})

export const isOpen = writable(false)
export const storeAnime = writable(null)
export const showList = writable(false)
 