export const load = async({params, fetch})=>{
    const searchRes = await fetch(`https://api.consumet.org/meta/anilist/${params.query}`)
    const searchJson = await searchRes.json()

    return{
        results : searchJson,
        title : params.query
    }
}