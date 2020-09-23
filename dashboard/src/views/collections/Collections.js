import React, {useState} from "react";
import {useCreateCollection, useGetCollections} from '../../hooks/collections';
import {Button, List} from 'antd'
import CreateCollectionForm from './create/CreateForm'

import './Collections.css'
import Loading from '../../components/loading/Loading'
import CollectionList from "../../components/collection/list/CollectionList";

function Collections() {
    const [showModal, setShowModal] = useState(false)
    const [collections, isLoadingGet] = useGetCollections([]);
    const [createdCollection, createCollection, isLoadingCreate] = useCreateCollection()
    const isLoading = isLoadingCreate || isLoadingGet
    if (isLoading && !collections) {
        return <Loading/>
    }
    return (
        <div>
            <h1>Collections</h1>
            <Button type="primary" icon="plus"
                    onClick={() => {
                        setShowModal(true)
                    }}>
                Create
            </Button>
            {showModal &&
            <CreateCollectionForm
                show={showModal}
                onCancel={() => {
                    setShowModal(false)
                }}
                onSubmit={(values) => {
                    console.log(values)
                    createCollection({
                        name: values.documentName,
                        idKey: values.idKey,
                        orderingKey: values.orderingKey,
                        active: true
                    })
                    setShowModal(false)
                }}
                onError={(e) => console.error(e)}
            />}
            <CollectionList isLoading={isLoading} collections={collections}/>


        </div>
    );
}


export default React.memo(Collections);