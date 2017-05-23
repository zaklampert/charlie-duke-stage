const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';

const modal = (state = { show: false, content: null }, action) => {
  switch(action.type){
    case SHOW_MODAL:
      return {
        show: true,
        content: action.content,
      }
    case HIDE_MODAL:
      return{
        show: false,
        content: null,
      }
    default:
      return state
  }
}

export default modal;
