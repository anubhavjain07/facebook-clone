import { postRef } from '../firebase'

export default (postKey) => {
    postRef.child(postKey).remove()
        .then(data => {
            console.log(data);
            return { message: 'Post Removed' }
        })
        .catch(err => {
            console.log(err);
            return { 'error': err.message }
        })
}