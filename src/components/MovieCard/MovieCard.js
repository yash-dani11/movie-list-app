import styles from "./MovieCard.module.css";
const MovieCard = ({name,rating,background})=>{
    return(<div className={styles["movie-card"]}>
        <img className={styles["movie-poster"]} src="https://image.tmdb.org/t/p/w300/ldfCF9RhR40mppkzmftxapaHeTo.jpg" alt={name}></img>
        <div className={styles["details-container"]}><div className={styles["movie-name"]}>Migrations</div><div className={styles["movie-rating"]}>7.7/10</div></div>
    </div>)
}
export default MovieCard;