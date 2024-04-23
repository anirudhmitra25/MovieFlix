import axios from "axios";
async function getGenres() {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list",
      {
        params: {
          api_key: "2dca580c2a14b55200e784d157207b4d",
        },
      }
    );
    return [{ name: "All", id: 0 }, ...response.data.genres];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default getGenres;
