import React, { useState } from 'react';
import { TextInput, Button } from 'react-materialize';
import signUp from '../api/signUp';

export default (props) => {

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const onSubmit = () => {
        const result = signUp(data);
        if (result === true) {
            console.log('SignUp Successfull');
        }
        else if(result === false) {
            console.log('SignUp Failed');
        }

    }

    const onChangeText = (key, value) => {
        const newData = { ...data };
        newData[key] = value;
        setData(newData)
    }


    return (

        <div style={{
            display: "flex",
            justifyContent: 'center',
            backgroundColor: "#dfe3ee"
        }}>
            <div className='outerBox' style={{width:"400px"}}>
                <h4>Sign Up</h4>
                <TextInput id="firstName" label="First Name" onChange={e => onChangeText('firstName', e.target.value)} />
                <TextInput id="lastName" label="Last Name" onChange={e => onChangeText('lastName', e.target.value)} />
                <TextInput id="email" label="Email" onChange={e => onChangeText('email', e.target.value)} />
                <TextInput id="password" label="Password" onChange={e => onChangeText('password', e.target.value)} />
                <Button style={{ backgroundColor: "#3b5998" }} type="submit" waves="light" node="button" onClick={() => onSubmit()}>Sign Up</Button>

                <p>Already have an account ? <span onClick={() => props.changeState('SI')}>Sign In</span></p>

            </div>
        </div>
    );
}