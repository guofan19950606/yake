<template>
    <form class="entry-bar">
        <el-input class="search" v-model="keyword" placeholder="搜索患者"></el-input>
        <span>OR</span>
        <el-date-picker
                class="start-date"
                v-model="createTimeBegin"
                type="date"
                placeholder="起始日期">
        </el-date-picker>
        <el-date-picker
                class="end-date"
                v-model="createTimeEnd"
                type="date"
                placeholder="结束日期">
        </el-date-picker>
        <el-button class="submit" type="success" @click="onSubmit" round>搜索</el-button>
    </form>
</template>

<script>
	export default {
		name: "EntryBar",
		data() {
			return {
				keyword: '',
				createTimeBegin: '',
				createTimeEnd: ''
			};
		},
		methods: {
			onSubmit() {
				this.$emit('search', this.keyword, this.createTimeBegin, this.createTimeEnd)
			}
		}
	}
</script>

<style scoped>
    .entry-bar {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .submit {
        width: 155px;
        height: 48px;
        background-color: #3EC88C;
        border-radius: 24px !important;
    }
</style>

<style>
    .entry-bar > * {
        margin-right: 22px;
    }

    .entry-bar .search {
        width: 35%;
        min-width: 375px;
    }

    .entry-bar .search .el-input__inner {
        height: 48px;
        background: rgba(243, 255, 234, 1);
        border: 1px solid rgba(227, 241, 216, 1);
        border-radius: 24px;
    }

    .entry-bar .start-date {
        width: 19% !important;
        min-width: 200px !important;
    }

    .entry-bar .start-date .el-input__inner {
        height: 48px;
        background: rgba(243, 255, 234, 1);
        border: 1px solid rgba(227, 241, 216, 1);
        border-radius: 24px;
    }

    .entry-bar .end-date {
        width: 19% !important;
        min-width: 200px !important;
    }

    .entry-bar .end-date .el-input__inner {
        height: 48px;
        background: rgba(243, 255, 234, 1);
        border: 1px solid rgba(227, 241, 216, 1);
        border-radius: 24px;
    }
</style>
