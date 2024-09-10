import { Search } from "./Search";
import { Logo } from "./Logo";


export function NavBar({movies}){
  return (
<nav className="nav-bar">
        <Logo/>
        <Search/>
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      </nav>
  );
}