<!--
 * @Author: wp
 * @Description: 安全的按钮 模仿网易
-->
<template>
	<div
		class="safe_intellisense safe_intellisense--light"
		:class="currSafeStatusClass"
	>
		<div class="safe_intelli-control">
			<div
				class="safe_intelli-tips"
				@click="handleValidateSafe"
			>
				<div class="safe_intelli-icon">
					<span class="safe_logo"></span>
					<span class="safe_intelli-loading"></span>
					<div class="safe_ball-scale-multiple">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
				<span class="safe_intelli-text">{{validateRemindText}}</span>
			</div>
			<div class="safe_classic-tips">
				<span class="safe_tips__icon"></span>
				<span class="safe_tips__text safe-fallback__tip">{{validateStatusText}}</span>
			</div>
		</div>
		<div class="safe_classic-container">
			<div class="safe_classic-wrapper"></div>
		</div>
	</div>
</template>

<script>
const defalutSafePrefixCls = "safe_intellisense--";
export default {
	name: "ViewSafe",
	data() {
		return {
			currSafeStatusClass: "",
			validateStatusText: "",
			validateRemindText: "点击完成验证"
		};
	},
	props: {
		validateStatus: {
			defalut: false,
			type: Boolean
		},
		hasResetValidateStyle: {
			defalut: false,
			type: Boolean
		}
	},
	watch: {
		hasResetValidateStyle(newRvs) {
			if (newRvs) this.resetValidateStyle();
		}
	},
	methods: {
		// 重置验证的样式
		resetValidateStyle() {
			this.currSafeStatusClass = "";
			this.validateRemindText = "点击完成验证";
		},
		// 点击验证安全
		handleValidateSafe() {
			this.currSafeStatusClass = defalutSafePrefixCls + "checking";
			this.fetchSafeInterface();
		},
		// 请求接口
		fetchSafeInterface() {
			this.validateRemindText = "正在验证中...";
			setTimeout(() => {
				this.judgeValidateStatus(true);
			}, 600);
		},
		// 判断验证的状态
		judgeValidateStatus(hasValidateSuccess) {
			this.$emit("update:hasResetValidateStyle", false);
			if (hasValidateSuccess) {
				this.currSafeStatusClass = defalutSafePrefixCls + "success";
				this.validateStatusText = "验证成功";
				this.$emit("update:validateStatus", true);
			} else {
				this.currSafeStatusClass = defalutSafePrefixCls + "error";
				this.validateStatusText = "验证失败";
				this.$emit("update:validateStatus", false);
				setTimeout(() => {
					this.currSafeStatusClass = "";
					this.validateRemindText = "再次点击验证";
				}, 500);
			}
		}
	}
};
</script>
<style lang="scss">
$--color-primary: #CD944D;
@keyframes loading {
	0% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}

	100% {
		-webkit-transform: rotate(1turn);
		transform: rotate(1turn);
	}
}
@keyframes ball-scale-multiple {
	0% {
		-webkit-transform: scale(0.22);
		transform: scale(0.22);
		opacity: 0;
	}
	5% {
		opacity: 1;
	}
	to {
		-webkit-transform: scale(1);
		transform: scale(1);
		opacity: 0;
	}
}
.safe_intellisense--light .safe_classic-tips .safe_tips__icon,
.safe_intellisense--light .safe_intelli-icon {
	display: inline-block;
	*display: inline;
	zoom: 1;
	vertical-align: top;
}

.safe_intellisense--light {
	position: relative;
}

.safe_intellisense--light * {
	box-sizing: border-box;
}

.safe_intellisense--light.safe_intellisense--checking .safe_intelli-control,
.safe_intellisense--light.safe_intellisense--loadfail .safe_intelli-control,
.safe_intellisense--light.safe_intellisense--loading .safe_intelli-control,
.safe_intellisense--light.safe_intellisense--success .safe_intelli-control {
	cursor: default;
}

.safe_intellisense--light .safe_intelli-control {
	position: relative;
	height: 44px;
	line-height: 28px;
	font-size: 14px;
	cursor: pointer;
	border-radius: 2px;
	border: 1px solid #dcdcdc;
	background-color: #FEF8F1;
	overflow: hidden;
}

.safe_intellisense--light .safe_intelli-tips {
	text-align: center;
	color: #303133;
}

.safe_intellisense--light .safe_intelli-tips:hover .safe_intelli-icon {
	background-color: $--color-primary;
	box-shadow: 0 2px 6px 1px rgba($color: $--color-primary, $alpha: .5)
}

.safe_intellisense--light
	.safe_intelli-tips:hover
	.safe_intelli-icon
	.safe_logo {
	background-image: url("./images/icon_safe.png");
	background-position: 0 -82px;
	background-size: 32px 112px;
}

.safe_intellisense--light .safe_intelli-tips:hover .safe_intelli-text {
	color: $--color-primary;
}

.safe_intellisense--light .safe_intelli-icon {
	position: relative;
	margin-right: 5px;
	width: 28px;
	height: 28px;
	vertical-align: middle;
	border-radius: 50%;
	background-color: #fff;
	box-shadow: 0 2px 8px 1px rgba(188, 196, 204, 0.5);
	transition: all 0.2s linear;
}

.safe_intellisense--light .safe_intelli-icon .safe_logo {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -8px;
	margin-left: -7px;
	width: 14px;
	height: 16px;
	background-image: url("./images/icon_safe.png");
	background-position: 0px -172px;
	background-size: 32px 112px;
}

.safe_intellisense--light .safe_intelli-icon img.safe_logo {
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	margin: 0;
	border-radius: 50%;
	background-image: none !important;
}

.safe_intellisense--light .safe_intelli-text {
	line-height: 42px;
	vertical-align: middle;
	transition: all 0.2s linear;
}

.safe_intellisense--light .safe_classic-tips {
	display: none;
	text-align: center;
}

.safe_intellisense--light .safe_classic-tips .safe_tips__icon {
	margin-right: 5px;
	width: 12px;
	height: 12px;
	vertical-align: middle;
}

.safe_intellisense--light .safe_classic-tips .safe_tips__text {
	line-height: 42px;
	vertical-align: middle;
}

.safe_intellisense--light .safe_classic-container {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
}

.safe_intellisense--light .safe_classic-wrapper {
	display: none;
	padding: 9px;
	border: 1px solid #dcdfe6;
	border-radius: 2px;
	background-color: #fff;
}

.safe_intellisense--light.safe_intellisense--checking .safe_intelli-icon,
.safe_intellisense--light.safe_intellisense--loading .safe_intelli-icon {
	background-color: $--color-primary;
}

.safe_intellisense--light.safe_intellisense--checking
	.safe_intelli-icon
	.safe_logo,
.safe_intellisense--light.safe_intellisense--loading
	.safe_intelli-icon
	.safe_logo {
	background-image: url("./images/icon_safe.png");
	background-position: 0 -82px;
	background-size: 32px 112px;
}

.safe_intellisense--light.safe_intellisense--checking .safe_intelli-text,
.safe_intellisense--light.safe_intellisense--loading .safe_intelli-text {
	color: $--color-primary;
}

.safe_intellisense--light.safe_intellisense--checking
	.safe_ball-scale-multiple {
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translateY(-80px);
	transform: translateY(-80px);
}

.safe_intellisense--light.safe_intellisense--checking
	.safe_ball-scale-multiple
	> div:nth-child(2) {
	-webkit-animation-delay: -1.2s;
	animation-delay: -1.2s;
}

.safe_intellisense--light.safe_intellisense--checking
	.safe_ball-scale-multiple
	> div:nth-child(3) {
	-webkit-animation-delay: -0.6s;
	animation-delay: -0.6s;
}

.safe_intellisense--light.safe_intellisense--checking
	.safe_ball-scale-multiple
	> div {
	position: absolute;
	box-shadow: inset 0 0 40px rgba($color: $--color-primary, $alpha: .5);
	border-radius: 100%;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
	left: -80px;
	top: 0;
	opacity: 0;
	width: 160px;
	height: 160px;
	-webkit-animation: ball-scale-multiple 1.8s 0s linear infinite;
	animation: ball-scale-multiple 1.8s 0s linear infinite;
}

.safe_intellisense--light.safe_intellisense--loading .safe_logo {
	display: none;
}

.safe_intellisense--light.safe_intellisense--loading .safe_intelli-loading {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -8px;
	margin-left: -8px;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border-width: 2px;
	border-style: solid;
	border-color: #fff #fff transparent;
	-webkit-animation: loading 0.75s linear infinite;
	animation: loading 0.75s linear infinite;
	background-position: 0 0;
}

.safe_intellisense--light.safe_intellisense--error .safe_intelli-tips,
.safe_intellisense--light.safe_intellisense--loadfail .safe_intelli-tips,
.safe_intellisense--light.safe_intellisense--success .safe_intelli-tips {
	display: none;
}

.safe_intellisense--light.safe_intellisense--error .safe_classic-tips,
.safe_intellisense--light.safe_intellisense--loadfail .safe_classic-tips,
.safe_intellisense--light.safe_intellisense--success .safe_classic-tips {
	display: block;
}

.safe_intellisense--light.safe_intellisense--success .safe_intelli-control {
	border-color: #52ccba;
	background-color: #d2f4ef;
}

.safe_intellisense--light.safe_intellisense--success .safe_classic-tips {
	color: #52ccba;
}

.safe_intellisense--light.safe_intellisense--success .safe_tips__icon {
	width: 17px;
	background-image: url("./images/icon_safe.png");
	background-position: 0 -2px;
	background-size: 32px 112px;
}

.safe_intellisense--light.safe_intellisense--error .safe_intelli-control,
.safe_intellisense--light.safe_intellisense--loadfail .safe_intelli-control {
	border-color: #f57a7a;
	background-color: #fce1e1;
}

.safe_intellisense--light.safe_intellisense--error .safe_classic-tips,
.safe_intellisense--light.safe_intellisense--loadfail .safe_classic-tips {
	color: #f57a7a;
}

.safe_intellisense--light.safe_intellisense--error .safe_tips__icon,
.safe_intellisense--light.safe_intellisense--loadfail .safe_tips__icon {
	background-image: url("./images/icon_safe.png");
	background-position: 0 -32px;
	background-size: 32px 112px;
}

.safe_intellisense--light.safe_intellisense--maxerror
	.safe_intelli-control
	.safe_tips__text:hover {
	cursor: pointer;
	text-decoration: underline;
}
</style>
