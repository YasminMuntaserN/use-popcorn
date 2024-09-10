import { Search } from "./Search";

export function NavBar({movies}){
  return (
<nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <Search/>
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      </nav>
  );
}