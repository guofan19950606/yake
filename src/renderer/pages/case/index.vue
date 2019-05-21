<template>
    <Layout>
        <div class="main">
            <div class="left">
                <div class="create" @click="create"></div>
            </div>
            <div class="right">
                <div class="content">
                    <EntryBar class="entry-bar" @search="search"/>
                    <ul v-if="!searchShow" class="list-router">
                        <li>
                            <router-link to="/case/await">待提交</router-link>
                            <!--<Hint class="hint" number="5"/>-->
                        </li>
                        <li>
                            <router-link to="/case/AuditFailure">已驳回</router-link>
                            <!--<Hint class="hint" number="5"/>-->
                        </li>                        
                        <li>
                            <router-link to="/case/pay">待支付</router-link>
                            <!--<Hint class="hint" number="5"/>-->
                        </li>
                        <li>
                            <router-link to="/case/scheme">收方案</router-link>
                            <!--<Hint class="hint" number="5"/>-->
                        </li>
                        <li>
                            <router-link to="/case/advisory">待咨询</router-link>
                            <!--<Hint class="hint" number="5"/>-->
                        </li>
                        <li>
                            <router-link to="/case/complete">已完成</router-link>
                            <!--<Hint class="hint" number="5"/>-->
                        </li>
                    </ul>
                    <router-view v-if="!searchShow" style="margin-top: 20px"></router-view>
                    <el-button v-if="searchShow" @click="searchShow = false">返回列表</el-button>
                    <el-table
                            v-if="searchShow"
                            :data="tableData"
                            :header-cell-style="{background:'#F3FFEA'}">
                        <el-table-column
                                prop="basic"
                                label="基本信息">
                            <template slot-scope="scope">
                                <div class="basic">
                                    <img :src="scope.row.patientPic"/>
                                    <div>
                                        <p style="font-weight:bold;">{{scope.row.patientName}}</p>
                                        <p>{{scope.row.patientAge}}岁</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="caseId"
                                label="订单编号">
                        </el-table-column>
                        <el-table-column
                                prop="institutionName"
                                label="医疗机构">
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                label="时间">
                            <template slot-scope="scope">
                                {{scope.row.createTime | dateFormat}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="infoStatus"
                                label="状态">
                            <template slot-scope="scope">
                                {{scope.row.orderStatus | statusFormat}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <div v-if="scope.row.orderStatus == 0">
                                    <el-button @click="dispose(scope.row)" type="text" size="small">
                                        处理
                                    </el-button>
                                    <el-button @click="delCase(scope.row.caseId)" type="text"
                                               size="small">删除
                                    </el-button>
                                </div>
                                <div v-if="scope.row.orderStatus == 1">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">支付</el-button>
                                </div>
                                <div v-if="scope.row.orderStatus == 2">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                                </div>
                                <div v-if="scope.row.orderStatus == 3">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">咨询</el-button>
                                </div>
                                <div v-if="scope.row.orderStatus == 5">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
	import Layout from '../../components/Layout/index';
	import EntryBar from '../../components/Case/EntryBar';
	import Hint from '../../components/Case/Hint';
	import {mapActions} from 'vuex'
	import {fetchCaseList, fetchDelCase} from '../../common/api/index'
	import moment from 'moment'

	export default {
		name: "index",
		components: {Layout, EntryBar, Hint},
		data() {
			return {
				tableData: [],
				keyword: '',
				createTimeBegin: '',
				createTimeEnd: '',
				searchShow: false
			}
		},
		methods: {
			...mapActions(['setCaseId', 'setPatientId']),
			create() {
				this.setCaseId(null)
				this.setPatientId(null)
				this.$router.push('/create')
			},
			dispose(row) {
				this.setCaseId(row.caseId)
				this.setPatientId(row.patientId)
				switch (row.infoStatus) {
					case 1:
						this.$router.push({path: '/create/examine'})
						break
					case 2:
						this.$router.push({path: '/create/photo'})
						break
					default:
						break
				}
			},
			async delCase(caseId) {
				await fetchDelCase({caseId})
				this.search(this.keyword, this.createTimeBegin, this.createTimeEnd)
			},
			handleClick(row) {
				this.setCaseId(row.caseId)
				this.setPatientId(row.patientId)
				switch (row.orderStatus) {
					case 1:
						this.$router.push({path: '/details/pay'})
						break
					case 2:
						this.$router.push({path: '/details/info/case'})
						break
					case 3:
						this.$router.push({path: '/details/info/scheme'})
						break
					case 5:
						this.$router.push({path: '/details/info/scheme'})
						break
					default:
						break
				}
			},
			search(keyword, createTimeBegin, createTimeEnd) {
				this.keyword = keyword
				this.createTimeBegin = createTimeBegin
				this.createTimeEnd = createTimeEnd
				fetchCaseList({keyword, createTimeBegin, createTimeEnd}).then(res => {
					this.tableData = res.data
					this.searchShow = true
				})
			}
		},
		filters: {
			dateFormat(date) {
				return moment(date).format('YYYY-MM-DD')
			},
			statusFormat(status) {
				switch (status) {
					case 0:
						return '待提交'
					case 1:
						return '待付款'
					case 2:
						return '收方案'
					case 3:
						return '待咨询'
					case 5:
						return '已完成'
					default:
						return ''
				}
			}
		}
	}
</script>

<style scoped>
    .main {
        display: flex;
        height: 100%;
    }

    .main .left {
        width: 200px;
        background-color: #3EC88C;
    }

    .create {
        height: 104px;
        width: 104px;
        margin: 15px auto;
        background-image: url("../../assets/images/create-btn.png");
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }

    .right {
        /*flex: 7;*/
        width: 100%;
        overflow: hidden;
    }

    .right .content {
        margin: 0 27px;
    }

    .entry-bar {
        margin: 31px auto;
    }

    .list-router {
        display: flex;
        margin-bottom: 30px;
    }

    .list-router li {
        margin: 0 15px;
        /*display: flex;*/
        /*align-items: center;*/

        position: relative;
    }

    .hint {
        margin-left: 7px;
    }

    .active {
        color: #3EC88C;
    }

    .active:after {
        content: '';
        position: absolute;
        bottom: -13px;
        left: 6px;
        width: 24px;
        height: 3px;
        background-color: #62CF9E;
    }

    .basic {
        display: flex;
    }

    .basic img {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        margin-right: 15px;
    }
</style>
