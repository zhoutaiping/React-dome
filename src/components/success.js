import React,{ Component,PropTypes } from 'react'
import { connect } from 'react-redux';
import { History } from 'react-router';
import { bindActionCreators } from 'redux';
import '../assets/less/sign.less';
import '../assets/less/reset.less';
import Tool from  '../utils/tool';
import * as IndexAction from '../actions/indexAction';
class Success extends Component {
    constructor(){
        super();
        this.state={
           
        }
    }
    componentDidMount(){
      
    }
    showCity(){
    }
    handleGo(){
        location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.ustudy.www.ustudy'
    }
    render() {
        return (
            <div className="success">
                <div className='content'>
                    <img src={require('../assets/images/success.png')}/>
                    <p className='info'>报名信息提交成功</p>
                    <p>我们的学车管家将为您提供满意的驾考服务</p>
                </div>
                <div className='about'>
                    <div className='left'>
                        <p>关注柚人学车微信公众号，</p>
                        <p>了解最新鲜的驾考资讯</p>
                    </div>
                    <div className='right'>
                        <p onClick={this.handleGo.bind(this)}><a >点击我</a>或去应用市场下载</p>
                        <p>柚人学车App，在线学习理</p>
                        <p>论，管理您的学习进度</p>
                    </div>
                </div>
                <div className='time'>
                    <p className='tel'>学车管家 400-0708-966</p>
                    <p className=''>工作时间 09:00-21:00 法定节假日除外</p>
                </div>
                 <a className='btnSubmit' href='/'>返回首页</a>
            </div>
        )
    }
    
}
export default connect((state,props)=>({
  index:state.index
}),dispatch=>({
  indexAction:bindActionCreators(IndexAction,dispatch),
}),null,{
  widthRef:true
})(Success);
