import React, {Component} from 'react';
import {Row, Col, Carousel, Tabs} from 'antd';
import carousel_1 from '../images/carousel_1.jpg';
import carousel_2 from '../images/carousel_2.jpg';
import carousel_3 from '../images/carousel_3.jpg';
import carousel_4 from '../images/carousel_4.jpg';
import NewsImageBlock from './news-image-block';
import NewsBlock from './news-block';
import NewsProducts from './news-products';

const TabPane = Tabs.TabPane;

export default class NewsContainer extends Component {
    render () {
        return (
            <div>
                <Row className="container">
                    <Col span={1}></Col>
                    <Col span={22}>
                        <div className="leftContainer" style={{width:'35%'}}>
                            <Carousel autoplay>
                                <div><img src={carousel_1}/></div>
                                <div><img src={carousel_2}/></div>
                                <div><img src={carousel_3}/></div>
                                <div><img src={carousel_4}/></div>
                            </Carousel>
                            <NewsImageBlock type="guoji" count={6} cardTitle="国际新闻" imageWidth="112px" cardWidth="100%"></NewsImageBlock>
                        </div>
                        <Tabs className="tabs_news" style={{width: '35%'}}>
                            <TabPane key="1" tab="头条新闻">
                                <NewsBlock type="top" count={21}></NewsBlock>
                            </TabPane>
                            <TabPane key="2" tab="国际新闻">
                                <NewsBlock type="guoji" count={21}></NewsBlock>
                            </TabPane>
                        </Tabs>
                        <Tabs>
                            <TabPane key="1" tab="React News产品">
                                <NewsProducts></NewsProducts>
                            </TabPane>
                        </Tabs>
                        <div>
                            <NewsImageBlock type="guonei" count={8} cardTitle="国内新闻" imageWidth="132px" cardWidth="100%"></NewsImageBlock>
                            <NewsImageBlock type="yule" count={16} cardTitle="娱乐新闻" imageWidth="132px" cardWidth="100%"></NewsImageBlock>
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>

            </div>
        )
    }
}
