import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import 'isomorphic-fetch';
import { FullPageSlide, FullPageSection } from '../layouts';
import { onStripeToken } from '../actions';

import {buttons} from '../layouts/SectionIntro';


const currencyToNumber = (currency) => {
  return Number(currency.replace(/[^0-9]+/g,""));
};

const displayPrice = (currency) => {
  return currency.split('.')[0];
}

const STRIPE_KEY = "pk_Z4nRov9Ge6n90mXq9v0VQeFmgIbsr";

const stripeProps = {
  stripeKey: STRIPE_KEY,
  name: "Charlie Duke",
  shippingAddress: true,
}

const Shop = ({page, products}) => (
  <FullPageSection>
    <FullPageSlide
      theme="dark"
      backgroundPosition="76% center"
    >
      <div className={css(styles.products)}>
        <h2>{page.title}</h2>
        <div dangerouslySetInnerHTML={{__html: page.content}} />
        <div className={css(styles.row)}>
        {products.map(product => {
          return (
            <div key={product.id} className={css(styles.thirds)}>
              <div className={css(styles.productInner)}>
              <div data-image={product.image}
                   data-intense={true}
                   style={{
                     backgroundImage: `url(${product.image})`,
                     backgroundRepeat: 'no-repeat',
                     backgroundSize: 'cover',
                     cursor: 'zoom-in',
                     paddingBottom: '100%',
                     width: '100%',
                     margin: '0 auto',
                     display: 'block',}}/>
              <Product product={product} />
              </div>
            </div>
          )
        })}
        </div>
      </div>

    </FullPageSlide>
  </FullPageSection>
)
const initialProductState = {
  showOptions: false,
  shippingRate: null,
  inscription: null,
  wantSigned: null,
  purchased: false,
  error: false,
  ordering: false,
}
class Product extends React.Component{
  constructor(props){
    super(props);
    this.state = initialProductState
    this._onSuccess = this._onSuccess.bind(this);
  }
  _onSuccess() {
    this.setState({
      purchased: true,
      ordering: false,
    })

  }
  _onError() {
    this.setState({
      error: true,
      ordering: false,
    })

  }
  render(){
    const { product } = this.props;
    const { showOptions,
            shippingRate,
            wantSigned,
            inscription,
            ordering,
            purchased,
            error } = this.state;
    const offerBoth = product.variants && (product.variants.indexOf('signed') > -1) && (product.variants.indexOf('unsigned') > -1);
    const offerOnlySigned = product.variants && (product.variants.indexOf('signed') > -1) && (product.variants.indexOf('unsigned') < 0);

    if (purchased) {
      return (
        <div className={css(styles.purchaseSuccess)}>
          Purchased! <br/>
          Check your email for confirmation.<br/>
          <span onClick={()=>this.setState(initialProductState)}
                style={{cursor: 'pointer', textDecoration: 'underline'}}>
               Purchase another one.
          </span>
        </div>
      )
    }

    if (error) {
      return (
        <div className={css(styles.purchaseSuccess)}>
          Sorry <br/>
          There was a problem processing your order.<br/>
          <span onClick={()=>this.setState(initialProductState)} style={{cursor: 'pointer', textDecoration: 'underline'}}>Try again.</span>
        </div>
      )
    }

    if (ordering) {
      return (
        <div className={css(styles.purchaseSuccess)}>
          Finishing your order... <br/>
          <div style={{fontSize: '12px', cursor: 'pointer', color: '#adadad', padding: '8px'}} onClick={()=>this.setState(initialProductState)}>Cancel</div>
        </div>
      )
    }
    if ( showOptions ) {
      return (
        <div className={css(styles.productOptions)}>
          {(!shippingRate) ?
            <div>
              Choose Shipping: <br/>
              <div className={css(styles.link)} onClick={()=>{this.setState({shippingRate:product.domesticShipping })}}>US ({product.domesticShipping})</div>
              <div className={css(styles.link)} onClick={()=>{this.setState({shippingRate:product.internationalShipping })}}>International ({product.internationalShipping})</div>
            </div>
          : null }

          {(shippingRate && offerBoth && !wantSigned) ?
            <div>

              Would you like this signed?
              <div style={{padding: '5px'}}>
                <span className={css(styles.link)} onClick={()=>{this.setState({wantSigned: 'yes'})}}>Yes</span> |
                <span className={css(styles.link)} onClick={()=>{this.setState({wantSigned: 'no'})}}>No, thanks.</span>

              </div>

            </div> : null
          }

          {((shippingRate && offerOnlySigned) || (shippingRate && wantSigned === "yes")) ?
            <div>
              <label htmlFor="inscription">What would you like on the inscription? </label><br/>
              <input name="inscription" style={{width: '90%', boxSizing: 'border-box', padding: '5px', margin: '14px 0' }} onChange={(e)=>{this.setState({inscription: e.target.value})}} />
            </div> : null
          }

          { (shippingRate ) && ( offerOnlySigned || (offerBoth && wantSigned) || (!offerOnlySigned && !offerBoth)) ?
            <StripeCheckout
              {...stripeProps}
              token= {onStripeToken.bind(this, {
                  amount: (currencyToNumber(product.price) * 100) + (currencyToNumber(shippingRate) * 100),
                  inscription: inscription,
                  product_description: product.title,
                  success: this._onSuccess,
                  error: this._onError,
                })}
              description={`${product.title} ${(wantSigned && inscription) ? "Inscribed: " + inscription : ""}`}
              amount={(currencyToNumber(product.price) * 100) + (currencyToNumber(shippingRate) * 100)}
              currency="USD"
              panelLabel={`${product.price} + ${shippingRate} shipping`}
              image={product.image}
            >
            <div className={css(buttons.button)} onClick={()=>{this.setState({ordering: true})}}>
              Order
            </div>
          </StripeCheckout>: null
          }
          <div style={{fontSize: '12px', cursor: 'pointer', color: '#adadad', padding: '8px'}} onClick={()=>this.setState(initialProductState)}>Cancel</div>
        </div>

      )
    }

  return (
    <div onClick={()=>this.setState({showOptions: true})} className={css(styles.productDetails)}>
      <div style={{fontSize: '22px'}} dangerouslySetInnerHTML={{__html: product.title}}/>
      <div dangerouslySetInnerHTML={{__html: product.description}}/>
      <div style={{color: '#666'}}>
        {displayPrice(product.price)}<br/>
        {/* US Shipping - {displayPrice(product.domesticShipping)}<br/>
        International Shipping - {displayPrice(product.internationalShipping)} */}
      </div>


    </div>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  thirds: {
    width: '32%',
    '@media(max-width: 960px)':{
      width: '50%',
    },
    '@media (max-width: 670px)':{
      width: '100%'
    }
  },
  productInner: {
    padding: '5px 12px',
    textAlign: 'center',
  },
  purchaseSuccess: {

    padding: '22px 5px',
    maxWidth: '90%',
    margin: '0 auto',

  },
  productDetails: {
    cursor: 'pointer',
    padding: '22px 5px',
    maxWidth: '100%',

    margin: '0 auto',
    ':hover':{
      background: '#333'
    }

  },
  link: {
    cursor: 'pointer',
    ':hover':{
      textDecoration: 'underline',
    }
  },
  productOptions: {
    padding: '22px 5px',
  },
  products: {
    maxWidth: '1440px',
    margin: '0 auto',
    clear: 'both',
    padding: '15px 100px',
    '@media (max-width: 670px)':{
      padding: '22px 22px 100px 22px',
    }
  },
  title: {
    fontSize: '78px',
    textAlign: 'center',
    fontFamily: '"futura-pt-bold", sans-serif',
  }
})

const mapStateToProps = state => {
  const { products } = state

  return {
    products
  }
}

export default connect(mapStateToProps)(Shop)
