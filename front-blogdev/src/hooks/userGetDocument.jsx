import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { collection, getDoc, Timestamp } from 'firebase/firestore'

export const getPosts = async () => {
  const postsCollection = collection(db, 'posts');
  const postsSnapshot = await getDocs(postsCollection);
  const posts = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return posts;
};
