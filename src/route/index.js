// import { Router, Route, Redirect,Switch } from "react-router";
import { HashRouter as Router,Route, Switch} from "react-router-dom";
import AppMenu from "../components/menu/menu";
import {Login} from "../components/login/Login";
import ListTable from "../components/list/ListTable";
import Table2 from "../components/table/Table2";
const routes = {
    path: '/',
    component: AppMenu,
    // childRoutes: [
    //     { path: 'about', component: About },
    //     { path: 'inbox', component: Inbox },
    // ]
}
const AppRoute = ()=>{
    return <Router >
                <Route path='/' exact component={Login}></Route>
                <Switch>
                    {/*<Route path='/menu' component={(props)=><AppMenu {...props}/>}></Route>*/}
                    <Route path='/menu' render={(props)=>{
                       return <AppMenu {...props}>
                            <Route path='/menu/list' component={ListTable}></Route>
                            <Route path='/menu/tableList' component={Table2}></Route>
                        </AppMenu>
                    }} />
                </Switch>
    </Router>
}
export default AppRoute
