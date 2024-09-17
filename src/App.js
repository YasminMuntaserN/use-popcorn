import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar/NavBar.js";
import { Main } from "./components/Main/Main.js";
import { NumResult } from "./components/NavBar/NumResult.js";
import {Box} from "./components/Main/Box.js";
import {MovieList}from "./components/Main/MovieListPart/MovieList.js";
import {WatchedSummary} from "./components/Main/WatchedBoxPart/WatchedSummary.js";
import {WatchedMoviesList} from "./components/Main/WatchedBoxPart/WatchedMoviesList.js";
import {MovieDetails} from "./components/Main/WatchedBoxPart/MovieDetails.js";
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
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [error , setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useState(function(){
    // this function will be executed once on the initail render
    const storedValues =localStorage.getItem("watched");
    return JSON.parse(storedValues);
  });


  function handleSelectMovie(id){
    setSelectedId(id);
  }

  function handleCloseMovie(id){
    setSelectedId(null);
  }

  function handleAddWatched(movie){
    setWatched(watched =>[...watched ,movie]);
  }

  function handleDeleteWatched(id){
    setWatched(watched =>watched.filter(movie => 
      movie.id !== id 
    ) )
  };

  useEffect(function () {
    // Create AbortController to cancel fetch if needed
    const controller = new AbortController();
  
    async function fetchMovies() {
      try {
        setIsLoading(true);  // Set loading state
        setError('');        // Reset error state
  
        // Fetch movies from API
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
          signal: controller.signal
        });
  
        // Handle fetch errors
        if (!res.ok) throw new Error("Fetch failed");
  
        const data = await res.json();
  
        // Handle no data returned
        if (!data.Response) throw new Error("Movie not found");
  
        setMovies(data.Search);  // Update movies state
        setError('');            // Reset error state
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);  // Set error state
        }
      } finally {
        setIsLoading(false);  // End loading state
      }
    }
  
    // If query is too short, reset states and exit
    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }
  
    handleCloseMovie();  // Close movie details if open
    fetchMovies();       // Fetch movies
  
    // Cleanup function to abort fetch if component unmounts or query changes
    return () => {
      controller.abort();
    };
  }, [query]); 
  
  useEffect(function () {
    // Save watched movies to local storage
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]); 
  

  return (
    <>
      <NavBar query={query} setQuery={setQuery} >
            <NumResult movies={movies}/>
      </NavBar>
      
      <Main>

          <Box>
              {isLoading && <Loader/>}
              {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
              {error && <ErrorMessage message={error}/>}
          </Box>
        
          <Box >
            {
              selectedId ?
                <MovieDetails
                  selectedId={selectedId}
                  onCloseMovie ={handleCloseMovie}
                  KEY={KEY}
                  OnAddWatched={handleAddWatched}
                  watched={watched}/>
              :
              <>
              <WatchedSummary average={average} watched={watched} />
              <WatchedMoviesList
                watched={watched} 
                onDeleteWatched={handleDeleteWatched}/>
              </>
            }
          </Box> 
      </Main>
    </>
  );
}
