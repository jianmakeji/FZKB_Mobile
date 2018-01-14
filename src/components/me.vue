<style scoped>
.appBar {
    position: fixed;
    width: 100%;
    top: 0;
    text-align: center;
}

.title{
  float: left;
  display: inline-block;
  width:60%;
  height: 50px;
  line-height:50px;
  text-align: left;
  margin-left: 20px;
}

.rightArrow{
  float:right;
  margin-right: 20px;
  margin-top: 3px;
}

.lineStyle{
  height:50px;
  width:100%;
  background-color:#e0e0e0;
}
</style>

<template>

<div>
  <mu-appbar class="appBar" title="我的">
      <mu-icon-button icon="" slot="left"/>
      <mu-icon-button icon="" slot="right"/>
  </mu-appbar>
  <div style="margin-top:80px;height:50px;width:100%;background-color:#e0e0e0">
    <div v-on:click.capture="nextClick">
      <div class="title">修改密码</div>
      <mu-icon-button class="rightArrow" icon="navigate_next" slot="right" @click="nextClick" />
    </div>
  </div>
  <mu-divider style="color:white"/>
  <div class="lineStyle" v-on:click.capture="clearCache">
    <div class="title">清除缓存</div>
  </div>
  <mu-divider style="color:white"/>
  <div class="lineStyle" v-on:click.capture="logOut">
    <div class="title">退出</div>
  </div>
  <mu-toast v-if="toast" :message="toastMsg" />
</div>

</template>

<script>
/*eslint-disable*/
export default {
  data() {
          return {
              toast: false,
              toastMsg: '',
          }
      },
  methods: {
    nextClick(){
      this.$router.push('/changepwd');
    },
    clearCache(){
      that.toastMsg = "缓存清除成功";
      that.showToast();
    },
    logOut(){
      this.$router.push('/');
    },
    showToast() {
        this.toast = true
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => {
            this.toast = false
        }, 2000)
    }
  }
}

</script>
