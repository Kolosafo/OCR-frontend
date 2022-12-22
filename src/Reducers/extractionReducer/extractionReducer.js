export const INITIAL_STATE = {
  error: false,
  loading: false,
  extractions: [],
};

export const EXTRACTION_ACTIONS = {
  start: "EXTRACTION_START",
  success: "EXTRACTION_SUCCESS",
  error: "EXTRACTION_ERROR",
};
export const extractionReducer = (state, action) => {
  switch (action.type) {
    case EXTRACTION_ACTIONS.start:
      console.log("EXTRACTION STARTED");
      return {
        error: false,
        loading: true,
        extractions: [],
      };
    case EXTRACTION_ACTIONS.success:
      return {
        ...state,
        loading: false,
        extractions: [...state.extractions, action.payload],
      };
    case EXTRACTION_ACTIONS.error:
      return {
        error: true,
        loading: false,
        extractions: [],
      };
    default:
      return state;
  }
};
