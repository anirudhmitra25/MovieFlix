import axios from "axios";
export default async function getCreditsData(id: number) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits`,
      {
        params: {
          api_key: "2dca580c2a14b55200e784d157207b4d",
        },
      }
    );
    if (response.data) {
      const credits = response.data;
      const baseURL = "https://image.tmdb.org/t/p/";
      const imageSize = "w500";
      let castData = credits.cast.slice(0, 10).map((data: any) => {
        return {
          id: data.id,
          actorName: data.name,
          characterName: data.character,
          image: `${baseURL + imageSize + data.profile_path}`,
        };
      });
      let crewData = credits.crew
        .filter(
          (data: any) =>
            data.job === "Producer" ||
            data.job === "Director" ||
            data.job === "Screenplay"
        )
        .map((data: any) => {
          return {
            id: data.id,
            crewName: data.name,
            job: data.job,
            image: `${baseURL + imageSize + data.profile_path}`,
          };
        });
      const cleaned_movie_data = {
        cast: castData,
        crew: crewData,
      };
      return cleaned_movie_data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
