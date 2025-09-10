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
                                { id: 'renewable-low', label: '低比例 (20%)', value: 20 },
                                { id: 'renewable-medium', label: '中比例 (40%)', value: 40 },
                                { id: 'renewable-high', label: '高比例 (60%)', value: 60 }
                            ]
                        },
                        {
                            id: 'coal-ratio',
                            label: '煤炭比例',
                            children: [
                                { id: 'coal-low', label: '低比例 (10%)', value: 10 },
                                { id: 'coal-medium', label: '中比例 (30%)', value: 30 },
                                { id: 'coal-high', label: '高比例 (50%)', value: 50 }
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
                                { id: 'carbon-strict', label: '严格目标 (-65%)', value: -65 },
                                { id: 'carbon-moderate', label: '适中目标 (-40%)', value: -40 },
                                { id: 'carbon-loose', label: '宽松目标 (-20%)', value: -20 }
                            ]
                        },
                        {
                            id: 'emission-cap',
                            label: '排放上限',
                            children: [
                                { id: 'emission-low', label: '低上限 (80亿吨)', value: 8000000000 },
                                { id: 'emission-medium', label: '中上限 (100亿吨)', value: 10000000000 },
                                { id: 'emission-high', label: '高上限 (120亿吨)', value: 12000000000 }
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
                                { id: 'gdp-low', label: '低增长 (4%)', value: 4 },
                                { id: 'gdp-medium', label: '中增长 (6%)', value: 6 },
                                { id: 'gdp-high', label: '高增长 (8%)', value: 8 }
                            ]
                        },
                        {
                            id: 'energy-price',
                            label: '能源价格水平',
                            children: [
                                { id: 'price-low', label: '低价格', value: 'low' },
                                { id: 'price-medium', label: '中等价格', value: 'medium' },
                                { id: 'price-high', label: '高价格', value: 'high' }
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
                                { id: 'tech-slow', label: '缓慢进步', value: 'slow' },
                                { id: 'tech-normal', label: '正常进步', value: 'normal' },
                                { id: 'tech-fast', label: '快速进步', value: 'fast' }
                            ]
                        },
                        {
                            id: 'innovation-level',
                            label: '创新投入水平',
                            value: 0
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            expandedCategories: {},
            expandedSubcategories: {},
            selectedPolicies: {}
        };
    },
    mounted() {
        this.initParameterTree();
        console.log('能源政策模拟器已加载');
    },
    methods: {
        selectScenario(scenarioId) {
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
            console.log('节点点击事件触发:', data);

            // 只有叶子节点才能被选择（没有children属性或children为空）
            if (!data.children || data.children.length === 0) {
                console.log('这是叶子节点，可以选择');

                // 递归取消所有叶子节点的选中状态
                this.clearAllSelections(this.treeData);

                // 设置当前节点为选中状态
                this.$set(data, 'selected', true);
                this.$forceUpdate();

                console.log('=== 当前选择的参数 ===');
                console.log('ID:', data.id);
                console.log('标签:', data.label);
                console.log('值:', data.value);
                console.log('选中状态:', data.selected);
                console.log('========================');
            } else {
                console.log('这是父节点，不能选择');
            }
        },
        // 递归清除所有选中状态
        clearAllSelections(nodes) {
            nodes.forEach(node => {
                if (!node.children || node.children.length === 0) {
                    this.$set(node, 'selected', false);
                } else if (node.children) {
                    this.clearAllSelections(node.children);
                }
            });
        },
        allowDrop(draggingNode, dropNode, type) {
            return false; // 禁用拖拽
        },
        renderContent(h, { node, data, store }) {
            if (!data.children || data.children.length === 0) {
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