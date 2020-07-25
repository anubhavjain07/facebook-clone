import { postRef } from '../firebase';

export default (uid, content) => {
    postRef.push({
        createdBy: uid,
        content
    })
}