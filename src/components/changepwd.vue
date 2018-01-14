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
  <mu-appbar class="appBar" title="修改密码">
      <mu-icon-button icon="navigate_before" slot="left" @click="backClick" />
      <mu-icon-button icon="save" slot="right" @click="saveClick" />
  </mu-appbar>
  <div style="height:60px;width:100%">
  </div>
  <div style="text-align:center">
    <mu-text-field label="密码" v-model="formItem.pwd1" labelFloat/>
    <mu-text-field label="确认密码" v-model="formItem.pwd2" labelFloat/>
  </div>
  <mu-toast v-if="toast" :message="toastMsg" />
</div>

</template>

<script>

import util from '../libs/util';
/*eslint-disable*/
export default {
  data() {
          return {
              formItem:{
                pwd1:'',
                pwd2:''
              },
              toast: false,
              toastMsg: '',
              userId:0,
          }
      },
  methods: {
    saveClick(){
      if (this.formItem.pwd1 == '' || this.formItem.pwd2 == ''){
        this.toastMsg = '请填写密码!';
        this.showToast();
      }

      if (this.formItem.pwd1 != this.formItem.pwd2){
        this.toastMsg = '请填写密码!';
        this.showToast();
      }

      let that = this;
      util.ajax.delete('/designer/updatePwd' + that.materialId,{
            'designerId':that.formItem.userId,
            'password':that.formItem.pwd1,
          }, {
              headers: {
                  "Content-Type": "application/json"
              }
          })
          .then(function(response) {
              if (response.data.success == true) {
                  that.toastMsg = "操作成功！";
                  that.showToast();
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
    backClick(){
      this.$router.push('/me');
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
  }
}

</script>
