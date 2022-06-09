import React, {useState} from "react";
import {List, Spin, Button, Modal, Card, Tree, Icon} from 'antd'
import './Documents.css'
import Loading from '../../components/loading/Loading'
import Document from '../../components/document/Document'
import {useCreateDocument, useGetDocuments} from '../../hooks/documents'
import {useGetCollection} from "../../hooks/collections";

const {TreeNode} = Tree;

const Documents = (props) => {
    const [showModal, setShowModal] = useState(false)
    const collectionName = props.match.params.collection
    const [documents, isLoadingGetDocuments] = useGetDocuments(collectionName, []);
    const [collection, isLoadingCollection] = useGetCollection(collectionName, [])
    //const [createdCollection, createCollection,isLoadingCreate]=useCreateCollection()
    if (isLoadingGetDocuments && !documents) {
        return <Loading/>
    }
    return (
        <div>
            <h1>{collectionName}</h1>
            {/* <Button type="primary" icon="plus"
      onClick={()=>{setShowModal(true)}}>
        Create
      </Button>
        {showModal && 
          <CreateDocumentForm 
          show={showModal} 
          onCancel={()=>{setShowModal(false)}} 
          onSubmit={(values)=>{
            console.log(values)
            createDocument({
              name: values.documentName,
              idKey: values.idKey,
              orderingKey: values.orderingKey,
		          active: true
            })
            setShowModal(false)
          }}
          onError={(e)=>console.error(e)}
          />}
         */}

            {documents && <h2>Documents in {collectionName}</h2>}
            {isLoadingGetDocuments && <Spin/>}
            <Tree
                showIcon
                switcherIcon={<Icon type="database"/>}>
                {documents && collection && documents.map(
                    d => <TreeNode key={d[collection.id_key]}
                                   icon={<Icon type="container"/>}
                                   title={d[collection.id_key]}>
                        {Object.keys(d).map(k => renderDocumentFields(k, d[k]))}
                    </TreeNode>
                )}
            </Tree>

        </div>
    );
};

const document = (document) => {
    return (
        <List.Item key={document.id}><Document document={document}/></List.Item>
    )
}
const renderDocumentFields = (fieldKey, fieldValue) => {
    if (Array.isArray(fieldValue)) {
        return <TreeNode
            key={fieldKey}
            icon={<Icon type="switcher"/>}
            title={fieldKey}>
            {fieldValue.map((subItem, i) => <TreeNode
                key={fieldKey + "_" + i}
                icon={<Icon type="switcher"/>}
                title={i}>
                {renderDocumentFields(fieldKey, subItem)}
            </TreeNode>)}
        </TreeNode>
    } else if (typeof fieldValue == "object") {
        return (<TreeNode key={fieldKey}
                          icon={<Icon type="switcher"/>}
                          title={fieldKey}>
                {
                    Object.keys(fieldValue).map(k =>
                        renderDocumentFields(k, fieldValue[k])
                    )
                }
            </TreeNode>
        )

    } else if (fieldValue) {
        return (<TreeNode
            key={fieldKey}
            icon={<Icon type="select"/>}
            title={fieldKey + " : " + fieldValue}>
        </TreeNode>)
    } else {
        return null;
    }
}


export default React.memo(Documents);