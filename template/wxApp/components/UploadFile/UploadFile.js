/**
 * 图片上传，回显、预览组件
 * 文件的预览功能待完善
 */

const GD = getApp().globalData;

Component({
    properties: {
        /**
         * 接口的基础url
         */
        baseUrl: {
            type: String,
            value: GD?.url || "/"
        },

        /**
         * 图片上传接口的 url (相对于 baseUrl 的相对路径)
         */
        uploadUrl: {
            type: String,
            value: "api/common/fileSingleUpLoad"
        },

        /**
         * 初始文件
         * [必须] item.path 是图片在服务器上的相对路径
         * item.tempPath    是页面显示的资源路径
         */
        files: {
            type: Array,
            value: [],
            // observer (n, o) {}
        },

        /**
         * 数量限制，最多可以上传多少哥
         */
        limit: {
            type: Number,
            value: 5
        },

        /**
         * 文件大小限制，单位为k，默认5M
         */
        sizeLimit: {
            type: Number,
            value: 5120
        },

        /**
         * 文件呢类型限制, 可选 ['image', 'video', 'mix']
         */
         mediaType: {
            type: String,
            value: ["image"]
        },

        /**
         * 展位格（添加按钮）的说明文字
         */
        holdText: {
            type: String,
            value: "添加图片"
        }
    },

    data: {
        holdingFile: [],  // 上传过程中，这里面的图片将会暂时显示在预期位置
        uploading: false, // 上传状态
    },

    methods: {
        /**
         * 点击添加按钮事件处理
         * @returns promise[fulfilled]
         */
        async handleHolderTap () {
            if (this.loading) return wx.showToast({title: "请等待上传完毕"});

            try {
                const res = await wx.chooseMedia({
                    count: this.properties.limit - this.properties.files.length,
                    mediaType: this.properties.mediaType
                });

                // 检查选择的文件大小是否超过了限制
                console.log("选择的文件", res)
                let files = res?.tempFiles || [], exceedCount = 0;
                files = files.filter(item => {
                    if (item.size > this.properties.sizeLimit) {
                        exceedCount++;
                        return false;
                    }
                    else return true;
                })
                if (exceedCount) await wx.showModal({
                    title: '提示',
                    content: `${exceedCount}张图片超过5M, 已忽略`,
                    showCancel: false
                });

                // 发起请求
                const paths = files.map(({tempFilePath}) => tempFilePath)
                this.setData({
                    holdingFile: paths,
                    uploading: true
                })
                wx.showLoading({
                    title: "上传中",
                    mask: true
                });
                const uploadResult = await this.uploadFile(paths);

                // 检查请求的结果，并反馈到界面
                let failCount = 0;
                const success = [];
                uploadResult.forEach(res => {
                    if (res.status != "fulfilled") failCount++;
                    else {
                        success.push(res.value);
                    }
                })
                if (failCount) wx.showToast({
                    title: `${failCount}张上传失败`,
                    icon: 'error'
                });
                this.properties.files.push(...success);
                this.triggerChange();

            } catch (reason) {
                if (reason.errMsg == "chooseMedia:fail cancel") console.log("取消选择");
                console.warn("上传出错", reason);
            }

            this.setData({
                holdingFile: [],
                loading: false
            })
            wx.hideLoading();
        },

        /**
         * 发起 http请求 上传图片
         * @param {上传的文件列表，包含} paths 
         * @returns promise[fulfilled]
         */
        uploadFile (paths) {
            return Promise.allSettled(paths.map(path => {
                const filePath = path;
                return new Promise((resolve, reject) => {
                    wx.uploadFile({
                        url: this.properties.baseUrl + this.properties.uploadUrl,
                        filePath,
                        name: "file",
                        success: (result) => {
                            if (result.statusCode !== 200) return reject({
                                msg: "网络错误"
                            });
                            const res = JSON.parse(result.data);
                            if (res.code !== 2000) return reject(res);

                            const {data: {files: {filePath: path}}} = res;
                            resolve({
                                tempPath: filePath,
                                // path: baseUrl + path,
                                path
                            })
                        },
                        fail: err => {
                            reject(err)
                        }
                    });                   
                })
            }))
        },

        /**
         * 点击图片事件处理
         */
        handleImageTap (e) {
            const {index} = e.currentTarget.dataset;
            const urls = this.properties.files.map(item => 
                item.tempPath || baseUrl+item.path);
            wx.previewImage({
                current: urls[index],
                urls
            });    
        },

        /**
         * 点击图片上的删除按钮事件处理
         */
        async handleDeleteTap (e) {
            const res = await wx.showModal({
                title: '提示',
                content: '删除吗?'
            });

            if (res.confirm) {
                const {index} = e.currentTarget.dataset;
                const {files} = this.properties;
                files.splice(index,1);
                this.triggerChange();                        
            }
        },

        /**
         * 触发本组件的 change 事件
         */
        triggerChange () {
            this.triggerEvent("change", {
                files: this.properties.files
            }, {})
        }
    }
})