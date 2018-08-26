<template>
  <!-- 个人中心 -->
  <div class="user-area">
      <head-usual :title="title"></head-usual>
     <!-- 个人中心头部 -->
     <div class="user-hd">
         <dl>
             <dt>
                 <img src="~@/assets/person.jpg"/>
             </dt>
             <dd>
                 <p class="dd-name">Reset</p>
                 <p class="info-edit">修改个人资料信息</p>
             </dd>
         </dl>
     </div>
     <!-- 个人中心主体部分 -->
     <div class="user-main">
         <div class="main-item">
             <p>
                <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-shijian"></use>
                </svg>
                <span>我的文件</span>
             </p> 
                <svg class="icon" aria-hidden="true"  >
                    <use xlink:href="#icon-you"></use>
                </svg>
         </div>
          <div class="main-item">
             <p>
                <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-shijian"></use>
                </svg>
                <router-link to="/user/recycle">回收站</router-link>
             </p> 
                <svg class="icon" aria-hidden="true"  >
                    <use xlink:href="#icon-you"></use>
                </svg>
         </div>
          <div class="main-item">
             <p>
                <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-shijian"></use>
                </svg>
                <span>文件关联</span>
             </p> 
                <svg class="icon" aria-hidden="true"  >
                    <use xlink:href="#icon-you"></use>
                </svg>
         </div>
          <div class="main-item">
             <p>
                <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-shijian"></use>
                </svg>
                <span>有道云协作</span>
             </p> 
                <svg class="icon" aria-hidden="true"  >
                    <use xlink:href="#icon-you"></use>
                </svg>
         </div>
          <div class="main-item">
             <p>
                <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-shijian"></use>
                </svg>
                <span>消息中心</span>
             </p> 
                <svg class="icon" aria-hidden="true"  >
                    <use xlink:href="#icon-you"></use>
                </svg>
         </div>
          <div class="main-item">
             <p>
                <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-shijian"></use>
                </svg>
                <span>用户满意度调查</span>
             </p> 
                <svg class="icon" aria-hidden="true"  >
                    <use xlink:href="#icon-you"></use>
                </svg>
         </div>
          <div class="main-item">
             <p>
                <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-shijian"></use>
                </svg>
                <span>有道云毕节用户调研</span>
             </p> 
                <svg class="icon" aria-hidden="true"  >
                    <use xlink:href="#icon-you"></use>
                </svg>
         </div>
     </div>
     <!-- 切换账户及退出登录 -->
     <mt-button type="default" @click="turnLogin">切换账户</mt-button>
     <mt-button type="default">退出登录</mt-button>
  </div>
</template>

<script>
import headUsual from '@/components/headUsual'
import {delCookie} from '@/utils/cookie';''
export default {
    data(){
        return{
            title:'个人中心',
        }
    },
    created(){
        console.log(this.$store.state.count)
    },
    methods:{
        turnLogin(){
 //xxx_loginyy_
            delCookie("xxx_loginyy_");
              this.$store.state.userinfo.id=0;
            this.$store.state.userinfo.Phone="";
            this.$router.push('/login');
        }
    },
    components: { headUsual}
}
</script>

<style lang="scss" scoped>
    .user-hd{
        padding: 12px 32px;
        dl{
            overflow: hidden;
            dt{
                width: 70px;
                height: 70px;
                float: left;
                border-radius: 50%;
                img{
                    max-width: 100%;
                    max-height: 100%;
                    vertical-align: middle;
                     border-radius: 50%;
                }
            }
            dd{
                float: left;
                margin-left:20px;
                .dd-name{
                    font-size: 16px;
                    color:#282828;
                    margin-top: 5px;
                }
                .info-edit{
                    font-size: 14px;
                    margin-top: 10px;
                    color:#666666;
                }

            }
        }
    }
    // 个人中心主体部分
    .user-main{
        padding: 10px 15px;
        .main-item{
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid #dcdcdc;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            p{
                display: flex;
                align-items: center;
                .icon{
                    margin-right: 15px;
                }
                span{
                    font-size: 16px;
                }
            }
        }
    }
    .mint-button{
        width: 380px;
        height: 50px;
        border-radius: 25px;
        margin: 10px auto;
        display: block;
    }

</style>
