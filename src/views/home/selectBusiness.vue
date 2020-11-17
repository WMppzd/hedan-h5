<template>
    <div class="selectBusiness-container">
        <div class="fix-h">
            <div class="header">
                <img class="logo" src="../../assets/business/logo.png" alt="" />
                <div class="info">
                    <img src="../../assets/business/logo_text.png" alt="" />
                    <div>盒 DAN 你买玩具的好帮手</div>
                </div>
                <div class="down" @click="Jump()">下载APP</div>
            </div>
            <div class="search">
                <div class="left" @click="$router.go(-1)">
                    <van-icon name="arrow-left" />
                </div>
                <div class="right">
                    <input type="text" ref="input" @input="search" v-model="keyword" placeholder="请输入搜索品牌" />
                    <van-icon class="input_icon" @click="keyword = ''" name="close" v-if="keyword.length > 0" />
                    <van-icon class="input_icon" name="search" v-else />
                </div>
            </div>
            <p v-if="keyword.length == 0">请选择你想要标记的品牌</p>
        </div>
        <div v-if="keyword.length == 0">
            <van-index-bar :sticky="false" :index-list="indexList" highlight-color="rgb(99, 97, 235)">
                <div v-for="(item, key) in data" :key="key">
                    <van-index-anchor :index="key.split('')[0]">{{ key }}</van-index-anchor>
                    <van-cell v-for="(ele, i) in item" :key="i">
                        <div class="list-item">
                            <b>{{ ele.id }}</b>
                            <span>{{ ele.name }}</span>
                            <van-checkbox @click="handleList(ele)" class="item_checkbox" checked-color="rgb(99, 97, 235)" :value="selectList.includes(ele)"></van-checkbox>
                        </div>
                    </van-cell>
                </div>
            </van-index-bar>
        </div>
        <div class="search_box" v-if="keyword.length > 0">
            <div class="list" v-if="searchList.length > 0">
                <div class="list-item" v-for="(ele, i) in searchList" :key="i">
                    <b>{{ ele.id }}</b>
                    <span>{{ ele.name }}</span>
                    <van-checkbox @click="handleList(ele)" class="item_checkbox" checked-color="rgb(99, 97, 235)" :value="selectList.includes(ele)"></van-checkbox>
                </div>
            </div>
            <div class="noresult" v-else>非常抱歉 ( >﹏<。)，DAN酱在当前展会没有找到符合的参展品牌，换个关键词试试？</div>
        </div>
        <div class="fix_bottom" v-if="selectList.length">
            <div class="btn" @click="sheetshow = true">已选择{{ selectList.length }}个品牌</div>
        </div>
        <van-action-sheet v-model="sheetshow">
            <div class="sheetcontent">
                <div class="sheetcontent_header">已选择{{ selectList.length }}个品牌</div>
                <div class="list">
                    <div class="list-item" v-for="(ele, i) in selectList" :key="i">
                        <b>{{ ele.id }}</b>
                        <span>{{ ele.name }}</span>
                        <van-icon class="clear" @click="clear(selectList, ele)" name="clear" />
                    </div>
                </div>
                <div class="btn btnBack" @click="goBack">返回</div>
                <div class="btn" @click="goPic">生成专属地图</div>
            </div>
        </van-action-sheet>

        <div class="mapLoading">
            <van-popup v-model="showMap" round safe-area-inset-bottom>
                <div class="showMap">
                    <div class="pad mt20">DAN酱正在制作专属地图</div>
                    <div class="pad">请稍等...</div>
                    <div class="pad">
                        <img src="../../assets/business/mapLoading.png" alt="" />
                    </div>
                </div>
            </van-popup>
        </div>

        <div class="mapSc">
            <van-popup v-model="scMap" round closeable>
                <div class="scMap">
                    <div class="mt80">
                        你的
                        <span class="scMapspan">TAC上海潮流玩具展</span>
                    </div>
                    <div>专属地图制作完成啦～</div>
                    <div class="canMap">
                        <img src="../../assets/business/bg.png" alt="" v-show="!this.token" />
                        <img :src="canvasPng" alt="" v-show="this.token" />
                        <canvas id="imageView" ref="imageView" v-show="false"></canvas>
                    </div>
                    <div class="btn_save" @click="savePic" v-if="!this.token">保存专属地图</div>
                    <div class="tishi" v-if="this.token">提示：长按图片保存到手机</div>
                    <!-- <div class="btn"  v-if="this.token" style="width:150px;margin: 0 auto;margin-top: 6px;">分享</div> -->
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import businessList from '../../utils/businessData';
import { IndexBar, IndexAnchor, Checkbox, CheckboxGroup, ActionSheet, Search, Popup } from 'vant';
import 'script-loader!createjs/builds/1.0.0/createjs.min.js';
import zuobiao from '../../utils/zuobiao';
export default {
    name: 'selectBusiness-container',
    data() {
        return {
            indexList: ['A', 'B', 'C', 'D', 'E', 'F', 'T', 'G', 'K', 'H', 'W'],
            data: {},
            selectList: [],
            sheetshow: false,
            showMap: false,
            scMap: false,
            showts: false,
            keyword: '',
            searchList: [],
            selectListMap: [],
            canvasPng: ''
        };
    },
    components: {
        [IndexBar.name]: IndexBar,
        [IndexAnchor.name]: IndexAnchor,
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup,
        [ActionSheet.name]: ActionSheet,
        [Search.name]: Search,
        [Popup.name]: Popup,
    },
    computed: {
        ...mapGetters({
            userInfo: 'userInfo',
            token: 'token',
            save_list: 'list'
        })
    },
    mounted() {
        this.$refs.input.focus();
    },

    methods: {
        convertCanvasToImage() {
            var image = new Image();
            image.src = this.$refs.imageView.toDataURL('image/png');
            this.canvasPng = image.src;
            this.$store.commit('SET_BASE', image.src);
            return image.src;
        },
        savePic() {
            if (!this.token) {
                this.$store.commit('SET_LIST', this.selectList);
                this.$router.push({
                    path: '/login',
                    query: {
                        from: 'selectBusiness'
                    }
                });
            }
        },
        // 返回
        goBack() {
            this.sheetshow = false;
        },

        goPic() {
            this.sheetshow = false;
            this.showMap = true;
            let that = this;
            setTimeout(function () {
                that.showMap = false;
                that.scMap = true;
                that.selectListMap = that.selectList.map((ele) => {
                    return ele.id;
                });
                that.handlerImageLoad();
            }, 1000);
        },

        handlerImageLoad() {
            this.$nextTick(() => {
                // 通过画布ID 创建一个 Stage 实例
                // 创建一个 Bitmap 实例
                var _this = this;
                var stage = new createjs.Stage('imageView'); //创建一个舞台
                var image = new Image();
                image.src = require('../../assets/business/bg.jpg');
                image.onload = handlerImageLoad;  //启动函数
                function handlerImageLoad(event) {
                    var theBitmap = new createjs.Bitmap(image);  //位图实例化
                    // 设置画布大小等于图片实际大小
                    stage.canvas.width = theBitmap.image.naturalWidth;
                    stage.canvas.height = theBitmap.image.naturalHeight;  // 获取图片原始宽高
                    theBitmap.set({ x: 0, y: 0, scaleX: 1, scaleY: 1 }); //边界
                    // 把Bitmap 实例添加到 stage 的显示列表中
                    stage.addChild(theBitmap);
                    var image1 = new Image();
                    image1.src = require('../../assets/business/zb.png');
                    image1.onload = () => {
                        _this.selectListMap.forEach((ele) => {
                            for (const key in zuobiao) {
                                if (key.includes(ele)) {
                                    let theBitmap1 = new createjs.Bitmap(image1);
                                    theBitmap1.set({ x: zuobiao[key].x - 16, y: zuobiao[key].y - 48, scaleX: 0.09, scaleY: 0.09 });
                                    stage.addChild(theBitmap1);
                                    return;
                                }
                            }
                        });
                        stage.update();
                        _this.convertCanvasToImage();
                    };
                    // 更新 stage 渲染画面
                }
            });
        },

        // 处理选择数据
        handleList(data) {
            if (this.selectList.includes(data)) {
                this.clear(this.selectList, data);
            } else {
                this.selectList.push(data);
            }
        },
        // 取消选择
        clear(arr, data) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id === data.id) {
                    arr.splice(i, 1);
                }
            }
        },
        search() {
            if (this.keyword.length == 0) return;
            this.searchList = [];
            businessList.forEach((ele) => {
                let searchWord = ele.name + ele.keyword;
                if (searchWord.includes(this.keyword)) {
                    return this.searchList.push(ele);
                }
            });
        },
        Jump() {
            window.location.href = 'http://www.hedan.art/';
        }
    },
    created() {
        let data = {};
        businessList.forEach((ele) => {
            if (ele.id.includes('A')) {
                data['A区'] ? data['A区'].push(ele) : (data['A区'] = [ele]);
            } else if (ele.id.includes('B')) {
                data['B区'] ? data['B区'].push(ele) : (data['B区'] = [ele]);
            } else if (ele.id.includes('C')) {
                data['C区'] ? data['C区'].push(ele) : (data['C区'] = [ele]);
            } else if (ele.id.includes('D')) {
                data['D区'] ? data['D区'].push(ele) : (data['D区'] = [ele]);
            } else if (ele.id.includes('E')) {
                data['E区'] ? data['E区'].push(ele) : (data['E区'] = [ele]);
            } else if (ele.id.includes('F')) {
                data['F区'] ? data['F区'].push(ele) : (data['F区'] = [ele]);
            } else if (ele.id.includes('T')) {
                data['T区'] ? data['T区'].push(ele) : (data['T区'] = [ele]);
            } else if (ele.id.includes('G')) {
                data['G区'] ? data['G区'].push(ele) : (data['G区'] = [ele]);
            } else if (ele.id.includes('K')) {
                data['K区'] ? data['K区'].push(ele) : (data['K区'] = [ele]);
            } else if (ele.id.includes('H')) {
                data['H区'] ? data['H区'].push(ele) : (data['H区'] = [ele]);
            } else if (ele.id.includes('W')) {
                data['W区'] ? data['W区'].push(ele) : (data['W区'] = [ele]);
            }
        });
        this.data = data;
        if (this.save_list) {
            this.selectList = this.save_list;
            this.scMap = true;
            this.selectListMap = this.selectList.map((ele) => {
                return ele.id;
            });
            this.handlerImageLoad();
            // this.$store.commit('SET_LIST', '');
        }

        // businessList.forEach(r=>{
        //     this.selectListMap.push(r.id)
        // })
    }
};
</script>

<style lang="scss" scoped>
.selectBusiness-container {
    width: 100%;
    padding: 0 10px;
    background-color: $bg_c;
    padding-top: 345px;
    min-height: 100%;
    .fix-h {
        position: fixed;
        background: $bg_c;
        top: 0;
        left: 0;
        width: 100%;
        height: 340px;
        z-index: 99;
    }
    .header {
        height: 130px;
        width: 100%;
        padding: 15px 30px;
        padding-top: 40px;
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
    .search {
        height: 100px;
        display: flex;
        align-items: center;
        padding-right: 40px;
        position: relative;
        .left {
            float: left;
            width: 100px;
            font-size: 40px;
            text-align: center;
        }
        .right {
            width: calc(100% - 100px);
            float: left;
            height: 80px;
            input {
                width: 100%;
                height: 100%;
                padding-left: 30px;
                border-radius: 10px;
                padding-right: 60px;
            }
            .input_icon {
                position: absolute;
                font-size: 40px;
                right: 60px;
                top: 35px;
            }
        }
    }
    p {
        margin: 20px 0;
        padding: 0 30px;
        font-size: 32px;
    }
    .list-item {
        padding-right: 20px;
        display: flex;
        height: 60px;
        line-height: 60px;
        position: relative;
        b {
            display: inline-block;
            width: 70px;
            font-size: 32px;
            color: $z_c;
            margin-right: 20px;
        }
        span {
            font-size: 24px;
        }
        .item_checkbox {
            position: absolute;
            right: 40px;
            top: 0;
        }
        .clear {
            position: absolute;
            right: 40px;
            top: 0;
        }
    }
    .search_box {
        position: relative;
        z-index: 100;
        background-color: $bg_c;
        padding: 30px;
        margin-top: -60px;
        height: calc(100vh - 600px);
        width: 100%;
        .list {
            height: 100%;
            overflow-y: auto;
            .list-item {
                line-height: 80px;
                height: 80px;
                .item_checkbox {
                    top: 20px;
                }
            }
        }
        .noresult {
            color: rgb(167, 164, 164);
            font-size: 28px;
            line-height: 60px;
        }
    }
    .fix_bottom {
        position: fixed;
        z-index: 99;
        width: 100%;
        height: 180px;
        bottom: 0;
        left: 0;
        background-color: $bg_c;
        padding: 0 40px;
        padding-top: 30px;
    }
    .btn {
        background-color: $z_c;
        width: 100%;
        height: 80px;
        border-radius: 12px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }

    .sheetcontent {
        padding: 40px;
        height: 100%;
        position: relative;
        .list {
            height: calc(100% - 200px);
            overflow-y: auto;
            margin-top: 30px;
            > div {
                margin-top: 20px;
            }
        }
        .btn {
            width: calc(50% - 80px);
            position: absolute;
            bottom: 70px;
            right: 40px;
        }
        .btnBack {
            width: calc(50% - 80px);
            position: absolute;
            bottom: 70px;
            left: 40px;
            border: 1px solid #1d1212;
            background: #fff;
            color: #1d1212;
        }
    }

    .showMap {
        text-align: center;
        font-size: 35px;
        width: 500px !important;
        .pad {
            padding: 10px 20px;
        }
        img {
            width: 80%;
            // margin-bottom: 20px;
        }
    }

    .scMap {
        text-align: center;
        font-size: 30px;
        width: 550px !important;
        .scMapspan {
            color: #6361ed;
            margin-bottom: 20px;
        }
        .canMap {
            margin: 20px;
        }
        .tishi {
            color: red;
        }
        .btn_save {
            width: 80%;
            margin: 0 auto;
            background-color: $z_c;
            height: 80px;
            border-radius: 12px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }
        img {
            width: 80%;
        }
    }

    canvas {
        width: 100%;
    }
}
</style>
