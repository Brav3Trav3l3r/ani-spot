export const load= async({fetch, params})=>{
    const infoRes = await fetch(`https://api.consumet.org/meta/anilist/info/${params.id}`)
    const infoJson = await infoRes.json()

    let color = null

    if(infoJson.cover){
        const colorRes = await fetch(`/api/average-color?${new URLSearchParams({
            image:infoJson.cover
        }).toString()}`)
        if(colorRes.ok){
            color = (await colorRes.json()).color
        }
    }

    return {
        info: infoJson,
        color
    }
}