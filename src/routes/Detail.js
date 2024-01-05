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
    <div>
      <div className={styles.backimgbox}>
        {" "}
        {/* img */}
        <img
          className={styles.backimg}
          src={movie.background_image_original}
          alt={movie.background_image_original}
        />
      </div>
      <div className={styles.frontimgbox}>
        <img className={styles.frontimg} src={movie.medium_cover_image} />
      </div>
      <div className={styles.main}>
        <h1 className={styles.title}>{movie.title}</h1>
        <div className={styles.titleinfo}>
          <div>
            {movie.year} / {movie.runtime}min
          </div>
          {/* React는 화면에 커밋한 후 동작을 실행하기에 렌더링이 되기 전이어서 데이터가 undefined로 표시됨
          따라서 이를 해결하기 위해 genre && 추가해서 해결함 */}
          <div className={styles.titlegenre}>
            {genre && genre.map((g) => <span key={g}>{g} </span>)}
          </div>
          <div>
            {movie.rating}⭐ /{" "}
            {movie.download_count ? movie.download_count : "0"} downloads
          </div>
        </div>
        <div className={styles.summary}>{movie.description_full}</div>
      </div>
    </div>
  );
}

export default Detail;
