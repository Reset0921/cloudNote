<template>
  <!-- 一般头部 -->
  <div class="headUsual">
    <mt-header :title="title" fixed>
      <router-link :to="to" slot="left" v-if="flag">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" class="headusual-2">
        <p class="hd-right" v-if="flagEdit" @click="handleCollect">
          <span>
            <svg class="icon icon-list" aria-hidden="true" v-if="iscollect">
              <use xlink:href="#icon-shoucang"></use>
            </svg>
            <svg class="icon icon-list" aria-hidden="true" style="color:#fd4f00" v-if="!iscollect">
              <use xlink:href="#icon-shoucang"></use>
            </svg>
          </span>
          <span v-if="iscollect">收藏</span>
          <span style="color:#fd4f00" v-if="!iscollect">收藏</span>
        </p>
        <p class="hd-right" v-if="isRecycle" @click="handleEmpty">
          <span>
            <svg class="icon icon-list" aria-hidden="true">
              <use xlink:href="#icon-unie639"></use>
            </svg>
          </span>
          <span>清空</span>
        </p>

      </mt-button>
    </mt-header>

  </div>
</template>
<script>
  import {
    Header,
    Popup,
    MessageBox,
    Toast
  } from "mint-ui";
  import {
    HandleCollect,
    RealDel
  } from '@/api/note';
  export default {
    data() {
      return {
        flag: true,
        flagEdit: true, //编辑框头部区域
        collectActive: true,
        isRecycle: false,
      };
    },
    props: {
      title: String,
      to: String,
      id: Number,
      iscollect: Boolean,
      isRecycleIds: Array,
    },
    methods: {
      handleCollect() {
        HandleCollect({
          id: this.id
        }).then(res => {
          if (res.StatusCode == 200) {
            this.iscollect = !this.iscollect;
            if (this.iscollect) {
              Toast("取消收藏成功");
            } else {
              Toast("收藏成功");
            }

          }
        });
      },
      handleEmpty() {
        MessageBox.confirm("您确定要清空回收站？").then(action => {
          var data = {
            id: 0,
            ids: this.isRecycleIds
          };
          RealDel(data).then(res => {
            if (res.StatusCode == 200) {
              {
                this.$toast("清空成功！");
                setTimeout(xxx => {
                  this.$router.push('/user/recycle');
                }, 1500);
              }
            }
          });
        });
      },
    },
    created() {

      if (this.title == "最新" | this.title == "个人中心" | this.title == "查找笔记" | this.title == "收藏") {
        this.flag = false;
        this.flagEdit = false;

        return;
      }
      if (this.title == "图文笔记" | this.title == "文本详情" | this.title == "输入手机号" | this.title == "登录" | this.title ==
        "图文列表" | this.title == "文本列表" || this.title == "回收站") {
        if (this.title == "回收站") {
          this.isRecycle = true;
        }
        this.flagEdit = false;
        return;
      }




    }
  };

</script>

<style lang="scss" scoped>
  .headUsual {
    width: 100%;
    height: 52px;

  }

  .mint-header {
    background: white;
    color: #282828;
    font-size: 18px;
    height: 52px;
    border-bottom: 2px solid #f4f4f4;
    position: fixed;
    top: 0;
    left: 0;
    .headusual-2 {
      width: 100px;
      text-align: right;
      .icon {
        display: block;
        float: left;
      }
      .icon-list {
        margin-left: 30.67px;
        height: 30px;
      }
      .icon-fenlei {
        height: 30px;
        margin-left: 25px;
        font-size: 22px;

      }
      .hd-right {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 5px;
        }
      }
    }
  }

</style>
