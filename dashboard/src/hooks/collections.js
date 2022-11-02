import {useState, useEffect} from 'react'

import authProvider from "../common/authorization/authProvider";
import dynamoplus from "../dynamoplus/dynamoplus";

export const useCreateCollection = () => {
    const {getTokenSilently} = authProvider
    const [collection, setCollection] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const createCollection = async (d) => {
        setLoading(false)
        try {
            const token = await getTokenSilently()
            const responseData = await dynamoplus.collectionService.createCollection(d, token)
            setCollection(responseData)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    };
    return [collection, createCollection, isLoading]
}
export const useDeleteCollection = () => {
    const {getTokenSilently} = authProvider
    const [result, setResult] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const deleteCollection = async (d) => {
        setLoading(false)
        try {
            const token = await getTokenSilently()
            const responseData = await dynamoplus.collectionService.deleteCollection(d, token)
            setResult(true)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setResult(false)
        }
    };
    return [result,deleteCollection, isLoading]
}

export const useGetCollections = (dependencies) => {
    const {getTokenSilently} = authProvider
    const [collections, setCollections] = useState([])
    const [isLoading, setLoading] = useState(false)
    const getCollections = async () => {
        setLoading(true)
        try {
            const token = await getTokenSilently()
            const responseData = await dynamoplus.collectionService.getAllCollections(token)
            const collectionList = responseData.data
            console.log(collectionList)
            setCollections(collectionList)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    };
    useEffect(() => {
        //setLoading(true)
        getCollections()
    }, dependencies);
    return [collections, isLoading]


}

export const useGetCollection = (collectionName, dependencies) => {
    const {getTokenSilently} = authProvider
    const [collection, setCollection] = useState([])
    const [isLoading, setLoading] = useState(false)
    const getCollection = async (collectionName) => {
        setLoading(true)
        try {
            const token = await getTokenSilently()
            const responseData = await dynamoplus.collectionService.getCollection(collectionName, token)
            console.log(responseData)
            setCollection(responseData)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    };
    useEffect(() => {
        //setLoading(true)
        getCollection(collectionName)
    }, dependencies);
    return [collection, isLoading]


}