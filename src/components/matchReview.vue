<style scoped>
.appBar {
    position: fixed;
    width: 100%;
    top: 0;
    text-align: center;
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
  }
}

</script>
