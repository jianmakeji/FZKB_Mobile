<style scoped>
.demo-infinite-container{
  width: 100%;
  height: 80%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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
  <mu-list style="margin-top:50px">
    <template v-for="match in list">
      <mu-list-item @click="openBottomSheet(match.id)">
        <div class="title">{{match.name}}</div>
        <div class="createTime">{{match.createTime}}</div>
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
  <mu-toast v-if="toast" :message="toastMsg" />
</div>
</template>

<script>
/*eslint-disable*/
import util from '../libs/util';

export default {
  data () {
    const list = []

    return {
      list,
      num: 10,
      loading: false,
      scroller: null,
      bottomSheet: false,
      userId:0,
      clickMatchId:0,
      toast: false,
      toastMsg:'',
    }
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    loadMore () {
      this.loadMatchData(10,this.num);
    },
    deleteMatch () {
      let that = this;
      util.ajax.delete('/match/deleteMatch/'+that.clickMatchId, {
              headers: {
                  "Content-Type": "application/json"
              }
          })
          .then(function(response) {
              if (response.data.success == true) {
                that.list = [];
                that.loadMatchData(10,0);
              } else {
                that.toastMsg = response.data.message;
                that.showToast();
              }
          })
          .catch(function(response) {
              that.toastMsg = '获取数据操作失败!';
              that.showToast();
          });
    },
    reviewMatch () {
      var uwId = 0;
      var gcId = 0;
      var trId = 0;
      for (var i = 0; i < this.list.length; i++){
        var match = this.list[i];
        if (match.id == this.clickMatchId){
          uwId = match.uwId;
          gcId = match.gcId;
          trId = match.trId;
          break;
        }
      }
      this.$router.push('/matchReview/'+uwId+'/'+gcId+'/'+trId);
    },
    detailMatch () {

      console.log('/matchDetail/'+this.clickMatchId);
      this.$router.push('/matchDetail/'+this.clickMatchId);
    },
    closeBottomSheet () {
      this.bottomSheet = false
    },
    openBottomSheet (id) {
      this.bottomSheet = true;
      this.clickMatchId = id;
    },
    loadMatchData(limit,offset){
      let that = this;
      util.ajax.get('/match/getDataByPage', {
              params:{
                limit: limit,
                offset: offset,
                userId:that.userId
              }
          }, {
              headers: {
                  "Content-Type": "application/json"
              }
          })
          .then(function(response) {
              if (response.data.success == true) {
                for (let i = 0; i < response.data.aaData.length; i++){
                  that.list.push(response.data.aaData[i]);
                }
                if (response.data.aaData.length > 0){
                  that.num = that.num + 10;
                }
              } else {
                that.toastMsg = response.data.message;
                that.showToast();
              }
          })
          .catch(function(response) {
              that.toastMsg ='获取数据操作失败!';
              that.showToast();
          });
    },
    showToast() {
        this.toast = true
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => {
            this.toast = false
        }, 2000)
    }
  },
  created(){
    this.userId = util.ajax.defaults.headers.common['userId'];
    this.list = [];
    this.loadMatchData(10,0);
  }
}
</script>
