<template>
  <!-- 新建笔记页面 -->
  <div class="noteEdit">
      <head-usual :to="to" :title="title"></head-usual>
     <!-- 编辑笔记区域 -->
     <el-form label-width="80px" ref="formData"  :model="formData" :rules="rules">
        <el-form-item label="标题" prop="Title">
            <el-input  type="text"  v-model="formData.Title" placeholder="请输入标题"></el-input>
        </el-form-item>
          <el-form-item label="笔记类型" prop="Type">
            <el-select v-model="formData.Type" placeholder="请选择">
                <el-option
                v-for="item in this.$store.state.filter_Type"
                :key="item.Id"
                :label="item.Name"
                :value="item.Id">
                </el-option>
            </el-select>
         </el-form-item>
        <el-form-item label="输入标签" prop="Tags">
            <el-input v-model="formData.Tags"></el-input>
        </el-form-item>
          <el-form-item label="笔记" prop="Info">
           <el-input type="textarea" style="min-height:100px" v-model="formData.Info"></el-input>
        </el-form-item>
         <div class="button-group">
          <el-button class="exit" @click="handleCancle">取消</el-button>
          <el-button class="ok"  @click="submitForm('formData')">保存并上传</el-button>
      </div>  
     </el-form >
  </div>
</template>

<script>
import headUsual from '@/components/headUsual';
import {ModifyOrAdd,GetModifyData} from  "@/api/note";
export default {
    data(){
        return{
            to:'/',
            title:'文本详情',
            text:'',
            formData:{
                Id:0,
                Title:"",
                Type:"",
               
                Uid:0,
                PicOrText:2,
                Info:"",
                Tags:"",
            },
            rules:{
            Tags: [
              {  required: true, message: '请输入标签', trigger: 'blur' },
            ],
            Info:[
                {required: true, message: '请输入备注信息', trigger: 'blur'}
             ],
             Title:[
                {required: true, message: '请输入标题', trigger: 'blur'}
             ],
              Type:[
                {required: true, message: '请选择类型', trigger: 'change'}
             ],
             
            },
        }
    },
    created(){
        this.formData.Uid=this.$store.state.userinfo.id;
         let routerParams = this.$route.params;
        if(routerParams.id){
            GetModifyData(routerParams.id).then(res=>{
            if(res.StatusCode==200){
                this.formData.id=res.Data.Id;
                this.formData.Title=res.Data.Title;
                this.formData.Type=res.Data.Type;
                this.formData.Info=res.Data.Info;
                this.formData.Tags=res.Data.Tags;
              }
            });
            }
    },
    methods:{
        handleCancle(){
              this.$router.push('/');
        },
        resetForm(formName) {//重置
        this.$refs[formName].resetFields();
      },
       submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    ModifyOrAdd(this.formData).then(res=>{
                    if(res.StatusCode===200){
                        this.$toast("操作成功！");
                            this.resetForm(formName);
                             this.$router.push('/');
                    }
                    else{
                        this.$toast("新增失败")
                    }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    components:{
        headUsual
    }
}
</script>

<style lang="scss" scoped>
.el-form{
    padding: 15px;
    .line{
        height: 0px;
        border:1px dashed #eee;
        margin-top: 60px;
    }
    .input{
        height: 35px;
    line-height: 34px;
    }
    .button-group{
        margin-top:100px;
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
}

// 新建笔记编辑页面
.noteEdit{
  width: 100%;
  height: 100%;
 
  .edit-input{
     padding: 10px 12px;
     width: 100%;
     display: block;
  }
  .edit-textarea{
    padding: 10px 12px;
    width: 100%;
    height: 100%;
    line-height: 1.6;
    resize: none;
    border: none;
    outline: none;
  }
   .button-group{
        width: 100%;
        display: flex;
        justify-content: center;
        position: fixed;
        bottom: 50px;
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
}

</style>
