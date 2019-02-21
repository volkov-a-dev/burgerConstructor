import React from 'react';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    { id: 1, label : 'Salad', type: 'salad'},
    { id: 2, label : 'Meat', type: 'meat'},
    { id: 3, label : 'Cheese', type: 'cheese'},
    { id: 4, label : 'Bacon', type: 'bacon'},  
];

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p>Currebt Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.id}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
                />
        ))}

        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
)

export default buildControls;
