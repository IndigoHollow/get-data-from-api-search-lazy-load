const initialState = {
  data: [],
  loading: false,
  error: false,
  search: "",
  load: 4
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUESTED_API":
      return {
        data: [],
        loading: true,
        error: false,
        search: "",
        load: 4
      };
    case "REQUESTED_API_SUCCEEDED":
      return {
        data: action.payload,
        loading: false,
        error: false,
        search: "",
        load: 4
      };
    case "REQUESTED_API_FAILED":
      return {
        data: "",
        loading: false,
        error: true,
        search: "",
        load: 4
      };
    case "SEARCH_DATA":
      return {
        ...state,
        search: action.payload
      };
    case "LOAD_MORE":
      return {
        ...state,
        load: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
