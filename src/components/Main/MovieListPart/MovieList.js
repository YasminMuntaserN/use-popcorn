import {Movie} from "./Movie.js";

export function MovieList({movies}){
  return (
    <ul className="list">
    {movies?.map((movie) => (
      <Movie movie={movie}/>
    ))}
  </ul>
  );
} 