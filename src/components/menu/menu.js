import React,{Component} from "react";
import { Layout, Menu, Breadcrumb,Spin  } from 'antd';
import { connect } from "react-redux";
import '../../index.css'
import { getList } from "./redux/action";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class AppMenu extends Component{
    state={
        SubMenuList:[]
    }

    componentDidMount() {
        this.props.getList()
    }

    render(){
        const { loading, subMenuList } = this.props
        return <div style={{textAlign:'center',lineHeight:'100vh'}}>
            {loading?<Spin/>:<Layout style={{textAlign:'left',lineHeight:'normal'}}>
                <Header className="header" >
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {
                                subMenuList.map(item=><SubMenu key={item.key} icon={<UserOutlined />} title={item.title}>
                                    {item.children.map(item1=><Menu.Item key={item1.key}>{item1.titleText}</Menu.Item>)}
                                </SubMenu>)
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>

                </Layout>

            </Layout>}
        </div>
    }
}

export default connect((state, ownProps)=>{
    return  state.getReducer
},(dispatch, ownProps)=>{
    return {
        getList:()=>dispatch(getList())
    }
} )(AppMenu)
