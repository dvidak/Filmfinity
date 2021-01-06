import Axios from 'axios';

class RapidApiService {
    async getMovieInfo(ImdbId: string) {
        const res = await Axios.get(`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${ImdbId}`, {
            headers: {
                'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com',
                'x-rapidapi-key': 'c449ea3a31msh557334e88751feap159d0bjsn9d1114265022'
            }
        });
        return res.data;
    }
}

export default RapidApiService;