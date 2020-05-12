const globalVariables = {
  view: {
    start: 'StartView',
    main: 'MainView',
    work: 'WorkView',
    test: 'TestView',
    page404: 'Page404',
  },
  authToken: 'authToken',
  serverURL: 'https://320748-cp98857.tmweb.ru',
  translateEnToRu(category) {
    switch (category) {
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
      case 'Other':
        return 'Другое';
      case 'Geography':
        return 'География';
      default:
        return '';
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
      case 'GPtoday': return 'GPDetailsModalPage';
      default: return null;
    }
  },
};

export default globalVariables;
