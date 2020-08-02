import React, { useState } from 'react';
import { firebaseApp, storageRef } from '../firebase';
import { Icon } from 'react-materialize';
import editUser from '../api/editUser';

export default ({ changeToFalse, userDetails }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [image, setImage] = useState('');



    const onSubmit = () => {
        const uid = firebaseApp.auth().currentUser.uid;

        if (image) {
            var uploadTask = storageRef.ref(`image/${image.name}`).put(image);
            uploadTask.on('state_changed', () => {

            }, (error) => {
                console.log(error);

            }, () => {
                uploadTask.snapshot.ref.getDownloadURL()
                    .then(function (imageURL) {
                        console.log(imageURL);
                        const data = {
                            uid,
                            firstName,
                            lastName,
                            imageURL,
                            email: userDetails.email
                        }
                        const result = editUser(data);
                        console.log(result);
                        if (result) {
                            console.log('User info edited');


                        }
                        else {
                            console.log('Error');
                        }
                        setFirstName('');
                        setLastName('');
                        changeToFalse();
                        window.location.reload(false);
                    })

            })
        }
        else {
            const data = {
                uid,
                firstName,
                lastName,
                imageURL: userDetails.imageURL,
                email: userDetails.email
            }
            const result = editUser(data);
            if (result) {
                console.log('User info edited');
            }
            else {
                console.log('err');
            }
            changeToFalse();
            window.location.reload(false);
        }

    }


    return (
        <div>
            <div style={{ cursor: 'pointer' }} onClick={() => changeToFalse()}><Icon>arrow_back</Icon></div>
            {image && <img src={URL.createObjectURL(image)} alt='profile pic' height="50px" style={{ margin: "5px" }} />}
            <div className="file-field input-field">
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
            <input placeholder="First Name" value={firstName} onChange={event => setFirstName(event.target.value)} />
            <input placeholder="Last Name" value={lastName} onChange={event => setLastName(event.target.value)} />
            <button className="btn waves-effect waves-light" style={{ backgroundColor: '#3b5998' }} type='submit' onClick={onSubmit}>Submit</button>
        </div>
    )
}