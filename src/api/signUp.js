import { firebaseApp, userRef } from '../firebase';

export default (email, password, firstName, lastName) => {

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
                email
            })
            return true;
        })
        .catch(err => {
            console.log(err.message);
            return err;
        });
}