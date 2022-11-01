import React, {useState} from 'react'

import './Indexes.css'
import Loading from '../../components/loading/Loading'
import {List,Button, Divider } from 'antd'
import {useGetIndexes} from '../../hooks/indexes'
import {useCreateIndex} from '../../hooks/indexes'
import {useGetCollection} from '../../hooks/collections'
import Index from '../../components/indexes/Index'
import CreateIndexForm from './create/CreateIndexForm'
import Collection from '../../components/collection/Collection'
const Indexes = (props)=>{
    const collection_name = props.match.params.collection
    const [indexes,isLoading] = useGetIndexes([],collection_name);
    const [collection, isLoadingCollection] = useGetCollection(collection_name,[])
    const [indexCreated,createIndex, isLoadingCreateIndex]=useCreateIndex()
    const [showModal,setShowModal]=useState(false)
    if (isLoading && !indexes) {
        return <Loading />
      }
    return(<div>
        <h2>Indexes</h2>
        
        <Button type="primary" icon="plus"
          onClick={()=>{setShowModal(true)}}>
          Create
        </Button>
        {showModal && 
          <CreateIndexForm 
          show={showModal} 
          onCancel={()=>{setShowModal(false)}} 
          onSubmit={(values)=>{
            let indexName = values.fields.join("__")
            if(values.orderBy){
              indexName=indexName+"__ORDER_BY__"+values.orderBy
            }
            createIndex({
              collection:{
                name: collection_name
              },
              name: indexName
            })
            setShowModal(false)
          }}
          onError={(e)=>console.error(e)}
          />}
        {!isLoadingCollection && collection && renderCollection(collection)}
        {!isLoading && indexes &&  <List
          dataSource={indexes}
          renderItem={item=>renderIndex(item)} /> }
    </div>)

}

const renderCollection = (collection) =>{
  return <>
  <p>Collection: {collection.name}</p>
  <h2>Fields:</h2>
  <Divider/>
  <List dataSource={collection.attributes} renderItem={item=>{
    return (<List.Item key={item.name}>
      {item.name} - {item.type}
    </List.Item>)
  }} />
  </>
  //return <p>{JSON.stringify(collection)}</p>
}
const renderIndex = (index)=>{
    return (
                <List.Item key={index.id}><Index  index={index} /></List.Item>
    )
  }
export default Indexes;