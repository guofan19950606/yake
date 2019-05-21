<template>
    <div class="pay">
        <div class="title">
            <h2>诊断信息</h2>
            <p>待支付</p>
        </div>
        <div class="content">
            <table>
                <thead>
                <tr>
                    <th>医疗机构</th>
                    <th>时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody style="text-align: center">
                <tr>
                    <td>西安县医院</td>
                    <td>2018.4.10 09:00</td>
                    <td>待支付</td>
                    <td><router-link to="/details/info/case">查看病例</router-link></td>
                </tr>
                </tbody>
            </table>
            <div class="message">
                <div class="payment">
                    <h2>支付信息</h2>
                    <p>应付金额：<span>￥800</span></p>
                    <p>实付金额：<span>￥0.01</span></p>
                    <p>付款状态：未支付</p>
                </div>
                <div class="order">
                    <h2>订单信息</h2>
                    <p>订单编号：02c98c7307134537a91f73fba9ad77f3</p>
                    <p>创建时间：2018.8.9 09：00</p>
                </div>
            </div>
            <el-button type="text"  class="payButton" @click="outerVisible = true">去支付</el-button>
        </div>
        <el-dialog title="请选择支付方式" :visible.sync="outerVisible">
                
            <!-- title="请扫描二"++"维码支付" -->
            <el-dialog
                width="30%"
                :title= payMethod
                :visible.sync="innerVisible"
                append-to-body>
                <div class="payImg" v-if="!flag">
                    <img :src= ImgUrlWechat width="150px">
                </div>
                <div class="payImg"  v-if="flag"> 
                     
                    <img :src= ImgUrlAli width="150px">
                </div>
                
            </el-dialog>
                
            <div class="weixin" @click="goPayFun(1)">
                <i class="wxImg"></i>
                <span class="ml60" >微信支付</span>
            </div>
            <div class="zhifub"  @click="goPayFun(2)">
                <i class="zfbImg"></i>
                <span  class="ml60">支付宝支付</span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {goPayWechat,goPayWechatSucceed,goPayAli,goAliPaySucceed} from '../../common/api/index'
    import config from '../../common/config/index';
    import {mapActions} from 'vuex'
    // import { setTimeout } from 'timers';

	export default {
        name: "PayInfo",
        watch:{
            innerVisible(val) {
                if (val == false) {                   
                    this.clearFun(this.test)
                    this.innerVisible = false;
                }
            }        
        },
		data() {
			return {
                outerVisible: false,   // dialog 外层，支付方式选择
                innerVisible: false,   // dialog 内层
                ImgUrlWechat:'',       // 微信二维码url地址
                ImgUrlAli:'',          // 支付宝二维码url地址
                orderId:'',
                flag: false,           // 付款二维码显示切换
                test: '',              // 定时器id
                payMethod: ''
            }
        },
        methods: {
            ...mapActions(['setCaseId']),
            // 支付
            goPayFun(nub) {
                var that = this;
                if (nub == 1) {
                    // 微信
                    console.log('微信')
                    let caseId = this.$store.state.CaseInfo.caseId
                    goPayWechat(    

                    ).then(res => {
                        // console.log('微信支付-----------------微信支付---------------------微信支付')
                        // console.log(res)
                        if (res.data.url) {
                            this.payMethod = '请扫描微信二维码支付'
                            this.flag = false; // 显示微信二维码
                            this.ImgUrlWechat = config.baseUrl + res.data.url;
                            // this.ImgUrlWechat = 'http://192.168.20.44:8081' + res.data.url;
                            this.innerVisible = true;
                            this.orderId = res.data.result.orderId
                            that.test = setInterval(function(){                               
                                goPayWechatSucceed({        //  查看是否支付成功
                                    orderId: that.orderId ,
                                    caseId: caseId
                                }).then(res => {
                                    if (res.code == 200 ) {
                                        that.clearFun(that.test);
                                        that.$router.push({path: '/case/advisory'})    // 待咨询
                                    }                                    
                                })
                            },1000)       
                        }					
                    })                     
                }else {
                    // 支付宝
                    console.log('支付宝')
                    let caseId = this.$store.state.CaseInfo.caseId
                    goPayAli(
                        
                    ).then(res => {
                        // console.log('支付宝支付-----------------支付宝支付---------------------支付宝支付')
                        // console.log(res)
                        if (res.code == 200) {
                            this.payMethod = '请扫描支付宝二维码支付'
                            this.flag = true;   // 显示支付宝二维码
                            this.ImgUrlAli = config.baseUrl +  res.data.url
                            this.innerVisible = true;                     

                            this.orderId = res.data.result.orderId
                            that.test = setInterval(function(){                               
                                goAliPaySucceed({        //  查看是否支付成功
                                    orderId: that.orderId ,
                                    caseId: caseId
                                }).then(res => {
                                    if (res.code == 200 ) {
                                        that.clearFun(that.test);
                                        that.$router.push({path: '/case/advisory'})    // 待咨询
                                    }                                    
                                })
                            },1000)                                      
                        }
                        
                        
                    })                     
                }
  
            },
            clearFun(id){   // 清除定时器
            // console.log('清除定时器')
                clearInterval(id)
            },
            
        },
		mounted() {
            // console.log('setCaseId--------------------------')
            // console.log(this.$store.state)
            // console.log(this.$store.state.CaseInfo.caseId)
			
		},
         
	}
</script>

<style scoped>
    .title {
        padding-top: 10px;
        height: 50px;
        border-bottom: 1px solid rgba(197, 197, 197, 0.42);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title h1 {
        font-size: 24px;
        color: #222222;
    }

    .content table {
        width: 90%;
        background-color: #F3FFEA;
        margin: 54px auto auto auto;
        border: 1px solid #E3F1D8;
    }

    .content table th {
        height: 50px;
    }

    .content table td {
        height: 50px;
    }

    .message {
        width: 90%;
        margin: auto;
    }

    .payment, .order {
        margin-bottom: 30px;
    }

    .message h2 {
        font-size: 18px;
        line-height: 80px;
    }

    .message p {
        font-size: 14px;
        line-height: 30px;
    }
    .payButton{ 
        margin-left: 370px;
        margin-bottom: 10px;        
    }
    .weixin,.zhifub{
        width:315px;
        height:54px;
        line-height: 54px;
        background:rgba(234,234,234,1);
        border:1px solid rgba(222,222,222,1);
        border-radius:27px;
        position: relative;
        cursor:pointer;
    }
    .zhifub{
        margin-left: 42px;
    }
    .weixin{
        margin: 0 0 30px 42px;
    }
    .wxImg,.zfbImg{
        display: inline-block;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 15px;
        left: 26px;        
    }
    .wxImg{
        background-image: url(../../assets/images/payment_wechat.png);
    }
    .zfbImg{
        background-image: url(../../assets/images/payment_alipay.png);
    }
    .ml60{
        margin-left: 60px;
    }
    .payImg{
        width: 150px;
        height: 150px;
        /* margin-left: 90px; */
        margin:0 auto
    }
</style>
<style>
    .pay .el-dialog__header{
        text-align: center;    
    }
    .pay .el-dialog__header    .el-dialog__title{
        font-size:14px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);       
    }
    .pay .el-dialog{
        width: 450px;
        height: 300px;
        border: 7px solid rgba(222,222,222,1)
    }
</style>
