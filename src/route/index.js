// import { Router, Route, Redirect,Switch } from "react-router";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import AppMenu from "../components/menu/menu";
import {Login} from "../components/login/Login";
import ListTable from "../components/list/ListTable";
import Table2 from "../components/table/Table2";
import PrivateRoute from "./PrivateRoute";
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
                <PrivateRoute path='/menu' component={(props)=><AppMenu {...props}>
                    <Route path='/menu/list' component={ListTable}></Route>
                    <Route path='/menu/tableList' component={Table2}></Route>
                </AppMenu>}></PrivateRoute>

                    {/*<Route path='/' exact component={Login}></Route>*/}
                    {/*<Route path='/menu' component={(props)=><AppMenu {...props}>*/}
                    {/*    <Route path='/menu/list' component={ListTable}></Route>*/}
                    {/*    <Route path='/menu/tableList' component={Table2}></Route>*/}
                    {/*</AppMenu>}>*/}
                    {/*</Route>*/}

                    {/*<Route path='/menu' render={(props)=>{*/}
                    {/*   return <AppMenu {...props}>*/}
                    {/*        <Route path='/menu/list' component={ListTable}></Route>*/}
                    {/*        <Route path='/menu/tableList' component={Table2}></Route>*/}
                    {/*    </AppMenu>*/}
                    {/*}} />*/}
    </Router>
}
export default AppRoute
