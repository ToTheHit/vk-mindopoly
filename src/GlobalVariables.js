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
      shop: 'ShopRoot',
      leaderboard: 'LeaderboardRoot',
    },
    panels: {
      main: 'Main',
      questionDetails: 'QuestionDetails',
      shop: 'Shop',
      shopQuestion: 'ShopQuestion',
      leaderboard: 'Leaderboard',
    }
  },
  authToken: 'authToken',
  friendsAccessToken: 'friendsAccessToken',
  notificationAllow: 'notificationAllow',
  serverURL: 'https://320748-cp98857.tmweb.ru',
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
      default: return null;
    }
  },
};

export default globalVariables;
