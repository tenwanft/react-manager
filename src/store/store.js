import { createStore,combineReducers,applyMiddleware } from "redux";
import { getReducer,getReducer2 } from "../components/menu/redux/homeReducer";
import { listReducer } from "../components/list/redux/listReducer";
import { tableReducer } from "../components/table/redux/tableReducer";
import { SystemReducer} from "../components/system/redux/systemReducer";
import thunk from "redux-thunk";
let reducers = combineReducers({getReducer, getReducer2,listReducer,tableReducer,SystemReducer})

let store = createStore(reducers,applyMiddleware(thunk))
export default store
