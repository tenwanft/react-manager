import {Component} from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

export default class TabMenu extends Component{
    state = {
        activeKey: "",
        panes:[],
        closable:false//默认第一次进来只有一个tab不叫关
    }
// 组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；;每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state
//     static getDerivedStateFromProps(props, state) {
//         state = {...state,...{panes:props.defaultpanes,activeKey:props.defaultpanes[0].key}}
//         return state
//     }

    componentDidMount() {
        // 第一次进来的时候只给第一位默认
        this.setState({panes:this.props.defaultpanes,activeKey:this.props.defaultpanes[0].key})
        this.props.resetTab(this.props.defaultpanes)
    }

    add = (pane,key) => {
        this.setState({panes:pane,activeKey:key})
        if(pane.length>1){
            this.setState({closable:true})
        }
    };

    onChange = activeKey => {
        this.setState({ activeKey });
        this.state.panes.map(item=>{
            if(item.key===activeKey){
                this.props.switchTab(item)
            }
        })
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        // 去除了要移除的那一个还剩下的
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        // 如果还有可以移除的，并且我当前选择的这个高亮的跟我要移除的这个是同一个key的话,需要变动高亮的key，否则就是原来的key
        // 接上，如果我要移除的一直都是最前面一个，那么最后一次的index一直都是-1，则动态高亮key就变为数组第一个，否则还保持原来的
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
                this.props.switchTab(panes[lastIndex])
            } else {
                activeKey = panes[0].key;
                this.props.switchTab(panes[0])
            }
        }
        if(panes.length<2){
            this.setState({closable:false})
        }
        this.setState({ panes, activeKey });
        this.props.resetTab(panes)
    };

    render(){
        return <div>
            <Tabs
                activeKey={this.state.activeKey}
                hideAdd
                onChange={this.onChange}
                onEdit={this.onEdit}
                type="editable-card"
            >
                {this.state.panes.map(pane => (
                    <TabPane closable={this.state.closable}
                        key={pane.key}
                        tab={pane.titleText}
                    >
                        {/*{pane.content}*/}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    }

}
