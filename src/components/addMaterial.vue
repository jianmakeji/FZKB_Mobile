<style scoped>

.appBar {
    position: fixed;
    width: 100%;
    top: 0;
    text-align: center;
}

.file-button{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}

.demo-raised-button {
  margin-left: 12px;
}

</style>

<template>

<div>
    <mu-appbar class="appBar" title="添加素材">
        <mu-icon-button icon="navigate_before" slot="left" @click="backClick" />
        <mu-icon-button icon="save" slot="right" @click="saveClick" />
    </mu-appbar>
    <div style="height:60px;width:100%">
    </div>
    <div style="text-align:center">
      <mu-text-field label="名称" v-model="formItem.name" labelFloat/>
      <mu-text-field label="编号" v-model="formItem.number" labelFloat/>

      <mu-select-field v-model="formItem.categoryName" label="类别">
          <mu-menu-item value="艺术品" title="艺术品" />
          <mu-menu-item value="建筑" title="建筑" />
          <mu-menu-item value="动物" title="动物" />
          <mu-menu-item value="植物" title="植物" />
          <mu-menu-item value="风景" title="风景" />
      </mu-select-field>
      <mu-select-field v-model="formItem.select1" label="简单--复杂">
          <mu-menu-item value="-3.0" title="-3.0" />
          <mu-menu-item value="-2.5" title="-2.5" />
          <mu-menu-item value="-2" title="-2.0" />
          <mu-menu-item value="-1.5" title="-1.5" />
          <mu-menu-item value="-1.0" title="-1.0" />
          <mu-menu-item value="-0.5" title="-0.5" />
          <mu-menu-item value="0" title="0" />
          <mu-menu-item value="0.5" title="0.5" />
          <mu-menu-item value="1.0" title="1.0" />
          <mu-menu-item value="1.5" title="1.5" />
          <mu-menu-item value="2.0" title="2.0" />
          <mu-menu-item value="2.5" title="2.5" />
          <mu-menu-item value="3.0" title="3.0" />
      </mu-select-field>
      <mu-select-field v-model="formItem.select2" label="硬朗--圆润">
          <mu-menu-item value="-3.0" title="-3.0" />
          <mu-menu-item value="-2.5" title="-2.5" />
          <mu-menu-item value="-2" title="-2.0" />
          <mu-menu-item value="-1.5" title="-1.5" />
          <mu-menu-item value="-1.0" title="-1.0" />
          <mu-menu-item value="-0.5" title="-0.5" />
          <mu-menu-item value="0" title="0" />
          <mu-menu-item value="0.5" title="0.5" />
          <mu-menu-item value="1.0" title="1.0" />
          <mu-menu-item value="1.5" title="1.5" />
          <mu-menu-item value="2.0" title="2.0" />
          <mu-menu-item value="2.5" title="2.5" />
          <mu-menu-item value="3.0" title="3.0" />
      </mu-select-field>
      <mu-select-field v-model="formItem.select3" label="冷酷--温暖">
          <mu-menu-item value="-3.0" title="-3.0" />
          <mu-menu-item value="-2.5" title="-2.5" />
          <mu-menu-item value="-2" title="-2.0" />
          <mu-menu-item value="-1.5" title="-1.5" />
          <mu-menu-item value="-1.0" title="-1.0" />
          <mu-menu-item value="-0.5" title="-0.5" />
          <mu-menu-item value="0" title="0" />
          <mu-menu-item value="0.5" title="0.5" />
          <mu-menu-item value="1.0" title="1.0" />
          <mu-menu-item value="1.5" title="1.5" />
          <mu-menu-item value="2.0" title="2.0" />
          <mu-menu-item value="2.5" title="2.5" />
          <mu-menu-item value="3.0" title="3.0" />
      </mu-select-field>
      <div style="text-align:left;margin-left:60px">
        <label>上传素材图片</label>
        <img :src="formItem.thumb" style="width:80px;height:80px;border:1px solid" @click="selectFile"/>
        <input id="uploadFile" type="file" class="file-button" accept="image/*" style="display:none" @change="uploadFileFun($event)">
      </div>
      <mu-toast v-if="toast" :message="toastMsg" />
    </div>

    <div style="width:100%;height:100px">

    </div>

</div>

</template>

<script>

/*eslint-disable*/
import util from '../libs/util';
import uploadImage from '../assets/logo.png'

var g_object_name = "";
var key = '';
var hostPrefix = "http://sdx-kt.oss-cn-shanghai.aliyuncs.com/";

function random_string(len) {
    var len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    var pos = filename.lastIndexOf('.')
    var suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

function calculate_object_name(filename) {

    var suffix = get_suffix(filename)
    g_object_name = key + random_string(10) + suffix

}

function get_uploaded_object_name(filename) {
    return g_object_name;
}

export default {
    data() {
            return {
                formItem: {
                    name: '',
                    number: '',
                    categoryName: '',
                    select1: '',
                    select2: '',
                    select3: '',
                    thumb: uploadImage,
                    imageUrl: ''
                },
                g_object_name: '',
                policyBase64: '',
                accessid: '',
                callbackbody: '',
                signature: '',
                host: hostPrefix,
                id: 0,
                insertOrUpdate: true,
                userId: 0,
                toast: false,
                toastMsg:'',
            }
        },
        methods: {
            backClick() {
                this.$router.push('/material');
            },
            saveClick() {
              if (this.formItem.name == ''){
                this.toastMsg = '名称不能为空';
                this.showToast();
                return;
              }

              if (this.formItem.number == ''){
                this.toastMsg = '编号不能为空';
                this.showToast();
                return;
              }

              if (this.formItem.select1 == ''){
                this.toastMsg = '简单--复杂不能为空';
                this.showToast();
                return;
              }

              if (this.formItem.select2 == ''){
                this.toastMsg = '硬朗--圆润不能为空';
                this.showToast();
                return;
              }

              if (this.formItem.select3 == ''){
                this.toastMsg = '冷酷--温暖不能为空';
                this.showToast();
                return;
              }

              if (this.formItem.imageUrl == ''){
                this.toastMsg = '图片不能为空';
                this.showToast();
                return;
              }

              var postUrl = "";
              var postData = {
                name: this.formItem.name,
                number: this.formItem.number,
                categoryName: this.formItem.categoryName,
                style1: this.formItem.select1,
                style2: this.formItem.select2,
                style3: this.formItem.select3,
                imageUrl: this.formItem.imageUrl,
                userId:this.userId,
              };
              if (this.insertOrUpdate){
                  postUrl = "/material/createMaterial";
              }else{
                  postUrl = "/material/updateMaterial";
                  postData.id = this.id;
              }
              let that = this;
              util.ajax.post(postUrl, postData, {
                      headers: {
                          "Content-Type": "application/json"
                      }
                  })
                  .then(function(response) {
                      if (response.data.resultCode == 200) {
                          message.success('添加成功！');
                          that.$router.push('../materialManage');
                      } else {
                          message.error(response.data.message);
                      }
                      loadingComponent.finish();
                  })
                  .catch(function(response) {
                      loadingComponent.error();
                      message.error('操作失败!');
                  });
            },
            selectFile(){
              document.getElementById("uploadFile").click();
              var self = this;

              util.ajax.get('/uploadKey/1',{
                      headers: {
                          "Content-Type": "application/json"
                      }
                  }).then(function(result) {
                      self.host = result.data.host;
                      self.policy = result.data.policy;
                      self.OSSAccessKeyId = result.data.accessid;
                      self.signature = result.data.signature;
                      self.callback = '';
                      key = result.data.dir;
                  })
                  .catch(function(response) {

                  });
            },
            uploadFileFun(event){

              event.preventDefault();
              calculate_object_name(document.getElementById("uploadFile").files[0].name)
              var fd = new FormData();
              fd.append("upload", 1);
              fd.append("host",this.host);
              fd.append("policy",this.policy);
              fd.append("OSSAccessKeyId",this.OSSAccessKeyId);
              fd.append("signature",this.signature);
              fd.append("key",g_object_name);
              fd.append("callbackbody",this.callbackbody);
              fd.append("success_action_status",'200');
              fd.append("file", document.getElementById("uploadFile").files[0]);

              let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
              let self = this;
              util.aliyunoss.post('aliyun_oss', fd, config).then(function (res) {

                if (res.status === 200) {
                  self.formItem.thumb = hostPrefix + g_object_name + "?x-oss-process=style/thumb-300";
                  self.formItem.imageUrl = hostPrefix + g_object_name;
                }
                document.getElementById("uploadFile").value = '';
              }).catch(function(response) {
                document.getElementById("uploadFile").value = '';
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

          this.materialId = this.$route.params.id;
          let that = this;
          if (this.$route.params.id > 0){
            this.insertOrUpdate = false;
            util.ajax.get('/material/getMaterial/'+that.materialId, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(function(response) {
                    if (response.data.resultCode == 200) {
                      that.formItem.name = response.data.object.name;
                      that.formItem.number = response.data.object.number;
                      that.formItem.categoryName = response.data.object.categoryName;
                      that.formItem.select1 = response.data.object.style1;
                      that.formItem.select2 = response.data.object.style2;
                      that.formItem.select3 = response.data.object.style3;
                      that.formItem.thumb = response.data.object.imageUrl + "?x-oss-process=style/thumb-300";
                      that.formItem.imageUrl = response.data.object.imageUrl;
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
