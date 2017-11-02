import React,{ Component,PropTypes } from 'react'
import { connect } from 'react-redux';
import { History } from 'react-router';
import 'antd-mobile/lib/toast/style/index.less';
import { bindActionCreators } from 'redux';
import Toast from 'antd-mobile/lib/toast';
import '../assets/less/add.less';
import '../assets/less/reset.less';
import Tool from  '../utils/tool';
import * as IndexAction from '../actions/indexAction';
class Add extends Component {
    constructor(){
        super();
        this.state={
           small_car:[],
           large_car:[],
           drive_type:'',
           item_code:'',
           packageList:[],
           isPackageInfo:false,
           packageDetail:{

           }
        }
    }
    componentDidMount(){
        var that = this;
        var data = {
            city_code:this.props.routeParams.city_code
        };
        this.props.indexAction.getDriverType(data).payload.then(function(res){
            if(res.code == 0){
                that.setState({
                    small_car:res.response.small_car,
                    large_car:res.response.large_car
                });
            }else{
                Toast.fail(res.message,3);
            }
        })
    }
    selectDriver(item){
        var that = this;
        this.setState({
            drive_type:item.type,
            isPackageInfo:false,
            item_code:''
        });
        var data = {
            city_code:this.props.routeParams.city_code,
            drive_type:item.type

        };
        that.props.indexAction.getPackageList(data).payload.then(function(res){
            if(res.code == 0){
                if(res.response.length == 0){
                    Toast.fail('',3);
                }else{
                    that.setState({
                        packageList:res.response.data
                    });
                }
            }else{
                Toast.fail(res.message,3)
            }
        })
    }
    selectPackage(item){
        var that = this;
        if(item){
            this.setState({
                item_code:item.item_code,
                packageDetail:item,
                isPackageInfo:true
            });
        }else{
            this.setState({
                item_code:'NO',
                isPackageInfo:false
            });
        }
    }
    handleSubmit(){
        location.href = '/sign/'+this.state.item_code+'/'+this.state.drive_type+'/'+this.props.routeParams.city_code;
    }
    render() {
        var that = this;
        var drive_type = this.state.drive_type;
        var item_code = this.state.item_code;
        return (
            <div className="add">
                <div className='license'>
                    <h3 className='title'>* 驾照类型</h3>
                    <div className='li clearfix'>
                        <label className='li-label'>小车</label>
                        <div className='li-type'>
                            {this.state.small_car.map(function(item,i){
                                return(<a key={i} href='javascript:;' className={(drive_type== item.type) && 'selected' } onClick={that.selectDriver.bind(that,item)}>{item.type}{item.remark}</a>)
                            })}
                        </div>
                    </div>
                    {this.state.large_car.length !=0 && 
                        <div className='li clearfix'>
                            <label className='li-label'>大车</label>
                            <div className='li-type'>
                                {this.state.large_car.map(function(item,i){
                                    return(<a key={i} href='javascript:;' className={(drive_type== item.type) && 'selected' } onClick={that.selectDriver.bind(that,item)}>{item.type}{item.remark}</a>)
                                })}
                            </div>
                        </div>
                    }
                    {this.state.packageList.length != 0 ?
                        <div className='line'></div>:<div className='line' style={{backgroundColor:'#ffffff'}}></div>
                    }
                </div>
                {this.state.packageList.length != 0 && 
                    <div className='license'>
                        <h3 className='title'>* 套餐类型</h3>
                        <div className='li'>
                            <div className='li-type'>
                                {this.state.packageList.map(function(item,i){
                                    return(<a key={i} href='javascript:;' className={(item_code== item.item_code) && 'selected' } onClick={that.selectPackage.bind(that,item)}>{item.title}</a>)
                                })
                                }
                                <a href='javascript:;' className={(item_code== 'NO') && 'selected' } onClick={that.selectPackage.bind(that,'')}>不知道选什么求推荐</a>
                            </div>
                        </div>
                        {this.state.isPackageInfo ?
                            <div className='line'></div>:<div className='line' style={{backgroundColor:'#ffffff'}}></div>
                        }
                    </div>
                }
                {this.state.isPackageInfo && 
                    <div className='license'>
                        <div className='info'>
                            <div className='title'>
                                <p className=''>产品名称</p>
                                <p className='name'>{this.state.packageDetail.title}</p>
                            </div>
                            <div className='price'>
                                {
                                    (parseFloat(this.state.packageDetail.market_price)- parseFloat(this.state.packageDetail.price) > 0)?
                                      <p className='market_price'>￥{this.state.packageDetail.market_price}</p>:<p>套餐价格</p>
                                }
                                <p className='money'>￥{this.state.packageDetail.price}</p>
                            </div>
                        </div>
                        <div className='line'></div>
                        <div className='comInfo'>
                            <p className='title'>包含费用</p>
                            <p>{this.state.packageDetail.cost_remark_include}</p>
                        </div>
                        <div className='comInfo'>
                            <p className='title'>不包含费用</p>
                            <p>{this.state.packageDetail.cost_remark_uninclude}</p>
                        </div>
                        <div className='line'></div>
                        <div className='comInfo'>
                            <p className='title'>培训服务</p>
                            <pre style={{paddingBottom:20}}>{this.state.packageDetail.training_remark}</pre>
                        </div>
                    </div>
                }
                <div className='tips'>
                    <p>提示：提交个人信息后，学车管家会联系您，根据您的情况为您推荐合适的套餐</p>
                </div>
                {(this.state.drive_type && this.state.item_code) ? 
                    <a className='btnSubmit' href='javascript:;' onClick={this.handleSubmit.bind(this)}>下一步</a>:
                    <a className='btnSubmit btnDisabled' href='javascript:;'>下一步</a>
                }
            </div>
        )
    }
    
}
export default connect((state,props)=>({
  user:state.user
}),dispatch=>({
  indexAction:bindActionCreators(IndexAction,dispatch)
}),null,{
  widthRef:true
})(Add);