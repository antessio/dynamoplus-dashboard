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
            console.log(responseData)
            setCollection(responseData)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    };
    return [collection, createCollection, isLoading]
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
            setCollections(collections)
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

export const useGetCollection = (dependencies) => {
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
        getCollection()
    }, dependencies);
    return [collection, isLoading]


}