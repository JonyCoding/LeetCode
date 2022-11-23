let settings;
const date = new Date();
const fullYear = date.getFullYear();
settings = {
	NSCO: {
		header: {
			// title: "株式会社ネットスターズ",
			// subTitle: "NETSTARS CO.,LTD.",
			title: "",
			subTitle: "",
			hasRegister: true,
			hasLogin: true,
			logoPath: "./img/logo-gaia.png",
			titleStyle: {
				color: "#333",
				"font-size": "30px",
				"font-weight": "bold",
				// "border-left": "1px solid #ccc",
				// "padding-left": "32px",
				"line-height": "36px",
				"margin-top": "10px",
			},
			customizeHeader: "./js/components/gaia-header.js",
		},
		footer: {
			hasFooter: true,
			bgColor: "#444",
			text: "株式会社ネットスターズ",
			copyRight: "2009 - " + fullYear + " NETSTARS CO., LTD. ",
			logoPath: "./img/logo.png",
			url: "https://www.netstars.co.jp/",
		},
		loginImg: "./img/nss-login.jpg",
		baseColor: "#E6A23C",
		bgColor: "#837bb8",
		payLogo: "./img/pay-logo.png",
		cssPath: [],
		jsPath: [],
		components: {},
		update: {
			activities: [],
			bugs: [],
		},
		i18n: {
			ja: {
				register: {
					companyName: "StarPay",
					terms: "ネットスターズStarPayマルチ決済サービスプライバシーポリシー",
					termsURL: "http://www.netstars.co.jp/starpay_privacy/",
				},
				confirmation: {
					terms: "「StarPay決済サービス加盟店規約（オフライン決済用）」",
					termsURL: "https://www.netstars.co.jp/starpay_termsofuse/",
				},
				contents: {
					ph: {
						corporateName: "例：株式会社ネットスターズ",
						corporateNameKana: "例：カブシキガイシャアイウエオ",
						corporateNameEng: "例：AIUEO CO., LTD",
						brandName: "例：ネットスターズ",
						brandNameKana: "例：アイウエオ",
						brandNameEng: "例：NETSTARS",
						postalCode: "例：1030025",
						prefectures: "例：東京都",
						prefecturesKana: "例：トウキョウト",
						city: "例：中央区",
						cityKana: "例：チュウオウク",
						townArea: "例：日本橋茅場町",
						townAreaKana: "例：ニホンバシカヤバチョウ",
						address: "例：3-11-10",
						addressKana: "例：3-11-10",
						buildingName: "例：PMO日本橋茅場町 12F",
						buildingNameKana: "例：ピーエムオーニホンバシカヤバチョウジュウニエフ",
					},
				},
				bankAccount: {
					ph: {
						title: "例：カ）アットキューアル",
						titleKana: "例：ｶ)ｱﾂﾄｷﾕｰｱﾙ",
					},
				},
				shop: {
					ph: {
						storeName: "例：NETSTARS",
						city: "例：中央区",
						cityKana: "例：チュウオウク",
						townArea: "例：日本橋茅場町",
						townAreaKana: "例：ニホンバシカヤバチョウ",
						address: "例：3-11-10",
						addressKana: "例：3-11-10",
						buildingName: "例：PMO日本橋茅場町 12F",
						buildingNameKana: "例：ピーエムオーニホンバシカヤバチョウジュウニエフ",
					},
					importURL: "./files/店舗情報記入欄.xlsm",
				},
				device: {
					ph: {
						city: "例：中央区",
						cityKana: "例：チュウオウク",
						townArea: "例：日本橋茅場町",
						townAreaKana: "例：ニホンバシカヤバチョウ",
						address: "例：3-11-10",
						addressKana: "例：3-11-10",
						buildingName: "例：PMO日本橋茅場町 12F",
						buildingNameKana: "例：ピーエムオーニホンバシカヤバチョウジュウニエフ",
					},
				},
				files: {
					PDFURL: "./files/営業許可証一覧.xlsx",
				},
				preview: {
					tips: "",
					Confirm: {
						title: "「StarPay決済サービス加盟店規約（オフライン用）」",
						url: "https://www.netstars.co.jp/starpay_termsofuse/",
					},
				},
			},
		},
		customComponents: [],
		analytics: [
			{
				type: "google",
				url: "https://www.googletagmanager.com/gtag/js?id=G-HLJM4EDQZ7",
				id: "G-HLJM4EDQZ7",
			},
		],
	},
	ALSOK: {
		header: {
			title: "申込管理システム",
			subTitle: "",
			hasRegister: false,
			hasLogin: true,
			logoPath: "./img/logo-alsok.png",
			titleStyle: {
				color: "#333",
				"font-size": "26px",
				"font-weight": "bold",
				"line-height": "30px",
				"margin-top": "10px",
			},
		},
		footer: {
			hasFooter: false,
			bgColor: "#444",
			text: "綜合警備保障株式会社",
			copyRight: "SOHGO SECURITY SERVICES CO.,LTD.",
			logoPath: "./img/logo-alsok.png",
			url: "",
		},
		loginImg: "./img/alsok-login.png",
		bgColor: "#837bb8",
		payLogo: "./img/pay-logo.png",
		baseColor: "#837bb8",
		cssPath: [],
		jsPath: [],
		components: {
			index: "./js/components/alsok.js",
			confirmation: "./js/components/alsok-confirmation.js",
			service: "./js/components/alsok-service.js",
			bankAccount: "./js/components/alsok-bank-account.js",
			shop: "./js/components/alsok-shop.js",
			files: "./js/components/alsok-files.js",
			contents: "./js/components/alsok-contents.js",
			device: "./js/components/alsok-device.js",
			preview: "./js/components/alsok-preview.js",
			register: "./js/components/alsok-register.js",
			agencyDL: "./js/components/alsok-agency-download.js",
		},
		update: {
			activities: [],
			bugs: [],
		},
		i18n: {
			register: {
				enabled: true,
				companyName: "ALSOK QRGate",
				terms: "ALSOK　プライバシーポリシー",
				termsURL: "https://www.alsok.co.jp/policy/",
			},
			preview: {
				tips: "本人確認書類・必要な営業許可証の添付が無い場合、差戻しとなりますので最終ご確認をお願い致します。",
				Confirm: {
					title: "「StarPay決済サービス加盟店規約（オフライン用）」",
					url: "https://www.netstars.co.jp/starpay_termsofuse/",
				},
			},
		},
	},
	BOKI: {
		header: {
			title: "",
			subTitle: "",
			hasRegister: true,
			hasLogin: true,
			logoPath: "./img/logo-boki&gaia.png",
			titleStyle: {
				color: "#333",
				"font-size": "26px",
				"font-weight": "bold",
				"line-height": "30px",
				"margin-top": "10px",
			},
		},
		footer: {
			hasFooter: true,
			bgColor: "#444",
			copyRight: "2009 - " + fullYear + " The Bank of Okinawa,Ltd . ",
			logoPath: "./img/footerLogo-bkoi.png",
			url: "",
		},
		loginImg: "./img/boki-login.jpg",
		baseColor: "#c31a27",
		bgColor: "#c31a27",
		payLogo: "./img/main01-boki.png",
		defaultCode: "BOKI",
		cssPath: [],
		jsPath: [],
		components: {
			// index: "./js/components/boki.js",
			shop: "./js/components/boki-shop.js",
			confirmation: "./js/components/boki-confirmation.js",
			service: "./js/components/boki-service.js",
			files: "./js/components/boki-files.js",
			device: "./js/components/boki-device.js",
			register: "./js/components/boki-register.js",
			preview: "./js/components/boki-preview.js",
		},
		analytics: [],
		update: {
			activities: [],
			bugs: [],
		},
		i18n: {
			ja: {
				register: {
					enabled: true,
					companyName: "沖縄銀行 QRGate",
					terms: "沖縄銀行　プライバシーポリシー",
					termsURL: "https://www.okinawa-bank.co.jp/policy/privacy/",
				},
				confirmation: {
					terms: "「StarPay決済サービス加盟店規約（オフライン決済用）」",
					termsURL: "https://www.okinawa-bank.co.jp/kakusyukitei/index.html#syohin_service",
				},
				contents: {
					ph: {
						corporateName: "例：沖縄銀行",
						corporateNameKana: "例：オキナワギンコウ",
						corporateNameEng: "例：THE BANK OF OKINAWA",
						brandName: "例：沖縄銀⾏",
						brandNameKana: "例：オキナワギンコウ",
						brandNameEng: "例：THE BANK OF OKINAWA",
						postalCode: "例：1030025",
						prefectures: "例：東京都",
						prefecturesKana: "例：トウキョウト",
						city: "例：中央区",
						cityKana: "例：チュウオウク",
						townArea: "例：日本橋茅場町",
						townAreaKana: "例：ニホンバシカヤバチョウ",
						address: "例：3-11-10",
						addressKana: "例：3-11-10",
						buildingName: "例：PMO日本橋茅場町 12F",
						buildingNameKana: "例：ピーエムオーニホンバシカヤバチョウジュウニエフ",
					},
				},
				bankAccount: {
					ph: {
						title: "例：カ）アットキューアル",
						titleKana: "例：ｶ)ｱﾂﾄｷﾕｰｱﾙ",
					},
				},
				shop: {
					ph: {
						storeName: "例：Aブランド",
						city: "例：中央区",
						cityKana: "例：チュウオウク",
						townArea: "例：日本橋茅場町",
						townAreaKana: "例：ニホンバシカヤバチョウ",
						address: "例：3-11-10",
						addressKana: "例：3-11-10",
						buildingName: "例：PMO日本橋茅場町 12F",
						buildingNameKana: "例：ピーエムオーニホンバシカヤバチョウジュウニエフ",
					},
					importURL: "./files/店舗情報記入欄.xlsm",
				},
				device: {
					ph: {
						city: "例：中央区",
						cityKana: "例：チュウオウク",
						townArea: "例：日本橋茅場町",
						townAreaKana: "例：ニホンバシカヤバチョウ",
						address: "例：3-11-10",
						addressKana: "例：3-11-10",
						buildingName: "例：PMO日本橋茅場町 12F",
						buildingNameKana: "例：ピーエムオーニホンバシカヤバチョウジュウニエフ",
					},
				},
				preview: {
					tips: "本人確認書類・必要な営業許可証の添付が無い場合、差戻しとなりますので最終ご確認をお願い致します。",
					Confirm: {
						title: "「StarPay決済サービス加盟店規約（オフライン用）」",
						url: "https://www.okinawa-bank.co.jp/kakusyukitei/",
					},
				},
			},
		},
	},
	RM: {
		header: {
			title: "StarPay申請フォーム",
			subTitle: "",
			hasRegister: true,
			hasLogin: true,
			logoPath: "./img/logo-rm.png",
			titleStyle: {
				color: "#333",
				"font-size": "26px",
				"font-weight": "bold",
				"line-height": "30px",
				"margin-top": "10px",
			},
		},
		footer: {
			hasFooter: true,
			bgColor: "#444",
			text: "株式会社リージョナルマーケティング",
			copyRight: "2009 - " + fullYear + " Regional Marketing Co., Ltd. ",
			logoPath: "./img/logo-footer-rm.png",
			url: "",
		},
		loginImg: "./img/rm-login.png",
		baseColor: "#E6A23C",
		cssPath: [],
		jsPath: [],
		update: {
			activities: [],
			bugs: [],
		},
		components: {
			index: "./js/components/rm-index.js",
			confirmation: "./js/components/rm-confirmation.js",
			service: "./js/components/rm-service.js",
			shop: "./js/components/rm-shop.js",
			files: "./js/components/rm-files.js",
			device: "./js/components/rm-device.js",
			preview: "./js/components/rm-preview.js",
		},
		i18n: {
			ja: {
				register: {
					companyName: "StarPay",
					terms: "リージョナルマーケティング プライバシーポリシー",
					termsURL: "https://regionalmarketing.co.jp/privacypolicy/",
				},
				confirmation: {
					terms: "「StarPay決済サービス加盟店規約（オフライン決済用）」",
					termsURL: "https://regionalmarketing.co.jp/wordpress/wp-content/uploads/2020/11/StarPaykameitenkiyaku.pdf",
				},
				contents: {
					ph: {
						corporateName: "株式会社リージョナルマーケティング",
						corporateNameKana: "カブシキガイシャリージョナルマーケティング",
						corporateNameEng: "Regional Marketing Co., Ltd.",
						brandName: "リージョナル",
						brandNameKana: "リージョナル",
						brandNameEng: "Regional",
						postalCode: "0600062",
						prefectures: "北海道",
						prefecturesKana: "ホッカイドウ",
						city: "札幌市中央区",
						cityKana: "サッポロシチュウオウク",
						townArea: "南二条西五丁目",
						townAreaKana: "ミナミ２ジョウニシ５チョウメ",
						address: "23-1",
						addressKana: "23-1",
						buildingName: "狸小路大王ビル５階",
						buildingNameKana: "タヌキコウジダイオウビル５カイ",
					},
				},
				bankAccount: {
					ph: {
						title: "カ）リージョナルマーケティング",
						titleKana: "ｶ)ﾘｰｼﾞﾖﾅﾙﾏｰｹﾃｲﾝｸﾞ",
					},
				},
				shop: {
					ph: {
						storeName: "Regional",
						city: "札幌市中央区",
						cityKana: "サッポロシチュウオウク",
						townArea: "南二条西五丁目",
						townAreaKana: "ミナミ２ジョウニシ５チョウメ",
						address: "23-1",
						addressKana: "23-1",
						buildingName: "狸小路大王ビル５階",
						buildingNameKana: "タヌキコウジダイオウビル５カイ",
					},
					importURL: "./files/rm_店舗情報記入欄.xlsm",
				},
				device: {
					ph: {
						city: "札幌市中央区",
						cityKana: "サッポロシチュウオウク",
						townArea: "南二条西五丁目",
						townAreaKana: "ミナミ２ジョウニシ５チョウメ",
						address: "23-1",
						addressKana: "23-1",
						buildingName: "狸小路大王ビル５階",
						buildingNameKana: "タヌキコウジダイオウビル５カイ",
					},
				},
				files: {
					PDFURL:
						"https://gaia-starpay-cloud-s3.s3.ap-northeast-1.amazonaws.com/gaia-starpay-cloud-s3/template/rm_%E3%80%90%E8%AE%A2%E6%AD%A3%E7%89%88%E3%80%91%E7%94%B3%E8%BE%BC%E5%BF%85%E8%A6%81%E6%9B%B8%E9%A1%9E%E8%A8%B1%E5%8F%AF%E8%A8%BC%E4%B8%80%E8%A6%A7.pdf",
				},
				preview: {
					tips: "本人確認書類・必要な営業許可証の添付が無い場合、差戻しとなりますので最終ご確認をお願い致します。",
					Confirm: {
						title: "「キャッシュレス・消費喚起事業加盟店規約」",
						url: "https://www.netstars.co.jp/starpay_termsofuse/",
					},
				},
			},
		},
	},
	KNGW: {
		header: {
			title: "",
			subTitle: "",
			hasRegister: true,
			hasLogin: true,
			logoPath: "./img/logo-kngw&gaia.png",
			titleStyle: {
				color: "#333",
				"font-size": "26px",
				"font-weight": "bold",
				"line-height": "30px",
				"margin-top": "10px",
			},
		},
		footer: {
			hasFooter: true,
			bgColor: "#444",
			copyRight: fullYear + "  Kanagawa Prefectural Government",
			text: "かながわPayキャンペーン事務局",
			logoPath: "./img/footerLogo-kngw.png",
		},
		loginImg: "https://gaia-starpay-cloud-s3.s3.ap-northeast-1.amazonaws.com/gaia-starpay-cloud-s3/image/kngw_login.png",
		baseColor: "#007cc9",
		bgColor: "#007cc9",
		payLogo: "./img/main01-kngw.png",
		defaultCode: "KNGW",
		cssPath: [],
		jsPath: [],
		components: {
			preview: "./js/components/kngw-preview.js",
			shop: "./js/components/kngw-shop.js",
			confirmation: "./js/components/kngw-confirmation.js",
			service: "./js/components/kngw-service.js",
			files: "./js/components/kngw-files.js",
			device: "./js/components/kngw-device.js",
			register: "./js/components/kngw-register.js",
		},
		analytics: [
			{
				type: "google",
				url: "https://www.googletagmanager.com/gtag/js?id=G-L50Q0PTP3W",
				id: "G-L50Q0PTP3W",
			},
		],
		update: {
			activities: [],
			bugs: [],
		},
		i18n: {
			ja: {
				register: {
					enabled: true,
					companyName: "沖縄銀行 QRGate",
					terms: "沖縄銀行　プライバシーポリシー",
					termsURL: "https://www.okinawa-bank.co.jp/policy/privacy/",
				},
				confirmation: {
					terms: "「StarPay決済サービス加盟店規約（オフライン決済用）」",
					termsURL: "https://www.okinawa-bank.co.jp/kakusyukitei/index.html#syohin_service",
				},
				contents: {
					ph: {
						corporateName: "例：株式会社ABC",
						corporateNameKana: "例：カブシキカイシャエイビーシー",
						corporateNameEng: "例：ABC CO.,LTD",
						brandName: "例：ABC",
						brandNameKana: "例：エイビーシー",
						brandNameEng: "例：ABC",
						postalCode: "例：1030025",
						prefectures: "例：東京都",
						prefecturesKana: "例：トウキョウト",
						city: "例：中央区",
						cityKana: "例：チュウオウク",
						townArea: "例：日本橋茅場町",
						townAreaKana: "例：ニホンバシカヤバチョウ",
						address: "例：3-11-10",
						addressKana: "例：3-11-10",
						buildingName: "例：PMO日本橋茅場町 12F",
						buildingNameKana: "例：ピーエムオーニホンバシカヤバチョウジュウニエフ",
					},
				},
				bankAccount: {
					ph: {
						title: "例：カ）アットキューアル",
						titleKana: "例：ｶ)ｱﾂﾄｷﾕｰｱﾙ",
					},
				},
				shop: {
					ph: {
						storeName: "例：Aブランド",
						city: "例：中央区",
						cityKana: "例：チュウオウク",
						townArea: "例：日本橋茅場町",
						townAreaKana: "例：ニホンバシカヤバチョウ",
						address: "例：3-11-10",
						addressKana: "例：3-11-10",
						buildingName: "例：PMO日本橋茅場町 12F",
						buildingNameKana: "例：ピーエムオーニホンバシカヤバチョウジュウニエフ",
					},
					importURL: "./files/Gaia-店舗情報記入欄_神奈川.xlsm",
				},
				device: {
					ph: {
						city: "例：中央区",
						cityKana: "例：チュウオウク",
						townArea: "例：日本橋茅場町",
						townAreaKana: "例：ニホンバシカヤバチョウ",
						address: "例：3-11-10",
						addressKana: "例：3-11-10",
						buildingName: "例：PMO日本橋茅場町 12F",
						buildingNameKana: "例：ピーエムオーニホンバシカヤバチョウジュウニエフ",
					},
				},
				preview: {
					tips: "本人確認書類・必要な営業許可証の添付が無い場合、差戻しとなりますので最終ご確認をお願い致します。",
					Confirm: {
						title: "「キャッシュレス・消費喚起事業加盟店規約」",
						url: "https://kanagawapay.pref.kanagawa.jp/assets/img/pdf/kameiten_kiyaku.pdf",
					},
				},
			},
		},
	},
	TEST: {
		header: {
			title: "株式会社ネットスターズ",
			subTitle: "NETSTARS CO.,LTD.",
			hasRegister: true,
			hasLogin: true,
			logoPath: "./img/logo-nss.png",
			titleStyle: {
				color: "#333",
				"font-size": "30px",
				"font-weight": "bold",
				// "border-left": "1px solid #ccc",
				// "padding-left": "32px",
				"line-height": "36px",
				"margin-top": "10px",
			},
			customizeHeader: "./js/components/noti.js",
		},
		footer: {
			hasFooter: true,
			bgColor: "#444",
			copyRight: "2009 - " + fullYear + " NETSTARS CO., LTD. ",
			logoPath: "./img/logo.png",
			url: "",
		},
		baseColor: "#E6A23C",
		bgColor: "#837bb8",
		cssPath: [],
		jsPath: [],
		components: {},
		update: {
			activities: [],
			bugs: [],
		},
		i18n: {
			ja: {
				register: {
					companyName: "StarPay",
					terms: "ネットスターズStarPayマルチ決済サービスプライバシーポリシー",
					termsURL: "http://www.netstars.co.jp/starpay_privacy/",
				},
				confirmation: {
					terms: "「StarPay決済サービス加盟店規約（オフライン決済用）」",
					termsURL: "https://www.netstars.co.jp/starpay_termsofuse/",
				},
				contents: {
					ph: {
						corporateName: "例：株式会社ネットスターズ",
						corporateNameKana: "例：カブシキガイシャアイウエオ",
						corporateNameEng: "例：AIUEO CO., LTD",
						brandName: "例：ネットスターズ",
						brandNameKana: "例：アイウエオ",
						brandNameEng: "例：NETSTARS",
						postalCode: "例：1030025",
						prefectures: "例：東京都",
						prefecturesKana: "例：トウキョウト",
						city: "例：中央区",
						cityKana: "例：チュウオウク",
						townArea: "例：日本橋茅場町",
						townAreaKana: "例：ニホンバシカヤバチョウ",
						address: "例：3-11-10",
						addressKana: "例：3-11-10",
						buildingName: "例：PMO日本橋茅場町 12F",
						buildingNameKana: "例：ピーエムオーニホンバシカヤバチョウジュウニエフ",
					},
				},
				bankAccount: {
					ph: {
						title: "例：カ）アットキューアル",
						titleKana: "例：ｶ)ｱﾂﾄｷﾕｰｱﾙ",
					},
				},
				shop: {
					ph: {
						storeName: "例：NETSTARS",
						city: "例：中央区",
						cityKana: "例：チュウオウク",
						townArea: "例：日本橋茅場町",
						townAreaKana: "例：ニホンバシカヤバチョウ",
						address: "例：3-11-10",
						addressKana: "例：3-11-10",
						buildingName: "例：PMO日本橋茅場町 12F",
						buildingNameKana: "例：ピーエムオーニホンバシカヤバチョウジュウニエフ",
					},
					importURL: "./files/店舗情報記入欄.xlsm",
				},
				device: {
					ph: {
						city: "例：中央区",
						cityKana: "例：チュウオウク",
						townArea: "例：日本橋茅場町",
						townAreaKana: "例：ニホンバシカヤバチョウ",
						address: "例：3-11-10",
						addressKana: "例：3-11-10",
						buildingName: "例：PMO日本橋茅場町 12F",
						buildingNameKana: "例：ピーエムオーニホンバシカヤバチョウジュウニエフ",
					},
				},
				files: {
					PDFURL: "./files/営業許可証一覧.xlsx",
				},
				preview: {
					tips: "",
				},
			},
		},
		customComponents: [{ target: "#header", url: "./js/components/noti.js" }],
	},
};

//测试环境
settings.NSCOQA = settings.NSCO;
settings.NSCOQA.analytics = [
	{
		type: "google",
		url: "https://www.googletagmanager.com/gtag/js?id=G-DPTEFG9YVS",
		id: "G-DPTEFG9YVS",
	},
];

settings.NSCOSTG = settings.NSCO;
settings.ALSOKQA = settings.ALSOK;
settings.ALSOKSTG = settings.ALSOK;
settings.BOKIQA = settings.BOKI;
settings.BOKIQA.analytics = [
	{
		type: "google",
		url: "https://www.googletagmanager.com/gtag/js?id=G-DTJ10NS01Z",
		id: "G-DTJ10NS01Z",
	},
];
settings.BOKISTG = settings.BOKI;
settings.RMQA = settings.RM;
settings.RMSTG = settings.RM;

