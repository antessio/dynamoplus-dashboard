import {useState, useEffect} from 'react'
import authProvider from "../common/authorization/authProvider";
import dynamoplus from "../dynamoplus/dynamoplus";

export const useCreateIndex = () => {
    const {getTokenSilently} = authProvider
    const [index, setIndex] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const createIndex = async (i) => {
        setLoading(false)
        try {
            const token = await getTokenSilently()
            const responseData = await dynamoplus.indexService.createIndex(
                i,
                token
            )
            console.log(responseData)
            setIndex(responseData)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    };
    return [index, createIndex, isLoading]
}

export const useGetIndexes = (dependencies, collection) => {
    const {getTokenSilently} = authProvider
    const [indexes, setIndexes] = useState([])
    const [isLoading, setLoading] = useState(false)
    const getIndexes = async (collectionName) => {
        setLoading(false)
        try {
            const token = await getTokenSilently()
            const responseData = await dynamoplus.indexService.getIndexes(collectionName, token)
            const results = responseData.data
            console.log(results)
            setIndexes(results)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    };
    useEffect(() => {
        //setLoading(true)
        getIndexes(collection)
    }, dependencies);
    return [indexes, isLoading]


}