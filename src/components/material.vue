<style scoped>

.gridlist-demo-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
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
            <mu-grid-tile v-for="tile, index in list" :key="index">
                <img :src="tile.image" style="width:100%;height:100%" />
                <span slot="title">{{tile.title}}</span>
                <span slot="subTitle">by <b>{{tile.author}}</b></span>
            </mu-grid-tile>
        </mu-grid-list>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
        <div style="background-color:white;height:60px;width:100%">
        </div>
    </div>
</div>

</template>

<script>

/*eslint-disable*/
export default {
    data() {
            const list = []
            for (let i = 0; i < 10; i++) {
                list.push({
                    image: 'http://sdx-kt.oss-cn-shanghai.aliyuncs.com/kbxt/EySyETYmaa.png?x-oss-process=style/thumb-150',
                    title: 'Breakfast',
                    author: 'Myron'
                })
            }
            return {
                list,
                num: 10,
                loading: false,
                scroller: null
            }
        },
        mounted () {
          this.scroller = this.$el
        },
        methods: {
            loadMore() {
                this.loading = true
                setTimeout(() => {
                    for (let i = this.num; i < this.num + 10; i++) {
                        this.list.push({
                            image: 'http://sdx-kt.oss-cn-shanghai.aliyuncs.com/kbxt/EySyETYmaa.png?x-oss-process=style/thumb-150',
                            title: 'Breakfast',
                            author: 'Myron'
                        })
                    }
                    this.num += 10
                    this.loading = false
                }, 2000)
            },
            addMaterial(){
              this.$router.push('/addMaterial');
            }
        }
}

</script>
