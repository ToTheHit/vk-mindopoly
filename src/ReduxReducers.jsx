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
  GP: {
    today: 0,
    overall: 0,
  },
  GPgrowth: 0,
  coins: {
    today: 0,
    overall: 0,
  },
  first_name: '',
  last_name: '',
  photo_200: '',
  tax: 0,
  friendsPlace: 1,
  worldPlace: 1,
  date: 0,
  isExamAvailable: false,
  isExamSuccess: false,
  effects: [],
  questions: [],
  caregoriesHorizontalScroll: 0,
  selectedTab: '',
}, action) {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function mainViewModal(state = { modalName: null }, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modalName: action.payload,
      };
    default:
      return state;
  }
}

export function workViewModal(state = { modalIsActive: false, questionsLength: 0 }, action) {
  switch (action.type) {
    case 'UPDATE_WORK-VIEW-MODAL':
      return {
        ...state,
        modalIsActive: action.payload.modalIsActive,
        questionsLength: action.payload.questionsLength,
      };
    default:
      return state;
  }
}
