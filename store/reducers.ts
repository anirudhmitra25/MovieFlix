const initialState = {
  isLoading: false,
  searchTerm: "",
  selectedGenres: [],
  genres: [],
  movies: [],
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SELECT_GENRE":
      return {
        ...state,
        selectedGenres: [...state.selectedGenres, action.payload],
      };
    case "UNSELECT_GENRE":
      return {
        ...state,
        selectedGenres: state.selectedGenres.filter(
          (id) => id !== action.payload
        ),
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
