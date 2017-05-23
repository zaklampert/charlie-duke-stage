const POPULATE_MENU = 'POPULATE_MENU';

const menu = (state = {data: [], ready: false}, action) => {
  switch(action.type){
    case POPULATE_MENU:
      return {
        data: action.json,
        ready: true,
      };
    default:
      return state
  }
}

export default menu
