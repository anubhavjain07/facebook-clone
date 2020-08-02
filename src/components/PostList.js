import React, { useEffect, useState } from 'react';
import { postRef, firebaseApp } from '../firebase';
import SinglePost from './SinglePost';

export default () => {

    const [posts, setPosts] = useState([]);
    const [myUID, setMyUID] = useState('')

    useEffect(() => {
        const getAllThePosts = () => {
            postRef.on('value', snap => {
                //console.log(snap.val());
                var fetchedPosts = [];
                snap.forEach(singlePost => {
                    fetchedPosts.push({
                        ...singlePost.val(),
                        postKey: singlePost.key
                    })
                });
                const uid = firebaseApp.auth().currentUser.uid;
                setMyUID(uid);
                fetchedPosts.reverse();
                setPosts(fetchedPosts);
            })
        }
        getAllThePosts();
    }, []);

    return (
        <div>
            {posts.map(singlePost => {
                return <SinglePost key={singlePost.postKey} details={singlePost} myUID={myUID} />
            })}
        </div>)
}