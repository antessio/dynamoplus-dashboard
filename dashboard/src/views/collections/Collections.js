import React, {useState} from "react";
import {useCreateCollection, useGetCollections, useDeleteCollection} from '../../hooks/collections';
import {
    DeleteOutline
  } from '@ant-design/icons';
import {Button, List, Table,Icon,Avatar} from 'antd'
import CreateCollectionForm from './create/CreateForm'
import {Link} from "react-router-dom";
import './Collections.css'
import Loading from '../../components/loading/Loading'

import Collection from '../../components/collection/Collection'

function Collections() {
    const [showModal, setShowModal] = useState(false)
    const [collections, isLoadingGet] = useGetCollections([]);
    const [createdCollection, createCollection, isLoadingCreate] = useCreateCollection()
    const [deleteCollectionResult,deleteCollection,isLoadingDelete] = useDeleteCollection()
    const isLoading = isLoadingCreate || isLoadingGet
    if (isLoading && !collections) {
        return <Loading/>
    }
    const renderCollections=(collections)=>{

        const columns = [
            {
                title: "",
                key: "avatar",
                render: (_,record)=>(
                <Avatar style={{backgroundColor: "#1890ff", color: "white", verticalAlign: 'middle'}} size="large">
                    {record.name[0].toUpperCase()}
                </Avatar>)
            },
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
              {
                title: "Delete",
                key: "delete",
                render: (_,record)=>{
                    return <Button type="primary" icon="delete" onClick={(e)=>{
                        deleteCollection(record.name)
                    }} />
                }
              }
        ]
        const dataSource = collections.map(c=>{
            return {
                key: c.name,
                name: c.name
            }
        })
    
    
        return (<Table dataSource={dataSource} columns={columns} />)
    
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


const document = (collection) => {
    
    return (
        <List.Item key={document.id}><Collection collection={collection}/></List.Item>
    )
}

export default React.memo(Collections);