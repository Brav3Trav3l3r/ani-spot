export const load = async({fetch})=>{
    const data =  fetch('https://api.consumet.org/meta/anilist/trending')
    const data2 =  fetch('https://api.consumet.org/meta/anilist/recent-episodes')
    const data3 =  fetch('https://api.consumet.org/meta/anilist/popular?perPage=12')

    const [trending, recentEps, popularAnime ] = await Promise.all([data, data2, data3])

    return{
        trend: trending.ok ?  trending.json() : undefined,
        recent:  recentEps.ok ? recentEps.json() : undefined,
        popular:  popularAnime.ok ?  popularAnime.json() : undefined,
    }
}