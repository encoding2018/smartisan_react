import React from 'react'
import Initial from '../initial';
import Verify from '../verify';
import Change from '../change';

export default (props) => (
        <>
                {props.changeState===1&&
                        <Initial {...props}/>
                }
                {props.changeState===2&&
                       <Verify {...props}/>
                }
                {props.changeState===3&&
                        <Change {...props}/>
                }
        </>
)

