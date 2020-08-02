import React, { useState } from 'react';
import { TextInput, Button, Container } from 'react-materialize';
import signUp from '../api/signUp';
import { storageRef } from '../firebase';

export default (props) => {


    const [image, setImage] = useState('');
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        imageURL: ''
    });

    const onSubmit = () => {
        if (image) {
            var uploadTask = storageRef.ref(`image/${image.name}`).put(image);
            uploadTask.on('state_changed', () => {

            }, (error) => {
                console.log(error);

            }, () => {
                uploadTask.snapshot.ref.getDownloadURL()
                    .then(function (imageURL) {
                        console.log(imageURL);
                        const newData = { ...data };
                        newData['imageURL'] = imageURL;
                        setData(newData)
                        const result = signUp(newData);
                        if (result === true) {
                            console.log('SignUp Successfull');
                        }
                        else if (result === false) {
                            console.log('SignUp Failed');
                        }
                    })
            })

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
                <div className='outerBox' style={{ width: "400px" }}>
                    <h4>Sign Up</h4>
                    <TextInput id="firstName" label="First Name" onChange={e => onChangeText('firstName', e.target.value)} />
                    <TextInput id="lastName" label="Last Name" onChange={e => onChangeText('lastName', e.target.value)} />
                    <TextInput email validate id="email" label="Email" onChange={e => onChangeText('email', e.target.value)} />
                    <TextInput password validate id="password" label="Password" onChange={e => onChangeText('password', e.target.value)} />
                    <div className="file-field input-field" style={{ display: 'flex' }}>
                        <div className="btn waves-effect waves-light" style={{ backgroundColor: '#3b5998' }}>
                            <span>Upload Image</span>
                            <input
                                type="file"
                                onChange={(event) => setImage(event.target.files[0])}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input hidden className="file-path validate" type="text" />
                        </div>
                    </div>
                    <Button className="btn waves-effect waves-light" style={{ backgroundColor: "#3b5998", display: 'inline-block' }} type="submit" waves="light" node="button" onClick={() => onSubmit()}>Sign Up</Button>

                    <p>Already have an account ? <span onClick={() => props.changeState('SI')} style={{ cursor: 'pointer', fontWeight: 'bold' }}>Sign In</span></p>

                </div>
            </div>
        </Container>
    );
}