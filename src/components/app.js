import React, {Component} from 'react';
import NewsHeader from "./news-header";
import NewsFooter from "./news-footer";
import '../componentsCss/pc.css';
export default class App extends Component {
    render () {
        return (
            <div>
                <NewsHeader></NewsHeader>
                {this.props.children}
                <NewsFooter></NewsFooter>
            </div>
        )
    }
}
