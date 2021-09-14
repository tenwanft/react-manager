import React,{Component} from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import {Login} from "../components/login/Login";
export default class PrivateRoute extends Component{
    state={
        token:true
    }
    render(){
        const { path,component } = this.props
        const token = localStorage.getItem('token')
        // const {token} = this.state
        if (token) {
            return <Switch>
                <Route path={path} component={component} />
                <Redirect to={{
                    pathname:"/menu/list",
                    state:{ redirect: '/'}
                }}/>
            </Switch>
        }
            return (
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { redirect: path },
                        }}
                    />
                </Switch>
            );


    }
}
