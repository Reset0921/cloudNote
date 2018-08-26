<template>
  <div>
    <head-usual title="回收站" to="/" :isRecycleIds="isRecycleIds"></head-usual>
    <!-- 展示列表 -->
    <div class="search-list">
      <div class="search-item" v-for="(item,index) in DataList" :key="index">
        <div class="img-box">
          <img v-if="item.PicOrText==2" src="http://img.yohao.xyz/note.png" />
          <img v-else :src="item.Cover" />
        </div>
        <div class="item-right">
          <p class="p-1">标题
            <span>{{item.Title}}</span>&nbsp;&nbsp;&nbsp;
            <span style="color:red;" @click="handleDeltrue(item.Id,index)">彻底删除</span>&nbsp;&nbsp;&nbsp;
            <span style="color:green" @click="handleRevoke(item.Id,index)">恢复</span>
          </p>
          <p class="p-2">标签：
            <span>{{item.Tags}}</span>
          </p>
          <p class="p-3">{{item.Info}}</p>
        </div>
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
  import {
    MessageBox,
    Toast
  } from 'mint-ui';

  import {
    GetRecyclebinList,
    HandleDel,
    RealDel
  } from '@/api/note';
  export default {
    data() {
      return {
        DataList: [],
        dataparam: {
          pageindex: 1,
          uid: 0,
        },
        delparam: {
          Id: 0,
          Ids: [],
        },
        totalpage: 0,
        loading: false, //是否显示加载中
        allLoaded: false, //加载完毕,
        isRecycleIds: [],
      }
    },
    mounted() {
      this.dataparam.uid = this.$store.state.userinfo.id;
      this.init();
    },
    methods: {
      // 文本框获得焦点
      handleChange() {
        this.flagEdit = true;
      },
      //删除
      handleDeltrue(id, index) {
        MessageBox.confirm('您确认彻底删除此项笔记?').then(action => {
          this.delparam.id = id;
          RealDel(this.delparam).then(res => {
            if (res.StatusCode == 200) {
              this.$toast("删除成功");
              setTimeout(res => {
                this.DataList.splice(index, 1);
              }, 1500);
            }
          });
        });
      },
      //恢复
      handleRevoke(id, index) {
        MessageBox.confirm('您确认恢复此项笔记?').then(action => {
          HandleDel(id).then(res => {
            if (res.StatusCode == 200) {
              this.$toast("恢复成功");
              setTimeout(res => {
                this.DataList.splice(index, 1);
              }, 1500);
            }
          });
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
          GetRecyclebinList(this.dataparam).then(res => {
            if (res.StatusCode === 200) {
              this.DataList = this.DataList.concat(res.Data);
            }
          });
          this.loading = false;
        }, 1000);
      },
      init() {
        this.$indicator.open();
        GetRecyclebinList(this.dataparam).then(res => {
          if (res.StatusCode === 200) {
            this.DataList = res.Data;
            this.DataList.forEach(element => {
              this.isRecycleIds.push(element.Id);
            });
            this.totalpage = res.TotalPage;
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
