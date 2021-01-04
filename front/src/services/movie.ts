const headers = new Headers();

headers.append("Accept", "application/json");
headers.append("Content-Type", "application/json");

export function getTrendingMovies() {

  return fetch("http://localhost:4000/api/movie/trending", {
    method: "GET",
    headers: headers,
  }).then((response: any) => response.json());
}

export function getPopularMovies() {

  return fetch("http://localhost:4000/api/movie/popular", {
    method: "GET",
    headers: headers,
  }).then((response: any) => response.json());
}

export function addToWatchlist(userId: string, movieId: string) {

  return fetch(`http://localhost:4000/api/users/${userId}/watchlist`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ movieId })
  });
} 

export function deleteFromWatchlist(userId: string, movieId: string) {

  return fetch(`http://localhost:4000/api/users/${userId}/watchlist/${movieId}`, {
    method: "DELETE",
    headers: headers,
  });
}

export function getUserWatchlist(userId: string) {

  return fetch(`http://localhost:4000/api/users/${userId}/watchlist`, {
    method: "GET",
    headers: headers
  }).then((response: any) => response.json());
}

export function addToWatchedList(userId: string, movieId: string) {

  return fetch(`http://localhost:4000/api/users/${userId}/watched-list`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ movieId })
  });
}

export function getUserWatchedList(userId: string) {

  return fetch(`http://localhost:4000/api/users/${userId}/watched-list`, {
    method: "GET",
    headers: headers
  }).then((response: any) => response.json());
}

export function deleteFromWatchedList(userId: string, movieId: string) {

  return fetch(`http://localhost:4000/api/users/${userId}/watched-list/${movieId}`, {
    method: "DELETE",
    headers: headers,
  });
}
