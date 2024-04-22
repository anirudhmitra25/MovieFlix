import axios from "axios";
export default async function getSingleMovieData(id: number) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: "2dca580c2a14b55200e784d157207b4d",
        },
      }
    );
    if (response.data) {
      const movie = response.data;
      const baseURL = "https://image.tmdb.org/t/p/";
      const imageSize = "w500";
      const cleaned_movie_data = {
        id: movie.id,
        title: movie.title,
        image: `${baseURL + imageSize + movie.backdrop_path}`,
        rating: parseFloat(movie.vote_average.toFixed(1)),
        budget: movie.budget,
        revenue: movie.revenue,
        genres: movie.genres,
        originCountry: movie.origin_country,
        productionCompanies: movie.production_companies,
        overview: movie.overview,
        releaseDate: convertDate(movie.release_date),
        runTime: movie.runtime,
        language: movie.original_language,
        popularity: movie.popularity,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        tagline: movie.tagline,
      };
      return cleaned_movie_data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function convertDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
}
