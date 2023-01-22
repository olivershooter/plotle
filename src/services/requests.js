import React, { useState, useEffect } from "react";
import axios from "axios";
import { imdb } from "../JSON/imdbid.js";

const MY_KEY = "ee5ac8ef";
var FILM_ID = "";

function AddRandomItem() {
  const randomItem = imdb[Math.floor(Math.random() * imdb.length)];
  console.log(randomItem);
  FILM_ID = "tt0" + randomItem;
  return FILM_ID; // return the FILM_ID variable
}

export const getFilmForToday = async (FILM_ID) => {
  if (imdb.length === 0) {
    console.log("The imdb array is empty, please provide a valid array.");
    return;
  }
  FILM_ID = AddRandomItem(); // update the FILM_ID variable
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${MY_KEY}&i=${FILM_ID}`
    );
    console.log("getFilm log" + response.data);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};
