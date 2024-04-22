export const selectGenre = (genreId: number) => {
  return {
    type: "SELECT_GENRE",
    payload: genreId,
  };
};
export const unselectGenre = (genreId: number) => {
  return {
    type: "UNSELECT_GENRE",
    payload: genreId,
  };
};
export const setLoading = (isLoading: boolean) => {
  return {
    type: "SET_LOADING",
    payload: isLoading,
  };
};
export const setSearch = (searchTerm: string) => {
  return {
    type: "SET_SEARCH_TERM",
    payload: searchTerm,
  };
};
