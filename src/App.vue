<style>

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    background-color: #616161;
    flex-direction: column;
}

.raised-button {
    margin: 12px;
}

.circleCenter {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 60px;
    margin-top: -30px;
    /* negative half of the height */
    margin-left: -30px;
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
        <mu-text-field label="用户名" hintText="请输入用户名" v-model="username" labelFloat/>
        <br/>
        <mu-text-field label="密码" hintText="请输入密码" type="password" v-model="password" labelFloat/>
        <br/>
        <mu-raised-button label="登录" class="raised-button" @click="LoginClick" secondary/>
    </div>
    <mu-circular-progress :size="60" :strokeWidth="5" v-show="circleShow" class="circleCenter" />
    <mu-toast v-if="toast" :message="toastMsg" style="text-align:center" />
</div>

</template>

<script>

/*eslint-disable*/
import util from './libs/util';
var qs = require('qs');

export default {
    name: 'app',
    data() {
        return {
            bottomNav: 'operation',
            bottomNavColor: 'operation',
            loginPanel: true,
            circleShow: false,
            username: '',
            password: '',
            toast: false,
            toastMsg: '',
        }
    },
    methods: {
        handleChange(val) {
                this.bottomNav = val;
                if (val == 'operation') {
                    this.$router.push('/matchOperation');
                } else if (val == 'manage') {
                    this.$router.push('/matchManage');
                } else if (val == 'material') {
                    this.$router.push('/material');
                } else if (val == 'me') {
                    this.$router.push('/me');
                }
            },
            LoginClick() {
                if (this.username == '' || this.password == '') {
                    this.toastMsg = '用户名密码不能为空';
                    this.showToast();
                } else {
                    let that = this;
                    this.circleShow = true;
                    util.ajax.post('/authorityCheck', qs.stringify({
                            username: that.username,
                            password: that.password
                        }), {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        })
                        .then(function(response) {
                            if (response.data.resultCode == 200) {
                                util.ajax.defaults.headers.common['Authorization'] = response.data.object.token;
                                util.ajax.defaults.headers.common['userId'] = response.data.object.userId;
                                util.ajax.defaults.headers.common['roleId'] = response.data.object.roleId;
                                //localStorage.setItem('token',response.data.object.token);
                                localStorage.setItem('username',that.username);
                                that.$router.push('/matchOperation');
                                that.loginPanel = false;
                            } else {
                                that.toastMsg = response.data.message;
                                that.showToast();
                            }
                            that.circleShow = false;
                        })
                        .catch(function(response) {
                            that.toastMsg = '用户名密码不能为空';
                            that.showToast();
                            that.circleShow = false;
                        });
                }
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
        this.username = localStorage.getItem('username');
        //this.$router.push('/matchOperation');
        /*
        let that = this;
        util.ajax.get('/JudgeTokenOvertime', {
              params:{
                token: localStorage.getItem('token')
              }
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function(response) {
              if (response.data.resultCode == 200){
                that.loginPanel = false;
              }
              else{
                that.loginPanel = true;
              }
            })
            .catch(function(response) {
              that.loginPanel = true;
            });
            */
    }
}

</script>
