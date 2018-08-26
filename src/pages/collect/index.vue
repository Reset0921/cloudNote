<template>
  <!-- 收藏页面 -->
  <div class="collect-page">
      <head-usual :title="title"></head-usual>
      <!-- 一周热门收藏 -->
       <div class="search-list">
          <div class="search-item" v-for="(item,index) in DataList" :key="index">
            <div class="img-box">
                  <img style="width: 100%;height: 100px;" v-if="item.PicOrText==2"  src="http://img.yohao.xyz/note.png"/>
                <img style="width: 100%;height: 100px;" v-else :src="item.Cover"/>
            </div>
            <div class="item-right">
                <p class="p-1">标题：<span>{{item.Title}}</span></p>
                <p class="p-2">标签：<span>{{item.Tags}}</span></p>
                <p class="p-3">内容：{{item.Info}}</p>
                 <svg :class="item.IsCollect?'icon iscollect':'icon' " aria-hidden="true" @click="handleCollect(item.Id,index)">
            <use xlink:href="#icon-shoucang"></use>
      </svg>   
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import headUsual from '@/components/headUsual';
import {GetCollectList,HandleCollect} from '@/api/note';

export default {
    data(){
        return{
            title:'收藏',
            DataList:[],
            ListData:[],
        }
    },
    created(){
        GetCollectList(this.$store.state.userinfo.id).then(res=>{
            if(res.StatusCode===200){
                this.DataList=res.Data;
            }
        });
    },
    methods:{
        handleCollect(id,index) {
            HandleCollect({id:id}).then(res=>{
            if(res.StatusCode==200){
                var iscollect=  this.DataList[index].IsCollect;
                console.log(iscollect);
                this.DataList[index].IsCollect=!iscollect;
                if(iscollect){
                this.$toast("取消收藏成功");
                setTimeout(res=>{
                    this.DataList.splice(index,1); 
                },2000);
                } 
                else{
                    this.$toast("收藏成功");
                }
            }
        });
    },
    },
    components:{ headUsual }

}
</script>

<style lang="scss" scoped>
 .iscollect{ color:#fd4f00 !important; }

.search-list{
     padding-bottom: 50px;
    .search-item{
        padding: 10px;
        border-bottom: 10px solid #f4f4f4;
        display: flex;
        justify-content: space-between;
        .img-box{
            width: 80px;
            height: 80px; 
             margin-right:5px;
            img{
                max-width: 100%;
                max-height: 100%;
                vertical-align: middle;
            }
           
        }
        .item-right{
            width: 340px;
            color:#666;
            p{
                margin-bottom: 5px;
            }
            .p-1{
                font-size: 14px;
                span{
                    color:#999;
                }
            }
            .p-2{
                font-size: 13px;
                span{
                    margin-right: 10px;
                }
            }
            .p-3{
                font-size: 12px;
                color:#999;
                overflow:hidden;
                text-overflow:ellipsis; 
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }
    }
}

</style>
