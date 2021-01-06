import { ActorType } from '../types/Actor.type';
import TmdbService from './Tmdb.service';
import TraktService from './Trakt.service';
import RapidApiService from './RapidApi.service';

class MovieService {
  private tmdbService: TmdbService;
  private traktService: TraktService;
  private rapidApiService: RapidApiService;

  constructor() {
    this.tmdbService = new TmdbService();
    this.traktService = new TraktService();
    this.rapidApiService = new RapidApiService();
  }

  async getMovieObject(traktId: string, tmdbId: string) {
    let traktMovie: any = {};
    let tmdbMovie: any = {};

    if (traktId) traktMovie = ((await this.traktService.searchTraktMovieById(traktId, 'trakt')) as any)[0];
    if (tmdbId) tmdbMovie = await this.tmdbService.fetchTmdbMovie(tmdbId);

    const rapidApiMovie = await this.rapidApiService.getMovieInfo(traktMovie.movie.ids.imdb);
    console.log("RAPIDAPI MOVIE ", rapidApiMovie);

    return this.serializeMovieObject(traktMovie.movie, tmdbMovie, rapidApiMovie);
  }

  public serializeMovieObject(traktMovie: any, tmdbMovie: any, rapidApiMovie: any) {
    let movieObject: any;
    let actors: ActorType[] = [];

    if (tmdbMovie) {
      tmdbMovie.credits.cast.forEach((crewObject: any) => {
        // Movie cast is an array of more than 20 people, use only most popular
        if (crewObject.popularity > 5) {
          const actor: ActorType = {
            id: crewObject.id,
            name: crewObject.original_name,
            character: crewObject.character,
            image: crewObject.profile_path || null,
          };
          actors.push(actor);
        }
      });
      movieObject = {
        released: tmdbMovie.release_date || traktMovie.released,
        title: tmdbMovie.title || traktMovie.title,
        originalTitle: tmdbMovie.original_title,
        overview: traktMovie.overview || tmdbMovie.overview,
        runtime: tmdbMovie.runtime,
        country: traktMovie.country,
        trailer: traktMovie.trailer,
        homepage: traktMovie.homepage || tmdbMovie.homepage,
        popularity: tmdbMovie.popularity,
        poster: tmdbMovie.poster_path,
        tmdbId: tmdbMovie.id,
        actors: actors,
        genres: tmdbMovie.genres.map((genre: any) => genre.name),
        traktId: Array.isArray(traktMovie)
          ? traktMovie[0].movie
            ? traktMovie[0].movie.ids.trakt
            : traktMovie[0].ids.trakt
          : traktMovie.movie
          ? traktMovie.movie.ids.trakt
          : traktMovie.ids.trakt,
        rating: rapidApiMovie.rating,
        ratingVotes: rapidApiMovie.rating_votes,
        length: rapidApiMovie.length,
        trailerLink: rapidApiMovie.trailer.link
      };
    } else {
      movieObject = traktMovie;
    }
    console.log("MOVIE OBJECT ", movieObject)
    return movieObject;
  }
}

export default MovieService;
