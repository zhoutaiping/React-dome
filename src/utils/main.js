import ApiList from './api'
import Config from './config'
module.exports = {
	_apiList:ApiList.apiList,
	apiAddress : Config.statics.APIADDRESS,
	apiClient : Config.statics.CLIENT,
	apiSalt : Config.statics.SALT,
	getApi:function(apiName){
		let res = null;
		this._apiList.map(function(apiObj){
			if(apiObj.api == apiName){
				res = apiObj;
				return;
			}
		})
		if(res!==null){
			res.address = this.apiAddress;
			res.salt = this.apiSalt;
			res.client = this.apiClient;
		}
		return res;
	}
}