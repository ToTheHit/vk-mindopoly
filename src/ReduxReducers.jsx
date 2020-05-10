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

export function userInfo(state = {
  GP: 0,
  GPgrowth: 0,
  coins: 0,
  first_name: '',
  last_name: '',
  photo_200: '',
  tax: 0,
  friendsPlace: 1,
  worldPlace: 1,
}, action) {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
