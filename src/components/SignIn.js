import React, { useState } from 'react';
import { TextInput, Button, Container } from 'react-materialize';
import signIn from '../api/signIn';

export default (props) => {

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const onSubmit = () => {
        const result = signIn(data);
        if (result === true) {
            console.log('SignIn Successfull');
        }
        else if (result === false) {
            console.log('SignIn Failed');
        }

    }

    const onChangeText = (key, value) => {
        const newData = { ...data };
        newData[key] = value;
        setData(newData)
    }


    return (
        <Container>
        <div style={{
            display: "flex",
            justifyContent: 'center',
            backgroundColor: "#dfe3ee"
        }}>
            <div className='outerBox' style={{width:"400px"}}>
                <h4>Sign In</h4>
                <TextInput email validate id="email" label="Email" onChange={e => onChangeText('email', e.target.value)} />
                <TextInput password validate id="password" label="Password" onChange={e => onChangeText('password', e.target.value)} />
                <Button style={{ backgroundColor: "#3b5998" }} type="submit" waves="light" node="button" onClick={() => onSubmit()}>Sign In</Button>
                <p>Don't have an account ? <span onClick={() => props.changeState('SU')} style={{ cursor: 'pointer', fontWeight: 'bold' }}>Sign Up</span></p>
            </div>
        </div>
        </Container>
    );
}