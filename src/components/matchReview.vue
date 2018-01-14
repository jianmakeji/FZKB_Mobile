<style scoped>
.appBar {
    position: fixed;
    width: 100%;
    top: 0;
    text-align: center;
}

.matchContent{
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: white;
  margin-bottom: 80px;
  margin-top: 5px;
  overflow: auto;
  -webkit-overflow-scrolling:touch;
}
</style>

<template>

<div>
  <mu-appbar class="appBar" title="模型查看">
      <mu-icon-button icon="navigate_before" slot="left" @click="backClick" />
      <mu-icon-button icon="" slot="right"/>
  </mu-appbar>
  <div style="height:60px;width:100%">
  </div>
  <div class="matchContent">
    <iframe :src="matchUrl" frameborder="0" height="720px" scrolling='no' style="width: 1px; min-width: 100%; *width: 100%;"></iframe>
    </div>
</div>

</template>

<script>
import util from '../libs/util';

/*eslint-disable*/
export default {
  data() {
          return {

          }
      },
  methods: {
    backClick(){
      this.$router.push('/matchManage');
    }
  },
  created(){
    this.userId = util.ajax.defaults.headers.common['userId'];
    this.authCode = util.ajax.defaults.headers.common['authCode'];
    this.matchUrl = "matchReview?uwId="+this.$route.params.uwId+"&gcId="+this.$route.params.gcId+"&trId="+this.$route.params.trId;
  }
}

</script>
