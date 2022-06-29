import React from 'react'
import {List} from "antd";
import Collection from "../Collection";

export default (props) => {
    return !props.isLoading && props.collections && <List
        grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 1,
            xxl: 1,
        }}
        dataSource={props.collections}
        renderItem={item => document(item)}/>
}
const document = (collection) => {
    return (
        <List.Item key={document.id}><Collection collection={collection}/></List.Item>
    )
}