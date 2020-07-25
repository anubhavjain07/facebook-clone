import { postRef } from '../firebase';

export default () => {
    postRef.once('value', snap => {
        return snap.val();
    })
}