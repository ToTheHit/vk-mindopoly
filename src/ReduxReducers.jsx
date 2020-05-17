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
  selectedQuestionsCategory: {
    questions: [],
    category: 'All',
  },
  selectedTab: '',
  notificationsAllow: false,
}, action) {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function userQuestions(state = {
  questions: {
    All: [],
    Math: [],
    Russian: [],
    Literature: [],
    Physics: [],
    Chemistry: [],
    Astronomy: [],
    Biology: [],
    History: [],
    Art: [],
    Sport: [],
    Geography: [],
    Other: [],
  },
  selectedQuestionsCategory: [],
  category: 'All',
  categoriesHorizontalScroll: 0,
}, action) {
  switch (action.type) {
    case 'UPDATE_USER_QUESTIONS':
      return { ...state, ...action.payload };
    case 'UPDATE_USER_QUESTION_CATEGORY':
      return {
        ...state,
        selectedQuestionsCategory: state.questions[action.payload.category],
        category: action.payload.category,
        categoriesHorizontalScroll: action.payload.categoriesHorizontalScroll,
      };
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

export function userToken(state = { token: '', friendsAccessToken: '' }, action) {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function pageCache(state = { shop: [] }, action) {
  switch (action.type) {
    case 'PAGE_CACHE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
