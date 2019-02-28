import React, { Component } from 'react';
import { connect } from 'react-redux';


import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import clasess from './ContactData.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions  from '../../../store/actions/index';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            street:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 8,
                },
                valid: false,
                touched: false,
            },
            country:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'faste', displayValue: 'Fasterst'},
                        {value: 'test', displayValue: 'Test 2'},
                        {value: 'test2', displayValue: 'Test 3'},
                    ]
                },
                value: 'faste',
                valid: true,
                validation: {},
            },
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let formelementIdentifier in this.state.orderForm) {
            formData[formelementIdentifier] = this.state.orderForm[formelementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order);
    }

    checkValidity (value, rules) {
        let isValid = true;
        
        // if (!rules) {
        //     return true
        // }

        // if (rules.required) {
        //     isValid = value.trim() !== '' && isValid;
        // }
        // if (rules.minLength) {
        //     isValid = value.length >= rules.minLength && isValid
        // }
        // if (rules.maxLength) {
        //     isValid = value.length <= rules.maxLength && isValid
        // }

        
        return isValid
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updateOrderForm = {
            ...this.state.orderForm
        }

        const updateFormElement = {
            ...updateOrderForm[inputIdentifier]
        }

        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateOrderForm[inputIdentifier] = updateFormElement;
        
        let formIsValid = true;
        
        for (let inputIdentifier in updateFormElement) {
            formIsValid = updateFormElement[inputIdentifier].valid && formIsValid;
        }
        console.log('formIsValid',formIsValid)
        this.setState({orderForm : updateOrderForm, formIsValid: formIsValid})
    }


    render() {
        const formElementsArray = [];
        
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => {
                    return (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                    )
                })}
                <Button 
                    disabled={!this.state.formIsValid}
                    btnType="Success" 
                    clicked={this.orderHandler}>Order</Button>
            </form>
        );

        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));