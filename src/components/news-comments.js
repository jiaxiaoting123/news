import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {
    Card,
    Form,
    Input,
    Button,
    notification
} from 'antd';
const FormItem = Form.Item;
class NewsComments extends Component {
    state = {
        comments: []
    }
    static propTypes = {
        uniquekey: PropTypes.string.isRequired
    }

    componentDidMount () {
        const {uniquekey} = this.props;
        this.showComments(uniquekey);
    }

    componentWillReceiveProps (newProps) {
        const {uniquekey} = newProps;
        this.showComments(uniquekey);
    }

    showComments (uniquekey) {
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`;
        axios.get(url)
            .then(response => {
                const comments = response.data.map(({UserName, Comments, datetime}) => (
                    {
                        UserName,
                        Comments,
                        datetime
                    }
                ))
                this.setState({comments});
            })
    }

    // 提交评论
    handleSubmit = () => {
        const content = this.props.form.getFieldValue('content');
        // console.log(content)
        const userId = localStorage.getItem('userId');
        if(!userId) {
            alert("请先登录");
            return;
        }
        const {uniquekey} = this.props;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${content}`;
        axios.get(url)
            .then(response => {
                this.componentDidMount();
                notification.success({
                    message: '提交评论成功'
                })
                this.props.form.resetFields();
            })
    }

    // 收藏文章
    handleClick = () => {
        const userId = localStorage.getItem('userId');
        if(!userId) {
            alert("请先登录");
            return;
        }
        const {uniquekey} = this.props;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`;
        axios.get(url)
            .then(response => {
                this.componentDidMount();
                notification.success({
                    message: '收藏文章成功'
                })
            })

    }

    render () {
        const {comments} = this.state;
        const {getFieldDecorator} = this.props.form;
        const commentsList = comments.map((comment, index) => (
            <Card key={index} title={comment.UserName} extra={`发布于${comment.datetime}`}>
                <p>{comment.Comments}</p>
            </Card>
        ))
        // console.log(comments);
        return (
            <div style={{padding: '10px'}}>
                {commentsList}
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="您的评论">
                        {getFieldDecorator('content')(
                            <Input type='textarea' placeholder="请输入评论内容" />
                        )}
                    </FormItem>
                    <Button type='primary' htmlType='submit'>提交评论</Button>
                    <Button type='primary' onClick={this.handleClick}>收藏文章</Button>
                </Form>
            </div>
        )

    }
}
export default Form.create()(NewsComments);
