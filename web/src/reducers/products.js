const POPULATE_PRODUCTS = 'POPULATE_PRODUCTS';

const products = (state = [], action) => {
  switch(action.type){
    case POPULATE_PRODUCTS:
      return action.products
    default:
      return state
  }
};

export default products
