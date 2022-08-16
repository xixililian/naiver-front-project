<!-- 底部悬浮栏容器 -->
<template>
    <div class="foot-bar" :style="{left}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'FootBar',
    inject: ["getMenuWidth"],

    computed: {
        menuWidth () {
            return this.getMenuWidth()
        },
        left () {
            if (this.menuWidth == "unset") return 0;
            else return this.menuWidth;
        }
    },
    created () {
        
    }
}
</script>

<style lang='scss' scoped>
    .foot-bar {
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 100;
        padding-left: 16px;
        padding-right: 16px;
        background-color: white;
        box-shadow: 0 -1px 1px #e6e6e6;
    }
</style>