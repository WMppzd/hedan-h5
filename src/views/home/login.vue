<template>
    <div class="login-bg">
        <div class="login-back pad1">
            <van-icon name="arrow-left" />
        </div>

        <div class="login-he pad1">登录 / 注册盒DAN</div>

        <div class="pad1">
            <ul class="content-wrap">
                <li class="content-item">
                    <input class="account" type="text" pattern="\d*" placeholder="请输入手机号" :maxlength="11" oninput="this.value=this.value.replace(/[^0-9]/g,'');" v-model="form.mobile" />
                </li>

                <li class="content-item">
                    <input
                        class="password"
                        type="text"
                        pattern="\d*"
                        ref="inputVal"
                        maxlength="6"
                        oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                        placeholder="请输入验证码"
                        v-model="form.code"
                    />
                    <div class="get-code-box">
                        <span v-show="!showCountdown" @click="sendCode" class="get-code-btn">
                            <template v-if="again">重新获取</template>
                            <span v-else class="login-yan">获取验证码</span>
                        </span>
                        <span v-show="showCountdown" class="get-code-btn">{{ countDownTime }}s后重发</span>
                    </div>
                </li>
            </ul>

            <div class="sign-in-btn" @click="handleSubmit">立即登录</div>
        </div>

        <div class="login-container">
            <div class="fix-h">
                <div class="header">
                    <img class="logo" src="../../assets/business/logo.png" alt="" />
                    <div class="info">
                        <img src="../../assets/business/logo_text.png" alt="" />
                        <div>盒 DAN 你买玩具的好帮手</div>
                    </div>
                    <div class="down" @click="Jump()">下载APP</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Icon } from 'vant';
import { getSigninfo , sendCodeinfo , verifyinfo } from '../../api/info';
import axios from 'axios';
import md5 from 'js-md5';
export default {
    name: 'login',
    data() {
        return {
            isCanClick: true,
            show: false,
            form: {
                mobile: '',
                code: ''
            },
            showCountdown: false,
            countDownTime: 60,
            again: false
        };
    },
    components: {
        [Icon.name]: Icon
    },
    computed: {
        ...mapGetters({
            userInfo: 'userInfo',
            token: 'token'
        })
    },
    mounted() {},

    methods: {
        // 登录
        handleSubmit() {
            const {
                mobile,
                code
            } = this.form;
            if (!mobile) {
                this.$toast({ message: '请输入账号', icon: 'warning', duration: 1500, className: 'passport-toast' });
                return false;
            }

            if (mobile) {
                if (!/^1[3456789]\d{9}$/.test(mobile)) {
                    this.$toast({ message: '手机号格式错误', icon: 'warning', duration: 1500, className: 'passport-toast' });
                    return false;
                }
            }
            if (!code) {
                this.$toast({ message: '请输入验证码', icon: 'warning', duration: 1500, className: 'passport-toast' });
                return false;
            }
            let that = this;
            // axios
            //     .post('api/api/passport/login/verify', {
            //         invitationCode: '',
            //         isCheckSmsCode: true,
            //         isUseInvite: false,
            //         loginRecordForm: {
            //             deviceNumber: '',
            //             download: '',
            //             ip: '',
            //             phoneModel: '',
            //             system: ''
            //         },
            //         mobile: that.form.mobile,
            //         smsCode: that.form.code,
            //         stickerInviteCode: ''
            //     })
            //     .then(function (response) {
            //         if (response.data.code == 'OK') {
            //             that.$toast({ message: '登录成功！', icon: 'success', duration: 1500, className: 'passport-toast' });
            //             that.$store.commit('SET_USERINFO', response.data.data);
            //             that.$store.commit('SET_TOKEN', response.data.data.token);
            //             if (that.$route.query.from) {
            //                 that.$router.push(`/${that.$route.query.from}`);
            //             } else {
            //                 that.$router.push('/');
            //             }
            //         }
            //     });

                let test = {
                    invitationCode: '',
                    isCheckSmsCode: true,
                    isUseInvite: false,
                    loginRecordForm: {
                        deviceNumber: '',
                        download: '',
                        ip: '',
                        phoneModel: '',
                        system: ''
                    },
                    mobile: that.form.mobile,
                    smsCode: that.form.code,
                    stickerInviteCode: ''
                }
                verifyinfo(test).then(response => {
                     that.$toast({ message: '登录成功！', icon: 'success', duration: 1500, className: 'passport-toast' });
                        that.$store.commit('SET_USERINFO', response.data.data);
                        that.$store.commit('SET_TOKEN', response.data.data.token);
                        if (that.$route.query.from) {
                            that.$router.push(`/${that.$route.query.from}`);
                        } else {
                            that.$router.push('/');
                        }
                })
        },

        // 获取验签
        sendCode() {
            const {
                mobile,
                code
            } = this.form;
            if (!mobile) {
                this.$toast({ message: '请输入账号', icon: 'warning', duration: 1500, className: 'passport-toast' });
                return false;
            }
            if (mobile) {
                if (!/^1[3456789]\d{9}$/.test(mobile)) {
                    this.$toast({ message: '手机号格式错误', icon: 'warning', duration: 1500, className: 'passport-toast' });
                    return false;
                }
            }

            if (!this.isCanClick) return false;
            this.isCanClick = false;
            let that = this;
            // axios
            //     .post('api/api/sms/getSign', {
            //         mobile: mobile
            //     })
            //     .then(function (response) {
            //         if (response.data.code == 'OK') {
            //             let secrets = md5(response.data.data.sign + 'PQnnhKtCbYNJPbgvIbSs@NJBZqA0u9MJ');
            //             that.sendCodelogin(secrets);
            //         }
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
            getSigninfo({ mobile: mobile})
                .then(response => {
                    if (response.data.code == 'OK') {
                        let secrets = md5(response.data.data.sign + 'PQnnhKtCbYNJPbgvIbSs@NJBZqA0u9MJ');
                        that.sendCodelogin(secrets);
                    }
                })
        },
        // 获取验证码
        sendCodelogin(secrets) {
          
            let that = this;
            // axios
            //     .post('api/api/sms/sendCode/login', {
            //         mobile: this.form.mobile,
            //         secret: secrets
            //     })
            //     .then(function (response) {
            //         if (response.data.code == 'OK') {
            //             that.handleCount();
            //         }
            //     });
            sendCodeinfo({mobile: this.form.mobile,secret: secrets})
                .then(response => {
                    if (response.data.code == 'OK') {
                        that.handleCount();
                    }
                })
                
        },
        // 倒计时
        handleCount() {
            this.showCountdown = true;
            let old_timer = setInterval(() => {
                this.countDownTime -= 1;
                if (this.countDownTime === 0) {
                    clearInterval(old_timer);
                    this.countDownTime = 60;
                    this.again = true;
                    this.showCountdown = false;
                }
            }, 1000);
        },

        Jump() {
            window.location.href = 'http://www.hedan.art/';
        }
    },
    created() {
        if (this.token) {
            this.$router.push('/');
        }
    }
};
</script>

<style lang="scss" scoped>
.login-bg {
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    height: 100%;
    background: #5353da;

    .login-back {
        line-height: 50px;
        font-size: 40px;
        color: #fff;
    }

    .login-he {
        color: #fff;
        font-size: 45px;
        margin-top: 200px;
    }

    .login-container {
        width: 100%;
        padding: 0 10px;
        padding-top: 245px;
        .fix-h {
            position: fixed;
            background: $bg_c;
            top: 0;
            left: 0;
            width: 100%;
            height: 140px;
            z-index: 99;
        }
        .header {
            height: 130px;
            width: 100%;
            padding: 40px 30px 15px 30px;
            display: flex;
            align-items: center;
            background-color: #fff;
            position: relative;
            margin-bottom: 20px;
            .logo {
                height: 80px;
                margin-right: 20px;
            }
            .info {
                img {
                    height: 30px;
                }
                > div {
                    height: 40px;
                    font-size: 24px;
                    line-height: 40px;
                }
            }
            .down {
                font-size: 28px;
                position: absolute;
                right: 40px;
                top: 40px;
                width: 160px;
                height: 60px;
                border-radius: 8px;
                line-height: 60px;
                text-align: center;
                background-color: $z_c;
                color: #fff;
            }
        }
    }

    .content-wrap {
        .content-item {
            position: relative;
            height: 96px;
            background: #4948c3;
            border-radius: 15px;
            margin-bottom: 50px;
            input {
                display: block;
                padding: 0 20px;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                border: 0;
                font-size: 32px;
                font-weight: 500;
                color: #fff;
                background: #4948c3;
                border-radius: 15px;
            }
            input::-webkit-input-placeholder {
                color: #ccc;
            }

            // .account {
            //     padding-right: 62px;
            // }
            // .icon-close {
            //     @include ct;
            //     right: 14px;
            //     width: 34px;
            //     height: 34px;
            // }
        }

        .get-code-box {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            .get-code-btn {
                font-size: 28px;
                font-weight: 500;
                color: rgba(210, 210, 210, 1);
                display: block;
                line-height: 96px;
                height: 100%;
                margin-right: 40px;
                .login-yan {
                    color: #ead893;
                }
            }
        }
    }

    .sign-in-btn {
        margin: 0px 0 20px;
        width: 100%;
        background: #eaedf0;
        color: #9a9494;
        text-align: center;
        margin: 0 auto;
        line-height: 90px;
        border-radius: 15px;
    }

    .pad1 {
        padding: 25px 50px;
    }
}
</style>
