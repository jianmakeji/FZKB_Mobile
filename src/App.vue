<style>

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.bottomMenu {
    position: fixed;
    width: 100%;
    bottom: 0;
    table-layout: fixed;
}

.content {
    height: 100%;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #474a4f;
    flex-direction: column;
}

.raised-button {
    margin: 12px;
}

</style>

<template>

<div id="app">
    <router-view></router-view>
    <mu-paper class="bottomMenu">
        <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
            <mu-bottom-nav-item value="operation" title="操作" icon="redeem" />
            <mu-bottom-nav-item value="manage" title="管理" icon="store" />
            <mu-bottom-nav-item value="material" title="素材" icon="theaters" />
            <mu-bottom-nav-item value="me" title="我" icon="assignment_ind" />
        </mu-bottom-nav>
    </mu-paper>

    <div class="content" v-show="loginPanel">
        <mu-text-field label="用户名" hintText="请输入用户名" labelFloat/>
        <br/>
        <mu-text-field label="密码" hintText="请输入密码" type="password" labelFloat/>
        <br/>
        <mu-raised-button label="登录" class="raised-button" @click="LoginClick" secondary/>

    </div>
</div>

</template>

<script>
/*eslint-disable*/
export default {
    name: 'app',
    data() {
        return {
            bottomNav: 'operation',
            bottomNavColor: 'operation',
            loginPanel: true
        }
    },
    methods: {
        handleChange(val) {
                this.bottomNav = val
                console.log("val:" + val);
                if (val == 'operation') {
                    this.$router.push('/matchOperation');
                }
                else if (val == 'manage') {
                  console.log("manage");
                    this.$router.push('/matchManage');
                }
                else if (val == 'material') {
                    this.$router.push('/material');
                }
                else if (val == 'me') {
                    this.$router.push('/me');
                }
            },
            LoginClick() {
                this.loginPanel = false;
            }
    },
    created() {
      this.$router.push('/matchOperation');
    }
}

</script>
