import React from "react";
import classes from './Button.css';

import Aux from '../../../hoc/Aux/Aux';


const button = props => (
    <Aux>
        <button 
            className={[classes.Button, classes[props.btnType]].join(' ')}
            onClick={props.clicked}
            >{props.children}</button>
    </Aux>
  
);

export default button;