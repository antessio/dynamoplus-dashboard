import React from 'react'

import { Table, List } from 'antd';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import { Badge, Descriptions } from 'antd';
import {ReadOutlined, SearchOutlined} from '@ant-design/icons';

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
                
                  return record.fields && record.fields.map(field=><Tag key={field.name+"_"+field.type}>
                    {field.name} - {field.type}
                  </Tag>)
              },
            },
            {
                title: 'Indexes',
                width: 50,
                render: (_, record) =>{
                    return (<Link to={"/indexes/" + record.name}>
                            <SearchOutlined />
                            <span>Indexes</span>
                            </Link>)
                }
            },
            {
                title: 'Documents',
                width: 50,
                render: (_, record) =>{
                    return (
                        <Link to={"/documents/" + record.name}><ReadOutlined /></Link>
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