import React, { useState, useEffect } from "react";

import apiData from "./api.json"; // JSON dosyasını içe aktarın

export default function SearchMovie() {
  const [typing, setTyping] = useState("");
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    getMovies();
  }, [typing]);

  function getMovies() {
    const getData = apiData.results
      .filter((item) => item.title.toLowerCase().includes(typing.toLowerCase()))
      .map((i) => {
        return {
          id: i.episode_id,
          title: i.title,
          img: i.img,
        };
      });
    setMovieData(getData);
  }

  function typingStart(e) {
    const typingTimeout = setTimeout(() => {
      setTyping(e.target.value);
    }, 500);
    return () => {
      clearTimeout(typingTimeout);
    };
  }

  return (
    <div>
      <div className="searchBar">
        <div className="mainSearchBar">
          <h2>SearchMovie</h2>
          <input onChange={typingStart} type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="mainMovie">
        <div className="mainBoxs">
          {movieData.map((item) => (
            <div key={item.id} className="boxs">
              <img src={item.img} alt={item.title} />
              <div className="movieInfo">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
