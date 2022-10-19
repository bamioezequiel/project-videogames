import s from "./Header.module.css";
import SearchBar from "../../SearchBar/SearchBar";

export default function Header() {

  return (
    <div className={s.header_container}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Fallout_logo.svg/640px-Fallout_logo.svg.png"
        className={s.header_logo}
        alt="logo not found" />
      <div className={s.header_search_container}>
        <SearchBar />
      </div>     
    </div>
  );
}
