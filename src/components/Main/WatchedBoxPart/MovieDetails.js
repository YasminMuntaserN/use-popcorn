import { useEffect, useState } from "react"
import { StartRating } from "../../StartRating.js";

export function MovieDetails({selectedId ,onCloseMovie ,KEY}){
  const [movie ,setMovies] =useState({}); 
  const {
    Title : title ,
    Year : year ,
    Poster: poster ,
    RunTime : runTime ,
    ImdbRating : imdbRating ,
    Ploat : ploat ,
    Released:released , 
    Actors:actors ,
    Director:director ,
    Genre: genre
  } = movie;

  useEffect(function(){
    async function getMovieDetails(){
      const res =await 
      fetch(`http://www.omdbapi.com/? 
      apikey=${KEY}&s=${selectedId}`);

      const data = await res.json();
      setMovies(data);
    }
    getMovieDetails();
  } ,[])
  return (
    <div className="details">
      <header>
      <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
      <img src={poster} alt={`Poster of ${movie} movie`}/>
      <div className="details-overview">
        <h2>{title}</h2>
        <p>{released} &bull; {runTime}</p>
        <p>{genre}</p>
        <p>
          <span></span>
          {imdbRating} IMDb Rating
        </p> 
        </div>    
    </header>

    <section >
      <div className="rating">
        <StartRating maxRating={10} size={24}/>
      </div>
      <p>
        <em>{ploat}</em>
      </p>
      <p>Starring {actors}</p>
      <p>Directed by  {director}</p>
    </section>
    </div>

  )
}