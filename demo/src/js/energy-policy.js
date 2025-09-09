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
			// 政策树展开状态
			expandedCategories: {},
			expandedSubcategories: {},
			// 政策选择状态
			selectedPolicies: {}
		};
	},
	mounted() {
		this.initPolicyTree();
	},
	methods: {
		// 初始化政策树
		initPolicyTree() {
			// 添加点击事件监听
			this.$nextTick(() => {
				// 分类展开/收起
				document.querySelectorAll('.category-header').forEach(header => {
					header.addEventListener('click', (e) => {
						if (e.target.type !== 'checkbox') {
							this.toggleCategory(header);
						}
					});
				});
				
				// 子分类展开/收起
				document.querySelectorAll('.subcategory-header').forEach(header => {
					header.addEventListener('click', (e) => {
						if (e.target.type !== 'checkbox') {
							this.toggleSubcategory(header);
						}
					});
				});
				
				// 复选框事件
				document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
					checkbox.addEventListener('change', (e) => {
						this.handleCheckboxChange(e.target);
					});
				});
			});
		},
		
		// 切换分类展开状态
		toggleCategory(header) {
			const category = header.closest('.policy-category');
			const items = category.querySelector('.policy-items');
			const arrow = header.querySelector('i');
			
			if (items.style.display === 'none' || !items.style.display) {
				items.style.display = 'block';
				arrow.classList.add('expanded');
			} else {
				items.style.display = 'none';
				arrow.classList.remove('expanded');
			}
		},
		
		// 切换子分类展开状态
		toggleSubcategory(header) {
			const subcategory = header.closest('.policy-subcategory');
			const items = subcategory.querySelector('.policy-subitems');
			const arrow = header.querySelector('i');
			
			if (items.style.display === 'none' || !items.style.display) {
				items.style.display = 'block';
				arrow.classList.add('expanded');
			} else {
				items.style.display = 'none';
				arrow.classList.remove('expanded');
			}
		},
		
		// 处理复选框变化
		handleCheckboxChange(checkbox) {
			const isChecked = checkbox.checked;
			const container = checkbox.closest('.policy-category, .policy-subcategory, .policy-item');
			
			// 如果是分类或子分类的复选框，同时选中/取消所有子项
			if (container.classList.contains('policy-category')) {
				const subCheckboxes = container.querySelectorAll('input[type="checkbox"]');
				subCheckboxes.forEach(cb => {
					if (cb !== checkbox) {
						cb.checked = isChecked;
					}
				});
			} else if (container.classList.contains('policy-subcategory')) {
				const subCheckboxes = container.querySelectorAll('.policy-item input[type="checkbox"]');
				subCheckboxes.forEach(cb => {
					cb.checked = isChecked;
				});
			}
			
			// 更新父级复选框状态
			this.updateParentCheckboxes(checkbox);
		},
		
		// 更新父级复选框状态
		updateParentCheckboxes(checkbox) {
			const item = checkbox.closest('.policy-item');
			if (item) {
				const subcategory = item.closest('.policy-subcategory');
				if (subcategory) {
					const subcategoryCheckbox = subcategory.querySelector('.subcategory-header input[type="checkbox"]');
					const itemCheckboxes = subcategory.querySelectorAll('.policy-item input[type="checkbox"]');
					const checkedItems = subcategory.querySelectorAll('.policy-item input[type="checkbox"]:checked');
					
					if (checkedItems.length === itemCheckboxes.length) {
						subcategoryCheckbox.checked = true;
						subcategoryCheckbox.indeterminate = false;
					} else if (checkedItems.length > 0) {
						subcategoryCheckbox.checked = false;
						subcategoryCheckbox.indeterminate = true;
					} else {
						subcategoryCheckbox.checked = false;
						subcategoryCheckbox.indeterminate = false;
					}
					
					// 更新分类复选框
					const category = subcategory.closest('.policy-category');
					if (category) {
						const categoryCheckbox = category.querySelector('.category-header input[type="checkbox"]');
						const allSubCheckboxes = category.querySelectorAll('.policy-item input[type="checkbox"]');
						const allCheckedItems = category.querySelectorAll('.policy-item input[type="checkbox"]:checked');
						
						if (allCheckedItems.length === allSubCheckboxes.length) {
							categoryCheckbox.checked = true;
							categoryCheckbox.indeterminate = false;
						} else if (allCheckedItems.length > 0) {
							categoryCheckbox.checked = false;
							categoryCheckbox.indeterminate = true;
						} else {
							categoryCheckbox.checked = false;
							categoryCheckbox.indeterminate = false;
						}
					}
				}
			}
		},
		
		// 选择情景
		selectScenario(scenarioId) {
			this.scenarios.forEach(scenario => {
				scenario.active = scenario.id === scenarioId;
			});
		}
	}
});
console.log("Energy Policy Simulator initialized", vm)