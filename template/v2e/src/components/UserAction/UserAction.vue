<!-- 用户账号操作菜单 -->
<template>
    <!-- 头像与退出 -->
    <el-popover
        class="user-brief"
        placement="bottom"
        width="150"
        trigger="hover">
        <div slot="reference" class="user-head">
            <el-avatar :size="30"
                :src="defaultAvatar">
            </el-avatar><span class="user-name">
                张三(管理员)
            </span><i class="el-icon-caret-bottom"></i>
        </div>

        <ul class="user-actions">
            <li class="user-action"
                @click="handleAvatarClick"
            >个人中心</li>
            <li class="user-action"
                @click="handleSignOut"
            >安全退出</li>
        </ul>
    </el-popover>
</template>

<script>
const defaultAvatar = require("./avatar.png");
export default {
    name: 'UserAction',
    data () {
        return {
            defaultAvatar,
        }
    },

    methods: {
		// 点击头像
		handleAvatarClick() {
			if (this.$route.path !== "/setting")
				this.$router.push("/setting");
		},

		// 点击退出
		async handleSignOut() {

			try {
				await this.$confirm('确定要退出登录吗?', '提示');
				const res = await this.$axios({
					url: "/api/outSystem",
					method: "post"
				})

				if (res.code === 2000) {
					this.$store.commit("clearUserInfo");
				} else throw res;

			} catch (reason) {
				if (reason != "cancel") {
					console.warn("退出失败, reason");
				}
			}
		},
    }
}
</script>

<style lang='scss' scoped>
.user-brief {
    cursor: pointer;
}
.el-avatar {
    background-color: unset;
}
.user-head {
    display: flex;
    align-items: center;
}
.user-name {
    color: #909399;
    margin: 0 8px;
}

.user-actions {
    padding: 8px 0;

    li {
        padding: 0 16px;
        line-height: 32px;
        cursor: pointer;
        &:hover {
            background-color: rgba($color: #2A79FF, $alpha: .1);
            color: #2878FF;
        }
    }
}
</style>