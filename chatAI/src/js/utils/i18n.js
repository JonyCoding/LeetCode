let messages, i18n;

messages = Vue.prototype.$settings.i18n;

i18n = new VueI18n({
	locale: "ja", // set locale
	messages, // set locale messages
});
