// SharedPost.js
import React, { useEffect, useState } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
import {db} from "../../lib/firebase";
import { useParams } from 'react-router-dom';

const SharedPost = () => {
  const { shareId } = useParams();
  const [sharedPost, setSharedPost] = useState(null);

  useEffect(() => {
    const fetchSharedPost = async () => {
      const shareDoc = await db.collection('shares').doc(shareId).get();
      if (shareDoc.exists) {
        const postId = shareDoc.data().postId;
        const postDoc = await db.collection('posts').doc(postId).get();
        setSharedPost(postDoc.data());
      } else {
        // Handle share not found
      }
    };

    fetchSharedPost();
  }, [shareId]);

  return (
    <div>
      {sharedPost ? (
        <div>
          <h2>{sharedPost.title}</h2>
          <p>{sharedPost.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SharedPost;
