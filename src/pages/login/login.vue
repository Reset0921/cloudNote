<template>
  <!-- 登录页面 -->
  <div class="login-page">
      <!-- 头部 -->
      <head-usual :title="title" :to="to"></head-usual>
      <!-- logo部分 -->
      <div class="logo-box">
          <img src="~@/assets/camery.png"/>
      </div>
    <div id="tel" v-if="currentBox==0">
        <form>
            <p class="name-input">
                <input type="text"  v-model="phone" placeholder="请输入手机号" />
            </p>
            <el-button type="primary"  @click="handleNext('tel')">下一步</el-button>
        </form>
      </div>
        <div id="telCode" v-if="currentBox==1">
            <form>
                <p class="name-input">
                <input type="password" v-model="pwd" placeholder="请输入密码" />
                </p>
                <el-button type="primary" @click="handleNext('login')">登陆</el-button>
            </form>
      </div>
        <div id="code" v-if="currentBox==2">
                <form>
                    <p class="name-input">
                    <input type="text" v-model="code" placeholder="请输入验证码" />
                     <el-button @click="getCode(phoneData)" class="code-input"> 
                             <span v-show="phoneData.show">获取验证码</span>
                             <span v-show="!phoneData.show" >{{phoneData.count}} s</span>
                   </el-button>
                    </p>
                    <el-button type="primary" @click="handleNext('code')">下一步</el-button>
                </form>
        </div>
        <div id="register" v-if="currentBox==3">
            <form>
                <div class="name-input">
                <input type="password" v-model="pwd" placeholder="请输入密码 " />
                <input type="password" v-model="pwdOk" placeholder="请确认密码" />
                </div>
                <el-button type="primary" @click="handleNext('register')">注册</el-button>
            </form>
        </div>

  </div>
</template>

<script>
import headUsual from '@/components/headUsual'
import { Button } from 'mint-ui';
import {VerifyPhoneExisted,SendVCode,SmsVerify,Login,Register} from '@/api/auth';
import {setCookie,getCookie} from '@/utils/cookie';



export default {
    data(){
        return{
            title:'输入手机号',
            to:'/',
           
     phoneData: {
        code: "",
        show: true,
        count: "",
        timer: null
      },
            currentBox:0,
            phone:"",
            pwd:"",
            pwdOk:"",
            code:""
        }
    },
    methods:{
        handleback(){
            this.currentBox=0;
            this.phone="";
            this.pwd="";
            this.pwdOk="";
            this.code="";

        },
        handleNext(cmd){
           switch (cmd) {
               case 'tel':
                   {
                    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/; 
                    if (!myreg.test(this.phone)) { 
                        this.$toast("请输入正确的手机号"); 
                     return false;
                    }
                 VerifyPhoneExisted(this.phone).then(res=>{
                    if(res.StatusCode===200){
                        this.currentBox=2;//登陆
                        this.title="登录";
                    }else{
                        this.currentBox=1;//跳到验证码
                        this.title="手机验证码";
                    }
              });
            }break;
        case 'login':{
            if(this.pwd=="")
            {
              this.$toast("密码不能为空"); return false;
            }
            Login(this.phone,this.pwd).then(res=>{
                if(res.StatusCode===200){
                      this.$toast({
                            message: '登陆成功，正在跳转',
                            iconClass: 'icon icon-success'
                      });
                      setTimeout(() => {
                          this.$store.state.userinfo.id=res.Data.Id;
                          this.$store.state.userinfo.phone=res.Data.Mobile;
                            setCookie("xxx_loginyy_", this.$store.state.userinfo.id+"_"+this.$store.state.userinfo.phone,30);
                         this.$router.push('/');
                      }, 1500);
                }
                else{
                      this.$toast("密码错误")
                }
            });
      }break;
      case "code" :{
          if(this.code==""){
                this.$toast("验证码不能为空！！"); return false;
          }
          SmsVerify(this.phone,this.code).then(res=>{
              if(res.StatusCode===200){
                  this.pwd="";
                  this.currentBox=3;
                  this.title="注册";
              }
              else{
                    this.$toast("验证码错误！！");
              }
          });
      }break;
      case "register":{
          if(this.pwd==""){
                this.$toast("请先输入密码！！");
                return false;
          }
          if(this.pwd!=this.pwdOk){
                 this.$toast("两次密码不一致");
                return false;
          }
          Register(this.phone,this.pwdOk).then(res=>{
              if(res.StatusCode===200){
                   this.$toast("注册成功！！");
                    setTimeout(() => {
                          this.$store.state.userinfo.id=res.Data.Id;
                          this.$store.state.userinfo.phone=res.Data.Mobile;
                           setCookie("xxx_loginyy_", this.$store.state.userinfo.id+"_"+this.$store.state.userinfo.phone,30);
                         this.$router.push('/');
                      }, 1500);
              }
              else{
                    this.$toast("注册失败，请稍后再试！！");
              }
          });
      }break;
               default:
                   break;
           }
        }
       ,
     getCode(phoneData) {
        SendVCode(this.phone).then(res => {
          if (res.StatusCode === 200) {
            this.$toast("发送成功");
             if (!this.phoneData.timer) {
              this.phoneData.count = 60;
              this.phoneData.show = false;
              this.phoneData.timer = setInterval(() => {
                if (this.phoneData.count > 0 && this.phoneData.count <= 60) {
                  this.phoneData.count--;
                } else {
                  this.phoneData.show = true;
                  clearInterval(this.phoneData.timer);
                  this.phoneData.timer = null;
                }
              }, 1000);
            }
        
          }
       });
    },

    },
    components:{ headUsual }

}
</script>

<style lang="scss" scoped>
input{
    font-size: 16px;
}
// logo部分
.logo-box{
    width: 80px;
    height: 80px;
    margin:30px auto;
    img{
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
    }
}
form{
    padding: 15px 12px;
    .name-input{
        height: 30px;
        line-height: 30px;
        padding: 5px 0 5px 7px;
        border-bottom:1px solid #dcdcdc;
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        span{
            font-size: 16px;
            color:#282828;
            margin-right: 8px;
        }
    }
    .psw-input{
         height: 30px;
        line-height: 30px;
        border-bottom:1px solid #dcdcdc;
        display: flex;
        align-items: center;
        margin-bottom: 50px;
         span{
            font-size: 16px;
            color:#282828;
             margin-right: 8px;
        }
    }
    .el-button{
        width: 380px;
        height: 50px;
        border-radius: 25px;
        margin: 10px auto;
        display: block;
    }
}
#code{
    input{
        width: 220%;
        font-size: 16px;
    }
    .code-input::before{
        content:"";
        width: 2px;
        height: 16px;
        background: #999;
        position: absolute;
        left: 0;
        top:50%;
        margin-top: -8px;
    }
    .code-input{
        position: relative;
        border:none;
        border-radius: 0;
        span{
            color:#666;
        }
       
    }
}
#register{
    .name-input{
        display: flex;
        flex-direction: column;
        border-bottom: none;
        height:80px;
        input{
            width: 100%;
            border-bottom: 1px solid #dcdcdc;
            padding-bottom: 5px;
            margin-bottom: 20px;
        }
        .el-button{
            margin-top: 10px;
        }
        
    }
}
</style>
