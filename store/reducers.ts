const initialState = {
  isLoading: false,
  searchTerm: "",
  selectedMovie: null,
  selectedGenres: [],
  genres: [],
  movies: [],
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SELECT_GENRE":
      if (action.payload !== 0 && state.selectedGenres[0] === 0) {
        return {
          ...state,
          selectedGenres: [action.payload],
        };
      }
      if (action.payload === 0) {
        return {
          ...state,
          selectedGenres: [action.payload],
        };
      }
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
    case "SET_SELECTED_MOVIE":
      return {
        ...state,
        selectedMovie: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
