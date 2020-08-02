import { postRef } from '../firebase';

export default async () => {
    var data;
    await postRef.once('value', snap => {
        data = snap.val();
    });
    return data;
}