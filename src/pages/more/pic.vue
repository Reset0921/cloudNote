<template>
  <div>
  <!-- 笔记内容 -->
  <head-usual title="图文列表" to="/"></head-usual>
  <div class="item" v-for="(item,index) in DataList" :key="index">
    <div class="img-box"  >
      <div class="img-outer" v-for="(itemUrl,idx) in item.Atlas" :key="idx">
        <img  :src="itemUrl" />
      </div>           
    </div>
    <div class="img-right">
        <p> <span class="span-1">标题</span>：{{item.Title}}</p>
        <p> <span class="span-2">标签</span>：{{item.Tags}}</p>
        <p> <span class="span-3">类型</span>：{{item.Type}}</p>
        <p> <span class="span-4">具体信息</span>：{{item.Info}}</p>
    </div>
    <div class="edit-group">
    
          <svg class="icon" aria-hidden="true" @click="goEdit(item.Id)">
                <use xlink:href="#icon-icon-"></use>
          </svg>
      <svg class="icon" aria-hidden="true"  @click="handleDelete(item.Id,index)">
            <use xlink:href="#icon-unie639"></use>
      </svg>
      <svg :class="item.IsCollect?'icon iscollect':'icon' " aria-hidden="true" @click="handleCollect(item.Id,index)">
            <use xlink:href="#icon-shoucang"></use>
      </svg>        
    </div>
  </div>
      <div v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </div>
      <div v-show="allLoaded" class="page-infinite-data">亲！别拉了我是有底线的</div>
    </div>
</template>

<script>
  import headUsual from '@/components/headUsual';
 import { MessageBox,Toast } from 'mint-ui';
  import {GetNotePageList,HandleDel,HandleCollect} from '@/api/note';
  export default {
    data() {
      return {
       DataList:[],
       dataparam:{
         pageindex:1,
         picortext:1,
         uid:0,
       },
       totalpage:0,
       loading: false, //是否显示加载中
      allLoaded: false, //加载完毕
      }
    },
    mounted() {
      this.dataparam.uid=this.$store.state.userinfo.id;
      this.init();
    },
    methods: {
      // 文本框获得焦点
      handleChange() {
        this.flagEdit = true;
      },
      handleDelete(id,index) {
        MessageBox.confirm('您确认删除此项笔记?').then(action => {
          HandleDel(id).then(res=>{
                if(res.StatusCode==200){
                    Toast("删除成功");
                    setTimeout(res=>{
                    this.DataList.splice(index,1);
                    },2000);
                }
          });
      });
    },
    goEdit(id){
      this.$router.push({name: 'imgEdit', 
                 params: { 
                    'id': id, 
                 }});
    },
      // 收藏
   handleCollect(id,index) {
        HandleCollect({id:id}).then(res=>{
          if(res.StatusCode==200){
            var iscollect=  this.DataList[index].IsCollect;
            console.log(iscollect);
            this.DataList[index].IsCollect=!iscollect;
            if(iscollect){
              Toast("取消收藏成功");
            } 
            else{
                Toast("收藏成功");
            }
          }
    });
  },
     loadMore() {
      //分页加载更多
        if (this.dataparam.pageindex >= this.totalpage) {
          this.allLoaded = true;
          return;
        }
        this.loading = true;
        setTimeout(() => {
          this.dataparam.pageindex++;
          GetNotePageList(this.dataparam).then(res => {
            if (res.StatusCode === 200) {
              this.DataList = this.DataList.concat(res.Data);
            }
          });
          this.loading = false;
        }, 1000);
    },
      init(){
          this.$indicator.open();
         GetNotePageList(this.dataparam).then(res=>{
          if(res.StatusCode===200){
            this.DataList=res.Data;
            console.log(res.Data);
            this.totalpage=res.TotalPage;
             this.$indicator.close();
          }
        });
      }
    },
    components: {
      headUsual
    }

  }

</script>

<style lang="scss" scoped>
 .iscollect{ color:#fd4f00 !important; }

  .item{
    padding: 10px;
    border-bottom: 10px solid #f4f4f4;
    .img-box{
      display: flex;
      flex-wrap: wrap;
        .img-outer{
            flex: 0 0 50%;
            display: flex;
            justify-content: center;
            margin-bottom: 10px; 
            img{
              width: 190px;
              height: 190px;
            }
        }
    }
    .img-right{
      p{
        color:#666;
        margin-bottom: 5px;
        span{
          padding: 2px 6px;
          color:#fff;
          font-size: 12px;
        }
        .span-1{
          background: #fd4f00;
        }
        .span-2{
          background: #3887fe;
        }
        .span-3{
          background: #666;
        }
        .span-4{
          background: #ff0000;
        }
      }
    }
    .edit-group{
      margin-top: 12px;
      .icon{
        padding: 6px;
        border-radius: 50%;
        border:1px solid #dcdcdc;
        font-size: 28px;
        color:#666;
        margin-right: 5px;
      }
    }
  }

</style>

