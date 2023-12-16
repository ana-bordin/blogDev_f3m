import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, query, orderBy, getDoc, collection } from "firebase/firestore";

const docRef = doc(db, "posts", "firstpost");
const q = collection(db, "posts");
const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null }
        case "INSERT_DOC":
            return { loading: false, error: null }
        case "ERROR":
            return { loading: false, error: true }
        default:
            return state
    }
}

export const userGetDocument = () => {
    const [response, dispatch] = useReducer(insertReducer, initialState)
    const [cancelled, setCancelled] = useState(false)

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const getDocument = async () => {
        try {

            
            // const docSnap = await getDoc(docRef);

            // if (docSnap.exists()) {
            //     console.log("Document data:", docSnap.data());
            // } else {
            //     // docSnap.data() will be undefined in this case
            //     console.log("No such document!");
            // }
            // setLoading(true);
            
             const document = await query(q)


            // // const querySnapshot = await getDocs(q);

            // // querySnapshot.forEach((doc) => {
            // //   console.log(doc.id, " => ", doc.data());
            // // });
            console.log("qqqqqqqqqqqqqqqq",q);
            console.log("aaaaaaaaaaaaaaa",document);
            // setLoading(false);
             return document;
        } catch (error) {
            console.log("error", error);
            setError(error);
            setLoading(false);
            console.log("error");
            return error;
        }
    }

    return {
        getDocument,
        response,
        error,
        loading,
    };
}