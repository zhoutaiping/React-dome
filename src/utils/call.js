import Main from './main'
import Md5 from './md5'
import Config from './config'
import Tool from './tool'
import $ from 'jquery'
var Base64 = require('js-base64').Base64;

module.exports = {
	apiStore:null,
	callData:null,
	responseData:null,
	invokeApi:function(apiName,data,callback){

		// 获取api执行信息
		var apiInfo = Main.getApi(apiName);
		var token = '';

		var authrization = localStorage.getItem('userInfo');

		if(authrization){
			token = JSON.parse(authrization).token;
		}else{
			token="";
		}
		//var  jsonStr="";
		//var params = eval("jsonStr = '"+JSON.stringify(data)+"';");
		//this.callData = this.getCallData(apiInfo,jsonStr , token);
		// 调用api接口
		this.callData = this.getCallData(apiInfo, Base64.encode(JSON.stringify(data)), token);
		var data = this.callData;
		if(callback){
			this.callApi(apiInfo.address, this.callData,null,null,function(data){
				callback(data)
			});
		}else{
			//var dtd = $.Deferred();
			return $.ajax({
				url:apiInfo.address,
				method:'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-Requested-With':'XMLHttpRequest'

				},
				data:Tool.toQueryString(data,true)
			}).then(function(data){
				if(data.code === 1009){
					localStorage.removeItem('userInfo')
					localStorage.removeItem('wechat')
					location.reload();
				}else{
					return data
				}
				//dtd.resolve(data);
			}).catch(function(error){
				alert('接口请求error')
			})
		}
	},
	callApi: function(apiAddress, data, async, timeOut,callback) {
		var res = null, me = this;
		// 默认为异步执行
		async = async === null ? true : async;
		// 默认为配置超时时间  5000ms
		timeOut = timeOut ? timeOut : Config.REQUEST_API_TIMEOUT;
		//console.log("加密后的值"+Tool.toQueryString(data));
		$.ajax({
			url:apiAddress,
			method:'POST',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
				'X-Requested-With':'XMLHttpRequest'

			},
			data:Tool.toQueryString(data,true),

			success:function(data,textStaus,jqXHR){
				if(data.code === 1009){
					localStorage.removeItem('userInfo')
					localStorage.removeItem('wechat')
					location.reload();
				}else{
					callback(data);
				}
			},
			error:function(xhr,textStatus){
				console.log('错误')
				console.log(xhr)
				console.log(textStatus)
			}
		})

		
	},
	getCallData : function(apiInfo, data, token) {
		var string = "";
		data = data;
		string += apiInfo.api;
		string += apiInfo.version;
		string += data;
		string += apiInfo.salt;

		var hashHandler = Md5;

		// 计算 md5 (api + version + data + salt)
		//var hashCode = hashHandler.hex_md5(encodeURI(string));

		var hashCode = hashHandler.hex_md5(string);

		// 拼装请求字段
		var resObj = {
			call : {
				api : apiInfo.api,
				data : data,
				api_version : apiInfo.version
			},
			body : {
				sign : hashCode,
				token : token,
				client : apiInfo.client,
				sign_type:'base64'
			},
			device : {
				type : Config.statics.CLIENT_TYPE,
				info : '我是app',
				app_version :Config.statics.CLIENT_VERSION
			}
		};

		return resObj;
	},


	//charToReplace : /[\\\"\x00-\x1f\x7f-\uffff]/g,
	encodeString : function(s) {
		var m = {
			"\b": '\\b',
				"\t": '\\t',
				"\n": '\\n',
				"\f": '\\f',
				"\r": '\\r',
				'"': '\\"',
				"\\": '\\\\',
				'\x0b': '\\u000b' //ie doesn't handle \v
		}

		if(typeof s == 'string'){
			return s.replace(/[\\\"\x00-\x1f\x7f-\uffff]/g, function(a) {
					var c = m[a];
					return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				});
		}else {
			return s;
		}

	},
	
}


