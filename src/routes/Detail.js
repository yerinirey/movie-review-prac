import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState("");
  const [genre, setGenre] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setGenre(movie.genres);
    console.log(movie);
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  return (
    <div className={styles.box}>
      <div className={styles.movie}>
        <img
          className={styles.movie_img}
          src={movie.medium_cover_image}
          alt={movie.medium_cover_image}
        />

        <div className={styles.movie_detail}>
          <h1>{movie.title}</h1>
          <span>
            {movie.year} / {movie.runtime}min
          </span>
          <div>{genre && genre.map((g) => <span key={g}>{g} </span>)}</div>
          {/* React는 화면에 커밋한 후 동작을 실행하기에 렌더링이 되기 전이어서 데이터가 undefined로 표시됨
          따라서 이를 해결하기 위해 genre && 추가해서 해결함 */}
          <div>
            {movie.rating}⭐ / {movie.download_count} downloads
          </div>
        </div>
      </div>

      <h3>{movie.description_full}</h3>
    </div>
  );
}

export default Detail;
