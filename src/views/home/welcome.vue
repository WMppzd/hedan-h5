<template>
    <div class="welcome-container">
        <div v-if="showLoading">
            <div class="header">
                <img class="logo" src="../../assets/business/logo.png" alt="" />
                <div class="info">
                    <img src="../../assets/business/logo_text.png" alt="" />
                    <div>盒 DAN 你买玩具的好帮手</div>
                </div>
                <div class="down" @click="Jump()">下载APP</div>
            </div>
            <div class="content">
                <!-- <svg viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  v-if="!showToken">
                    <rect width="1200" height="800" fill="url(#pattern0)" />
                    <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0" transform="scale(0.000833333 0.00125)" />
                        </pattern>
                         <img src="../../assets/business/bg.jpg" alt="" class="welcome-img">
                    </defs>
                </svg> -->
                <img src="../../assets/business/bg.jpg" alt="" class="welcome-img" v-if="!showToken" />
                <img :src="this.$store.state.user.base64" alt="" v-if="showToken" class="welcome-img" />
            </div>
            <div class="fix_bottom">
                <img src="../../assets/business/dan.png" alt="" />
                <div class="word">
                    <div>大小孩 你好！</div>
                    <div v-if="!showToken">
                        快来制作
                        <span>杭州艺术设计玩具展</span>
                        的专属地图吧~
                    </div>
                    <div v-if="showToken">
                        你的
                        <span class="scMapspan">杭州艺术设计玩具展</span>
                        专属地图制作完成啦～
                    </div>
                </div>
                <div class="welcome-tc">
                    <div class="welcome-Generate" @click="Generate" v-if="showToken">再次生成</div>
                    <div class="welcome-share" @click="Geneshare" v-if="showToken">分享</div>
                </div>

                <div class="btn" @click="begin()" v-if="!showToken">开始制作</div>
            </div>

            <van-overlay :show="showShare" @click="showShare = false">
                <div class="wrapper" @click.stop>
                    <div class="wrapper-contant">
                        <div>点击右上角 “...”</div>
                        <div>分享给其他大小孩～</div>
                    </div>
                    <div class="wrapper-img">
                        <img src="../../assets/business/shares.png" alt="" />
                    </div>
                </div>
            </van-overlay>
        </div>
        <div class="welcome-loading" v-if="!showLoading">
            <img src="../../assets/business/loding.gif" alt="" />
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { Overlay } from 'vant';
import axios from 'axios';
import wx from 'weixin-js-sdk';
import { jsConfig } from '../../api/info';
export default {
    data() {
        return {
            showToken: false,
            showShare: false,
            showLoading: false,
            imgshare: require('../../assets/business/dan.png')
        };
    },
    components: {
        [Overlay.name]: Overlay
    },
    computed: {
        ...mapGetters({
            userInfo: 'userInfo'
        })
    },
    mounted() {},

    methods: {
        Generate() {
            this.$store.commit('SET_LIST', '');
            this.$router.push({ path: '/selectBusiness', query: { id: 1 } });
        },

        begin() {
            this.$store.commit('SET_LIST', '');
            this.$router.push({ path: '/selectBusiness', query: { id: 1 } });
        },

        Geneshare() {
            this.showShare = true;
        },

        Geneshares() {
            let test = {
                url: process.env.VUE_APP_COURSE
            };
            jsConfig(test).then((response) => {
                if (response.data.code == 'OK') {
                    let { appId, timestamp, nonceStr, signature, url } = response.data.data;

                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: appId, // 必填，公众号的唯一标识，填自己的！
                        timestamp: timestamp, // 必填，生成签名的时间戳，刚才接口拿到的数据
                        nonceStr: nonceStr, // 必填，生成签名的随机串
                        signature: signature, // 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                    });

                    wx.ready(function () {
                        wx.onMenuShareAppMessage({
                            title: '个性化逛展地图生成器 Powered by 盒DAN',
                            desc: '点击开始生成',
                            link: url + '?id=2', //分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'http://file.hedan.art/share.jpg',
                            type: '',
                            dataUrl: '',
                            success: function () {
                                console.log('分享成功');
                            },
                            cancel: function () {
                                console.log('取消分享');
                            }
                        });

                        wx.onMenuShareTimeline({
                            title: '个性化逛展地图生成器 Powered by 盒DAN',
                            desc: '点击开始生成',
                            link: url + '?id=2', //分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'http://file.hedan.art/share.jpg',
                            type: '',
                            dataUrl: '',
                            success: function () {
                                console.log('分享成功');
                            },
                            cancel: function () {
                                console.log('取消分享');
                            }
                        });
                    });
                }
            });
        },

        Jump() {
            window.location.href = 'https://m.hedan.art';
        }
    },
    created() {
        this.userInfo ? (this.showToken = true) : (this.showToken = false);
        if (this.$store.state.user.wxshare != 'wxHedan') {
            this.$store.commit('SET_WX', 'wxHedan');
        }
        // this.Geneshares()
    },
    beforeCreate() {
        let that = this;
        setTimeout(function () {
            that.showLoading = true;
        }, 500);
    }
};
</script>
<style lang="scss" scoped>
.welcome-container {
    width: 100%;
    background-color: $bg_c;
    height: 100%;
    position: relative;
    .header {
        height: 96px;
        width: 100%;
        padding: 15px 40px;
        display: flex;
        align-items: center;
        background-color: #fff;
        position: relative;
        margin-bottom: 20px;
        .logo {
            width: 40px;
            height: 50px;
            margin-right: 20px;
        }
        .info {
            img {
                height: 30px;
            }
            > div {
                height: 32px;
                font-size: 24px;
                line-height: 40px;
            }
        }
        .down {
            font-size: 28px;
            position: absolute;
            right: 40px;
            top: 16px;
            width: 160px;
            height: 60px;
            border-radius: 8px;
            line-height: 60px;
            text-align: center;
            background-color: $z_c;
            color: #fff;
        }
    }
    .content {
        width: 100%;
        padding: 0 10px;
        position: absolute;
        top: 23%;
        svg {
            width: 100%;
            height: auto;
        }
        .welcome-img {
            width: 100%;
        }
    }
    .fix_bottom {
        position: fixed;
        // z-index: 99;
        width: 100%;
        height: 300px;
        border-radius: 40px 40px 0 0;
        bottom: 0;
        left: 0;
        background-color: #fff;
        padding: 0 40px;
        padding-top: 48px;
        overflow: hidden;
        img {
            position: absolute;
            height: 170px;
            right: -10px;
            top: -20px;
            transform: rotate(-9.66deg);
        }
        .word {
            line-height: 60px;
            margin-bottom: 20px;
            span {
                color: $z_c;
            }

            .scMapspan {
                color: #6361ed;
                margin-bottom: 20px;
            }
        }
        .btn {
            background-color: $z_c;
            width: 100%;
            height: 96px;
            border-radius: 12px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }
        .welcome-tc {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            .welcome-Generate {
                border: 1px solid #1d1212;
                flex: 1;
                height: 94px;
                border-radius: 12px;
                text-align: center;
                line-height: 96px;
                color: #1d1212;
                display: inline-block;
                margin-right: 32px;
            }
            .welcome-share {
                background-color: $z_c;
                flex: 1;
                height: 96px;
                border-radius: 12px;
                text-align: center;
                line-height: 96px;
                color: #fff;
                display: inline-block;
            }
        }
    }

    .wrapper {
        position: relative;
        top: 120px;
        width: 90%;
        height: 130px;
        margin: 0 auto;
        border-radius: 20px;
        background-color: $z_c;
        padding: 20px;
        color: #fff;
        .wrapper-contant {
            display: flex;
            flex-direction: column;
            div:first-child {
                margin-bottom: 15px;
            }
        }
        .wrapper-img {
            position: absolute;
            right: 20px;
            top: -110px;
            width: 260px;
            height: 100px;
            img {
                width: 100%;
            }
        }
    }
}
.welcome-loading {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
        width: 90%;
    }
}
</style>