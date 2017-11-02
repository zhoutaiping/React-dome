/*!
 *
 * Util模块 React Native module
 * 主要提供工具方法
 *
 */
import React from 'react'
import {
  PixelRatio,
  ActivityIndicatorIOS,
  Dimensions
  } from 'react-native';

module.exports = {
  navigationHeight: 55,
  navigationBarBGColor:'#ffffff',
  statusBarHeight: 20,//状态栏的高度
  backGroundColor:'#f7f7f7',//背景颜色
  borderColor:'#e6e6e6',//边框线颜色
  combgroundColor:'#ffffff',
  lightColor:'#b1b1b1',
  deepColor:'#666666',
  themeColor:'#ffb111',
  /*最小线宽*/
  pixel: 1 / PixelRatio.get(),

  /*屏幕尺寸*/
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  /**
   * 基于fetch的get方法
   * @method post
   * @param {string} url
   * @param {function} callback 请求成功回调
   */
  get: function(url, successCallback, failCallback){
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
        successCallback(JSON.parse(responseText));
      })
      .catch(function(err){
        failCallback(err);
      });
  },
  /*loading效果*/
  loading: <ActivityIndicatorIOS color="#3E00FF" style={{marginTop:40}}/>
};
