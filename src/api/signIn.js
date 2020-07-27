import { firebaseApp, userRef } from '../firebase';

export default ({ email, password }) => {
    firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
            //console.log(data.user);
            userRef.child(data.user.uid).once('value', (snapshot) => {
                //console.log(snapshot.val())
                return snapshot.val();
            })

            console.log("User Found and Signed In succes");
            return true;
        })
        .catch(err => {
            console.log(err.message);
            console.log("User Not found");
            return err.message;
        })
}