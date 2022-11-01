import React, {useState} from "react";
import {useCreateCollection, useGetCollections} from '../../hooks/collections';

import {Button, List, Table,Icon} from 'antd'
import CreateCollectionForm from './create/CreateForm'
import {Link} from "react-router-dom";
import './Collections.css'
import Loading from '../../components/loading/Loading'

import Collection from '../../components/collection/Collection'

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

            {!isLoading && renderCollections(collections)}
            {/* <CollectionList isLoading={isLoading} collections={collections}/> */}


        </div>
    );
}

const renderCollections=(collections)=>{
    const columns = [
        {
            title: "Name",
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <ul>
                <li>
                    <Link to={"/indexes/" + record.name}>
                        <Icon type="search"/>
                        <span>Indexes</span>
                    </Link>
                </li>
                <li>
                    <Link to={"/documents/" + record.name}><Icon type="read" key="read"/>
                        <span>Documents</span>
                    </Link>
                </li>
                </ul>
            ),
          },
    ]
    const dataSource = collections.map(c=>{
        return {
            key: c.name,
            name: c.name
        }
    })


    return (<Table dataSource={dataSource} columns={columns} />)

    // return collections && <List
    //     grid={{
    //         gutter: 16,
    //         xs: 1,
    //         sm: 1,
    //         md: 1,
    //         lg: 1,
    //         xl: 1,
    //         xxl: 1,
    //     }}
    //     dataSource={collections}
    //     renderItem={item => document(item)}/>
}
const document = (collection) => {
    
    return (
        <List.Item key={document.id}><Collection collection={collection}/></List.Item>
    )
}

export default React.memo(Collections);