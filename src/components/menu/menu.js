import React, {Component, createRef} from "react";
import { Layout, Menu,Spin,Tooltip,Modal  } from 'antd';
import { connect } from "react-redux";
import '../../index.css'
import { getList } from "./redux/action";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import TabMenu from "./TabMenu";
import {LoginOut} from "../login/LoginOut";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const choseMenu = new Map()
class AppMenu extends Component{
    state={
        selectedKeys:[],
        tab:[],//暂存tab
        loginOut:false
    }

    componentDidMount() {
        const {getList,subMenuList,history} = this.props
        getList()
        // history.push('/menu/list') //跳到第一个菜单上  后续用路由重定向做
        this.tabRef = createRef()
        this.setState({selectedKeys:subMenuList[0]?[subMenuList[0].children[0].key]:[]})
    }

    goPage=(item,from)=>{
        // 每次点击这个按钮除了跳转路由还要把tab添加上
        if(item.url){
            this.props.history.push(item.url)
        }
        this.setState({selectedKeys:item.key})

        //如果不是从tab点击，才添加tab
        if(!from){
            choseMenu.set(item.key,item)
            let values=[...choseMenu].map(item=>item[1])
            this.tabRef.current.add(values,item.key)
            // this.setState({tab:values}) //暂存便于resetTab方法二使用
        }

    }

    //重置tab的,第一次要把那个塞进去，删除了之后还要再塞进去
    resetTab=(panes)=>{
        // 方法一先清空，再重新塞值
        choseMenu.clear()
        panes.map(item=>{
            choseMenu.set(item.key,item)
        })
        //方法二，（在第一次tab有东西的情况下）判断panes是否含有tab里面的，如果有的话就保留，如果那一项没有了，就删除，个人觉得没有法一好
        //tab如果啥也没有就把这个塞进去
        // if(this.state.tab.length>0){
        //     this.state.tab.map((item)=>{
        //         if(!panes.map(pane=>pane.key).indexOf(item.key)){
        //             choseMenu.delete(item.key)
        //         }
        //     })
        // }else{
        //     if(panes[0]){
        //        panes.map(item=>{
        //            choseMenu.set(item.key,item)
        //        })
        //     }
        // }
    }

    render(){
        const { loading, subMenuList } = this.props
        const defaultMenu = subMenuList[0]?subMenuList[0].children[0]:{}
        return <div style={{textAlign:'center',lineHeight:'100vh'}}>
            {loading?<Spin/>:<Layout style={{textAlign:'left',lineHeight:'normal'}}>
                <Header  >
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                    <LoginOut/>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                            selectedKeys={this.state.selectedKeys}
                        >
                            {
                                subMenuList.map(item=><SubMenu key={item.key} icon={<UserOutlined />} title={item.title}>
                                    {item.children.map(item1=><Menu.Item key={item1.key} onClick={()=>{this.goPage(item1)}}>{item1.titleText}</Menu.Item>)}
                                </SubMenu>)
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <TabMenu ref={this.tabRef}
                                 defaultpanes={[defaultMenu]}
                                 resetTab={(panes)=>{this.resetTab(panes)}}
                                 switchTab={(item)=>{this.goPage(item,'children')}}
                        />
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
