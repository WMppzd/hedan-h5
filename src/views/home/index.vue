<template>
    <div class="home"></div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'home',
    data() {
        return {};
    },
    components: {},
    computed: {
        ...mapGetters({
            token: 'token'
        })
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        Toast.clear();
    },
    methods: {},
    created() {}
};
</script>

<style lang="scss" scoped>
</style>
