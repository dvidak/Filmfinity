export const getMovieObject = (traktMovie: any, tmdbMovie: any) => {
  let movieObject: any;
  if (tmdbMovie) {
    movieObject = {
      released: tmdbMovie.release_date || traktMovie.released,
      title: traktMovie.title || tmdbMovie.title,
      originalTitle: tmdbMovie.original_title,
      overview: traktMovie.overview || tmdbMovie.overview,
      runtime: tmdbMovie.runtime,
      country: traktMovie.country,
      trailer: traktMovie.trailer,
      homepage: traktMovie.homepage || tmdbMovie.homepage,
      popularity: tmdbMovie.popularity,
      poster: tmdbMovie.poster_path,
    };
  } else {
    movieObject = traktMovie;
  }
  return movieObject;
};
