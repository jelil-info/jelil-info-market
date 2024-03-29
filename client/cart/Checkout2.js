import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import auth from './../auth/auth-helper'
import cart from './cart-helper.js'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import PlaceOrder from './PlaceOrder'
import PlaceOrder2 from './PlaceOrder2'
import Flutterwave from './Flutterwave'
import { Elements } from 'react-stripe-elements'
import PropTypes from 'prop-types'
import {StripeProvider} from 'react-stripe-elements'
import config from './../../config/config'
import NoSSR from 'react-no-ssr'

const useStyles = makeStyles(theme => ({
  card: {
    margin: '124px',
    marginTop: '80px',
    padding: '16px 40px 90px 40px',
    backgroundColor: '#80808017',
    "@media (max-width: 566px)": {
    
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),

      padding: '0px',
      //width: '300px'
        
    
      
      },
  },
  title: {
    margin: '24px 16px 8px 0px',
    color: theme.palette.openTitle
  },
  subheading: {
    color: 'rgba(88, 114, 128, 0.87)',
    marginTop: "20px",
  },
  addressField: {
    marginTop: "4px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "45%"
  },
  streetField: {
    marginTop: "4px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "93%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "90%"
  },
  continueBtn: {
    marginLeft: '750px',
    marginTop: '50px'

  },
  elements: {
    
    "@media (max-width: 578px)": {
    
      
      width: '300px',
      
      backgroundColor: 'red',
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(1),
        
    
      
      },}
  
}))

export default function Checkout() {
  const classes = useStyles()
  const user = auth.isAuthenticated().user
  const [values, setValues] = useState({
    checkoutDetails: {
      products: cart.getCart(),
      //amount: cart.getTotal(),
      customer_name: user.name,
      customer_email: user.email,
      delivery_address: { street: '', city: '', state: '', zipcode: '', country: '' }
    },
    error: ''
  })

  

  const handleCustomerChange = name => event => {
    let checkoutDetails = values.checkoutDetails
    checkoutDetails[name] = event.target.value || undefined
    setValues({ ...values, checkoutDetails: checkoutDetails })
  }

  const handleAddressChange = name => event => {
    let checkoutDetails = values.checkoutDetails
    checkoutDetails.delivery_address[name] = event.target.value || undefined
    setValues({ ...values, checkoutDetails: checkoutDetails })
  }

  return (
  <NoSSR>
    <StripeProvider apiKey={config.stripe_test_api_key}>
    <Card className={classes.card}>
      <Typography type="title" className={classes.title}>
        Checkout2
      </Typography>
      <TextField id="name" label="Name" className={classes.textField} value={values.checkoutDetails.customer_name} onChange={handleCustomerChange('customer_name')} margin="normal" /><br />
      <TextField id="email" type="email" label="Email" className={classes.textField} value={values.checkoutDetails.customer_email} onChange={handleCustomerChange('customer_email')} margin="normal" /><br />
      <Typography type="subheading" component="h3" className={classes.subheading}>
        Delivery Address
      </Typography>
      <TextField id="street" label="Street Address" className={classes.streetField} value={values.checkoutDetails.delivery_address.street} onChange={handleAddressChange('street')} margin="normal" /><br />
      <TextField id="city" label="City" className={classes.addressField} value={values.checkoutDetails.delivery_address.city} onChange={handleAddressChange('city')} margin="normal" />
      <TextField id="state" label="State" className={classes.addressField} value={values.checkoutDetails.delivery_address.state} onChange={handleAddressChange('state')} margin="normal" /><br />
      <TextField id="zipcode" label="Phone Number" className={classes.addressField} value={values.checkoutDetails.delivery_address.zipcode} onChange={handleAddressChange('zipcode')} margin="normal" />
      <TextField id="country" label="Country" className={classes.addressField} value={values.checkoutDetails.delivery_address.country} onChange={handleAddressChange('country')} margin="normal" />

      <br /> {
        values.error && (<Typography component="p" color="error">
          <Icon color="error" className={classes.error}>error</Icon>
          {values.error}</Typography>)
      }
      
      <div className={classes.elements}>
        
        <Elements >
          
            <PlaceOrder checkoutDetails={values.checkoutDetails} />
            
        </Elements>
        Card numbers; Month/Year; CVC
        {/*<Flutterwave  checkoutDetails={values.checkoutDetails} />*/}
        <PlaceOrder2  checkoutDetails={values.checkoutDetails} />
        
        </div>
        {/*<Link to='/' className={classes.continueBtn}>
          <Button variant="contained">Continue Shopping</Button>
    </Link>*/}
      


        

        

        
      

      
    </Card>
    </StripeProvider>
    </NoSSR>
    )
}
