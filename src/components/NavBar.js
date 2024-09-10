import { useState } from "react";

export function NavBar({movies}){
  const [query, setQuery] = useState("");
  return (
<nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>

        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      </nav>
  );
}