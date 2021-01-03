export type TraktType = {
  title: string;
  year: number;
  ids: {
    trakt: string;
    slug: string;
    imdb: string;
    tmdb: string;
  };
};
