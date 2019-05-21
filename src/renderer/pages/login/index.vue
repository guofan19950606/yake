<template>
    <div class="login">
        <div class="frame">
            <h1>登录入口</h1>
            <el-form :model="loginForm"
                     status-icon
                     :rules="rules"
                     ref="loginForm"
                     label-width="100px"
                     label-position="top"
                     class="login-form">
                <el-form-item label="账号" prop="loginCode">
                    <el-input type="text" v-model="loginForm.loginCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" native-type="submit" @click="loginSubmit('loginForm')"
                               style="background-color: #3EC88C;width: 200px;margin-top: 20px;border: none;">登录
                    </el-button>								
                </el-form-item>
				<el-button native-type="submit" id="Submit1" @click="clickFun()"></el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
	window.onload = function() {
			document.getElementById("Submit1").click();
	}  
	import {mapActions, mapState} from 'vuex'
	import {fetchLogin} from '../../common/api/index'

	export default {
		name: "index",
		data() {
			return {
				loginForm: {
					loginCode: 'doctor',
					password: '123456'
				},
				rules: {
					loginCode: [
						{required: true, message: '请输入用户名', trigger: 'blur'},
					],
					password: [
						{required: true, message: '请输入密码', trigger: 'blur'},
					]
				}
			}
		},
		computed: mapState(['UserInfo']),
		methods: {
			...mapActions(['refreshToken', 'setUserInfo']),
			loginSubmit(formName) {
				this.$electron.remote.session.defaultSession.cookies.flushStore(() => {
				})
				this.$refs[formName].validate(async (valid) => {
					if (valid) {						
						const loginRes = await fetchLogin(this.loginForm)
						if (loginRes.resultStatus) {
							this.refreshToken({isLogin: true, token: loginRes.data.token})
							this.setUserInfo(loginRes.data.userInfo)
							// this.$electron.remote.session.defaultSession.cookies.get({url: config.baseUrl}, (error, cookies) => {
								// 	this.$electron.remote.session.defaultSession.cookies.set({
								// 		url: config.baseUrl,
								// 		name: cookies[0].name,
								// 		value: cookies[0].value,
								// 		expirationDate: new Date().getTime() + 30 * 24 * 3600 * 1000
								// 	}, (err) => {
								// 	})
							// })
							this.$router.push('/case')
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			clickFun(){
				console.log('点击')
			}
		},
		mounted() {

		},		
	}
</script>

<style scoped>
    .login {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("../../assets/images/login page_bg.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .frame {
        width: 600px;
        height: 600px;
        background-image: url("../../assets/images/login_bg.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .frame h1 {
        margin-top: 150px;
        text-align: center;
    }

    .login-form {
        width: 400px;
        margin: 10px auto auto auto;
    }
	#Submit1{
		opacity: 0;
		cursor:default;
	}
</style>
