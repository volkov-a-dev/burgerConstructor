import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import clasess from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        adderss: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
            // alert('YOu continue!')
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Max Schwarzmuller',
                address: {
                    street: 'Test street 23',
                    zipCode: '3341223',
                    country: 'Germany'
                },
                email: 'test@te56456st.com'
            },
            deliveryMethod: 'fast test'
        }
        
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({ 
                    loading: false, 
                });
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error)
                this.setState({ 
                    loading: false, 
                })
            })
    }


    render() {

        let form = (
            <form>
                <input className={clasess.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={clasess.Input} type="email" name="email" placeholder="Your Email"/>
                <input className={clasess.Input} type="text" name="street" placeholder="Street"/>
                <input className={clasess.Input} type="text" name="postalCode" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }
        
        return (
            <div className={clasess.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;