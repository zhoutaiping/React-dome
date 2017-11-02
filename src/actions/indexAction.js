import * as types from '../constants/actionTypes';
import Call from '../utils/call';
import Tool from '../utils/tool';
import 'antd-mobile/lib/toast/style/index.less';
import Toast from 'antd-mobile/lib/toast';
let storage = window.localStorage;

export const getCityList = function(){
	var api = 'Cms.Msite.Pub.openCity'
	var data = {

	}
	return{
		type:types.GET_CITYLIST,
		payload: Call.invokeApi(api,data)
	}
}
export const getDriverType = function(data){
	var api = 'Cms.Msite.Item.driveType'
	return{
		type:types.GET_DRIVERTYPE,
		payload: Call.invokeApi(api,data)
	}
}
export const getPackageList = function(data){
	var api = 'Cms.Msite.Item.lists'
	return{
		type:types.GET_DRIVERTYPE,
		payload: Call.invokeApi(api,data)
	}
}
export const addStudent = function(data){
	var api = 'Cms.Msite.Advisory.create'
	return{
		type:types.GET_DRIVERTYPE,
		payload: Call.invokeApi(api,data)
	}
}