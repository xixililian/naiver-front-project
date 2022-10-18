/**
 * 星号图标打分组件
 */

Component({
    properties: {
        /**
         * 总分，默认5（颗星）
         */
        total: {
            type: Number,
            value: 5
        },

        /**
         * 初始分，默认5分
         */
        score: {
            type: Number,
            value: 5,
            // observer (n, o) {}
        },
    },

    methods: {
        handleStarTap (e) {
            const {value} = e.currentTarget.dataset;
            this.triggerEvent("change", {
                value: parseInt(value)
            }, {})
        }
    }
})