import { useState } from 'react';
import { useEffect, useReducer } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const initialState = {
    loading: null,
    error: null
}

const deleteReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                error: null
            }
        case 'ERROR':
            return {
                loading: false,
                error: action.error
            }
        case 'SUCCESS':
            return {
                loading: false,
                error: null
            }
        default:
            return state
    }
}

export const userDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState)
    const [cancelled, setCancelled] = useState(false)
    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }
    const deleteDocument = async (id) => {
        checkCancelBeforeDispatch({ type: 'LOADING' })
        try {
            const deletedDocument = await deleteDoc(doc(db, docCollection, id))
            checkCancelBeforeDispatch({ type: 'SUCCESS', payload: deletedDocument })
        } catch (error) {
            checkCancelBeforeDispatch({ type: 'ERROR', error })
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    })

    return {
        deleteDocument,
        response
    }
}