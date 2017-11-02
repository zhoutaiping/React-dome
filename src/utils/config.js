export default {
    statics: {
        // 项目名称
        APPNAME: "柚人分销",
        
        // 公司名称
        COMMPANY: "成都圆卓网络科技有限公司",
        
        // 内容tab前缀
        CONTENTTABPREFIX: "_content_tab_",
        
        // APi服务地址
        //APIADDRESS : "http://192.168.1.54:60031/index.php",
        //APIADDRESS : "http://139.224.42.140:60031/index.php",
        APIADDRESS : "http://139.196.248.81:60031/index.php",
        // 客户端标识
        CLIENT : "cms",
        
        // salt
        SALT : "AF0BBDBED2DF72AAADC71267BA60A5FF",
        
        // session story name
        SESSION_LOCAL_STORAGE : 'uzee_session',
        
        // client Type
        CLIENT_TYPE : "h5",
        
        // api 调用默认的超时时间  ms
        REQUEST_API_TIMEOUT : 5000,
        
        // client version 当前客户端版本
        CLIENT_VERSION : "v1.0.0",
        
        // api请求时候的loading提示
        REQUEST_API_LOADING_TEXT : "请稍候...",
        
        // 业务相关错误码配置
        REQUEST_ERROR_CODE : {
            ERR_1009 : "SESSION_UNVALIED",
            ERR_600 : "PARAMS_ERR",
            ERR_0   : "SUCCESS" ,
        },
        // 服务端请求异常默认值
        SERVER_ERR_DEFAULT : {
            code : -1,
            message : "服务端异常!",
            response : {},
            flag : "FAIL"
        },
        // 获取 client 授权 
        getPowerBy: function() {
            var string = "Powered by " + this.APPNAME + " | Copyright ©" + this.COMMPANY + " All rights reserved.";
            return string;
        }
    }
}