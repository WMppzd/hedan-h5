<template>
    <div class="test">
        <canvas id="imageView"></canvas>
    </div>
</template>
<script>
import 'script-loader!createjs/builds/1.0.0/createjs.min.js';
import zuobiao from '../../utils/zuobiao';
export default {
    data() {
        return {
            selectList: []
        };
    },
    created() {
        // this.selectList = this.$route.query.list;
        for (const key in zuobiao) {
            this.selectList.push(key);
        }
        console.log(this.selectList);
    },
    mounted() {
        var _this = this;
        var stage = new createjs.Stage('imageView');
        var image = new Image();
        image.src = require('../../assets/business/bg.svg');
        image.onload = handlerImageLoad;
        // 通过画布ID 创建一个 Stage 实例
        function handlerImageLoad(event) {
            // 创建一个 Bitmap 实例
            var theBitmap = new createjs.Bitmap(image);
            // 设置画布大小等于图片实际大小
            console.log(theBitmap);
            stage.canvas.width = theBitmap.image.naturalWidth;
            stage.canvas.height = theBitmap.image.naturalHeight;
            theBitmap.set({ x: 0, y: 0, scaleX: 1, scaleY: 1 });
            // 把Bitmap 实例添加到 stage 的显示列表中
            stage.addChild(theBitmap);
            var image1 = new Image();
            image1.src = require('../../assets/business/zb.svg');
            image1.onload = () => {
                _this.selectList.forEach((ele) => {
                    for (const key in zuobiao) {
                        if (key.includes(ele)) {
                            console.log(ele, key);
                            let theBitmap1 = new createjs.Bitmap(image1);
                            console.log(zuobiao[key].x, zuobiao[key].y);
                            theBitmap1.set({ x: zuobiao[key].x - 20, y: zuobiao[key].y - 30 });
                            stage.addChild(theBitmap1);
                        }
                    }
                });
                stage.update();
            };
            console.log(stage);
            // 更新 stage 渲染画面
        }
    }
};
</script>
<style lang="scss" scoped>
.test {
    width: 100%;
    height: 100%;
    background-color: #000;
    canvas {
        width: 100%;
    }
}
</style>