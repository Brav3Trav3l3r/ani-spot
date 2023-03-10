export const load= async({fetch, params})=>{
    const infoRes = await fetch(`http://localhost:8080/api-consumet-rust.vercel.app/meta/anilist/info/${params.id}`)
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
        color,
        title: infoRes.ok ? (infoJson.title.english ? infoJson.title.english : infoJson.title.romaji) : '' 
    }
}
