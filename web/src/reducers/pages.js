const POPULATE_PAGES = 'POPULATE_PAGES';

const pages = (state = { data: [], ready: false, }, action) => {
  switch(action.type){
    case POPULATE_PAGES:
      return {
        data: action.json,
        ready: true,
      }
    default:
      return state
  }
}

export default pages
