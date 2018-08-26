<template>
  <div class="index">
    <mt-tabbar v-model="selected">
        <mt-tab-item id="1">
          <img slot="icon" src="~@/assets/sy_02.png" v-show="selected!=='1'">
          <img slot="icon" src="~@/assets/sy_01.png" v-show="selected=='1'">
          最新
        </mt-tab-item>
        <mt-tab-item id="2">
         <img slot="icon" src="~@/assets/xm_02.png"  v-show="selected!=='2'">
         <img slot="icon" src="~@/assets/xm_01.png"  v-show="selected=='2'">
          搜索
        </mt-tab-item>
        <mt-tab-item :id="old" class="add-area">
          <div class="add-button"  @click="uploadPhoto">
              +
          </div>
         
        </mt-tab-item>
        <mt-tab-item id="3">
         <img slot="icon" src="~@/assets/zgz_02.png" v-show="selected!=='3'">
         <img slot="icon" src="~@/assets/zgz_01.png" v-show="selected=='3'">
          收藏
        </mt-tab-item>
         <mt-tab-item id="4">
         <img slot="icon" src="~@/assets/wd_02.png" v-show="selected!=='4'">
         <img slot="icon" src="~@/assets/wd_01.png" v-show="selected=='4'">
          我的
        </mt-tab-item>
    </mt-tabbar>
    <!-- 上方显示内容 -->
    <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <!-- 头部搜索框 -->
         <head-usual :title="title1"></head-usual>
          <p class="note-title title1">
            <span>最近新建的笔记</span>
              <router-link to="/all/text">
              &nbsp;更多
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-guanbi"></use>
              </svg>
            </router-link>
          </p>
          <ul class="note-list">
            <router-link v-for="(item,index) in ListData.TextList" :key="index" :to="'/text/detail/'+item.Id">
              {{item.Title}}
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-icon-"></use>
              </svg>
            </router-link>
          </ul> 

           <p class="note-title title2">
             <span>近期上传的图片</span>
             <router-link to="/all/pic">
             &nbsp;更多
             <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-guanbi"></use>
              </svg>
            </router-link>
            </p>
          <div class="upload-txt">
            <div class="upload-item" v-for="(item,index) in ListData.PicList" :key="index">
              <dl>
                  <dt>
                    <img :src="item.Cover" class="img-special"/>
                  </dt>
                  <dd>
                    <p class="extra">标签：<span>{{item.Tags}}</span></p>
                    <p class="extra">类型：<span>{{item.Type}}</span></p>
                    <p class="detail">{{item.Info}}</p>
                    <p class="time">{{item.AddTime}}</p>
                  </dd>
              </dl>
            </div>
          </div>
          <!-- 上传文件按钮 -->
          <!-- <mt-button type="primary" class="upload-button">上传你的学习文件</mt-button>    -->
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <!-- 文件夹 -->
         <loader-area></loader-area>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <!-- 收藏页面 -->
          <collect-area></collect-area>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <!-- 个人中心 -->
        <user-area></user-area>
        </mt-tab-container-item>
  </mt-tab-container>
  
  <!-- 拍照或上传文件按钮 -->
  <div id="container">
            <mt-actionsheet :actions="actions" v-model="sheetVisible">
            </mt-actionsheet>
  </div>    
  </div>
</template>
<script>
import headUsual from '@/components/headUsual' 
import userArea from '@/pages/user/index'
import loaderArea from '@/pages/search/index'
import collectArea from '@/pages/collect/index'
import { Tabbar, TabItem ,Button,Actionsheet} from 'mint-ui';
import { Search } from 'mint-ui';
import mockdata from "@/mock";
import {GetNoteNewList} from  "@/api/note";
export default {
  data(){
    var that=this;
    return{
      selected:'1',
      footerShow:true,
      id:'1',
      old:'1',
      title1:'最新',
      textData:[], //笔记列表数据
      ListData:{
        TextList:[],
        PicList:[],
      },
      popupNote:false, //新建笔记弹窗
      text:'',
      oldtext:'',
      src1:'',
      list:[
          '~@/assets/gonglue01.jpg',
          '~@/assets/gonglue02.jpg',
          '~@/assets/help1.jpg'
      ],
      value:'',
      sheetVisible:false, //上传图片按钮弹窗
      actions:[
        {
          name:'新建笔记',
          method() {
            that.$router.push('/textEdit')
          }
        },
        {
          name:'上传图片',
          method(){
          that.$router.push('/imgEdit');      
          }
        },

      ]
    }
  },
  created(){
    this.flagEdit=false;
      if(this.$store.state.userinfo.id==0){
        this.$router.push('/login');
     }
  GetNoteNewList(this.$store.state.userinfo.id).then(res=>{
      if(res.StatusCode===200){
        this.ListData.TextList=res.Data.TextList;
         this.ListData.PicList=res.Data.PicList;
      }
  });
  },
  methods:{
    uploadPhoto(){
      this.sheetVisible=!this.sheetVisible;
    },
    // 隐藏文本编辑框，回到首页
    noteHide(){
      this.popupNote=false;
    },
    // 清空文本输入框
    handleClean(){
      console.log(1);
      this.text="";
    },
    //撤销输入
     handleCancel(){
       this.text=this.oldtext;
      
    },
    // 图片上传模块
    upload1(){
      var that=this;
       var file = $(".inputfiles1")[0].files[0];
        var reader = new FileReader();
        var imgFile;
        reader.onload = function(e) {
          imgFile = e.target.result;
          that.src1=imgFile;
          
        };
        reader.readAsDataURL(file);
        
      
    },
    
  },
  mounted(){
    this.textData=mockdata.data.text;
    this.src1='~@/assets/gonglue01.jpg';

  },
  watch:{
    selected(val,oldVal){
      this.old=val;
    },
    text(val,oldVal){
      this.oldtext=oldVal;
    }
  },
  components: { headUsual ,userArea, loaderArea, collectArea}
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// 上传图片按钮
.upload-button{
  display: block;
  margin:50px auto;
}
.note-title{
  padding:0 12px;
  height: 30px;
  line-height: 30px;
  color:#282828;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  justify-content: space-between;
  .icon{
    color:#999;
  }
  span{
    font-size: 16px;
  }
  a{
    color:#999;
    font-size: 14px;
  }
}
.note-list{
  padding: 12px 12px 0px 12px;
  border-bottom: 10px solid #f4f4f4;
  a{
    display: block;
    height: 28px;
    line-height: 28px;
    font-size: 16px;
    border-bottom: 1px solid #eeeeee;
    color:#333333;
  }
}
.mint-search{
  width: 100%;
  position: fixed;
  top:0;
  left:0;
}
// .title1{
//   margin-top: 44px;
// }
.mint-tabbar{
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #ffffff;
  border-top: 1px solid #f4f4f4;
}
.mint-tab-item-label{
  position: relative;
}
// 添加按钮
.add-button{
  width: 45px;
  height: 45px;
  background: #3887fe;
  border-radius: 50%;
  font-size: 20px;
  color:#ffffff;
  line-height: 45px;
  vertical-align: middle;
  // margin: 12px auto;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -22.5px;
  margin-top: -22.5px;
}
.mint-tabbar > .mint-tab-item.is-selected {
    background-color: #ffffff;
    color: #26a2ff;
}  
// 上传图片合集
.upload-txt{
  margin-bottom: 55px;
  // background: #dcdcdc;
  .upload-item{
    border-bottom: 10px solid #f4f4f4;
    padding: 5px 12px;
    // background: #ffffff;
    dl{
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      dt{
        width:30%;
        height: 100px;
        display: flex;
        align-items: center;
        img{
          width: 100%;
          height: 100%;
          vertical-align: middle;
        }
      }
      dd{
        margin-left: 5px;
        width: 68%;
          .time{
            font-size: 12px;
            color:#999999;
          }
          .extra{
            font-size: 12px;
            color:#666666;
          }
          .detail{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          p{
            color:#666;
            margin-bottom: 5px;
            span{
              color:#999;
            }
          }
      }
    }

  }
}

.inputfiles1{
  display: none;
}
</style>
