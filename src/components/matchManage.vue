<style scoped>
.demo-infinite-container{
  width: 100%;
  height: 80%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid #d9d9d9;
}

.appBar {
    position: fixed;
    width: 100%;
    top: 0;
    text-align: center;
}

.title{
  font-size: 18px;
  font-weight: bold;
  float: left;
  display: inline-block;
  margin-left: 20px;
}

.createTime{
  font-size: 14px;
  font-weight: bold;
  float: right;
  display: inline-block;
  margin-right: 20px;
}
</style>

<template>
<div class="demo-infinite-container">
  <mu-appbar class="appBar" title="搭配管理">
      <mu-icon-button icon="" slot="left"/>
      <mu-icon-button icon="" slot="right"/>
  </mu-appbar>
  <mu-list>
    <template v-for="item in list">
      <mu-list-item @click="openBottomSheet">
        <div class="title">{{item.name}}</div>
        <div class="createTime">{{item.createTime}}</div>
      </mu-list-item>
      <mu-divider/>
    </template>
  </mu-list>
  <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  <div style="width:100%,height:60px">

  </div>
  <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
    <mu-list @itemClick="closeBottomSheet" style="text-align:center">
      <mu-list-item title="预览" @click="reviewMatch"/>
      <mu-list-item title="详情" @click="detailMatch"/>
      <mu-list-item title="删除" @click="deleteMatch"/>
    </mu-list>
  </mu-bottom-sheet>
</div>
</template>

<script>

import util from '../libs/util';
/*eslint-disable*/
export default {
  data () {
    const list = []
    for (let i = 0; i < 15; i++) {
      list.push({'name':'轻商务套装','createTime':'2018-01-13'})
    }
    return {
      list,
      num: 10,
      loading: false,
      scroller: null,
      bottomSheet: false
    }
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    loadMore () {
      this.loading = true
      setTimeout(() => {
        for (let i = this.num; i < this.num + 10; i++) {
          this.list.push({'name':'轻商务套装','createTime':'2018-01-13'})
        }
        this.num += 10
        this.loading = false
      }, 2000)
    },
    deleteMatch () {

    },
    reviewMatch () {
      this.$router.push('/matchManage');
    },
    detailMatch () {
      this.$router.push('/matchManage');
    },
    closeBottomSheet () {
      this.bottomSheet = false
    },
    openBottomSheet () {
      this.bottomSheet = true
    }
  }
}
</script>
