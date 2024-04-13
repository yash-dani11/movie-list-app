import styles from "./MovieCard.module.css";
const MovieCard = ({ name, rating, background, voteCount }) => {
  return (
    <div className={styles["movie-card"]}>
      <img
        className={styles["movie-poster"]}
        src={`https://image.tmdb.org/t/p/w300/${background}`}
        alt={name}
      ></img>
      <div className={styles["details-container"]}>
        <div className={styles["movie-name"]}>{name}</div>
        <div className={styles["movie-rating"]}>
          {rating.toFixed(2)}/10 ({voteCount.toLocaleString()})
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
