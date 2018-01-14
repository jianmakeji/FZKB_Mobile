<style scoped>

.appBar {
    position: fixed;
    width: 100%;
    top: 0;
    text-align: center;
}

.thumb {
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
    <mu-appbar class="appBar" title="素材详情">
        <mu-icon-button icon="navigate_before" slot="left" @click="backClick" />
        <mu-icon-button icon="rate_review" slot="right" @click="updateClick" />
    </mu-appbar>
    <div style="height:60px;width:100%">
    </div>
    <div>
      <div class="lineStyle">
        <span>名称：{{formItem.name}}</span>
      </div>
      <div class="lineStyle">
        <span>编号：{{formItem.number}}</span>
      </div>
      <div class="lineStyle">
        <span>类别：{{formItem.categoryName}}</span>
      </div>
      <div class="lineStyle">
        <span>简单--复杂：{{formItem.select1}}</span>
      </div>
      <div class="lineStyle">
        <span>硬朗--圆润：{{formItem.select2}}</span>
      </div>
      <div class="lineStyle">
        <span>冷酷--温暖：{{formItem.select3}}</span>
      </div>
      <img :src="formItem.thumb" style="width:160px;height:160px;margin-left:30px;margin-top:10px"/>
    </div>
    <div style="width:100%;height:auto;text-align:center;margin-top:30px">
      <mu-raised-button label="删除" class="demo-raised-button" style="width:80%" primary @click="remove"/>
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
                materialId: 0,
                toast: false,
                toastMsg: '',
                formItem: {
                    name: '',
                    number: '',
                    categoryName: '',
                    select1: '',
                    select2: '',
                    select3: '',
                    thumb: '',
                    imageUrl: ''
                },
            }
        },
        methods: {
            backClick() {
                    this.$router.push('/material');
                },
                updateClick() {
                    this.$router.push('/addMaterial/'+this.materialId);
                },
                remove() {
                    let that = this;
                    util.ajax.delete('/material/deleteMaterial/' + that.materialId, {
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
                showToast() {
                    this.toast = true
                    if (this.toastTimer) clearTimeout(this.toastTimer)
                    this.toastTimer = setTimeout(() => {
                        this.toast = false
                    }, 2000)
                }
        },
        created() {
            this.materialId = this.$route.params.id;
            let that = this;
            if (this.$route.params.id > 0) {
                util.ajax.get('/material/getMaterial/' + that.materialId, {
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
