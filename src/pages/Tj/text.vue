<template>
  <!-- 文件夹 -->
  <div class="loader-total">
    <h4 style="text-align: center;padding: 10px ">推荐</h4>

    <!-- <mt-search v-model="keyword" cancel-text="取消" @keyup.native.enter="handleSearch" placeholder="搜索">
    </mt-search> -->
    <!-- <el-button @click="handleSearch">搜索</el-button> -->

    <!-- 展示列表 -->
    <div class="search-list">
      <div class="search-item" v-for="(item,index) in ListData" :key="index">
        <div class="img-box">
          <img v-if="item.PicOrText==2" src="http://img.yohao.xyz/note.png" />
          <img v-else :src="item.Cover" />
        </div>
        <div class="item-right">
          <p class="p-1">标题
            <span>{{item.Title}}</span>
          </p>
          <p class="p-2">标签：
            <span>{{item.Tags}}</span>
          </p>
          <p class="p-3">{{item.Info}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import headUsual from '@/components/headUsual';
  import {
    GetCommandList
  } from '@/api/note';
  export default {
    data() {
      return {
        title: '推荐',
        value: "",
        keyword: "",
        ListData: [],
        uid: 0,
      }
    },
    created() {
      this.uid = this.$store.state.userinfo.id;
      //  let routerParams = this.$route.query;
      let routerParams = this.$route.params;

      // Console.log("xxx");

      var data = {
        id: routerParams.id,
        cmd: routerParams.cmd,
        uid: this.uid
      };
      GetCommandList(data).then(res => {
        if (res.StatusCode === 200) {
          this.ListData = res.Data;
        }
      });

    },
    methods: {
      // 取到路由带过来的参数 
      // let routerParams = this.$route.params.dataobj
    }

  }

</script>

<style lang="scss" scoped>
  .mint-search {
    position: fixed;
    width: 100%;
    left: 0;

  }

  .search-list {
    margin-top: 44px;
    padding-bottom: 50px;
    .search-item {
      padding: 10px;
      border-bottom: 10px solid #f4f4f4;
      display: flex;
      justify-content: space-between;
      .img-box {
        width: 80px;
        height: 80px;
        img {
          max-width: 100%;
          max-height: 100%;
          vertical-align: middle;
        }
      }
      .item-right {
        width: 340px;
        color: #666;
        p {
          margin-bottom: 5px;
        }
        .p-1 {
          font-size: 14px;
          span {
            color: #999;
          }
        }
        .p-2 {
          font-size: 13px;
          span {
            margin-right: 10px;
          }
        }
        .p-3 {
          font-size: 12px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }

</style>
