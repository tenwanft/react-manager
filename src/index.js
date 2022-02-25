import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import store from "./store/store";
import reportWebVitals from "./reportWebVitals";
import AppRoute from "./route";
import { Provider } from "react-redux";
function render(){
    ReactDOM.render(
        <Provider store={store}>
            <AppRoute />
        </Provider>,
        document.getElementById("root")
    );
}

if(!window.__POWERED_BY_QIANKUN__){
    render();
}

export async function bootstrap(){

}
export async function mount(props) {
    render()
}
export async function unmount(props){
    ReactDOM.unmountComponentAtNode( document.getElementById("root"));  // 卸载节点
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
