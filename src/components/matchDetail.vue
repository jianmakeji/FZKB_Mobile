<style scoped>
.appBar {
    position: fixed;
    width: 100%;
    top: 0;
}

.thumb{
  width: 160px;
  height: 160px;
}

.lineStyle{
  margin-left:30px;
  font-size:18px;
  margin-top:10px;
}
</style>

<template>

<div>
  <mu-appbar class="appBar" title="搭配详情">
      <mu-icon-button icon="navigate_before" slot="left" @click="backClick" />
      <mu-icon-button icon="rate_review" slot="right" @click="reviewClick"/>
  </mu-appbar>
  <div style="height:60px;width:100%">
  </div>
  <div class="lineStyle">
    <span>名称：{{name}}</span>
  </div>
  <div  class="lineStyle">
    <span>创建时间：{{createTime}}</span>
  </div>
  <div  class="lineStyle">
    <span>内搭:</span>
    <img :src="underwear" class="thumb"/>
  </div>
  <div  class="lineStyle">
    <span>外搭:</span>
    <img :src="greatcoat" class="thumb"/>
  </div>
  <div  class="lineStyle">
    <span>裤装:</span>
    <img :src="trousers" class="thumb"/>
  </div>
</div>

</template>

<script>
/*eslint-disable*/
import util from '../libs/util';
export default {
  data() {
          return {
                name:'',
                underwear:'',
                greatcoat:'',
                trousers:'',
                createTime:'',
                userId:'',
                matchId:0,
                uwId:0,
                gcId:0,
                trId:0,
          }
      },
  methods: {
    backClick(){
      this.$router.push('/matchManage');
    },
    reviewClick(){
      this.$router.push('/matchReview/'+this.uwId+'/'+this.gcId+'/'+this.trId);
    }
  },
  created(){
    this.userId = util.ajax.defaults.headers.common['userId'];
    this.matchId = this.$route.params.id;

    let that = this;
    if (this.$route.params.id > 0){
      util.ajax.get('/match/getMatch/' + that.matchId, {
              headers: {
                  "Content-Type": "application/json"
              }
          })
          .then(function(response) {
              if (response.data.resultCode == 200) {
                  that.name = response.data.object.name;
                  that.underwear = response.data.object.underwear+ "?x-oss-process=style/thumb-300";
                  that.greatcoat = response.data.object.greatcoat+ "?x-oss-process=style/thumb-300";
                  that.trousers = response.data.object.trousers+ "?x-oss-process=style/thumb-300";
                  that.uwId = response.data.object.uwId;
                  that.gcId = response.data.object.gcId;
                  that.trId = response.data.object.trId;
                  that.createTime = response.data.object.createTime;

              } else {
                  that.toastMsg = response.data.message;
                  that.showToast();
              }
          })
          .catch(function(response) {
              that.toastMsg = '操作失败!';
              that.showToast();
          });
    }
  }
}

</script>
