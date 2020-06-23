const globalVariables = {
  view: {
    start: 'StartView',
    main: 'MainView',
    work: 'WorkView',
    test: 'TestView',
    page404: 'Page404',
  },
  commonView: {
    roots: {
      main: 'MainRoot',
      homework: 'HomeworkRoot',
      shop: 'ShopRoot',
      leaderboard: 'LeaderboardRoot',
    },
    panels: {
      main: 'Main',
      questionsList: 'QuestionsList',
      questionDetails: 'QuestionDetails',
      rejectedQuestion: 'RejectedQuestion',
      homework: 'Homework',
      shop: 'Shop',
      shopQuestion: 'ShopQuestion',
      leaderboard: 'Leaderboard',
    },
  },
  authToken: 'authToken',
  friendsAccessToken: 'friendsAccessToken',
  notificationAllow: 'notificationAllow',
  serverURL: 'https://mindopoly.ml',
  quizResult: 'quizResult',
  quizQuestions: 'quizQuestions',
  tooltips: 'tooltips',
  translateEnToRu(category) {
    switch (category) {
      case 'All':
        return 'Все';
      case 'Math':
        return 'Математика';
      case 'Russian':
        return 'Русский язык';
      case 'Literature':
        return 'Литература';
      case 'Physics':
        return 'Физика';
      case 'Chemistry':
        return 'Химия';
      case 'Astronomy':
        return 'Астрономия';
      case 'Biology':
        return 'Биология';
      case 'History':
        return 'История';
      case 'Art':
        return 'Искусство';
      case 'Sport':
        return 'Спорт';
      case 'Geography':
        return 'География';
      case 'Other':
        return 'Другое';
      default:
        return category;
    }
  },
  categoryColor(category) {
    switch (category) {
      case 'Math':
        return '#E64646';
      case 'Russian':
        return '#857250';
      case 'Literature':
        return '#FFA000';
      case 'Physics':
        return '#3F8AE0';
      case 'Chemistry':
        return '#792EC0';
      case 'Astronomy':
        return '#6D7885';
      case 'Biology':
        return '#4CD964';
      case 'History':
        return '#63B9BA';
      case 'Art':
        return '#E5188F';
      case 'Sport':
        return '#28436E';
      case 'Other':
        return '#909499';
      case 'Geography':
        return '#4BB34B';
      default:
        return '';
    }
  },
  mainViewModal(name) {
    switch (name) {
      case 'Tax': return 'TaxDetailsModalPage';
      case 'GPtoday': return 'GPDetailsModalPage';
      case 'CoinsToday': return 'CoinsDetailsModalPage';
      case 'Mindopolist': return 'MindopolistDetailsModalPage';
      case 'Pioneer': return 'PioneerModalPage';
      case 'Master': return 'MasterModalPage';
      default: return null;
    }
  },
  leaderboardBadgeType: {
    master: 'leaderboardBadgeMaster',
  },
  maxUnapprovedQuestionCount: 12,

  getReasonByCode(code) {
    switch (code) {
      case 1: return 'Копия чужого вопроса';
      case 2: return 'Нет образовательно подтекста';
      case 3: return 'Особое решение модерации';
      default: return null;
    }
  },
  getReasonDescriptionByCode(code) {
    switch (code) {
      case 1: return 'К сожалению, подобный вопрос зарегистрировал другой пользователь. Мы вернули потраченные монеты на Ваш счёт.';
      case 2: return 'Тестовое пояснение';
      default: return null;
    }
  },
  notificationType: {
    QuestionResult: 'QuestionResult',
    Achievement: 'Achievement',
  },
};

export default globalVariables;
