<template>
    <div>
        <div class="title">
            <h2>诊断信息</h2>
            <ul class="steps">
                <li>
                    <router-link to="/details/info/case">病例信息</router-link>
                </li>
                <li v-if="this.treatmentScheme">
                    <router-link to="/details/info/scheme">诊断方案</router-link>
                </li>
            </ul>
        </div>
        <router-view :status="status"
                     :checkContent="checkContent"
                     :checkPhoto="checkPhoto"
                     :treatmentScheme="treatmentScheme"
                     :messageBoards="messageBoards">
        </router-view>
    </div>
</template>

<script>
	export default {
		name: "Content",
		props: ['status', 'checkContent', 'checkPhoto', 'treatmentScheme', 'messageBoards']
	}
</script>

<style scoped>
    .title {
        padding-top: 10px;
        height: 50px;
        border-bottom: 1px solid rgba(197, 197, 197, 0.42);
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
        bottom: -17px;
        left: 10px;
        width: 44px;
        height: 4px;
        background-color: #62CF9E;
    }
</style>
