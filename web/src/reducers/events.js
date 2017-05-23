const POPULATE_EVENTS = 'POPULATE_EVENTS';

const events = (state = [], action) => {
  switch(action.type){
    case POPULATE_EVENTS:
      return action.events
    default:
      return state
  }
}

export default events
