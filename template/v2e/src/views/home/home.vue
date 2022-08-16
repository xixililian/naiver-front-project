<template>
    <div class="page page-home">
        <template v-if="showloginOut">你已退出登录！</template>
        <template v-else>欢迎！</template>
        <foot-bar>vczvz</foot-bar>
    </div>
</template>

<script src="./home"></script>

<style lang="scss" scoped>
    @import "./home.scss";
</style>