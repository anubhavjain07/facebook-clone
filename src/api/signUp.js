import { firebaseApp, userRef } from '../firebase';

export default ({ email, password, firstName, lastName, imageURL }) => {

    if (!firstName || !lastName) {
        return false;
    }

    firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
            //console.log(user);
            console.log("User Added to database");

            userRef.child(data.user.uid).set({
                firstName,
                lastName,
                email,
                imageURL
            })
            return true;
        })
        .catch(err => {
            console.log(err.message);
            return false;
        });
}