import axios from "axios";
export default async function getSearchMovies(
  searchTerm: string,
  pageNum: number
) {
  const params: any = {
    api_key: "2dca580c2a14b55200e784d157207b4d",
    query: searchTerm,
    page: pageNum,
  };

  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: params,
      }
    );
    if (response.data?.results) {
      const movies = response.data?.results;
      const baseURL = "https://image.tmdb.org/t/p/";
      const imageSize = "w500";

      const cleaned_movie_data = movies.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        image: `${baseURL + imageSize + movie.poster_path}`,
        rating: parseFloat(movie.vote_average.toFixed(1)),
      }));

      return cleaned_movie_data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
