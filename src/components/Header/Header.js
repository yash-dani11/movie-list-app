import { useEffect, useState } from "react";
import logo from "../../../public/logo.png";
import styles from "./Header.module.css";
import { GENRE_LIST_API } from "../../utils/constants";
const Header = ({ onFilter }) => {
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState([-1]);
  const filterbyGenre = (genreId) => {
    setActiveGenre((prevActiveGenre) => {
      let selectedGenre = [...prevActiveGenre];
      const defaultIndex = selectedGenre.indexOf(-1);
      if (defaultIndex > -1) {
        selectedGenre.splice(defaultIndex, 1);
      }

      if (genreId === -1) {
        selectedGenre = [-1];
      }
      const selectedIndex = selectedGenre.indexOf(genreId);
      if (selectedIndex > -1) {
        selectedGenre.splice(selectedIndex, 1);
      } else {
        selectedGenre.push(genreId);
      }
      if (selectedGenre.length === 0) {
        selectedGenre = [-1];
      }
      onFilter(selectedGenre);
      return selectedGenre;
    });
  };
  useEffect(() => {
    const getGenres = async () => {
      const response = await fetch(
        `${GENRE_LIST_API}&api_key=${process.env.REACT_APP_API_KEY}`
      );
      let allGenres = await response.json();
      allGenres.genres.unshift({ id: -1, name: "All" });
      setGenres(allGenres.genres);
    };
    getGenres();
  }, []);
  return (
    <header className={styles["header"]}>
      <img className={styles["header-logo"]} src={logo} alt="MovieFlix"></img>
      <div className={styles["genres-list"]}>
        {genres?.map((genre) => {
          const activeClass = activeGenre.includes(genre.id)
            ? styles["active"]
            : "";
          return (
            <div
              className={`${styles["genre"]} ${activeClass}`}
              key={genre.id}
              onClick={() => filterbyGenre(genre.id)}
            >
              {genre.name}
            </div>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
