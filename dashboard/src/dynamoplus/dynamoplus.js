import authProvider from "../common/authorization/authProvider";

const axios = require('axios');


const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_PATH,
    timeout: 10000
});
instance.interceptors.response.use((response) => {
    // do something with the response data
    console.log('Response was received');
    return response;
}, err => {
    // handle the response error
    console.log(err)
    const status = err.status || err.response.status;
    console.log("Response status " + status);
    if (status === 401) {
        authProvider.logout().then()
    }
    if (status == 403) {
        authProvider.logout().then()
        console.log("forbidden")
    }
    return Promise.reject(err);
});


export default {
    adminService: {
        login: async (username, password) => {
            const basicAuth = window.btoa(username + ':' + password);

            return instance.post("/admin/login", '', {headers: {'Authorization': `Basic ` + basicAuth}})
                .then(response => {
                    return response.data.token
                }).catch(err => {
                    console.log(err)
                })
        }
    },
    indexService: {
        Index: (collectionName, conditions, orderingKey) => {
            return {
                collection: {
                    name: collectionName
                },
                conditions: conditions,
                ...(orderingKey && {ordering_key: orderingKey})
            }
        },
        getAllIndexes: async (token, startFrom, limit = 10) => {
            const queryParameters = {
                limit: limit,
                startFrom: startFrom
            }
            const esc = encodeURIComponent;
            const query = Object.keys(queryParameters)
                .filter(k => queryParameters[k])
                .map(k => esc(k) + '=' + esc(queryParameters[k]))
                .join('&');

            const queryString = query && query !== '' ? "?" + query : ""
            return instance.get('/dynamoplus/index' + queryString, '', {headers: {'Authorization': `Bearer ${token}`}})
                .then(response => {
                    return response.data
                }).catch(err => {
                    console.log(err)
                })
        },
        getIndexes: async (collectionName, token, startFrom, limit = 10) => {
            const queryParameters = {
                limit: limit,
                startFrom: startFrom
            }
            const esc = encodeURIComponent;
            const query = Object.keys(queryParameters)
                .filter(k => queryParameters[k])
                .map(k => esc(k) + '=' + esc(queryParameters[k]))
                .join('&');

            const queryString = query && query !== '' ? "?" + query : ""
            return instance.post("/dynamoplus/index/query" + queryString,
                JSON.stringify(
                    {
                        matches: {
                            eq: {
                                field_name: "collection.name",
                                value: collectionName
                            }
                        }
                    }
                ),
                {headers: {'Authorization': `Bearer ${token}`}})
                .then(response => {
                    return response.data
                }).catch(err => {
                    console.log(err)
                })

        },
        createIndex: async (index, token) => {
            return instance.post("/dynamoplus/index/",
                JSON.stringify(index),
                {headers: {'Authorization': `Bearer ${token}`}})
                .then(response => {
                    return response.data
                }).catch(err => {
                    console.log(err)
                })

        }
    },
    collectionService: {
        COLLECTION_ATTRIBUTE_CONSTRAITNS: {
            NULLABLE: "NULLABLE",
            NOT_NULL: "NOT_NULL"
        },
        COLLECTION_ATTRIBUTE_TYPE: {
            STRING: "STRING",
            OBJECT: "OBJECT",
            NUMBER: "NUMBER",
            DATE: "DATE",
            ARRAY: "ARRAY"
        },
        Collection: (name, idKey, orderingKey, autoGeneratedId, attributes = []) => {
            return {
                name: name,
                id_key: idKey,
                ...(orderingKey && {ordering: orderingKey}),
                ...(autoGeneratedId && {auto_generate_id: autoGeneratedId}),
                ...(attributes && {attributes: attributes})
            }
        },
        CollectionAttribute: (name, type, constraints) => {
            return {
                name: name,
                type: type,
                ...(constraints && {constraints: constraints})
            }
        },
        createCollection: async (collection, token) => {
            return instance.post("/dynamoplus/collection/",
                JSON.stringify(collection),
                {headers: {'Authorization': `Bearer ${token}`}})
                .then(response => {
                    return response.data
                }).catch(err => {
                    console.log(err)
                })
        },
        getCollection: async (collectionName, token) => {
            return instance.get("/dynamoplus/collection/" + collectionName,
                {headers: {'Authorization': `Bearer ${token}`}})
                .then(response => {
                    return response.data
                }).catch(err => {
                    console.log(err)
                })
        },
        getAllCollections: async (token) => {
            return instance.get("/dynamoplus/collection/",
                {headers: {'Authorization': `Bearer ${token}`}})
                .then(response => {
                    return response.data
                }).catch(err => {
                    console.log(err)
                })
        }
    },
    documentService: {
        Eq: (fieldName, fieldValue) => {
            return {
                eq: {
                    fieldName: fieldName,
                    value: fieldValue
                }
            }
        },
        Range: (fieldName, fromValue, toValue) => {
            return {
                range: {
                    fieldName: fieldName,
                    from: fromValue,
                    to: toValue
                }
            }
        },
        And: (predicates) => {
            return {
                "and": [
                    ...predicates
                ]

            }
        },
        getDocument: async (collectionName, id, token) => {

            return instance.get("/dynamoplus/" + collectionName + "/" + id,
                {headers: {'Authorization': `Bearer ${token}`}})
                .then(response => {
                    return response.data
                }).catch(err => {
                    console.log(err)
                })
        },
        getAllDocuments: async (collectionName, token, startFrom, limit = 10) => {
            const queryParameters = {
                limit: limit,
                startFrom: startFrom
            }
            const esc = encodeURIComponent;
            const query = Object.keys(queryParameters)
                .filter(k => queryParameters[k])
                .map(k => esc(k) + '=' + esc(queryParameters[k]))
                .join('&');

            const queryString = query && query !== '' ? "?" + query : ""
            return instance.get("/dynamoplus/" + collectionName + queryString,
                {headers: {'Authorization': `Bearer ${token}`}})
                .then(response => {
                    return response.data
                }).catch(err => {
                    console.log(err)
                })
        },
        createDocument: async (collectionName, document, token) => {
            return instance.post("/dynamoplus/" + collectionName,
                JSON.stringify(document),
                {headers: {'Authorization': `Bearer ${token}`}}
            ).then(response => {
                return response.data
            }).catch(err => {
                console.log(err)
            })
        },
        updateDocument: async (collectionName, id, document, token) => {
            return instance.put("/dynamoplus/" + collectionName + "/" + id,
                JSON.stringify(document),
                {headers: {'Authorization': `Bearer ${token}`}}
            ).then(response => {
                return response.data
            }).catch(err => {
                console.log(err)
            })
        },
        deleteDocument: async (collectionName, id, token) => {
            return instance.delete("/dynamoplus/" + collectionName + "/" + id,
                {headers: {'Authorization': `Bearer ${token}`}}
            ).then(response => {
                return response.data
            }).catch(err => {
                console.log(err)
            })
        },
        query: async (collectionName, matches, token, startFrom, limit = 10) => {
            const queryParameters = {
                limit: limit,
                startFrom: startFrom
            }
            const esc = encodeURIComponent;
            const query = Object.keys(queryParameters)
                .filter(k => queryParameters[k])
                .map(k => esc(k) + '=' + esc(queryParameters[k]))
                .join('&');

            const queryString = query && query !== '' ? "?" + query : ""
            return instance.post("/dynamoplus/" + collectionName + "/query" + queryString,
                JSON.stringify(matches),
                {headers: {'Authorization': `Bearer ${token}`}}
            ).then(response => {
                return response.data
            }).catch(err => {
                console.log(err)
            })
        }
    }
}


