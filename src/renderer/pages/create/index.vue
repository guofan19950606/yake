<template>
    <Layout>
        <div class="basic">
            <div class="title">
                <h1>新建病例</h1>
                <ul class="steps">
                    <li>
                        <router-link to="/create/basic">1.基本信息</router-link>
                    </li>
                    <li>
                        <router-link to="/create/examine">2.相关检查</router-link>
                    </li>
                    <li>
                        <router-link to="/create/photo">3.照片上传</router-link>
                    </li>
                </ul>
            </div>
            <router-view></router-view>
        </div>
    </Layout>
</template>

<script>
	import Layout from '../../components/Layout/index'
	import RadioButton from '../../components/Form/RadioButton'

	export default {
		name: "index",
		components: {Layout, RadioButton},
		data() {
			return {
				radio1: 2,
			}
		}
	}
</script>

<style scoped>
    .basic {
        min-width: 1100px;
        max-width: 1319px;
        width: 85%;
        margin: 30px auto 0 auto;
        background-color: #fff;
    }

    .title {
        max-width: 1250px;
        width: 95%;
        margin: 10px auto;
        height: 60px;
        border-bottom: 1px solid #C5C5C5;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title h1 {
        font-size: 24px;
        color: #222222;
    }

    .steps {
        display: flex;
        font-size: 16px;
        color: #999999;
    }

    .steps li {
        position: relative;
        margin-left: 20px;
    }

    .active {
        color: #3EC88C;
    }

    .active:after {
        content: '';
        position: absolute;
        bottom: -22px;
        left: 20px;
        width: 44px;
        height: 4px;
        background-color: #62CF9E;
    }
</style>
