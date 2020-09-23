import {useState, useEffect} from 'react'

import authProvider from "../common/authorization/authProvider";
import dynamoplus from "../dynamoplus/dynamoplus";


export const useCreateDocument = (collection) => {
    const {getTokenSilently} = authProvider;
    const [document, setDocument] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const createDocument = async (d) => {
        setLoading(false)
        try {
            const token = await getTokenSilently()
            const responseData = dynamoplus.documentService.createDocument(collection, d, token)
            console.log(responseData)
            setDocument(responseData)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    };
    return [document, createDocument, isLoading]
}

export const useGetDocuments = (collectionName, dependencies) => {
    const {getTokenSilently} = authProvider;
    const [documents, setDocuments] = useState([])
    const [isLoading, setLoading] = useState(false)
    const getDocuments = async () => {
        setLoading(true)
        try {
            const token = await getTokenSilently()
            const responseData = await dynamoplus.documentService.getAllDocuments(collectionName, token)
            if (responseData) {
                setDocuments(responseData.data)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    };
    useEffect(() => {
        //setLoading(true)
        getDocuments()
    }, dependencies);
    return [documents, isLoading]


}