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
        this.selectList = this.$route.query.list;
        console.log(this.selectList);
    },
    mounted() {
       
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