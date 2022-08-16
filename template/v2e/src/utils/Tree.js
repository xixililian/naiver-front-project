class Tree {
    // 接收扁平的节点数组
    constructor (opt={}) {
        // flatArray, nameKey = "name", childKey = "children"
        this.__nameKey   = opt.nameKey   || "name";
        this.__childKey  = opt.childKey  || "children";
        this.__parentKey = opt.parentKey || "parent";
        this[this.__nameKey] = "全部";
        this.id = 0;
        this[this.__childKey] = []
        
        if (opt.list instanceof Array) {
            const flatArray  = opt.list;
            this.flatArray = [...flatArray]
            this.init(flatArray)
        }
    }

    // 将扁平的节点数组格式化
    init (flatArray) {
        if (!flatArray.length) return;

        const {__childKey} = this;
        const item = flatArray.pop();
        if (!parseInt(item[this.__parentKey])) this[__childKey].unshift(item);
        else {
            const parent = flatArray.find(it => it.id === item[this.__parentKey]) ||
                this.find(item[this.__parentKey]);
            if (parent) {
                if (!(parent[__childKey] instanceof Array))
                    parent[__childKey] = [];
                parent[__childKey].unshift(item)
            }
        }

        this.init(flatArray)
    }

    // 传入节点id, 查找节点
    find (id, parent=this) {
        if (!id) return this;
        
        const {__childKey} = this;
        if (
            !(parent[__childKey] instanceof Array) ||
            !parent[__childKey].length
        ) return null;

        for (let i = 0; i < parent[__childKey].length; i++) {
            const it = parent[__childKey][i];
            if (it.id === id) return it;

            else {
                const found = this.find(id, it);
                if (found) return found
            }
        }

        return null;
    }
}

export default Tree;