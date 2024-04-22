import axios from "axios";
interface IGetMoviesList {
  selectedGenres: Array<number>;
  year: number;
}
export default async function getMoviesList({
  selectedGenres,
  year,
}: IGetMoviesList) {
  console.log(year)
  const params: any = {
    api_key: "2dca580c2a14b55200e784d157207b4d",
    sort_by: "popularity.desc",
    primary_release_year: year,
    page: 1,
    "vote_count.gte": 100,
  };
  if (selectedGenres && selectedGenres.length > 0) {
    const withGenresString = selectedGenres.join(",");
    params.with_genres = withGenresString;
  }

  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
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
