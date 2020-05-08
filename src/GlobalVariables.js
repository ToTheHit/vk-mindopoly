const globalVariables = {
  view: {
    start: 'StartView',
    main: 'MainView',
    test: 'TestView',
    page404: 'Page404',
  },
  authToken: 'authToken',
  serverURL: 'https://f54d27ad.ngrok.io',
  translateEnToRu(theme) {
    switch (theme) {
      case 'Math': return 'Математика';
      case 'Russian': return 'Русский язык';
      case 'Literature': return 'Литература';
      case 'Physics': return 'Физика';
      case 'Chemistry': return 'Химия';
      case 'Astronomy': return 'Астрономия';
      case 'Biology': return 'История';
      case 'History': return 'История';
      case 'Art': return 'Искусство';
      case 'Sport': return 'Sport';
      case 'Other': return 'Другое';
      case 'Geography': return 'География';
      default: return '';
    }
  },
};


export default globalVariables;
