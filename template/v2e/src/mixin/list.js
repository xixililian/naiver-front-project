/**
 * 
 * 这个文件定义了列表页的混入代码
 * 
 * 
 * 1、通用的 data 中的状态
 *    data.SP    保存了当前页面的查询参数
 *    data.total 保存了当前列表的总条数
 *    ...
 * 
 * 2、计算属性 totalPage 保存当前列表总页数
 * 
 * 3、通用的自定义配置属性
 *    noFetchFirst (求值为真: 列表页进入后不自动执行 fetchData 方法)
 *    noSaveState  (true: 不对listPageState做任何操作, 1:不保存，但要清除;)
 * 
 * 4、通用的方法:
 *    handlePlusSearchButton  点击高级搜索的折叠按钮
 *    SPtoSP_                 用生效状态覆盖临时状态
 *    SP_toSP                 用临时状态覆盖生效状态
 *    handleClearButton       点击清空按钮
 *    clearSP_                清除临时状态
 *    handleSearchButton      点击搜素
 *    getParams               获取状态数据
 *    handleInputEnter        在输入框敲回车
 *    handlePageSizeChange    修改每页的条数
 *    handlePageNoChange      跳转页码
 *    handleSelectionChange   勾选表格行事件
 * 
 * 5、create 钩子中, 会从 store 中恢复保存的列表查询状态，这样做的目的是，从列
 *    表页下级页面回到列表页时，列表页最大程度的保持离开前的状态。同时会自动执行
 *    一次 fetchData 方法。create 钩子的行为可以通过参数控制，见第3条说明
 * 
 */

export default {

    data () {
        return {
            SP           : {      // SP: URLSearchParams 表示列表查询参数
                pageSize : 10,
                pageNum  : 1
            },
            SP_          : {},    // 点击搜索按钮前，输入框里输入的查询参数
            total        : 0,     // 数据总条数

            tableData    : [],    // 表格数据
            checkedlist  : [],    // 选中的数据
            showPluspanel: false, // 高级搜索状态
			auth         : {}
        };
    },

    computed: {
        totalPage() {
            return Math.ceil(this.total / this.SP.pageSize);
        }
    },

    methods: {

        // 同步 SP 到 SP_
        SPtoSP_ () {
            for (let key in this.SP) {
                switch (key) {
                    case "pageSize":
                    case "pageNum":
                        break;

                    default: 
                        this.SP_[key] = this.SP[key]
                        break;
                }
            }
        },

        // 同步 SP_ 到 SP
        SP_toSP () {
            for (let key in this.SP_) {
                switch (key) {
                    case "pageSize":
                    case "pageNum":
                        break;

                    default: 
                        this.SP[key] = this.SP_[key]
                        break;
                }
            }
        },

        // 清空 SP_: 将高级搜索的字段恢复为默认值（见 data.SP_）
        clearSP_ () {
            for (let key in this.SP_) {
                const oVal = this.SP_[key];
                switch (key) {
                    case "pageSize":
                    case "pageNum":
                        break;

                    default: 
                        if (oVal instanceof Array) this.SP_[key] = [];
                        else if (oVal instanceof Object) this.SP_[key] = {};
                        else if (typeof oVal === "number") this.SP_[key] = 0;
                        else this.SP_[key] = "";
                        break;
                }
            }
            this.clearSP_trim?.()
        },

        // 提取干净的查询参数: 剔除空的字段，防止 get 查询参数太长超上限
        getParams (forExport) {
            const stateData = forExport ? this.SP_ : this.SP;
            const params = {};
            for (let key in stateData) {
                let _val = stateData[key];
                // 列表转换为字符串
                if (_val instanceof Array) _val = _val.join();
                // 空字段不传
                if (_val != null && _val !== "") (params[key] = _val);
            }

            return params;
        },

        // 点击 高级搜索
        handlePlusSearchButton (show) {
            const shouldOpen = typeof show === "boolean" ? show : !this.showPluspanel;

            if (shouldOpen) {
                this.SPtoSP_?.();
                this.showPluspanel = true;
            } else {
                this.showPluspanel = false;
            }
        },

        // 点击 搜索按钮
        handleSearchButton () {
            this.SP_toSP?.();
            this.SP.pageNum = 1;
            this.handlePlusSearchButton(false); // 关闭高级搜索面板
            this.savePageState();               // 保存列表状态
            this.fetchData();
        },

        // 在搜索栏的输入框按回车键
        handleInputEnter (e) {
            e.target.blur();
            this.handleSearchButton();
        },

        // 点击清空
        handleClearButton () {
            this.clearSP_();
            this.handleSearchButton()
        },

        // 分页组件发生 每页数据条数 改变事件
        handlePageSizeChange(e) {
            this.SP.pageSize = e;
            this.SP.pageNum = 1;
            this.SPtoSP_?.();
            this.savePageState(); // 保存列表状态
            this.fetchData();
        },

        // 分页组件发生 当前页 改变事件
        handlePageNoChange(e) {
            this.SP.pageNum = e;
            if (this.SPtoSP_) this.SPtoSP_();
            this.savePageState();
            this.fetchData();
        },

        // el-table 选中事件，更新 data
        handleSelectionChange(e) {
            this.checkedlist.splice(0, this.checkedlist.length, ...e);
        },

        // 获取页面数据
        fetchData() {
            console.warn("当前列表组件没有定义 fetchData 方法");
        },

        // 保存列表状态
        savePageState () {
            if (!!this.$options.noSaveState) return;
            const {noSaveState, name} = this.$options;
            if (!noSaveState) {
                this.$store.commit("saveListPageState", {
                    name: name,
                    params: this.SP
                })
            }
        }

    },

    created() {
        const {name, noSaveState, noFetchFirst} = this.$options;
        if (!noSaveState) {
            const {listPageState} = this.$store.state;
            if (listPageState) {
                if (listPageState?.name === name) {
                    const {params} = listPageState;
                    if (params instanceof Object) {
                        for (let key in params) this.SP[key] = params[key];
                        if (this.SPtoSP_) this.SPtoSP_();
                        
                        // 如果页面定义了回调（需要拿到状态执行更多操作），执行回调
                        const CB = this.callBackForListState;
                        if (typeof CB === "function") {
                            CB.call(this, params)
                        }
                    }
                } else {
                    // 清除缓存的列表状态
                    this.$store.commit("saveListPageState");
                }
            }
        } else if (noSaveState === 1) {
            // 清除缓存的列表状态
            this.$store.commit("saveListPageState");
        }

        if (!noFetchFirst) this.fetchData();
    }
}