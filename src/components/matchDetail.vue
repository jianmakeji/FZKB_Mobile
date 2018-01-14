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
                createTime:''
          }
      },
  methods: {
    backClick(){
      this.$router.push('/matchManage');
    },
    reviewClick(){
      
    }
  }
}

</script>
