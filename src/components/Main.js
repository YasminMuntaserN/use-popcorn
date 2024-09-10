import {ListBox} from "./ListBox.js";

export function Main({average ,movies ,tempWatchedData}){

  return (
  <main className="main">
        <ListBox movies={movies} />

        
      </main>
  );
}