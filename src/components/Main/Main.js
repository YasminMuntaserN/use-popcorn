import {WatchedBox} from "./WatchedBoxPart/WatchedBox.js";


export function Main({average  ,tempWatchedData ,  children}){
  return (
  <main className="main">
          {children}
        <WatchedBox average={average} tempWatchedData={tempWatchedData}/>
        
      </main>
  );
}