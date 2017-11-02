import React,{ Component,PropTypes } from 'react'
import { Router, Route, IndexRoute,hashHistory,browserHistory} from 'react-router'
import 'antd-mobile/lib/toast/style/index.less';
import Toast from 'antd-mobile/lib/toast';
import Index from '../components/index';
import Add from '../components/add';
import Sign from '../components/sign';
import Success from '../components/success';

function requireAuth(nextState, replace){
}
var history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
class App extends Component{
	render(){
		return(
			<Router history={browserHistory}>
				<Route path='/' component={Index}></Route>
				<Route path='/add/:city_code' component={Add}></Route>
				<Route path='/sign/:item_code/:drive_type/:city_code' component={Sign}></Route>
				<Route path='/success' component={Success}></Route>
          	</Router>
		)
	}
}
export default App;