import './reset.scss';
import './element.scss';
import Vue from "vue";
import Element from "element-ui";

{
    /**
     * 输入框最大字符长度默认为20或50(textarea)
     * 输入框占位符默认未 "请输入"
     */
    let render = Element.Input.render;
    Element.Input.render = function() {
        if (!this.$attrs.maxlength) {
            this.$attrs.maxlength = this.type == "textarea" ? 50 : 20;
        } 
        if (!this.$attrs.placeholder) {
            this.$attrs.placeholder = "请输入";
        } 
        return render.apply(this, arguments);
    }
}

// 点击幕布不关闭浮层
Element.Dialog.props.closeOnClickModal.default = false;
Vue.use(Element, {size: "small"});