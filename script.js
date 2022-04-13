"use strict";
const movies = document.querySelector(".container");
const searchInput = document.querySelector(".search-box");
const videos = document.querySelector(".video-container");

// const searchButton = document.querySelector(".search-btn");

function displayMovies(videoid) {
  const html = ` <iframe class="video-item"
      width="300"
      height="200"
      src="https://www.youtube.com/embed/${videoid}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>`;
  videos.insertAdjacentHTML("beforeend", html);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    videos.innerHTML = "";
    // console.log("button enter");
    console.log(searchInput.value);
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchInput.value}&maxResults=20&key=AIzaSyAInav0r0-IwvyNT0YupmimD5lfUfuZzfo `
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.items.forEach((el) => {
          // let [, videoid] = Object.values(el.id);
          let videoid = Object.values(el.id)[1];
          displayMovies(videoid);
        });
      })
      .catch((err) => console.log(`${err.msg}`));
    searchInput.value = "";
  }
});
