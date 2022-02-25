// import { Router, Route, Redirect,Switch } from "react-router";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import AppMenu from "../components/menu/menu";
import ListTable from "../components/list/ListTable";
import Table2 from "../components/table/Table2";
import Charts from "../components/charts/Charts";
import PrivateRoute from "./PrivateRoute";
import X6charts from "../components/X6charts/XIndex";
import SystemList from "../components/system/SystemList";
import {ParentComponent} from "../components/test/ParentComponent";

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
                    <Route path='/menu/charts' component={Charts}></Route>
                    <Route path='/menu/X6Charts' component={X6charts}></Route>
                    <Route path='/menu/test' component={ParentComponent}></Route>
                    <Route path='/menu/system' component={SystemList}></Route>
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
