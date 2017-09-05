import React, {Component} from 'react';
import axios from 'axios';
import NewsImageBlock from './news-image-block';
import NewsComments from './news-comments';
import {
    Row,
    Col
} from 'antd';
export default class NewsDetail extends Component {
    state = {
        news: {}
    }


    componentDidMount () {
        const {uniquekey} = this.props.params;
        this.showNewsDetail(uniquekey);
    }

    componentWillReceiveProps (newProps) {
        const {uniquekey} = newProps.params;
        this.showNewsDetail(uniquekey);
    }

    showNewsDetail (uniquekey) {
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`;
        // console.log(url);
        axios.get(url)
            .then(response => {
                const news = response.data;
                // console.log(news);
                this.setState({news});
                document.title = news.title;
            })
    }

    render () {
        const {news} = this.state;
        const {type, uniquekey} = this.props.params;
        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={16} className="container">
                        <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
                        <NewsComments uniquekey={uniquekey}></NewsComments>
                    </Col>
                    <Col span={6}>
                        <NewsImageBlock type={type} count={40} cardWidth='100%' imageWidth='150px' cardTitle="相关新闻"></NewsImageBlock>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }


}
