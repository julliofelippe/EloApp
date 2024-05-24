import axios from 'axios';

export const fetchPdf = async () => {
  const response = await axios
    .get(
      'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    )
    .then((response) => response.data)
    .catch((error) => console.log(error));
  return response;
};
