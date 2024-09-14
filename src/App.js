import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar/NavBar.js";
import { Main } from "./components/Main/Main.js";
import { NumResult } from "./components/NavBar/NumResult.js";
import {Box} from "./components/Main/Box.js";
import {MovieList}from "./components/Main/MovieListPart/MovieList.js";
import {WatchedSummary} from "./components/Main/WatchedBoxPart/WatchedSummary.js";
import {WatchedMoviesList} from "./components/Main/WatchedBoxPart/WatchedMoviesList.js";
import {Loader} from "./components/Loader.js";
import {ErrorMessage} from "./components/ErrorMessage.js";



const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY ="http://www.omdbapi.com/?i=tt3896198&apikey=a4872685";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [error , setError] = useState("");

  const query ="interstellar";

  useEffect(function () {
    async function fetchMovies(){
    try{
      setIsLoading(true);
      const res =await 
        fetch(`http://www.omdbapi.com/? 
        apikey=${KEY}&s=${query}`);

        // handle if there is no internt connection
        if(!res.ok) throw new Error("something went wrong with fetching movies");

        const data = await res.json(); 

        // handle if there is no data returnd back
        if(!data.response)throw new Error(" movie not found");

        setMovies(data.Search);
    } catch(err) {
    setError(err.message);
    }finally{
      setIsLoading(false);
    }
  }
    fetchMovies();
  } ,[]);
  return (
    <>
      <NavBar>
            <NumResult movies={movies}/>
      </NavBar>
      
      <Main>

          <Box>
              {isLoading && <Loader/>}
              {!isLoading && !error && <MovieList movies={movies}/>}
              {error && <ErrorMessage message={error}/>}
          </Box>
        
          <Box >
          <WatchedSummary average={average} watched={watched} />
          <WatchedMoviesList watched={watched} />
          </Box> 
      </Main>
    </>
  );
}
