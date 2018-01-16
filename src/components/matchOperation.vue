<style scoped>
.matchContent{
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: white;
  margin-bottom: 80px;
  margin-top: 35px;
  overflow: auto;
  -webkit-overflow-scrolling:touch;
}

.appBar {
    position: fixed;
    width: 100%;
    top: 0;
    text-align: center;
}
</style>

<template>
<div>
  <mu-appbar class="appBar" title="搭配操作">
      <mu-icon-button icon="" slot="left" />
      <mu-icon-button icon="" slot="right" />
  </mu-appbar>
  <div class="matchContent">
    <iframe :src="matchUrl" frameborder="0" height="720px" scrolling='no' style="width: 1px; min-width: 100%; *width: 100%;"></iframe>
    </div>
</div>


</template>

<script>
/*eslint-disable*/
import util from '../libs/util';

export default {
    data() {
            return {
              userId:0,
              authCode:'',
              matchUrl:'',
            }
        },
        methods: {

        },
        created(){
          this.userId = util.ajax.defaults.headers.common['userId'];
          this.authCode = util.ajax.defaults.headers.common['Authorization'];
          this.matchUrl = util.threeJsUrl + "matchMobilePage?userId="+this.userId+"&authCode="+this.authCode;
          console.log(this.matchUrl);
        }
}

</script>
