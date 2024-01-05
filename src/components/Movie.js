import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";
function Movie({ id, coverImg, title, summary, genres }) {
  if(summary === "") return;
  return (
    <div className={styles.card}>
      <img className={styles.poster} src={coverImg} alt={title} />
      <div className={styles.cardcontent}>
        <h2>
          <Link className={styles.titles} to={`/movie/${id}`}>
            {title}
          </Link>
        </h2>
        <ul className={styles.genre}>
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <p className={styles.summary}>
          {summary.length > 235 ? `${summary.slice(0, 280)}...` : summary}
        </p>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Movie;
