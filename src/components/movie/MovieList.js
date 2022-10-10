import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import "swiper/scss";
import useSWR from "swr";
import { fetcher } from "../../config";

// https://api.themoviedb.org/3/movie/now_playing?api_key=e5f72b93f58d251ba292afef901c2c26
const MovieList = ({ type = "now_playing" }) => {
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=e5f72b93f58d251ba292afef901c2c26`,
    fetcher
  );
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);

  console.log("MovieList ~ data", data);
  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
