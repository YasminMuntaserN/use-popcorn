import {Movie} from "./Movie.js";

export function MovieList({movies ,onSelectMovie}){
  return (
    <ul className="list">
    {movies?.map((movie) => (
      <Movie movie={movie} onSelectMovie={onSelectMovie}/>
    ))}
  </ul>
  );
} 