Vue.prototype.$window = window;
let vm = new Vue({
    el: "#app",
    data: function () {
        return {
            input3: "",
            select: "",
            // 新情景数据
            scenarios: [
                { id: 1, name: '基准情景', active: true },
                { id: 2, name: '低碳情景', active: false },
                { id: 3, name: '高碳情景', active: false },
                { id: 4, name: '自定义情景', active: false }
            ],
            // el-tree 数据结构
            treeData: [
                {
                    id: 'energy-structure',
                    label: '能源结构参数',
                    children: [
                        {
                            id: 'renewable-ratio',
                            label: '可再生能源比例',
                            children: [
                                { id: 'renewable-low', label: '低比例 (20%)', value: 20, selected: false, isLeaf: true },
                                { id: 'renewable-medium', label: '中比例 (40%)', value: 40, selected: false, isLeaf: true },
                                { id: 'renewable-high', label: '高比例 (60%)', value: 60, selected: true, isLeaf: true }
                            ]
                        },
                        {
                            id: 'coal-ratio',
                            label: '煤炭比例',
                            children: [
                                { id: 'coal-low', label: '低比例 (10%)', value: 10, selected: false, isLeaf: true },
                                { id: 'coal-medium', label: '中比例 (30%)', value: 30, selected: true, isLeaf: true },
                                { id: 'coal-high', label: '高比例 (50%)', value: 50, selected: false, isLeaf: true }
                            ]
                        }
                    ]
                },
                {
                    id: 'emission-parameters',
                    label: '排放参数',
                    children: [
                        {
                            id: 'carbon-intensity',
                            label: '碳强度目标',
                            children: [
                                { id: 'carbon-strict', label: '严格目标 (-65%)', value: -65, selected: false, isLeaf: true },
                                { id: 'carbon-moderate', label: '适中目标 (-40%)', value: -40, selected: true, isLeaf: true },
                                { id: 'carbon-loose', label: '宽松目标 (-20%)', value: -20, selected: false, isLeaf: true }
                            ]
                        },
                        {
                            id: 'emission-cap',
                            label: '排放上限',
                            children: [
                                { id: 'emission-low', label: '低上限 (80亿吨)', value: 8000000000, selected: false, isLeaf: true },
                                { id: 'emission-medium', label: '中上限 (100亿吨)', value: 10000000000, selected: true, isLeaf: true },
                                { id: 'emission-high', label: '高上限 (120亿吨)', value: 12000000000, selected: false, isLeaf: true }
                            ]
                        }
                    ]
                },
                {
                    id: 'economic-parameters',
                    label: '经济参数',
                    children: [
                        {
                            id: 'gdp-growth',
                            label: 'GDP增长率',
                            children: [
                                { id: 'gdp-low', label: '低增长 (4%)', },
                                { id: 'gdp-medium', label: '中增长 (6%)', value: 6, selected: true, isLeaf: true },
                                { id: 'gdp-high', label: '高增长 (8%)', value: 8, selected: false, isLeaf: true }
                            ]
                        },
                        {
                            id: 'energy-price',
                            label: '能源价格水平',
                            children: [
                                { id: 'price-low', label: '低价格', value: 'low', selected: false, isLeaf: true },
                                { id: 'price-medium', label: '中等价格', value: 'medium', selected: true, isLeaf: true },
                                { id: 'price-high', label: '高价格', value: 'high', selected: false, isLeaf: true }
                            ]
                        }
                    ]
                },
                {
                    id: 'technology-parameters',
                    label: '技术参数',
                    children: [
                        {
                            id: 'tech-progress',
                            label: '技术进步速度',
                            children: [
                                { id: 'tech-slow', label: '缓慢进步', value: 'slow', selected: false, isLeaf: true },
                                { id: 'tech-normal', label: '正常进步', value: 'normal', selected: true, isLeaf: true },
                                { id: 'tech-fast', label: '快速进步', value: 'fast', selected: false, isLeaf: true }
                            ]
                        },
                        {
                            id: 'innovation-level',
                            label: '创新投入水平',
                            children: [
                                { id: 'innovation-low', label: '低投入 (GDP的1%)', value: 1, selected: false, isLeaf: true },
                                { id: 'innovation-medium', label: '中投入 (GDP的2%)', value: 2, selected: true, isLeaf: true },
                                { id: 'innovation-high', label: '高投入 (GDP的3%)', value: 3, selected: false, isLeaf: true }
                            ]
                        }
                    ]
                }
            ],
            // el-tree 配置
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            // 政策树展开状态
            expandedCategories: {},
            expandedSubcategories: {},
            // 政策选择状态
            selectedPolicies: {}
        };
    },
    mounted() {
        this.initParameterTree();
        console.log('能源政策模拟器已加载');
    },
    methods: {
        selectScenario(scenarioId) {
            // 重置所有情景状态
            this.scenarios.forEach(scenario => {
                scenario.active = false;
            });
            // 激活选中的情景
            const selectedScenario = this.scenarios.find(s => s.id === scenarioId);
            if (selectedScenario) {
                selectedScenario.active = true;
            }
            console.log('选择情景:', scenarioId);
        },
        initParameterTree() {
            // 为单选按钮添加事件监听
            const radioButtons = document.querySelectorAll('input[type="radio"][name="scenario"]');
            radioButtons.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        this.selectScenario(parseInt(e.target.value));
                    }
                });
            });
        },
        // el-tree 节点点击事件
        handleNodeClick(data, node, component) {
            // 只有叶子节点才能被选择
            if (data.isLeaf) {
                // 找到同级的所有叶子节点，取消选中状态
                const parent = node.parent;
                if (parent && parent.data.children) {
                    parent.data.children.forEach(child => {
                        if (child.isLeaf) {
                            child.selected = false;
                        }
                    });
                }

                // 设置当前节点为选中状态
                data.selected = true;

                console.log('参数选择:', data.label, data.value);
            }
        },
        // 检查节点是否可选择（只有叶子节点可选择）
        allowDrop(draggingNode, dropNode, type) {
            return false; // 禁用拖拽
        },
        // 自定义节点内容渲染
        renderContent(h, { node, data, store }) {
            if (data.isLeaf) {
                return h('span', {
                    class: {
                        'tree-leaf-node': true,
                        'selected': data.selected
                    }
                }, [
                    h('span', {
                        class: 'parameter-label'
                    }, data.label)
                ]);
            } else {
                return h('span', {
                    class: 'tree-folder-node'
                }, [
                    h('i', {
                        class: node.expanded ? 'el-icon-folder-opened' : 'el-icon-folder'
                    }),
                    h('span', data.label)
                ]);
            }
        }
    }
});
console.log("Energy Policy Simulator initialized", vm)