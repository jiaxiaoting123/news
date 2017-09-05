import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {Card} from 'antd';
import {Link} from 'react-router';
export default class NewsImageBlock extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        cardTitle: PropTypes.string.isRequired,
        imageWidth: PropTypes.string.isRequired,
        cardWidth: PropTypes.string.isRequired
    }
    state = {
        newsArr: []
    }
    componentDidMount () {
        const {type, count} = this.props;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
        axios.get(url)
            .then(response => {
                // console.log(response.data);
                const result = response.data;
                const newsArr =  result.map(({author_name, thumbnail_pic_s, uniquekey, url, title}) => (
                    {
                        author_name,
                        thumbnail_pic_s,
                        uniquekey,
                        url,
                        title
                    }
                ))
                this.setState({newsArr});
            })

    }
    render () {
        const {imageWidth, cardTitle, cardWidth, type} = this.props;
        const {newsArr} = this.state;
        const imageStyle = {
            width: imageWidth,
            height: '90px',
            display: 'block'
        }
        const titleStyle = {
            "width": imageWidth,
            "whiteSpace": "nowrap",
            "overflow": "hidden",
            "textOverflow": "ellipsis"
        }
        const newsList = !newsArr
            ? <h3>没有任何新闻</h3>
            : (
                    newsArr.map((news, index) => (
                        <div className="imageblock" key={index}>
                            <Link to={`/detail/${news.uniquekey}/${type}`}>
                                <div>
                                    <img src={news.thumbnail_pic_s} style={imageStyle}/>
                                </div>
                                <div className="custom-card">
                                    <h3 style={titleStyle}>{news.title}</h3>
                                    <p>{news.author_name}</p>
                                </div>
                            </Link>
                        </div>
                    ))
              )


        return (
            <Card className="topNewsList" title={cardTitle} style={{width:cardWidth}}>
                {newsList}
            </Card>
        )
    }
}

