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
</style>

<template>

<div>
  <mu-appbar class="appBar" title="搭配详情">
      <mu-icon-button icon="navigate_before" slot="left" @click="backClick" />
      <mu-icon-button icon="rate_review" slot="right" @click="reviewClick"/>
  </mu-appbar>
  <div style="height:60px;width:100%">
  </div>
  <div>
    <span>名称：{{name}}</span>
  </div>
  <div>
    <span>创建时间：{{createTime}}</span>
  </div>
  <div>
    <span>内搭</span>
    <img :src="underwear" class="thumb"/>
  </div>
  <div>
    <span>外搭</span>
    <img :src="greatcoat" class="thumb"/>
  </div>
  <div>
    <span>裤装</span>
    <img :src="trousers" class="thumb"/>
  </div>
</div>

</template>

<script>
/*eslint-disable*/
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
          }
      },
  methods: {
    backClick(){
      this.$router.push('/matchManage');
    },
    reviewClick(){
      this.$router.push('/matchReview');
    }
  },
  created(){
    this.userId = util.ajax.defaults.headers.common['userId'];
    this.matchId = this.$route.params.id;

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
