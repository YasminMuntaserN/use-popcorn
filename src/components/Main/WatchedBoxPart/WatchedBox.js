import {useState } from "react";
import {WatchedSummary} from "./WatchedSummary.js";
import {WatchedMoviesList} from "./WatchedMoviesList.js";


export function WatchedBox({average ,tempWatchedData}){
  const [isOpen2, setIsOpen2] = useState(true);
  const [watched, setWatched] = useState(tempWatchedData);


    return (
      <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && (
            <>
            <WatchedSummary average={average} watched={watched} />
            <WatchedMoviesList watched={watched} />
            </>
          )}
        </div>
    )
}