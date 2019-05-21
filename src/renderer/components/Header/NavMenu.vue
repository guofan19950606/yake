<template>
    <ul class="nav-menu">
        <li>
            <router-link class="nav-link"
                         to="/case"
                         :class="{'active':isActive()}">病例
            </router-link>
        </li>
        <li class="phoneBox">
            <span class="phone">热线电话：</span>
            <span class="phonenub">13152135808</span> 
        </li>
        <!--<li>-->
            <!--<router-link class="nav-link" to="/patient">患者</router-link>-->
        <!--</li>-->
    </ul>
</template>

<script>
	export default {
		name: "NavMenu",
		methods: {
			isActive() {
				const path = this.$route.path
				let active = false
				if (path.includes('/create') || path.includes('/details')) {
					active = true
				}
				return active
			}
		}
	}
</script>

<style scoped>
    .nav-menu {
        display: flex;
    }

    .nav-menu li {
        margin-right: 20px;
    }

    .nav-menu li .nav-link {
        display: block;
        width: 88px;
        height: 80px;
        font-size: 16px;
        line-height: 80px;
        text-align: center;
    }

    .active {
        color: #3EC88C;
        box-shadow: 0px 2px 10px 0px rgba(66, 248, 169, 0.5);
    }
    .phoneBox{
        margin-left: 200px;
        color: #3EC88C;
        line-height: 80px;
        font-size: 20px;
        /* background-color: #3EC88C; */
    }
    .phonenub{
        font-size: 18px;
    }
</style>
