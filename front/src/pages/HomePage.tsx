import React, { useEffect, useState } from 'react';
import { Header, Navbar } from '../components';
import addToWatchImg from "../img/addToWatch.png";
import addToWatchedImg from "../img/addToWatched.png";

export function HomePage() {

    const [loveMovies, setLoveMovies] = useState([] as any);
    const [christmasMovies, setChristmasMovies] = useState([] as any);

    const fetchURL = "http://www.omdbapi.com/?apikey=7d18ac08&type=movie&s=love";
    const fetchURL2 = "http://www.omdbapi.com/?apikey=7d18ac08&type=movie&s=christmas";

    useEffect(() => {
        fetch(fetchURL)
        .then((res) => res.json())
        .then(data => setLoveMovies(data.Search as any));

        fetch(fetchURL2)
        .then((res) => res.json())
        .then(data => setChristmasMovies(data.Search as any));
    }, [] );

    useEffect(() => {
        console.log("MOVIES ", loveMovies);
    }, [loveMovies]);

    return (
        <div className="homeWrapper">
            <Header />
            <div className="moviesWrapper">
                <Navbar />
                <div className="movieList"> 
                    <h2 className="listName">Recommended</h2>
                    <div className="movies">
                        {loveMovies.length > 0 && loveMovies.map((movie: any) => 
                            {return (
                                <div className="imgContainer">
                                    <img src={movie.Poster} className="moviePoster" alt={movie.Title} key={movie.imdbID}/>
                                    <div className="movieDetails">
                                        <h4 className="title">{movie.Title}</h4>
                                        <div className="addButtons">
                                            <button className="addBtn">
                                                <img className="iconWatch" src={addToWatchImg} />
                                            </button>
                                            <button className="addBtn">
                                                <img className="iconLike" src={addToWatchedImg} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        )}
                    </div>
                    <h2 className="listName">Christmas movies</h2>
                    <div className="movies">
                        {christmasMovies.length > 0 && christmasMovies.map((movie: any) => 
                            {return (
                                <div className="imgContainer">
                                    <img src={movie.Poster} className="moviePoster" alt={movie.Title} key={movie.imdbID}/>
                                    <div className="movieDetails">
                                        <h4 className="title">{movie.Title}</h4>
                                        <div className="addButtons">
                                            <button className="addBtn">
                                                <img className="iconWatch" src={addToWatchImg} />
                                            </button>
                                            <button className="addBtn">
                                                <img className="iconLike" src={addToWatchedImg} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}