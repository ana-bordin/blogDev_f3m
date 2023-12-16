import { doc, orderBy, query, collection, getDoc, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useState, useEffect } from 'react';

export const userFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const loadData = async () => {
            const collectionRef = collection(db, docCollection);

            try {
                let q
                if (search) {
                    q = query(collectionRef,
                        where('tags', 'array-contains', search),
                        orderBy('createdAt', 'desc'));
                }
                else if (uid) {
                    q = query(collectionRef,
                        where('uid', '==', uid),
                        orderBy('createdAt', 'desc'));
                }
                else {
                    q = query(collectionRef,
                        orderBy('createdAt', 'desc'));
                }

                onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                    )
                    setLoading(false);
                })

            } catch (error) {
                setError(error);
                console.log(error);
                setLoading(false);
            }
           
        }
        loadData()
    }, [docCollection, search, uid])

   
    return {
        documents,
        loading,
        error
    }
}

