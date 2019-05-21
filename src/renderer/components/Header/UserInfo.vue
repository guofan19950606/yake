<template>
    <div class="user-info">
        <div class="user" @mouseout="dropdownShow = true" @mouseover="dropdownShow = false">
            <span>{{username}}</span><img class="portrait" :src="portrait"/>
        </div>
        <div v-show="dropdownShow" style="position: absolute;border: 1px solid #000">
            <button @click="logout">登出</button>
        </div>
    </div>
</template>

<script>
	export default {
		name: "UserInfo",
		props: ['username', 'portrait', 'logout'],
		data() {
			return {
				dropdownShow: false
			}
		},
	}
</script>

<style scoped>
    .user-info {

    }

    .user {
        font-size: 16px;
        color: #666666;
    }

    .portrait {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: auto 14px;
    }
</style>
