<template>
<div class="layout"
	:class="{'vertical-menu': !isLineMenu}"
	:style="{paddingLeft: menuWidth}">
	<el-menu
		ref="menu"
		class="menu"
		:mode="menuMode"
		:router="true"
		:collapse="isCollapse"
		:default-active="defaultAcitve"
		:unique-opened="true"
		:collapse-transition="false"
		:style="{width: menuWidth=='unset'?'100%':menuWidth}"
	>
		<div class="logo">
			<img src="./images/logo.png"
				alt="管理系统"
				@click.stop="toggleCollapse()">
			<span v-if="!isCollapse"
				class="app-name"
			>管理系统</span>
		</div>
		<!-- 根据目录数据（可能会从后端传来）渲染菜单 -->
		<!-- <template v-for="item in menu">
			<el-submenu
				v-if="item.children"
				:key="'s'+item.id"
				:index="item.path"
			>
				<template slot="title">
					<i :class="'icon-'+ item.icon"></i>
					<span slot="title">{{ item.title }}</span>
				</template>

				<el-menu-item
					v-for="it in item.children"
					:key="it.id"
					:index="it.path"
				>{{ it.title }}</el-menu-item>
			</el-submenu>

			<el-menu-item
				v-else
				:key="item.id"
				:index="item.path"
			>
				<i :class="'icon-'+ item.icon"></i>
				<span slot="title">{{ item.title }}</span>
			</el-menu-item>
		</template> -->

		<el-menu-item index="1">
			<span slot="title">处理中心</span>
		</el-menu-item>
		<el-submenu index="2">
			<template slot="title">
				<span slot="title">我的工作台</span>
			</template>
			<el-menu-item index="2-1">选项1</el-menu-item>
			<el-menu-item index="2-2">选项2</el-menu-item>
			<el-menu-item index="2-3">选项3</el-menu-item>
			<el-submenu index="2-4">
			<template slot="title">
				<span slot="title">选项4</span>
			</template>
			<el-menu-item index="2-4-1">选项1</el-menu-item>
			<el-menu-item index="2-4-2">选项2</el-menu-item>
			<el-menu-item index="2-4-3">选项3</el-menu-item>
			</el-submenu>
		</el-submenu>
		<el-menu-item index="3" disabled>
			<span slot="title">消息中心</span>
		</el-menu-item>
		<el-menu-item index="4">
			<span slot="title">订单管理</span>
		</el-menu-item>

		<user-action v-if="isLineMenu"></user-action>
	</el-menu>

	<header v-if="!isLineMenu" :style="{left: menuWidth}">
		<!-- 面包屑 -->
		<div class="breadcrumb-parent">
			<!-- 按钮：展开导航 -->
			<a href="javascript:void(0)"
				class="menu-toggle-btn"
				:class="isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold'"
				@click.stop="toggleCollapse"
			></a>

			<el-breadcrumb separator="/" v-if="breadList.length">
				<!-- 二级导航没有主页 :to="{ path: item.path }" -->
				<el-breadcrumb-item v-for="(item,index) in breadList"
					:key="index" :to="item.to">
					{{ item.name }}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<user-action></user-action>
	</header>

	<router-view class="container"/>
</div>
</template>

<script>
	export {default} from "./layout"
</script>

<style lang='scss' scoped>
	@import "./layout.scss";
</style>