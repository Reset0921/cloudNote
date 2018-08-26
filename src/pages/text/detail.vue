<template>
  <!-- 笔记内容 -->
  <div class="text-detail">
       <!-- 一般头部 -->
<head-usual :to="to" :id="noteData.Id" :iscollect="noteData.IsCollect" :title="title"></head-usual>

       <div class="tophead">
           <router-link :to="{
                name: 'text', 
                    params: { 
                'id': noteData.Id, 
                'cmd': 'week'
             }
           }" class="lb">
               查看这一周的笔记
           </router-link>
         <router-link :to="{
                name: 'text', 
                params: { 
                'id': noteData.Id, 
                'cmd': 'tag'
             }
           }" class="lb">

               查看这一科目的笔记
           </router-link>
       </div>
       <div>
            <!-- <input class="detail-title" v-model="noteData.Title" @focus="handleChange"/> -->
            <p>标题：{{noteData.Title}}</p>
              <p>类型：{{noteData.Type}}</p>
            <p>类型：{{noteData.Tags}}</p>
            <p>内容：{{noteData.Info}}</p>
             <p>时间：{{noteData.AddTime}}</p>
            <!-- <textarea class="text-html" v-model="noteData.Info" @focus="handleChange"></textarea> -->
          
            <!-- <div class="button-group" v-show="flagEdit">
                <el-button class="exit">取消</el-button>
                <el-button class="ok">保存并上传</el-button>

            </div> -->
       </div>
     
  </div>
</template>

<script>
import headUsual from '@/components/headUsual'
import {GetModifyData} from '@/api/note';
export default {
    data(){
        return{
            msg:[],
            id:0,
            title:"笔记详情",
            to:'/',
            flagEdit:false,
            noteData:"",
        }
    },
    mounted(){
        this.id=parseInt(this.$route.params.id);
        GetModifyData(this.id).then(res=>{
                if(res.StatusCode===200){
                    this.noteData=res.Data;
                }
        });
    },
    methods:{
        // 文本框获得焦点
        handleChange(){
           this.flagEdit=true;

        },
     
    },
    components:{headUsual}

}
</script>

<style lang="scss" scoped>


.detail-title{
    padding-left:12px;
    font-size: 18px;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #dcdcdc;
    color:#282828;
    width: 100%;
   
}
 .tophead{ padding: 6px 3px; text-align:center; 
margin-bottom: 20px;
border-bottom: solid gray 1px;
            .lb{
                font-size: 18px;
                color:orange;
            }
 }

.text-html{
    width: 100%;
    padding: 12px 12px;
    color: #666666;
    font-size:14px;
    line-height: 1.5;
    height: 400px;
}
 .button-group{
         width: 100%;
        display: flex;
        justify-content: center;
        position: fixed;
        bottom: 50px;
        display: flex;
        justify-content: center;
        .el-button{
            width: 140px;
            height: 50px;
            border-radius: 25px;
        }
        .exit{
           
        }
        .ok{
            background: #fd4f00;
            color:#fff;
        }
    }

</style>
