import React,{ Component,PropTypes } from 'react'
import { connect } from 'react-redux';
import { History } from 'react-router';
import 'antd-mobile/lib/toast/style/index.less';
import { bindActionCreators } from 'redux';
import Toast from 'antd-mobile/lib/toast';
import '../assets/less/sign.less';
import '../assets/less/reset.less';
import Tool from  '../utils/tool';
import * as IndexAction from '../actions/indexAction';
class Sign extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state={
           username:'',
           mobile:'',
           remark:''
        }
    }
    componentDidMount(){
      
    }
    showCity(){
    }
    handleSubmit(){
        var username = this.state.username;
        var mobile = this.state.mobile;
        var remark = document.getElementById('remark').value;
        if(!username){
            Toast.fail('请输入真实姓名',3);
            return;
        }
        if(!Tool.chinese_char(username)){
            Toast.fail('姓名请输入汉字',3);
            return;
        }
        if(!mobile){
            Toast.fail('请输入手机号',3);
            return;
        }
        if(!Tool.mobilephone(mobile)){
            Toast.fail('请输入正确的手机号',3);
            return;
        }
        var item_code = this.props.routeParams.item_code;
        item_code = item_code == 'NO' ? '' : item_code;
        var data = {
            mobile:mobile,
            realname:username,
            item_code:item_code,
            drive_type:this.props.routeParams.drive_type,
            remark:remark,
            city_code:this.props.routeParams.city_code
        }
        this.props.indexAction.addStudent(data).payload.then(function(res){
            if(res.code == 0){
                location.href = '/success'
            }else{
                Toast.fail(res.message,3);
            }
        })
    }
    render() {
        return (
            <div className="sign">
                <div className='form'>
                    <div className='formGroup'>
                        <div className='formLabel'>* 姓名</div>
                        <div className='formControl'>
                            <input type='text' onChange={(e)=>{this.setState({username:e.target.value})}} id='username' className='formInput' name='' placeholder='请输入您的真实姓名'/>
                        </div>
                    </div>
                    <div className='formGroup'>
                        <div className='formLabel'>* 电话号码</div>
                        <div className='formControl'>
                            <input type='number' onChange={(e)=>{this.setState({mobile:e.target.value})}} id='mobile' className='formInput' name='' placeholder='请输入您的电话号码'/>
                        </div>
                    </div>
                </div>
                <div className='form'>
                    <div className='formGroup'>
                        <div className='formLabel'>备注</div>
                        <div className='formControl'>
                            <textarea type='text' id='remark' className='formTextarea' name='' placeholder='您可以输入其他要求，如希望练车场地在双流区'></textarea>
                        </div>
                    </div>
                </div>
                <div className='tips'>
                    <p>提示：带 * 号的为必填项</p>
                    <p style={{paddingLeft:36}}>收到您提交的报名信息后，学车管家会尽快与您联系</p>
                </div>
                {(this.state.username && this.state.mobile) ?
                    <a className='btnSubmit' href='javascript:;' onClick={this.handleSubmit}>我要报名学车</a>:
                    <a className='btnSubmit btnDisabled' href='javascript:;'>我要报名学车</a>
                }
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
})(Sign);
