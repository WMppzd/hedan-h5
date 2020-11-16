<template>
    <div id="app">
        <keep-alive :include="keepAlive">
            <router-view />
        </keep-alive>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            keepAlive: []
        };
    },
};
</script>

<style lang="scss">
html,
body,
#app {
    width: 100%;
    height: 100%;
    background-color: $bg_c;
}
.router-view-c {
    position: absolute;
    transition: opacity 0.5s, transform 0.5s;
    width: 100%;
    height: 100%;
}
.router-fade-enter-active,
.router-fade-leave-active {
    transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
    opacity: 0;
}
.passport-toast {
    width: auto;
    padding: 35px 50px 33px;
    min-height: auto;
    border-radius: 15px;
    i {
        font-size: 40px;
    }
    div {
        margin-top: 25px;
        font-size: 26px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        max-width: 282px;
    }
}
.van-cell::after {
    border: none;
}
</style>
