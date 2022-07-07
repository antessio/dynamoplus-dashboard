import React from 'react'

import { Table, List, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import { Badge, Descriptions } from 'antd';

import Collection from "../Collection";


export default (props) => {
    const data = [];
    let columns = []
    if(props.collections){
        columns=[
            {
              title: 'Name',
              dataIndex: 'name',
              width: 150,
            },
            {
                title: 'Id Key',
                dataIndex: 'id_key',
                width: 80,
            },
            {
              title: 'Auto Generate ID',
              dataIndex: 'auto_generate_id',
              width: 80,
            },
            {
              title: 'Fields',
              dataIndex: 'fields',
              width: 200,
              render: (_, record) =>{
                

                  return (<Descriptions bordered
                    column={{
                        xxl: 4,
                        xl: 3,
                        lg: 3,
                        md: 3,
                        sm: 2,
                        xs: 1,
                      }}>
                        {record.fields ? (
                    record.fields.map(field => (
                    <Descriptions.Item label={field.name}>({field.type})</Descriptions.Item>))
                  ) : null}        
                  </Descriptions>)
              },
            },
            {
                title: 'Indexes',
                width: 50,
                render: (_, record) =>{
                    return (<Link to={"/indexes/" + record.name}>
                            <Icon type="search"/>
                            <span>Indexes</span>
                            </Link>)
                }
            },
            {
                title: 'Documents',
                width: 50,
                render: (_, record) =>{
                    return (
                        <Link to={"/documents/" + record.name}><Icon type="read" key="read"/></Link>
                    )
                }
            }
          ];
        
        props.collections.forEach((collection,i) => {
            data.push({
                key: i,
                name: collection.name,
                id_key: collection.id_key,
                auto_generate_id: collection.auto_generated_id?"Yes":"No",
                fields: collection.attributes
              });
        });        
    }

    return !props.isLoading && props.collections && <Table
    columns={columns}
    dataSource={data}
    />
}



const document = (collection) => {
    return (
        <List.Item key={document.id}><Collection collection={collection}/></List.Item>
    )
}