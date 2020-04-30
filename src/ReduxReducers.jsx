export function schemeChanger(state = { scheme: 'light' }, action) {
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
