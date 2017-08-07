const UPDATE_LOCATION = 'UPDATE_LOCATION';

const location = (state = {section: 'charlie-duke', slide: null, page: null}, action) => {
  switch(action.type){
    case UPDATE_LOCATION:
      return {
        section: action.section,
        slide: action.slide,
        page: action.page,
      };
    default:
      return state
  }
}

export default location
