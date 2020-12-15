const API_KEY = 'beb34bd43287199d06b092f4f4612a5b';
const API_BASE = 'https://api.themoviedb.org/3';

/* 
 - Os originais da netflix
 - Os recomendados (trending)
 - Em alta (top rated)
 - Ação
 - Comédia
 - Terror
 - Romance
 - Documentários
*/

/* Pegar o json de resultado e retornar esse json */
const basicFecth = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`) //É feita a solicitação e esperado o termino
    const json = await req.json(); //Requisão feita e espera o termino
    return json; //Tudo já carregou e está entregue
}

/* Exporta um json com os dados de tudo que vamos precisar para a nossa UI*/
export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFecth(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items: await basicFecth(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em alta',
                items: await basicFecth(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFecth(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFecth(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFecth(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFecth(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFecth(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ]
    },

    getMovieInfo: async (movieId, type) =>{
        let info = {};

        if(movieId){
            switch(type){
                case 'movie':
                    info = await basicFecth(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break;
                case 'tv':
                    info = await basicFecth(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break;

                default:
                    info = null;
                break;
            }
        }

        return info; 
    }

}