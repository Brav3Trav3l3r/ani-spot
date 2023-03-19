import { redirect } from '@sveltejs/kit';

export const load= async({fetch, params,url})=>{

    const dub = await url.searchParams.get('dub') 
    const provider = await url.searchParams.get('provider') 

    const infoRes = await fetch(`https://api-consumet-rust.vercel.app/meta/anilist/info/${params.id}?dub=${dub}&provider=${provider}`)
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


export const actions = {
    changeSrc : async({request,params})=>{
        const formData = await request.formData()
        const dub = formData.get('dub')
        const provider = formData.get('provider')

        throw redirect(307, `/${params.id}?dub=${dub}&provider=${provider}`)
    }
}
