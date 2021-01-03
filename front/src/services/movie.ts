export function getTrendingMovies() {
  const headers = new Headers();

  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  return fetch("http://localhost:4000/api/movie/trending", {
    method: "GET",
    headers: headers,
  }).then((response: any) => response.json());
}

export function getPopularMovies() {
  const headers = new Headers();

  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  return fetch("http://localhost:4000/api/movie/popular", {
    method: "GET",
    headers: headers,
  }).then((response: any) => response.json());
}

export function addToWatchlist(userId: string, movieId: string) {
  const headers = new Headers();

  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  return fetch(`http://localhost:4000/api/users/${userId}/watchlist`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ movieId })
  });
}  
