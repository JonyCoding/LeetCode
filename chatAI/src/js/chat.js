Vue.prototype.$window = window;
let vm = new Vue({
	el: "#app",
	data: function () {
		return {
			newMessage: '',
			chatLoading: false,
			messages: [
				{ id: 0, sender: "ellipse", content: "你好，请问有什么需要咨询的么，我是中国科学院的专家，我叫陈勇，很高兴与您联系。你好，请问有什么需要咨询的么，我是中国科学院的专家，我叫陈勇，很高兴与您联系。你好，请问有什么需要咨询的么，我是中国科学院的专家，我叫陈勇，很高兴与您联系。" },
				{ id: 1, sender: "user", content: "在吗" },
				{ id: 2, sender: "ellipse", content: "我在" },
			],
			historyMessage: [{
				id: 1,
				title: '默认对话',
				time: "10-20 13:24",
				isSelect:true,
				history:[{
					id: 1000001,
					type: 'question',
					message: '锂离子电池四大关键材料是什么',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000002,
					type: 'answer',
					message: '正极材料：在锂电正极材料当中，最常用的材料有钴酸锂，锰酸锂，磷酸铁锂和三元材料(镍钴锰的聚合物等)。</br>负极材料：在负极材料当中，目前锂电池负极材料主要以天然石墨和人造石墨为主。正在探索的负极材料有氮化物、PAS、锡基氧化物、锡合金、纳米负极材料，以及其他的一些金属间化合物等。</br></br>隔膜：市场化的隔膜材料主要是以聚乙烯（polyethylene，PE）、聚丙烯（polypropylene，PP）为主的聚烯烃（Polyolefin）类隔膜。锂电池的结构中，隔膜是关键的内层组件之一</br></br>电解液：电解液由高纯度的有机溶剂、电解质锂盐、必要的添加剂等原料，在一定条件下、按一定比例配制而成的。常用电解质锂盐：六氟磷酸锂（LiPF6）、四氟硼酸锂（LiCLO4），从成本、安全性等方面考虑，六氟磷酸锂是目前用的最多的。',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					},{
						id:20001,
						title:'百度',
						url:'www.baidu.com'
					}]
				}, {
					id: 1000003,
					type: 'question',
					message: '锂电池储能系统有哪些组成部分',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					},{
						id:20001,
						title:'百度百科',
						url:'www.baidu.com'
					}]
				}, {
					id: 1000004,
					type: 'answer',
					message: '锂电池储能系统它由多个组件组成，包括电池组、电池管理系统、能量管理系统、储能逆变器和辅助设备等。</br></br>电池组：电池组是锂离子电池储能系统的核心部分，通常由多个锂离子电池单体组成。电池组的容量和电压可以根据具体的储能需求进行设计和配置，通常采用模块化设计，可以根据需求进行灵活扩展。</br></br>电池管理系统（BMS）负责对电池组的监控、控制和保护。它包括电池状态监测、电池充放电控制、温度控制、电压平衡等功能，以确保电池组的安全、高效和可靠运行。</br></br>能量管理系统（EMS）：能量管理系统负责对储能系统的能量流进行调度和控制，以实现能量的高效利用和最优管理。一套完整的EMS包括控制系统、通信系统、数据库系统和人机交互系统四个模块。EMS可以根据电网电价、负荷需求、能源市场等因素进行智能化的能量管理和优化控制，以降低能源成本、提高能源利用效率和实现经济运营。</br></br>储能逆变器（PCS）是系统的决策核心，主要负责控制充放电过程，进行交直流的变换，决定着输出电能的质量和特征，从而很大程度上影响了电池的寿命。按照PCS的功率等级，储能变流器分为: 户用(小功率)，工商业 (中功率) ，集中式 (大功率) ，储能电站 (超大功率)</br></br>辅助设备：储能系统还可能包括辅助设备，如电池温控系统、电力电子转换器、接口设备、通信设备等，用于实现储能系统与电网、负荷、发电设备等的连接和协调运行。',
					status:'like',
					source:[{
						id:20001,
						title:'能源知识网站',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000005,
					type: 'question',
					message: '储能技术分类',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000006,
					type: 'answer',
					message: '根据能量存储方式及存储介质的不同，储能可分为机械储能、电磁储能、电化学储能、热储能和化学储能五大类。</br></br>机械储能是指将电能以各种形式的机械能存储起来，在需要时释放出来，实现时间维度上能源转移的技术。机械储能主要包括抽水蓄能、压缩空气储能和飞轮储能等。</br></br>电化学储能是指各种二次电池储能。是利用化学元素做储能介质，充放电过程伴随储能介质的化学反应或者变化。目前，电化学储能主要包括铅酸电池、液流电池、钠硫电池、锂离子电池等。</br></br>电磁储能：是指在电磁场中，电流通过导体时，会在导体周围产生磁场，这个磁场会储存能量，这种能量储存的原理就是电磁储能原理，常见的形式包括超导储能、超级电容器等。</br></br>热储能：热储能技术是以储热材料为媒介，将太阳能光热、地热、工业余热、低品位废热等或者将电能转换为热能储存起来，在需要的时候释放，以解决由于时间、空间或强度上的热能供给与需求间不匹配所带来的问题，包括显热储热、相变储热、热化学反应储热。</br></br>化学储能：化学储能通常指利用氢、氨、甲醇等化学品作为二次能源的载体，是解决长周期、大规模储能的重要方式之一。',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000007,
					type: 'question',
					message: '抽水蓄能主要结构',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000008,
					type: 'answer',
					message: '抽水蓄能是当前最主要的电力储能技术。抽水蓄能电站由上水库、输水系统、安装有机组的厂房和下水库等建筑物组成。抽水蓄能电站的上水库是蓄存水量的工程设施，电网负荷低谷时段可将抽上来的水储存在库内，负荷高峰时段由水库放下来发电。',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000009,
					type: 'question',
					message: '新型压缩空气储能有哪些',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000010,
					type: 'answer',
					message: '新型压缩空气储能包括绝热压缩空气储能、蓄热式压缩空气储能、等温压缩空气储能、液态空气储能、超临界压缩空气储能、水下压缩空气储能等',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000011,
					type: 'question',
					message: '全钒液流电池（钒电池）工作原理',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000012,
					type: 'answer',
					message: '钒电池是一种以钒为活性物质呈循环流动液态的氧化还原电池。钒电池电能以化学能的方式存储在不同价态钒离子的硫酸电解液中，通过外接泵把电解液压入电池堆体内，在机械动力作用下，使其在不同的储液罐和半电池的闭合回路中循环流动，采用质子交换膜作为电池组的隔膜，电解质溶液平行流过电极表面并发生电化学反应，通过双电极板收集和传导电流，从而使得储存在溶液中的化学能转换成电能。',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000013,
					type: 'question',
					message: '我国新型储能发展目标?',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000014,
					type: 'answer',
					message: '国家发展改革委、国家能源局印发的《“十四五”新型储能发展实施方案》中提出“到2025年，新型储能由商业化初期步入规模化发展阶段，具备大规模商业化应用条件。到2030年，新型储能全面市场化发展。新型储能核心技术装备自主可控，技术创新和产业水平稳居全球前列，市场机制、商业模式、标准体系成熟健全，与电力系统各环节深度融合发展，基本满足构建新型电力系统需求，全面支撑能源领域碳达峰目标如期实现。”',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000015,
					type: 'question',
					message: '现在商业化应用最广的储能技术是哪个',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000016,
					type: 'answer',
					message: '抽水蓄能技术是目前技术最成熟、应用最广泛的储能技术，具有规模大、寿命长、运行费用低等优点，具备调峰、调频、黑启动等功能，但其建设周期较长，且需要适宜的地理资源条件。',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}]
			}, {
				id: 2,
				title: '锂离子电池四大关键材料是什么',
				time: "10-20 13:24",
				isSelect:false,
				history:[{
					id: 1000001,
					type: 'question',
					message: '锂离子电池四大关键材料是什么',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000002,
					type: 'answer',
					message: '正极材料：在锂电正极材料当中，最常用的材料有钴酸锂，锰酸锂，磷酸铁锂和三元材料(镍钴锰的聚合物等)。</br>负极材料：在负极材料当中，目前锂电池负极材料主要以天然石墨和人造石墨为主。正在探索的负极材料有氮化物、PAS、锡基氧化物、锡合金、纳米负极材料，以及其他的一些金属间化合物等。</br></br>隔膜：市场化的隔膜材料主要是以聚乙烯（polyethylene，PE）、聚丙烯（polypropylene，PP）为主的聚烯烃（Polyolefin）类隔膜。锂电池的结构中，隔膜是关键的内层组件之一</br></br>电解液：电解液由高纯度的有机溶剂、电解质锂盐、必要的添加剂等原料，在一定条件下、按一定比例配制而成的。常用电解质锂盐：六氟磷酸锂（LiPF6）、四氟硼酸锂（LiCLO4），从成本、安全性等方面考虑，六氟磷酸锂是目前用的最多的。',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					},{
						id:20001,
						title:'百度',
						url:'www.baidu.com'
					}]
				}, {
					id: 1000003,
					type: 'question',
					message: '锂电池储能系统有哪些组成部分',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					},{
						id:20001,
						title:'百度百科',
						url:'www.baidu.com'
					}]
				}, {
					id: 1000004,
					type: 'answer',
					message: '锂电池储能系统它由多个组件组成，包括电池组、电池管理系统、能量管理系统、储能逆变器和辅助设备等。</br></br>电池组：电池组是锂离子电池储能系统的核心部分，通常由多个锂离子电池单体组成。电池组的容量和电压可以根据具体的储能需求进行设计和配置，通常采用模块化设计，可以根据需求进行灵活扩展。</br></br>电池管理系统（BMS）负责对电池组的监控、控制和保护。它包括电池状态监测、电池充放电控制、温度控制、电压平衡等功能，以确保电池组的安全、高效和可靠运行。</br></br>能量管理系统（EMS）：能量管理系统负责对储能系统的能量流进行调度和控制，以实现能量的高效利用和最优管理。一套完整的EMS包括控制系统、通信系统、数据库系统和人机交互系统四个模块。EMS可以根据电网电价、负荷需求、能源市场等因素进行智能化的能量管理和优化控制，以降低能源成本、提高能源利用效率和实现经济运营。</br></br>储能逆变器（PCS）是系统的决策核心，主要负责控制充放电过程，进行交直流的变换，决定着输出电能的质量和特征，从而很大程度上影响了电池的寿命。按照PCS的功率等级，储能变流器分为: 户用(小功率)，工商业 (中功率) ，集中式 (大功率) ，储能电站 (超大功率)</br></br>辅助设备：储能系统还可能包括辅助设备，如电池温控系统、电力电子转换器、接口设备、通信设备等，用于实现储能系统与电网、负荷、发电设备等的连接和协调运行。',
					status:'like',
					source:[{
						id:20001,
						title:'能源知识网站',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000005,
					type: 'question',
					message: '储能技术分类',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000006,
					type: 'answer',
					message: '根据能量存储方式及存储介质的不同，储能可分为机械储能、电磁储能、电化学储能、热储能和化学储能五大类。</br></br>机械储能是指将电能以各种形式的机械能存储起来，在需要时释放出来，实现时间维度上能源转移的技术。机械储能主要包括抽水蓄能、压缩空气储能和飞轮储能等。</br></br>电化学储能是指各种二次电池储能。是利用化学元素做储能介质，充放电过程伴随储能介质的化学反应或者变化。目前，电化学储能主要包括铅酸电池、液流电池、钠硫电池、锂离子电池等。</br></br>电磁储能：是指在电磁场中，电流通过导体时，会在导体周围产生磁场，这个磁场会储存能量，这种能量储存的原理就是电磁储能原理，常见的形式包括超导储能、超级电容器等。</br></br>热储能：热储能技术是以储热材料为媒介，将太阳能光热、地热、工业余热、低品位废热等或者将电能转换为热能储存起来，在需要的时候释放，以解决由于时间、空间或强度上的热能供给与需求间不匹配所带来的问题，包括显热储热、相变储热、热化学反应储热。</br></br>化学储能：化学储能通常指利用氢、氨、甲醇等化学品作为二次能源的载体，是解决长周期、大规模储能的重要方式之一。',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000007,
					type: 'question',
					message: '抽水蓄能主要结构',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000008,
					type: 'answer',
					message: '抽水蓄能是当前最主要的电力储能技术。抽水蓄能电站由上水库、输水系统、安装有机组的厂房和下水库等建筑物组成。抽水蓄能电站的上水库是蓄存水量的工程设施，电网负荷低谷时段可将抽上来的水储存在库内，负荷高峰时段由水库放下来发电。',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000009,
					type: 'question',
					message: '新型压缩空气储能有哪些',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000010,
					type: 'answer',
					message: '新型压缩空气储能包括绝热压缩空气储能、蓄热式压缩空气储能、等温压缩空气储能、液态空气储能、超临界压缩空气储能、水下压缩空气储能等',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000011,
					type: 'question',
					message: '全钒液流电池（钒电池）工作原理',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000012,
					type: 'answer',
					message: '钒电池是一种以钒为活性物质呈循环流动液态的氧化还原电池。钒电池电能以化学能的方式存储在不同价态钒离子的硫酸电解液中，通过外接泵把电解液压入电池堆体内，在机械动力作用下，使其在不同的储液罐和半电池的闭合回路中循环流动，采用质子交换膜作为电池组的隔膜，电解质溶液平行流过电极表面并发生电化学反应，通过双电极板收集和传导电流，从而使得储存在溶液中的化学能转换成电能。',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}]
			}, {
				id: 3,
				title: '锂电池储能系统有哪些组成部分',
				time: "10-20 13:24",
				isSelect:false,
				history:[{
					id: 1000003,
					type: 'question',
					message: '锂电池储能系统有哪些组成部分',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					},{
						id:20001,
						title:'百度百科',
						url:'www.baidu.com'
					}]
				}, {
					id: 1000004,
					type: 'answer',
					message: '锂电池储能系统它由多个组件组成，包括电池组、电池管理系统、能量管理系统、储能逆变器和辅助设备等。</br></br>电池组：电池组是锂离子电池储能系统的核心部分，通常由多个锂离子电池单体组成。电池组的容量和电压可以根据具体的储能需求进行设计和配置，通常采用模块化设计，可以根据需求进行灵活扩展。</br></br>电池管理系统（BMS）负责对电池组的监控、控制和保护。它包括电池状态监测、电池充放电控制、温度控制、电压平衡等功能，以确保电池组的安全、高效和可靠运行。</br></br>能量管理系统（EMS）：能量管理系统负责对储能系统的能量流进行调度和控制，以实现能量的高效利用和最优管理。一套完整的EMS包括控制系统、通信系统、数据库系统和人机交互系统四个模块。EMS可以根据电网电价、负荷需求、能源市场等因素进行智能化的能量管理和优化控制，以降低能源成本、提高能源利用效率和实现经济运营。</br></br>储能逆变器（PCS）是系统的决策核心，主要负责控制充放电过程，进行交直流的变换，决定着输出电能的质量和特征，从而很大程度上影响了电池的寿命。按照PCS的功率等级，储能变流器分为: 户用(小功率)，工商业 (中功率) ，集中式 (大功率) ，储能电站 (超大功率)</br></br>辅助设备：储能系统还可能包括辅助设备，如电池温控系统、电力电子转换器、接口设备、通信设备等，用于实现储能系统与电网、负荷、发电设备等的连接和协调运行。',
					status:'like',
					source:[{
						id:20001,
						title:'能源知识网站',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000005,
					type: 'question',
					message: '储能技术分类',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000006,
					type: 'answer',
					message: '根据能量存储方式及存储介质的不同，储能可分为机械储能、电磁储能、电化学储能、热储能和化学储能五大类。</br></br>机械储能是指将电能以各种形式的机械能存储起来，在需要时释放出来，实现时间维度上能源转移的技术。机械储能主要包括抽水蓄能、压缩空气储能和飞轮储能等。</br></br>电化学储能是指各种二次电池储能。是利用化学元素做储能介质，充放电过程伴随储能介质的化学反应或者变化。目前，电化学储能主要包括铅酸电池、液流电池、钠硫电池、锂离子电池等。</br></br>电磁储能：是指在电磁场中，电流通过导体时，会在导体周围产生磁场，这个磁场会储存能量，这种能量储存的原理就是电磁储能原理，常见的形式包括超导储能、超级电容器等。</br></br>热储能：热储能技术是以储热材料为媒介，将太阳能光热、地热、工业余热、低品位废热等或者将电能转换为热能储存起来，在需要的时候释放，以解决由于时间、空间或强度上的热能供给与需求间不匹配所带来的问题，包括显热储热、相变储热、热化学反应储热。</br></br>化学储能：化学储能通常指利用氢、氨、甲醇等化学品作为二次能源的载体，是解决长周期、大规模储能的重要方式之一。',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000007,
					type: 'question',
					message: '抽水蓄能主要结构',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000008,
					type: 'answer',
					message: '抽水蓄能是当前最主要的电力储能技术。抽水蓄能电站由上水库、输水系统、安装有机组的厂房和下水库等建筑物组成。抽水蓄能电站的上水库是蓄存水量的工程设施，电网负荷低谷时段可将抽上来的水储存在库内，负荷高峰时段由水库放下来发电。',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000009,
					type: 'question',
					message: '新型压缩空气储能有哪些',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000010,
					type: 'answer',
					message: '新型压缩空气储能包括绝热压缩空气储能、蓄热式压缩空气储能、等温压缩空气储能、液态空气储能、超临界压缩空气储能、水下压缩空气储能等',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}]
			}, {
				id: 4,
				title: '储能技术分类',
				time: "10-20 13:24",
				isSelect:false,
				history:[{
					id: 1000005,
					type: 'question',
					message: '储能技术分类',
					status:'default',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}, {
					id: 1000006,
					type: 'answer',
					message: '根据能量存储方式及存储介质的不同，储能可分为机械储能、电磁储能、电化学储能、热储能和化学储能五大类。</br></br>机械储能是指将电能以各种形式的机械能存储起来，在需要时释放出来，实现时间维度上能源转移的技术。机械储能主要包括抽水蓄能、压缩空气储能和飞轮储能等。</br></br>电化学储能是指各种二次电池储能。是利用化学元素做储能介质，充放电过程伴随储能介质的化学反应或者变化。目前，电化学储能主要包括铅酸电池、液流电池、钠硫电池、锂离子电池等。</br></br>电磁储能：是指在电磁场中，电流通过导体时，会在导体周围产生磁场，这个磁场会储存能量，这种能量储存的原理就是电磁储能原理，常见的形式包括超导储能、超级电容器等。</br></br>热储能：热储能技术是以储热材料为媒介，将太阳能光热、地热、工业余热、低品位废热等或者将电能转换为热能储存起来，在需要的时候释放，以解决由于时间、空间或强度上的热能供给与需求间不匹配所带来的问题，包括显热储热、相变储热、热化学反应储热。</br></br>化学储能：化学储能通常指利用氢、氨、甲醇等化学品作为二次能源的载体，是解决长周期、大规模储能的重要方式之一。',
					status:'dislike',
					source:[{
						id:20001,
						title:'知乎',
						url:'www.zhihu.com'
					}]
				}]
			}],
			messageList: [],
			recommendList: [{
				id: 1,
				message: '储能技术分类'
			}, {
				id: 2,
				message: '抽水蓄能主要结构'
			}, {
				id: 3,
				message: '新型压缩空气储能有哪些'
			}, {
				id: 4,
				message: '全钒液流电池（钒电池）工作原理'
			}, {
				id: 5,
				message: '我国新型储能发展目标'
			}, {
				id: 6,
				message: '现在商业化应用最广的储能技术是哪个？'
			}],
			nextId: '',
			loading: false,

		};
	},
	mounted() {
		this.$nextTick(() => {
			if (this.$refs.messageContainer) {
				vm.$refs.messageContainer.scrollTop = vm.$refs.messageContainer.scrollHeight;
			}
			vm.messageList = vm.historyMessage[0].history
		});
	},
	methods: {
		changeHistory(id){
			vm.historyMessage.forEach(item=>{
				item.isSelect = false
				if(item.id === id){
					item.isSelect = true
					vm.messageList = []
					vm.chatLoading = true
					setTimeout(() => {
						vm.messageList = item.history
						vm.chatLoading = false
					}, 1000);
				}
			})

		},
		getRecommendAnswer(index,autoSend) {
			vm.newMessage = vm.recommendList[index].message;
			if(autoSend){
				vm.sendMessage()
			}
		},
		sendMessage() {
			vm.chatLoading = true
			vm.addQuestion(vm.newMessage)
		},
		checkSend(event) {
			// 如果按下的是Enter键，而且没有按住Shift键，则发送消息
			event.preventDefault();
			if (event.key === 'Enter' && !event.shiftKey) {
				this.sendMessage();
			}
		},
		addQuestion(message) {
			vm.addMessage(message, 'question')
			setTimeout(() => {
				vm.addAnswer('抽水蓄能技术是目前技术最成熟、应用最广泛的储能技术，具有规模大、寿命长、运行费用低等优点，具备调峰、调频、黑启动等功能，但其建设周期较长，且需要适宜的地理资源条件。</br></br> 如果火势较大或存在危险，应该优先考虑陌生人的安全。如果有人受伤或需要帮助，应该立即拨打急救电话或向其他人寻求帮助。</br></br> 同时，也可以向当地的消防部门或相关机构求助。 ')
			}, 1000);
		},
		addAnswer(message) {
			vm.addMessage(message, 'answer')
		},
		addMessage(message, type) {
			const messageData = {
				id: Math.floor(Math.random() * 100000) + 1,
				message,
				type,
			}
			if (type === 'answer') {
				messageData.message = ''
			}
			vm.messageList.push(messageData)
			vm.newMessage = ''
			if (type === 'answer') {
				let index = 0;
				
				const interval = setInterval(() => {
					if (index < message.length) {
						if (message.substring(index, index + 4) === "</br>") {
							vm.messageList[vm.messageList.length - 1].message += "</br>";
							index += 4;
						} else {
							vm.messageList[vm.messageList.length - 1].message += message[index];
							index++;
						}
					} else {
						vm.chatLoading = false;
						clearInterval(interval);
					}
				}, 50);
			}
		},
		changeStatus(item,status){
			if(item.status === status){
				item.status = 'default'
			}else{
				item.status = status
				
			}
		}
	},
	watch: {
		'messageList': {
			handler: function () {
				this.$nextTick(() => {
					if (this.$refs.messageContainer) {
						this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;
					}
				});
			},
			deep: true // 如果 messages 是一个对象或数组，这确保我们观察其内部更改
		}
	}
});

const textarea = document.querySelector('.text-input-textarea_2VhUr');
let lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);

// 初始化为一行的高度
textarea.style.height = lineHeight + 'px';

textarea.addEventListener('input', function () {
	// 先重置高度以获取正确的 scrollHeight
	this.style.height = lineHeight + 'px';

	// 调整高度以匹配内容
	if (this.scrollHeight > this.clientHeight) {
		this.style.height = this.scrollHeight + 'px';
	}
});