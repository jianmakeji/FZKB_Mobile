<style scoped>

.gridlist-demo-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    margin-top: 50px;
}

.gridlist-demo {
    width: 100%;
    height: calc(100% - 100px);
    overflow-y: auto;
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
    <mu-appbar class="appBar" title="素材">
        <mu-icon-button icon="" slot="left"/>
        <mu-icon-button icon="add" slot="right" @click="addMaterial"/>
    </mu-appbar>
    <div class="gridlist-demo-container">
        <mu-grid-list class="gridlist-demo">
            <mu-grid-tile v-for="material, index in list" :key="index" >
                <img :src="material.imageUrl" style="width:100%;height:100%" @click="materialDetail(material.id)"/>
                <span slot="title" @click="materialDetail(material.id)">{{material.name}} </span>
                <span slot="subTitle" @click="materialDetail(material.id)">by <b>{{material.number}}</b></span>
                <mu-icon-button icon="aspect_ratio" slot="action" @click="materialDetail(material.id)"/>
            </mu-grid-tile>
        </mu-grid-list>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
        <div style="background-color:white;height:60px;width:100%">
        </div>
    </div>
    <mu-toast v-if="toast" :message="toastMsg" />
</div>

</template>

<script>

import util from '../libs/util';
/*eslint-disable*/
export default {
    data() {
            const list = []
            return {
                list,
                num: 0,
                loading: false,
                scroller: null,
                toast: false,
                toastMsg:'',
            }
        },
        mounted () {
          this.scroller = this.$el
        },
        methods: {
            loadMore() {
              this.loadMaterialByPage(10,this.num);
            },
            addMaterial(){
              this.$router.push('/addMaterial/0');
            },
            loadMaterialByPage(limit,offset){
              let that = this;

              util.ajax.get('/material/getDataByPage', {
                      params:{
                        limit: limit,
                        offset: offset,
                        userId:that.userId,
                      }
                  }, {
                      headers: {
                          "Content-Type": "application/json"
                      }
                  })
                  .then(function(response) {
                      if (response.data.success == true) {
                        for (let i = 0; i < response.data.aaData.length; i++){
                          that.list.push(response.data.aaData[i]);
                        }
                        if (response.data.aaData.length > 0){
                          that.num = that.num + 10;
                        }

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
            },
            materialDetail: function(index){
              this.$router.push('/materialDetail/'+index);
            },
        },
        created(){
          this.num = 0;
          this.list = [];
          this.userId = util.ajax.defaults.headers.common['userId'];
          this.loadMaterialByPage(10,0);
        }
}

</script>
