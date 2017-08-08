import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {connect} from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import 'isomorphic-fetch';
import {FullPageSlide, FullPageSection} from '../layouts';
import {onStripeToken} from '../actions';
import '../css/store.css';
import $ from 'jquery';
import Intense from '../lib/intense.js';
import {Footer} from '../components';

const currencyToNumber = (currency) => {
    return currency && Number(currency.replace(/[^0-9]+/g, ""));
};

const displayPrice = (currency) => {
    return currency && currency.split('.')[0];
}

const STRIPE_KEY = "pk_live_vMPhZPvKz8H87pxtLJnEqRJ0";

const stripeProps = {
    stripeKey: STRIPE_KEY,
    name: "Charlie Duke",
    shippingAddress: true
}

class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfProductsToShow: 3
        };
        this._loadMoreProducts = this._loadMoreProducts.bind(this);
    }
    _loadMoreProducts() {
        this.setState({
            numberOfProductsToShow: this.state.numberOfProductsToShow + 3
        })
        setTimeout(() => {
            $.fn.fullpage.reBuild();
            const intenseDivs = document.querySelectorAll('*[data-intense="true"]');
            intenseDivs && intenseDivs.length > 0 && Intense(intenseDivs);
        }, 100);
    }
    render() {
        const {page, products} = this.props;
        const {numberOfProductsToShow} = this.state;
        return (
            <FullPageSection>
                <FullPageSlide theme="dark" // backgroundPosition="center bottom"
                    // backgroundSize="contain"
                    // background="/img/shop.jpg"
                >
                    <div className={css(styles.products)}>
                        <div className={css(styles.pageTitle)}>{page.title}</div>
                        <div dangerouslySetInnerHTML={{
                            __html: page.content
                        }}></div>
                        <div className={css(styles.row)}>
                            {products.slice(0, numberOfProductsToShow).map(product => {
                              const offerOnlySigned = product.variants && (product.variants.indexOf('signed') > -1) && (product.variants.indexOf('standard') < 0);
                                return (
                                    <div key={product.id} className={css(styles.thirds)}>
                                        <div className={css(styles.productInner)}>
                                            <div data-image={product.image} data-intense={true} data-src={product.image} style={{
                                                backgroundImage: `url(${product.image})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                                cursor: 'zoom-in',
                                                paddingBottom: '100%',
                                                width: '100%',
                                                margin: '0 auto',
                                                display: 'block'
                                            }}></div>
                                            <div className={css(styles.productDetails)}>

                                                <div style={{
                                                    fontSize: '18px',
                                                    fontWeight: '600'
                                                }} dangerouslySetInnerHTML={{
                                                    __html: product.title
                                                }}/>
                                                <div style={{
                                                    fontSize: '15px',
                                                    fontWeight: '300'
                                                }} dangerouslySetInnerHTML={{
                                                    __html: product.description
                                                }} className="product_description"/>
                                                {(product.price_signed) ? <div style={{marginBottom: '20px'}}>Available signed.</div> : null}
                                                <div style={{
                                                    color: '#c3c3c3',
                                                    fontSize: '15px'
                                                }}>
                                                    {(offerOnlySigned) ? displayPrice(product.price_signed) : displayPrice(product.price)}<br/>
                                                    {/* {(product.price_signed) ? `${displayPrice(product.price_signed)} (Signed)` : null} */}
                                                </div>

                                                <Product product={product}/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                        {(products.length > numberOfProductsToShow)
                            ? <div style={{
                                    textAlign: 'center',
                                    display: 'block'
                                }}>
                                    <div className={css(styles.loadMoreButton)} onClick={this._loadMoreProducts}>
                                        Load more
                                    </div>
                                </div>
                            : null}
                    </div>
                    <div data-src="/img/shop.jpg" style={{
                        background: `url(/img/shop.jpg)`,
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                        paddingBottom: '41.7%',
                        backgroundSize: 'contain'
                    }}></div>
                    <Footer />
                </FullPageSlide>
            </FullPageSection>
        )
    }
}

const initialProductState = {
    showOptions: false,
    shippingRate: null,
    inscription: null,
    wantSigned: null,
    purchased: false,
    error: false,
    ordering: false
}
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialProductState
        this._onSuccess = this._onSuccess.bind(this);
    }
    _onSuccess() {
        this.setState({purchased: true, ordering: false})

    }
    _onError() {
        this.setState({error: true, ordering: false})

    }
    render() {
        const {product} = this.props;
        const {
            showOptions,
            shippingRate,
            wantSigned,
            inscription,
            ordering,
            purchased,
            error
        } = this.state;
        const offerBoth = product.variants && (product.variants.indexOf('signed') > -1) && (product.variants.indexOf('standard') > -1);
        const offerOnlySigned = product.variants && (product.variants.indexOf('signed') > -1) && (product.variants.indexOf('standard') < 0);
        const signedDifference = product.price_signed && product.price && currencyToNumber(product.price_signed) - currencyToNumber(product.price);
        const signedDifferenceInDolars = signedDifference && (signedDifference / 100)
        if (purchased) {
            return (
                <div className={css(styles.purchaseSuccess)}>
                    Purchased!
                    <br/>
                    Check your email for confirmation.<br/>
                    <span onClick={() => this.setState(initialProductState)} style={{
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    }}>
                        Purchase another one.
                    </span>
                </div>
            )
        }

        if (error) {
            return (
                <div className={css(styles.purchaseSuccess)}>
                    Sorry
                    <br/>
                    There was a problem processing your order.<br/>
                    <span onClick={() => this.setState(initialProductState)} style={{
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    }}>Try again.</span>
                </div>
            )
        }

        if (ordering) {
            return (
                <div className={css(styles.purchaseSuccess)}>
                    Finishing your order...
                    <br/>
                    <div style={{
                        fontSize: '12px',
                        cursor: 'pointer',
                        color: '#adadad',
                        padding: '8px'
                    }} onClick={() => this.setState(initialProductState)}>Cancel</div>
                </div>
            )
        }
        if (showOptions) {
            return (
                <div className={css(styles.productOptions)}>
                    {(!shippingRate)
                        ? <div>
                                <span style={{fontSize: '13px', fontWeight:'300'}}>Choose Shipping</span>
                                <br/>
                                <div className={css(styles.link)} onClick={() => {
                                    this.setState({shippingRate: product.domesticShipping})
                                }}>US ({product.domesticShipping})</div>
                                <div className={css(styles.link)} onClick={() => {
                                    this.setState({shippingRate: product.internationalShipping})
                                }}>International ({product.internationalShipping})</div>
                            </div>
                        : null}

                    {(shippingRate && offerBoth && !wantSigned)
                        ? <div>

                                {(product.price_signed) ? `Would you like this signed for another $${signedDifferenceInDolars}?` : 'Would you like this signed?' }
                                <div style={{
                                    padding: '5px'
                                }}>
                                    <span className={css(styles.link)} onClick={() => {
                                        this.setState({wantSigned: 'yes'})
                                    }}>Yes</span>
                                    |
                                    <span className={css(styles.link)} onClick={() => {
                                        this.setState({wantSigned: 'no'})
                                    }}>No, thanks.</span>

                                </div>

                            </div>
                        : null
}

                    {((shippingRate && offerOnlySigned) || (shippingRate && wantSigned === "yes"))
                        ? <div>
                                <label htmlFor="inscription">What would you like on the inscription?
                                </label><br/>
                                <input name="inscription" style={{
                                    width: '90%',
                                    boxSizing: 'border-box',
                                    padding: '5px',
                                    margin: '14px 0'
                                }} onChange={(e) => {
                                    this.setState({inscription: e.target.value})
                                }}/>
                            </div>
                        : null
}

                    {(shippingRate) && (offerOnlySigned || (offerBoth && wantSigned) || (!offerOnlySigned && !offerBoth))
                        ? <div style={{
                                margin: '20px auto',
                                display: 'block',
                                textAlign: 'center'
                            }}>
                                <StripeCheckout {...stripeProps}
                                  token={onStripeToken.bind(this, {
                                    amount: (currencyToNumber(((wantSigned === "yes") || offerOnlySigned) && product.price_signed) ? product.price_signed : product.price) + (currencyToNumber(shippingRate)),
                                    inscription: inscription,
                                    product_description: product.title,
                                    success: this._onSuccess,
                                    error: this._onError
                                  })}
                                  description={`${product.title} ${ (wantSigned && inscription)
                                    ? "Inscribed: " + inscription
                                    : ""}`}
                                  amount={(currencyToNumber(((wantSigned === "yes" || offerOnlySigned) && product.price_signed) ? product.price_signed : product.price) * 100) + (currencyToNumber(shippingRate) * 100)}
                                  currency="USD"
                                  panelLabel={`${(((wantSigned === "yes") || offerOnlySigned )&& product.price_signed) ? product.price_signed : product.price} + ${shippingRate} shipping`}
                                  image={product.image}>

                                    <div className={css(styles.specialShopButton)} onClick={() => {
                                        this.setState({ordering: true})
                                    }}>
                                        Order
                                    </div>
                                </StripeCheckout>
                            </div>
                        : null
}
                    <div style={{
                        fontSize: '12px',
                        cursor: 'pointer',
                        color: '#adadad',
                        padding: '8px'
                    }} onClick={() => this.setState(initialProductState)}>Cancel</div>
                </div>

            )
        }

        return (

            <div style={{
                margin: '42px 0px 36px 0px'
            }}>

                <div className={css(styles.specialShopButton)} onClick={() => this.setState({showOptions: true})}>
                    BUY
                </div>
            </div>

        )
    }
}

const styles = StyleSheet.create({
    specialShopButton: {
        textTransform: 'uppercase',
        padding: '17px 70px',
        cursor: 'pointer',
        border: '3px solid white',
        textAlign: 'center',
        display: 'inline-block',
        fontWeight: '600',
        letterSpacing: '3px',
        ":hover": {
            background: 'white',
            color: 'black'
        }

    },
    loadMoreButton: {
        display: 'inline-block',
        cursor: 'pointer',
        textTransform: 'uppercase',
        color: '#adadad',
        letterSpacing: '3px'
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    thirds: {
        width: '32%',
        '@media(max-width: 960px)': {
            width: '50%'
        },
        '@media (max-width: 670px)': {
            width: '100%'
        }
    },
    productInner: {
        padding: '5px 12px',
        textAlign: 'center'
    },
    purchaseSuccess: {

        padding: '22px 5px',
        maxWidth: '90%',
        margin: '0 auto',
        background: 'rgba(0,0,0,.5)'
    },
    productDetails: {
        padding: '22px 5px',
        maxWidth: '100%',
        background: 'rgba(0,0,0,.5)',
        margin: '0 auto'
    },
    link: {
        cursor: 'pointer',
        padding: '7px 0px',
        ':hover': {
            textDecoration: 'underline'
        }
    },
    productOptions: {
        padding: '22px 5px',
        background: 'rgba(0,0,0,.5)'
    },
    products: {
        maxWidth: '1440px',
        margin: '0 auto',
        clear: 'both',
        padding: '85px 100px 18px 100px',
        '@media (max-width: 670px)': {
            padding: '70px 22px 100px 22px'
        }
    },
    title: {
        fontSize: '78px',
        textAlign: 'center',
        fontFamily: '"futura-pt-bold", sans-serif'
    },
    pageTitle: {

        fontSize: '66px',
        fontFamily: '"futura-pt-bold"',
        fontWeight: '700',
        '@media (max-width: 670px)': {
            fontSize: '44px'
        }
    }
})

const mapStateToProps = state => {
    const {products} = state

    return {products}
}

export default connect(mapStateToProps)(Shop)
