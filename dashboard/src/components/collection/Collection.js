import React from 'react'
import {Tree, Card, Icon, Avatar, Badge, Collapse, Row, Col, Descriptions, Spin} from 'antd';
import {Link} from "react-router-dom";
import {useCreateDocument, useGetDocuments} from '../../hooks/documents'

const {Panel} = Collapse;
const {TreeNode} = Tree;

export default (props) => {
    const collection = props.collection
    const indexes = props.indexes
    
    /*
        const [documents, isLoadingGetDocuments] = useGetDocuments(collection.name, []);
    */
    return (
        <Card
            actions={[
                <Link to={"/documents/" + collection.name}><Icon type="read" key="read"/></Link>,
                <Icon type="edit" key="edit"/>,
                <Icon type="search" key="query"/>,
            ]}
        >

            <Row>
                <Col xs={4}>
                    <Badge dot style={{backgroundColor: 'green', color: "white", boxShadow: '0 0 0 1px #d9d9d9 inset'}}>
                        <Avatar style={{backgroundColor: "gray", verticalAlign: 'middle'}} size="large">
                            {collection.name[0]}
                        </Avatar>
                    </Badge>
                </Col>
                <Col xs={20}>
                    <span>{collection.name}</span>
                </Col>
            </Row>

            <br/>
            {renderCollection(collection)}

            {/* {documents && <h2>Documents in {collection.name}</h2>}
            {isLoadingGetDocuments && <Spin/>}*/}
            {/*<Tree
                showIcon
                switcherIcon={<Icon type="database"/>}>
                {documents && documents.map(
                    d => <TreeNode key={d[collection.id_key]}
                                   icon={<Icon type="container"/>}
                                   title={d[collection.id_key]}>
                        {Object.keys(d).map(k => renderDocumentFields(k, d[k]))}
                    </TreeNode>
                )}
            </Tree>*/}
            <Link to={"/indexes/" + collection.name}>
                <Icon type="search"/>
                <span>Indexes</span>
            </Link>
            <Collapse bordered={false} defaultActiveKey={[]}>
                <Panel header="Show definition" key="1">
                    <code>{JSON.stringify(collection, null, 2)}</code>
                </Panel>
            </Collapse>
        </Card>)
}
const renderCollection = (collection) => {
    return (<Descriptions
        column={{xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1}}>
        <Descriptions.Item label={"Id Key"}>
            {collection.id_key}
        </Descriptions.Item>
        {collection.ordering && <Descriptions.Item label={"Ordering "}>
            {collection.ordering}
        </Descriptions.Item>}
        <Descriptions.Item label={"Auto generate ID"}>
            {collection.auto_generate_id ? "true" : "false"}
        </Descriptions.Item>
        {collection.attributes && collection.attributes.map(renderAttribute)
        })

        }
    </Descriptions>)
}
const renderAttribute = (a) => {
    if (a.type == 'OBJECT' && a.attributes) {
        return (
            <Descriptions.Item key={a.name} label={a.name}>
                <Descriptions
                    column={{xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1}}>
                    {a.attributes.map(renderAttribute)}
                </Descriptions>
            </Descriptions.Item>)
    } else {
        return (<Descriptions.Item key={a.name} label={a.name}>
            {a.type}
        </Descriptions.Item>)
    }
}
const renderObject = (obj) => {
    return (<Descriptions
        column={{xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1}}>
        {Object.keys(obj).map(k => <Descriptions.Item key={k} label={k}>
            {renderKey(obj[k])}
        </Descriptions.Item>)}
    </Descriptions>)
}
const renderKey = (obj) => {
    if (!obj) {
        return "<not present>"
    } else if (typeof obj == 'object') {
        return renderObject(obj)
    } else if (typeof obj == 'array') {
        return JSON.stringify(obj)
        /*return <div>
            {obj.map(i => renderObject(i))}
        </div>*/
    } else {
        return obj
    }
}
