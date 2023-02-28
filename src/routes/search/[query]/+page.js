export const load = async({params, fetch})=>{
    const searchRes = await fetch(` https://cors.delusionz.xyz/https://api-consumet-rust.vercel.app/meta/anilist/${params.query}`)
    const searchJson = await searchRes.json()

    return{
        results : searchJson,
        title : params.query
    }
}