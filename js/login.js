const app = Vue.createApp({

	data () {
		return {
			url: 'https://vue3-course-api.hexschool.io/',
			user: {
				username: '',
				password: ''
			},

		}
	},
	methods: {
		login() {
			axios.post(`${this.url}admin/signin`, this.user)
				.then((res) => {
					if(res.data.success) {
						const { token, expired} = res.data;
						document.cookie = `yoyoToken=${token}; expires=${new Date(expired)}`;
						window.location = 'dashboard.html';
					} else {
						alert(res.data.message);
					}
				})
                .catch((err) => {
                    console.log(err);
                });
		},
	},
});
app.mount('#app')