<template>

  <div class="img-edit">
    <mt-popup v-model="popupVisible" position="top" :name="popname" popup-transition="popup-fade">
      ...
    </mt-popup>
    <!-- 头部 -->
    <head-usual :to="to"></head-usual>
    <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
      <!-- 图片集 -->
      <div class="pic-load">
        <el-form-item label="添加图片">
          <el-upload action="http://api.yohao.xyz/api/upLoad/upLoadFile" list-type="picture-card" :on-preview="handlePictureCardPreview"
            :on-success="handlePictureSuccess" :file-list="fileList" :before-upload="beforeCoverUpload" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </div>
      <el-form-item label="输入标题" prop="Title">
        <el-input v-model="formData.Title"></el-input>
      </el-form-item>
      <el-form-item label="笔记类型">
        <el-select v-model="formData.Type" placeholder="请选择">
          <el-option v-for="item in this.$store.state.filter_Type" :key="item.Id" :label="item.Name" :value="item.Id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="输入标签" prop="Tags">
        <el-input v-model="formData.Tags"></el-input>
      </el-form-item>
      <el-form-item label="其他备注" prop="Info">
        <el-input type="textarea" v-model="formData.Info" rows="5"></el-input>
      </el-form-item>
      <div class="line">

      </div>
      <div class="button-group">
        <el-button class="exit" @click="handleCancle">取消</el-button>
        <el-button class="ok" @click="submitForm('formData')">保存并上传</el-button>
      </div>
    </el-form>

  </div>
</template>
<script>
  import {
    ModifyOrAdd,
    Toast,
    GetModifyData
  } from "@/api/note";

  import headUsual from '@/components/headUsual';
  export default {
    data() {
      return {
        fileList: [],
        popupVisible: false,
        popname: '操作成功',
        formData: {
          Id: 0,
          Uid: 0,
          Title: "",
          Type: "",
          Atlas: [],
          PicOrText: 1,
          Info: "",
          Tags: "",
        },
        dialogImageUrl: '',
        dialogVisible: false,
        to: '/',
        value: "",
        rules: {
          Tags: [{
            required: true,
            message: '请输入标签',
            trigger: 'blur'
          }, ],
          Info: [{
            required: true,
            message: '请输入备注信息',
            trigger: 'blur'
          }],
          Title: [{
            required: true,
            message: '请输入备注信息',
            trigger: 'blur'
          }],
        }
      }
    },
    created() {
      this.formData.Uid = this.$store.state.userinfo.id;
      let routerParams = this.$route.params;
      if (routerParams.id) {
        GetModifyData(routerParams.id).then(res => {
          if (res.StatusCode == 200) {
            this.formData.id = res.Data.Id;
            this.formData.Title = res.Data.Title;
            this.formData.Type = res.Data.Type;
            this.fileList = res.Data.Atlas;
            this.formData.Info = res.Data.Info;
            this.formData.Tags = res.Data.Tags;
          }
        });
      }


    },
    methods: {
      handleCancle() {
        this.$router.push('/');
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //验证成功提交数据
            this.fileList.forEach((item, index) => {
              this.formData.Atlas = this.formData.Atlas.concat(item.url)
            });
            ModifyOrAdd(this.formData).then(res => {
              if (res.StatusCode === 200) {
                this.$toast("操作成功！");
                this.resetForm(formName);
                this.$router.push('/');
              } else {
                this.$toast("新增失败")
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      resetForm(formName) { //重置
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        this.fileList = filelist;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      beforeCoverUpload(file) { //上传验证
        let isImage = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type ===
          'image/gif';
        if (!isImage) {
          this.$toast('图片类型必须是.gif,jpeg,jpg,png中的一种');
          return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 4;
        if (!isLt2M) {
          this.$toast('上传图片大小不能超过 2MB!');
        }
        if (this.fileList.length == 11) {
          this.$toast('上传图片数量不能超过10张');
          return false;
        }
      },
      handlePictureSuccess(res, file, filelist) { //图片集
        file.url = res.Data; //将文件列表的url替换掉
        this.fileList = filelist;
      },
    },
    components: {
      headUsual
    }

  }

</script>

<style lang="scss" scoped>
  .el-form {
    padding: 15px;
    .pic-load {
      margin-bottom: 5px;
    }
    .line {
      height: 0px;
      border: 1px dashed #eee;
      margin-top: 60px;
    }
    .button-group {
      margin-top: 100px;
      display: flex;
      justify-content: center;
      .el-button {
        width: 140px;
        height: 50px;
        border-radius: 25px;
      }
      .exit {}
      .ok {
        background: #fd4f00;
        color: #fff;
      }
    }
  }

</style>
