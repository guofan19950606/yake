<template>
    <div class="info">
        <form @submit.prevent="onsubmit" style="margin-bottom: 80px;">
            <h2>a、口内检查</h2>
            <h3>列牙</h3>
            <div class="form-group">
                <RadioButton v-model="examineForm.columnTeeth" value="混合牙列"/>
                <RadioButton v-model="examineForm.columnTeeth" value="乳牙列"/>
                <RadioButton v-model="examineForm.columnTeeth" value="恒牙列"/>
            </div>
            <h3>磨牙关系</h3>
            <div>
                <div class="form-group">
                    <span>左</span>
                    <RadioButton v-model="examineForm.molarToothLeft" value="安式Ⅰ类"/>
                    <RadioButton v-model="examineForm.molarToothLeft" value="安式Ⅱ类"/>
                    <RadioButton v-model="examineForm.molarToothLeft" value="安式Ⅲ类"/>
                </div>
                <div class="form-group">
                    <span>右</span>
                    <RadioButton v-model="examineForm.molarToothRight" value="安式Ⅰ类"/>
                    <RadioButton v-model="examineForm.molarToothRight" value="安式Ⅱ类"/>
                    <RadioButton v-model="examineForm.molarToothRight" value="安式Ⅲ类"/>
                </div>
            </div>
            <div>
                <h3>尖牙关系</h3>
                <div class="form-group">
                    <span>左</span>
                    <RadioButton v-model="examineForm.canineTeethLeft" value="安式Ⅰ类"/>
                    <RadioButton v-model="examineForm.canineTeethLeft" value="安式Ⅱ类"/>
                    <RadioButton v-model="examineForm.canineTeethLeft" value="安式Ⅲ类"/>
                </div>
                <div class="form-group">
                    <span>右</span>
                    <RadioButton v-model="examineForm.canineTeethRight" value="安式Ⅰ类"/>
                    <RadioButton v-model="examineForm.canineTeethRight" value="安式Ⅱ类"/>
                    <RadioButton v-model="examineForm.canineTeethRight" value="安式Ⅲ类"/>
                </div>
            </div>
            <div>
                <h3>前牙覆合</h3>
                <div class="form-group">
                    <span>深覆合</span>
                    <RadioButton v-model="examineForm.anteriorTeethDeepOverlap" value="Ⅰ类"/>
                    <RadioButton v-model="examineForm.anteriorTeethDeepOverlap" value="Ⅱ类"/>
                    <RadioButton v-model="examineForm.anteriorTeethDeepOverlap" value="Ⅲ类"/>
                </div>
                <div class="form-group">
                    <span> 开合  </span>
                    <RadioButton v-model="examineForm.anteriorTeethOpenClose" value="Ⅰ类" style="margin-left: 24px;" />
                    <RadioButton v-model="examineForm.anteriorTeethOpenClose" value="Ⅱ类"/>
                    <RadioButton v-model="examineForm.anteriorTeethOpenClose" value="Ⅲ类"/>
                </div>
                <div class="form-group">
                    <!-- <span> 对刃  </span> -->
                    <CheckboxButton v-model="examineForm.anteriorTeethDuiren" value="对刃" style="margin-left: 76px;"></CheckboxButton>
                </div>                
            </div>
            <div>
                <h3>前牙覆盖</h3>
                <div class="form-group">
                    <span>深覆盖</span>
                    <RadioButton v-model="examineForm.anteriorTeethDeepCover" value="Ⅰ类"/>
                    <RadioButton v-model="examineForm.anteriorTeethDeepCover" value="Ⅱ类"/>
                    <RadioButton v-model="examineForm.anteriorTeethDeepCover" value="Ⅲ类"/>
                </div>
            </div>
            <div>
                <h3>后牙</h3>
                <div class="form-group">
                    <span>左侧反合</span>
                    <RadioButton v-model="examineForm.posteriorTeethLeft" value="反合"/>
                    <RadioButton v-model="examineForm.posteriorTeethLeft" value="正锁合"/>
                    <RadioButton v-model="examineForm.posteriorTeethLeft" value="反锁合"/>
                </div>
                <div class="form-group">
                    <span>右侧反合</span>
                    <RadioButton v-model="examineForm.posteriorTeethRight" value="反合"/>
                    <RadioButton v-model="examineForm.posteriorTeethRight" value="正锁合"/>
                    <RadioButton v-model="examineForm.posteriorTeethRight" value="反锁合"/>
                </div>
            </div>
            <div>
                <h3>中线关系</h3>
                <div class="form-group">
                    <span>上颌中线</span>
                    <el-input style="width: 250px;" v-model="examineForm.midlineMaxilla"></el-input>
                </div>
                <div class="form-group">
                    <span>下颌中线</span>
                    <el-input style="width: 250px;" v-model="examineForm.midlineMandible"></el-input>
                </div>
            </div>
            <div>
                <h3>问题牙</h3>
                <div class="form-group">
                    <CheckboxButton style="margin-bottom: 15px" v-model="examineForm.problemTooth"
                                    value="埋伏牙(牙列式)"></CheckboxButton>
                    <CheckboxButton style="margin-bottom: 15px" v-model="examineForm.problemTooth"
                                    value="畸形中央尖"></CheckboxButton>
                    <CheckboxButton style="margin-bottom: 15px" v-model="examineForm.problemTooth"
                                    value="缺失牙"></CheckboxButton>
                    <CheckboxButton v-model="examineForm.problemTooth" value="多生牙"></CheckboxButton>
                    <CheckboxButton v-model="examineForm.problemTooth" value="外伤牙"></CheckboxButton>
                    <CheckboxButton v-model="examineForm.problemTooth" value="氟斑牙"></CheckboxButton>
                    <CheckboxButton v-model="examineForm.problemTooth" value="釉质发育不全"></CheckboxButton>
                    <CheckboxButton v-model="examineForm.problemTooth" value="龋坏牙"></CheckboxButton>
                    <CheckboxButton v-model="examineForm.problemTooth" value="根管治疗牙"></CheckboxButton>
                    <!-- <br> -->
                    <span>其他</span>
                    <el-input style="width: 302px;"  v-model="examineForm.problemToothRests "></el-input>                    
                </div>
            </div>
            <h3>牙周情况</h3>
            <div class="form-group">
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="examineForm.dentalPeriphery">
                </el-input>
            </div>
            <h3>口腔卫生</h3>
            <div class="form-group">
                <RadioButton v-model="examineForm.oralHygiene" value="良"/>
                <RadioButton v-model="examineForm.oralHygiene" value="差"/>
            </div>
            <h2>b、颌面部检查</h2>
            <h3>面型</h3>
            <div class="form-group">
                <RadioButton v-model="examineForm.faceShape" value="直面型"/>
                <RadioButton v-model="examineForm.faceShape" value="凸面型"/>
                <RadioButton v-model="examineForm.faceShape" value="凹面型"/>
            </div>
            <h3>颌骨关系</h3>
            <div class="form-group">
                <RadioButton v-model="examineForm.jawBones" value="双颌前突"/>
                <RadioButton v-model="examineForm.jawBones" value="上颌前突"/>
                <RadioButton v-model="examineForm.jawBones" value="下颌前突"/>
                <RadioButton v-model="examineForm.jawBones" value="上颌后缩"/>
                <RadioButton v-model="examineForm.jawBones" value="下颌后缩"/>
                <RadioButton v-model="examineForm.jawBones" value="下颌偏斜"/>
            </div>
            <h2>c、颞下颌关节检查</h2>
            <h3>开口度</h3>
            <div class="form-group">
                <el-input style="width: 200px;" v-model="examineForm.aperture"></el-input>
            </div>
            <h3>开口型</h3>
            <div class="form-group">
                <el-input style="width: 200px;" v-model="examineForm.openType"></el-input>
            </div>
            <h3>关节区</h3>
            <div class="form-group">
                <RadioButton v-model="examineForm.articularRegion" value="弹响"/>
                <RadioButton v-model="examineForm.articularRegion" value="疼痛"/>
                <RadioButton v-model="examineForm.articularRegion" value="杂音"/>
            </div>
            <div>
                <h2>d、不良习惯</h2>
                <div class="form-group">
                    <CheckboxButton style="margin-bottom: 15px" v-model="examineForm.badHabit" value="吐舌习惯"></CheckboxButton>
                    <CheckboxButton style="margin-bottom: 15px" v-model="examineForm.badHabit" value="口呼吸"></CheckboxButton>
                    <CheckboxButton style="margin-bottom: 15px" v-model="examineForm.badHabit" value="咬下唇"></CheckboxButton>
                    <CheckboxButton v-model="examineForm.badHabit" value="咬上唇"></CheckboxButton>
                    <CheckboxButton v-model="examineForm.badHabit" value="偏侧咀嚼"></CheckboxButton>
                    <CheckboxButton v-model="examineForm.badHabit" value="咬硬物"></CheckboxButton>  
                    <br>
                    <span>其他</span>
                    <el-input style="width: 690px;"  v-model="examineForm.badHabitRests "></el-input>
                </div>
            </div>
            <div style="margin-top: 60px;text-align: center">
                <el-button native-type="submit">暂存</el-button>
            </div>
        </form>
    </div>
</template>

<script>
	import RadioButton from '../../components/Form/RadioButton'
	import SubmitButton from '../../components/Form/SubmitButton'
	import CheckboxButton from '../../components/Form/CheckboxButton'
	import {fetchAddCase, fetchGetCaseDesc} from '../../common/api'
	import {mapState} from 'vuex'
	import {objectToFormData} from '../../common/utlis'
import { constants } from 'fs';

	export default {
		name: "Examine",
		components: {RadioButton, CheckboxButton, SubmitButton},
		computed: mapState(['CaseInfo']),
		data() {
			return {
				examineForm: {
					columnTeeth: '',
					molarToothLeft: '',
					molarToothRight: '',
					canineTeethLeft: '',
					canineTeethRight: '',
					anteriorTeethDeepOverlap: '',
                    anteriorTeethOpenClose: '',
                    anteriorTeethDuiren: [], // 对刃
					anteriorTeethDeepCover: '',
					posteriorTeethLeft: '',
					posteriorTeethRight: '',
					midlineMaxilla: '',
					midlineMandible: '',
					problemTooth: [],
					dentalPeriphery: '',
					oralHygiene: '',
					faceShape: '',
					jawBones: '',
					aperture: '',
					openType: '',
					articularRegion: '',
                    badHabit: [],           // 不良习惯
                    badHabitRests: '',      // 不良习惯 其他
                    problemToothRests: '',  // 问题牙 其他

				},
			}
		},
		methods: {
			onsubmit() {
                console.log('onsubmit----------------------------------------------')
                console.log(this.examineForm)
                // console.log(this.examineForm.badHabit)
                console.log(this.examineForm.anteriorTeethDuiren)
            
				const {problemTooth, badHabit,anteriorTeethDuiren} = this.examineForm
				let params = {
					checkContent: this.examineForm,
					caseId: this.CaseInfo.caseId,
					patientId: this.CaseInfo.patientId,
					infoStatus: 2
                }
                if (this.examineForm.problemToothRests != '') {
                    params.checkContent.problemTooth = problemTooth.toString()  + ','+this.examineForm.problemToothRests
                } else {
                    params.checkContent.problemTooth = problemTooth.toString() 
                }

                if (this.examineForm.badHabitRests != '') {
                    params.checkContent.badHabit = badHabit.toString() + ','+this.examineForm.badHabitRests
                } else {
                    params.checkContent.badHabit = badHabit.toString()
                }
                
                
                params.checkContent.anteriorTeethDuiren = anteriorTeethDuiren.toString() 

                console.log(params)
                // return

				fetchAddCase(objectToFormData(params)).then(res => {
					if (res.resultStatus) {
						this.$router.push({path: '/create/photo'})
					}
				})
			},
			getCaseDesc() {   // 进入页面，获取数据
				if (this.CaseInfo.caseId) {
					fetchGetCaseDesc({infoStatus: 2, caseId: this.CaseInfo.caseId}).then(res => {
                        // console.log('res_______________________________________')
                        // console.log(res)
                        // console.log(res.data.checkContent)
						if (res.data.checkContent) {
							const {createTime, checkContentId, ...checkContent} = res.data.checkContent
                            this.examineForm = checkContent
                            
                            let badHabitList = res.data.checkContent.badHabit.split(',');
                            let problemToothList = res.data.checkContent.problemTooth.split(',');

                            badHabitList.forEach(val=>{
                                if(val != '吐舌习惯' && val != '口呼吸' && val != '咬下唇' && val != '咬上唇' && val != '偏侧咀嚼' && val != '咬硬物') {                               
                                    this.examineForm.badHabitRests = val 
                                }
                            })                        
                            problemToothList.forEach(val=>{
                                if(val != '埋伏牙(牙列式)' && val != '畸形中央尖' && val != '缺失牙' && val != '多生牙' && val != '外伤牙' && val != '氟斑牙' && val != '釉质发育不全' && val != '龋坏牙' && val != '根管治疗牙') {                               
                                    this.examineForm.problemToothRests  = val 
                                }
                            })                            
                        }



					})
				}
			}
		},
		mounted() {
			document.body.scrollTop = 0
			this.getCaseDesc()
		}
	}
</script>

<style scoped>
    .info {
        max-width: 1039px;
        width: 95%;
        margin: auto;
        overflow: hidden;
    }

    h2 {
        margin-top: 60px;
        font-size: 20px;
        color: #3EC88C;
    }

    h3 {
        margin-top: 40px;
        font-size: 18px;
        font-weight: 400;
        color: #222222;
    }

    .form-group {
        width: 90%;
        margin: auto;
        padding: 13px 0;
    }

    .form-group > * {
        margin: 0 12px;
    }
</style>
