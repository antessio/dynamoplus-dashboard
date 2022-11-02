import React, {useState} from 'react'

import './Indexes.css'
import Loading from '../../components/loading/Loading'
import {List,Button, Divider,Typography,Avatar } from 'antd'
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

        
        {showModal && 
          <CreateIndexForm 
          show={showModal} 
          onCancel={()=>{setShowModal(false)}} 
          collection={collection}
          onSubmit={(values)=>{
            let indexName = values.fields.join("__")
            if(values.orderBy){
              indexName=indexName+"__ORDER_BY__"+values.orderBy
            }
            createIndex({
              collection:{
                name: collection_name
              },
              conditions:values.fields
            })
            setShowModal(false)
          }}
          onError={(e)=>console.error(e)}
          />}
        {!isLoadingCollection && collection && Object.keys(collection).length>0 && renderCollection(collection)}
        <Button type="primary" icon="plus"
          onClick={()=>{setShowModal(true)}}>
        </Button>
        
        {!isLoading && indexes &&  <List
          dataSource={indexes}
          renderItem={item=>renderIndex(item)} /> }
    </div>)

}

const renderCollection = (collection) =>{
  return <>
  
  <Typography.Title>
  <Avatar style={{backgroundColor: "#1890ff", color: "white", verticalAlign: 'middle'}} size="large">
                {collection.name[0].toUpperCase()}
            </Avatar>
    {collection.name}</Typography.Title>
    <Divider/>
  
  <Divider/>
  </>
  //return <p>{JSON.stringify(collection)}</p>
}
const renderIndex = (index)=>{
    return (
                <List.Item key={index.id}><Index  index={index} /></List.Item>
    )
  }
export default Indexes;