import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {Card} from 'antd';
export default class NewsBlock extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired
    }

    state = {
        newsArr: null
    }

    componentDidMount () {
        const {type, count} = this.props;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
        axios.get(url)
            .then(response => {
                    const result = response.data;
                    const newsArr = result.map(news => {
                        return {
                            uniquekey: news.uniquekey,
                            title: news.title
                        }
                    })
                    this.setState({newsArr});
                }
            )
    }

    render () {
        const {newsArr} = this.state;
        const {type} = this.props;
        const newsList = !newsArr ? (
            <h3>没有新闻列表</h3>
        ) : (
            newsArr.map((news, index) => (
                <li key={index}>
                    <Link to={`/detail/${news.uniquekey}/${type}`}>{news.title}</Link>
                </li>
            ))

        )
        return (
            <Card className="topNewsList">
                {newsList}
            </Card>
        )
    }
}