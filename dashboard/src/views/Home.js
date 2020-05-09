// src/components/Profile.js

import React from "react";
import {Row, Col, Divider, Spin} from 'antd';
import {useGetCollections} from "../hooks/collections";
import CollectionList from "../components/collection/list/CollectionList";


const Home = () => {
    const [collections, isLoadingGet] = useGetCollections([]);
    return (
        <div style={{width: "80%", margin: "auto"}}>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} justify="center" align="top">
                <Col span={12}>
                    <h3 style={{textAlign: "center"}}>Collections</h3>
                    {isLoadingGet && <Spin/>}
                    <CollectionList collections={collections} isLoading={isLoadingGet}/>
                </Col>
                <Col span={12}>
                    <h3 style={{textAlign: "center"}}>Indexes</h3>
                </Col>
            </Row>
        </div>
    );
};

export default Home;