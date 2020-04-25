//import { fetchUtils } from 'react-admin';
//import { stringify } from 'query-string';

const apiUrl = 'https://1me3wf5w23.execute-api.eu-west-1.amazonaws.com/dev/dynamoplus';
const axios = require('axios');
axios.defaults.baseURL = apiUrl
axios.defaults.headers.common['Authorization'] = 'Basic cm9vdDoxMjM0NQ==';

const instance = axios.create({
    baseURL: apiUrl,
    timeout: 1000,
    headers: {'Authorization': 'Basic cm9vdDoxMjM0NQ=='}
  });


const collectionDataProvider = {
    getList: (resource, params) => {
    
        const url = `${apiUrl}/${resource}/`;
        console.log("asking for "+url)

        return instance.get(url).then(response=>{
            console.log(response.data)
            return {
                data: response.data.data.map(r=>({...r, id: r.name})),
                total: response.data.has_more?response.data.data.length+1:response.data.data.length
            }
        })
    },

    getOne: (resource, params) =>{
        const url = `${apiUrl}/${resource}/${params.id}`
        return instance.get(url).then(response=>{
            console.log(response)
            return {
                data: response.data
            }
        })
    }

        ,

    getMany: (resource, params) => {
        return params.ids?[...params.ids.map(id=>this.getOne(resource, {id: id}))]:[]
    },

    getManyReference: (resource, params) => {
        // const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        // const query = {
        //     sort: JSON.stringify([field, order]),
        //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        //     filter: JSON.stringify({
        //         ...params.filter,
        //         [params.target]: params.id,
        //     }),
        // };
        // const url = `${apiUrl}/${resource}?${stringify(query)}`;

        // return httpClient(url).then(({ headers, json }) => ({
        //     data: json,
        //     total: parseInt(headers.get('content-range').split('/').pop(), 10),
        // }));
        return []
    },

    update: (resource, params) =>{
        const url = `${apiUrl}/${resource}/${params.id}`
        instance.put(url,params.data)
        .then(response=>{
            console.log(response)
            return {
                data: response.data
            }
        })
    }
        ,

    updateMany: (resource, params) => {
        return {}
    },

    create: (resource, params) =>{
        const url = `${apiUrl}/${resource}`
        instance.put(url,params.data)
        .then(response=>{
            console.log(response)
            return {
                data: response.data
            }
        })
    }
        ,

    delete: (resource, params) =>
        {
    
            const url = `${apiUrl}/${resource}/${params.id}`;
            console.log("asking for "+url)
    
            return instance.get(url).then(response=>{
                console.log(response)
                return {
                    data: response.data.data
                }
            })

    }
        ,

    deleteMany: (resource, params) => {
        return params.ids?[...params.ids.map(id=>this.delete(resource, {id: id}))]:[]
    }
};
export default {
    getList: (resource, params) => {
        switch(resource){
            case "collection":
                return collectionDataProvider.getList(resource,params)
        }
    },

    getOne: (resource, params) =>{
        switch(resource){
            case "collection":
                return collectionDataProvider.getOne(resource,params)
        }
    },
    getMany: (resource, params) => {
        switch(resource){
            case "collection":
                return collectionDataProvider.getMany(resource,params)
        }
    },

    getManyReference: (resource, params) => {
        return []
    },

    update: (resource, params) =>{
        switch(resource){
            case "collection":
                return collectionDataProvider.update(resource,params)
        }
    
    },
    updateMany: (resource, params) => {
        return {}
    },

    create: (resource, params) =>{
        switch(resource){
            case "collection":
                return collectionDataProvider.create(resource,params)
        }
    },
    delete: (resource, params) =>{
        switch(resource){
            case "collection":
                return collectionDataProvider.delete(resource,params)
        }
    },
    deleteMany: (resource, params) => {
        switch(resource){
            case "collection":
                return collectionDataProvider.deleteMany(resource,params)
        }
    
    }
};