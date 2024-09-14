import { useEffect, useState } from "react"
import { StartRating } from "../../StartRating.js";
import {Loader} from "../../Loader.js";

export function MovieDetails({selectedId ,
  onCloseMovie ,
  KEY,
  OnAddWatched}){
  
    const [movie ,setMovies] =useState({}); 
  const [IsLoading ,setIsLoading] =useState({}); 

  const {
    Title : title ,
    Year : year ,
    Poster: poster ,
    RunTime : runTime ,
    ImdbRating : imdbRating ,
    Plot : plot ,
    Released:released , 
    Actors:actors ,
    Director:director ,
    Genre: genre
  } = movie;

  useEffect(
    function(){
      async function getMovieDetails(){
        setIsLoading(true);
        const res =await 
        fetch(`http://www.omdbapi.com/? 
        apikey=${KEY}&i=${selectedId}`);

        const data = await res.json();
        setMovies(data);
        setIsLoading(false);
    }
    getMovieDetails();
  } ,[KEY , selectedId]
);

function handleAdd(){
  console.log(runTime.split(' ').at(0));
  const newMovie ={
    imdbID:selectedId ,
    title ,
    year,
    poster,
    imdbRating :Number(imdbRating),
    runTime:Number(runTime.split(' ').at(0))
  };
  OnAddWatched(newMovie);
}
  return (
    <div className="details">
    {IsLoading ? <Loader /> : 
    <>
      <header>
      <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
      <img src={poster} alt={`Poster of ${movie} movie`}/>
      <div className="details-overview">
        <h2>{title}</h2>
        <p>{year}</p>
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
        <button className="btn-Add"
        onClick={handleAdd}>Add To List</button>
      </div>
      <p>
        <em>{plot}</em>
      </p>
      <p>Starring {actors}</p>
      <p>Directed by  {director}</p>
    </section>
    </>
}
    </div>
  )
}