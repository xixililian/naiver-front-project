<template>
	<div class="login-page">
		<el-form ref="loginForm" :model="loginForm" :rules="loginFormRules">
			<h3 class="login-page--title">请登录</h3>

			<el-form-item prop="phone">
				<el-input size="large" v-model.trim="loginForm.phone"
					placeholder="请输入您的账号">
				</el-input>
			</el-form-item>

			<el-form-item prop="password">
				<el-input size="large" v-model.trim="loginForm.password"
					type="password" placeholder="请输入您的密码">
				</el-input>
			</el-form-item>

			<el-form-item>
				<el-button size="large" type="primary"
					@click="handleSubmitLogin">登录
				</el-button>
			</el-form-item>
		</el-form>

		<Vcode
			:imgs="verifyImages"
			:show="showVerify"
			:canvasHeight="155"
			:canvasWidth="305"
			@success="onSuccess"
		></Vcode>
	</div>
</template>

<script>
	export { default } from "./login";
</script>

<style lang='scss' scoped>
	@import "./login";
</style>