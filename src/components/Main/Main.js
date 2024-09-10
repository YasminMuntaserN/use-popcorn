import {ListBox} from "./MovieListPart/ListBox.js";
import {WatchedBox} from "./WatchedBox.js";


export function Main({average ,movies ,tempWatchedData}){
  return (
  <main className="main">
        <ListBox movies={movies} />
        <WatchedBox average={average} tempWatchedData={tempWatchedData}/>
        
      </main>
  );
}