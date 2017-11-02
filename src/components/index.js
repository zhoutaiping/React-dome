import React,{ Component,PropTypes } from 'react'
import { connect } from 'react-redux';
import { History } from 'react-router';
import 'antd-mobile/lib/toast/style/index.less';
import { bindActionCreators } from 'redux';
import Toast from 'antd-mobile/lib/toast';
import '../assets/less/index.less';
import '../assets/less/reset.less';
import Tool from  '../utils/tool';
import 'antd-mobile/lib/carousel/style/index.less';
import 'antd-mobile/lib/picker/style/index.less';
//import 'antd-mobile/lib/list/style/index.less';
import Carousel from 'antd-mobile/lib/carousel';
import Picker from 'antd-mobile/lib/picker';
import List from 'antd-mobile/lib/list';
import * as IndexAction from '../actions/indexAction';
class Index extends Component {
    constructor(){
        super();
        this.handleGo = this.handleGo.bind(this)
        this.state={
           cityList:[],
           city_code:'510100',
           cityName:'成都市'
        }
    }
    componentDidMount(){
        var that = this;
        this.props.indexAction.getCityList().payload.then(function(res){
            if(res.code == 0){
                var cityList = [],
                    arr = res.response;
                for(var i=0;i<arr.length;i++){
                    var obj = arr[i];
                    obj.label = arr[i].name;
                    obj.value = i;
                    cityList.push(obj);
                }
                that.setState({
                    cityList:cityList
                })
            }else{
                Toast.fail(res.message,3)
            }
        })
    }
    handleGo(){
        location.href = '/add/'+this.state.city_code
    }
    onChange(val){
        var index = val[0];
        var cityList = this.state.cityList;
        this.setState({
            city_code:cityList[index].code,
            cityName:cityList[index].name
        })
    }
    render() {
        // <Picker extra='' data={this.state.cityList} cols={1} className="forss">
        //   <List.Item arrow="horizontal"></List.Item>
        // </Picker>
        return (
            <div className="index">
                <div className='banner'>
                    <div className='site'>
                        {this.state.cityName}
                        
                    </div>
                    <a href="https://active.clewm.net/AHE5Jt?qrurl=https%3A%2F%2Fc3.clewm.net%2FAHE5Jt&gtype=1&scant=1&uname=186****2866&key=57849154e2c83143f04766eed3e86e8bf8b313b955"><img className='bannerImg' src={require('../assets/images/ofo.png')}/></a>
                </div>
                <Carousel className="my-carousel"
                  dots={true}
                  dragging={false}
                  swiping={false}
                  infinite
                >
                    <div className="v-item">
                        <div className='item'>
                            <img src={require('../assets/images/free.png')} style={{width:51,height:35}}/>
                            <p className='mainTitle'>免费试学</p>
                            <p className='title'>先行体验 满意报名</p>
                        </div>
                        <div className='item'>
                            <img src={require('../assets/images/coach.png')} style={{width:45,height:39}}/>
                            <p className='mainTitle'>金牌教练</p>
                            <p className='title'>千里挑一 热情认真</p>
                        </div>
                        <div className='item'>
                            <img src={require('../assets/images/pay.png')} style={{width:52,height:35}}/>
                            <p className='mainTitle'>学车管家</p>
                            <p className='title'>全程关注 热情服务</p>
                        </div>
                    </div>
                    <div className="v-item">
                        <div className='item'>
                            <img src={require('../assets/images/exam.png')} style={{width:45,height:35}}/>
                            <p className='mainTitle'>赠模拟考</p>
                            <p className='title'>真实模拟 高通过率</p>
                        </div>
                        <div className='item'>
                            <img src={require('../assets/images/zs.png')} style={{width:47,height:35}}/>
                            <p className='mainTitle'>急速拿证</p>
                            <p className='title'>拿证时间 最快35天</p>
                        </div>
                        <div className='item'>
                            <img src={require('../assets/images/trans.png')} style={{width:56,height:32}}/>
                            <p className='mainTitle'>费用透明</p>
                            <p className='title'>价格透明 无隐形消费</p>
                        </div>
                    </div>
                </Carousel>
                <div className='entrance'>
                    <div className='bg'></div>
                    <p>#  报名学车  #</p>
                    <a onClick={this.handleGo}>去看看</a>
                </div>
                <div className='footer'>
                    <p className='tel'>学车管家  <a href='tel:400-0708-966'>400-0708-966</a></p>
                    <p className='time'>工作时间 09:00-21:00 法定节假日除外 </p>
                </div>
                
            </div>
        )
    }
    
}
export default connect((state,props)=>({
  user:state.user
}),dispatch=>({
  indexAction:bindActionCreators(IndexAction,dispatch),
}),null,{
  widthRef:true
})(Index);
