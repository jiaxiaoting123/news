import React, {Component} from 'react';
import logo from '../images/logo.png';
import {Link} from 'react-router';
import axios from 'axios';
import {
    Row,      // 行
    Col,      // 列
    Menu,     // 菜单
    Icon,     // 图标
    Button,   // 按钮
    Modal,    // 模态框
    Tabs,     // 页签
    Form,     // 表单
    Input,    // 输入框
    message   // 提示信息
} from 'antd';
const MenuItem = Menu.Item;   // 菜单项
const TabPane = Tabs.TabPane; // 页签项
const FormItem = Form.Item;   // 表单项
class NewsHeader extends Component {
    state = {
        username: null,
        modalShow: false
    }

    componentDidMount () {
        const username = localStorage.getItem('username');
        if(username) {
            this.setState({username});
        }
    }

    // 退出登录
    logOut = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        this.setState({username: null});
    }

    // 显示模态框
    showModal = ({key}) => {
        if(key === 'register') {
            this.setState({
                modalShow: true
            });
        }
    }
    // 取消模态框
    handleCancel = (isShow) => {
        this.setState({
            modalShow: isShow
        });
    }

    // 提交表单
    handleSubmit = (isRegister, event) => {
        event.preventDefault();
        const action = isRegister ? 'register' : 'login';
        const {username, password,r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue();
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}`;
        if(isRegister) {
            // 注册
            url +=  `&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`;
        } else {
            // 登录
            url +=  `&username=${username}&password=${password}`;
            // 发送ajax请求
        }
        // console.log(url);
        axios.get(url)
            .then(response => {
                this.props.form.resetFields();
                const result = response.data;
                if(isRegister) {
                    if(result === true) {
                        message.success('注册成功');
                    } else {
                        message.error('注册失败');
                    }
                } else {
                    if(result) {
                        const userId = result.UserId;
                        const username = result.NickUserName;
                        message.success('登录成功');
                        // 更新状态
                        this.setState({username});
                        localStorage.setItem('userId', userId);
                        localStorage.setItem('username', username);
                    } else {
                        message.error('登录失败');
                    }
                }


            });

        this.setState({modalShow: false});
    }
    render () {
        const {username, modalShow} = this.state;
        const userShow = username ? (
            // 用户已登录
            <MenuItem key="logout" className="register">
                <Button type="primary">{username}</Button>&nbsp;&nbsp;
                <Link to="/userCenter">
                    <Button type="dashed">个人中心</Button>
                </Link>&nbsp;&nbsp;
                <Button onClick={this.logOut}>退出</Button>
            </MenuItem>
        ) : (
            // 未登录状态
            <MenuItem key="register" className="register">
                <Icon type="appstore"/>登录/注册
            </MenuItem>
        )

        const {getFieldDecorator} =  this.props.form;

        return (
            <header>
                <Row>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <a href="#/" className="logo">
                            <img src={logo} alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={19}>
                        <Menu mode="horizontal" defaultSelectedKeys={['top']} onClick={this.showModal}>
                            <MenuItem key="top">
                                <Icon type="appstore"/>头条
                            </MenuItem>
                            <MenuItem key="shehui">
                                <Icon type="appstore"/>社会
                            </MenuItem>
                            <MenuItem key="guonei">
                                <Icon type="appstore"/>国内
                            </MenuItem>
                            <MenuItem key="guoji">
                                <Icon type="appstore"/>国际
                            </MenuItem>
                            <MenuItem key="yule">
                                <Icon type="appstore"/>娱乐
                            </MenuItem>
                            <MenuItem key="tiyu">
                                <Icon type="appstore"/>体育
                            </MenuItem>
                            <MenuItem key="keji">
                                <Icon type="appstore"/>科技
                            </MenuItem>
                            <MenuItem key="shishang">
                                <Icon type="appstore"/>时尚
                            </MenuItem>
                            {userShow}
                        </Menu>
                        <Modal
                            title="用户中心"
                            visible={modalShow}
                            onOk={this.handleCancel.bind(this, false)}
                            onCancel={() => this.handleCancel(false)}
                            okText="关闭"
                        >
                            <Tabs type="card" onChange={() => this.props.form.resetFields()}>
                                <TabPane tab="登录" key="1">
                                    <Form onSubmit={this.handleSubmit.bind(this, false)}>
                                        <FormItem label="用户名">
                                            {
                                                getFieldDecorator('username')(<Input type="text" placeholder="请输入账号"/>)
                                            }
                                        </FormItem>
                                        <FormItem label="密码">
                                            {
                                                getFieldDecorator('password')(<Input type="password" placeholder="请输入密码"/>)
                                            }
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">
                                            登陆
                                        </Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form onSubmit={this.handleSubmit.bind(this, true)}>
                                        <FormItem label="账户">
                                            {
                                                getFieldDecorator('r_userName')(
                                                    <Input type="text" placeholder="请输入账号" />
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="密码">
                                            {
                                                getFieldDecorator('r_password')(
                                                    <Input type="password" placeholder="请输入密码" />
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {
                                                getFieldDecorator('r_confirmPassword')(
                                                    <Input type="password" placeholder="请再次输入您的密码" />
                                                )
                                            }
                                        </FormItem>
                                        <Button type="primary" htmlType='submit'>注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={1}></Col>
                </Row>

            </header>
        )
    }
}
export default Form.create()(NewsHeader);