export function schemeChanger(state = { scheme: 'light', quizResult: [] }, action) {
  switch (action.type) {
    case 'UPDATE_SCHEME':
      return {
        ...state,
        scheme: action.payload,
      };
    default:
      return state;
  }
}

export function quiz(state = { quizResult: [] }, action) {
  switch (action.type) {
    case 'UPDATE_QUIZ_RESULT':
      // console.log(action.payload);
      return {
        ...state,
        quizResult: action.payload,
      };
    case 'CLEAR_QUIZ_RESULT':
      return {
        ...state,
        quizResult: [],
      };
    default:
      return state;
  }
}
