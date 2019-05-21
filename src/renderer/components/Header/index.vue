<template>
    <div class="header">
        <div class="logo"></div>
        <NavMenu class="nav-menu"/>
        <UserInfo class="user-info" :username="UserInfo.data.userName"
                  :portrait="UserInfo.data.avatar" :logout="logout"/>
    </div>
</template>

<script>
	import NavMenu from './NavMenu';
	import UserInfo from './UserInfo';
	import {mapActions, mapState} from 'vuex'
	import {fetchLogout} from '../../common/api/index'

	export default {
		name: "index",
		computed: mapState(['UserInfo']),
		components: {NavMenu, UserInfo},
		methods: {
			...mapActions(['refreshToken']),
			async logout() {
				console.log('start----------------------------')
				await fetchLogout()
				this.refreshToken({isLogin: false, token: ''})
				this.$router.push('/login')
			}
		}
	}
</script>

<style scoped>
    .header {
        position: relative;
        display: flex;
        align-items: center;
        height: 80px;
        box-shadow: 0px 4px 10px 0px rgba(21, 102, 67, 0.1);
    }

    .logo {
        flex-basis: 180px;
        height: 80px;
        background-image: url("../../assets/images/logo.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 90%;
    }

    .nav-menu {
        margin-left: 36px;
        flex: 1;
    }

    .user-info {
        flex-basis: 160px;
    }
</style>
