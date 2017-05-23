const POPULATE_MAIN_MENU = 'POPULATE_MAIN_MENU';

const menu = (state = [], action) => {
  switch(action.type){
    case POPULATE_MAIN_MENU:
      return action.items
    default:
      return state
  }
}

export default menu
