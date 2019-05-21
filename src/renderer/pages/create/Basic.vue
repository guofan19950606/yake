<template>
    <div class="info">
        <el-form :model="basicForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 label-position="left"
                 class="basic-form">
            <h3>基本信息</h3>
            <el-form-item label="病人姓名" prop="patientTitle">
                <el-input v-model="basicForm.patientTitle"></el-input>
            </el-form-item>
            <el-form-item label="病人性别" prop="patientSex">
                <el-radio-group v-model="basicForm.patientSex" fill="#3EC88C">
                    <el-radio-button label="男"></el-radio-button>
                    <el-radio-button label="女"></el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期" prop="patientBirthday">
                <el-date-picker
                        type="date"
                        placeholder="请选择出生日期"
                        v-model="basicForm.patientBirthday"
                        style="width: 100%;">
                </el-date-picker>
            </el-form-item>
            <!--<el-form-item label="联系方式" prop="patientPhone">-->
                <!--<el-input v-model="basicForm.patientPhone"></el-input>-->
            <!--</el-form-item>-->
            <h3>医疗机构名称</h3>
            <el-form-item label="医疗机构" prop="organization">
                <el-select v-model="basicForm.organization" placeholder="请选择">
                    <el-option
                            v-for="item in organizationList"
                            :key="item.institutionId"
                            :label="item.institutionName"
                            :value="item.institutionId">
                    </el-option>
                </el-select>
            </el-form-item>

			<h3>主治医师</h3>	
            <el-form-item label="医师姓名" prop="patientDoctor">
                <el-input v-model="basicForm.patientDoctor"></el-input>
            </el-form-item>

            <div style="margin-top: 60px;text-align: center">
                <el-button v-on:click.native="onsubmit('ruleForm')">暂存</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
	import RadioButton from '../../components/Form/RadioButton'
	import SubmitButton from '../../components/Form/SubmitButton'
	import {fetchAddCase, fetchGetOrgs, fetchGetCaseDesc} from '../../common/api'
	import {mapState, mapActions} from 'vuex'
	import {objectToFormData} from '../../common/utlis'
	import moment from 'moment'

	export default {
		name: "Basic",
		components: {RadioButton, SubmitButton},
		computed: mapState(['CaseInfo']),
		data() {
			return {
				basicForm: {
					patientTitle: '',
					patientSex: '男',
					patientBirthday: '',
					// patientPhone: '',
					organization: '',

					patientDoctor: '',   // 主治医生   
				},
				institutionId: '',
				organizationList: [],    // 医疗机构名称
				rules: {
					patientTitle: [
						{required: true, message: '请输入病人姓名', trigger: 'blur'},
					],
					patientSex: [
						{required: true, message: '请选择病人性别', trigger: 'change'},
					],
					patientBirthday: [
						{type: 'date', required: true, message: '请选择出生日期', trigger: 'change'}
					],
					organization: [
						{required: true, message: '请填写机构名称', trigger: 'blur'}
					],
					patientDoctor:[
						{required: true, message: '请填写主治医生姓名', trigger: 'blur'}
					]
				},
			};
		},
		mounted() {
			this.getOrgs()
			document.body.scrollTop = 0
			this.getCaseDesc()
			console.log(this.basicForm)
		},
		methods: {
			...mapActions(['setCaseId']),
			onsubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let {organization, ...patient} = this.basicForm
						patient.patientBirthday = moment(patient.patientBirthday).format('YYYY-MM-DD')
						patient.patientSex === "男" ? patient.patientSex = 1 : patient.patientSex = 0
						let treatmentCaseDTO = {
							institutionId: organization,
							infoStatus: 1,
							patient: patient,
							caseId: this.CaseInfo.caseId,
							patientId: this.CaseInfo.patientId
						}


						// console.log(patient)
						// console.log(treatmentCaseDTO)

						// return
						fetchAddCase(objectToFormData(treatmentCaseDTO)).then(res => {
							if (res.resultStatus) {
								this.setCaseId(res.data.caseId)

								// this.setInstitutionId(res.data.institutionId)
								console.log(res.data)
								// this.basicForm.organization

								this.$router.push({path: '/create/examine'})
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			getOrgs() {
				fetchGetOrgs().then(res => {
					this.organizationList = res.data
				})
			},
			getCaseDesc() {
				if (this.CaseInfo.caseId) {
					fetchGetCaseDesc({infoStatus: 1, caseId: this.CaseInfo.caseId}).then(res => {

						console.log(res)
						this.basicForm.patientTitle = res.data.patient.patientTitle
						this.basicForm.patientSex = res.data.patient.patientSex === '1' ? '男' : '女'
						this.basicForm.patientBirthday = new Date(res.data.patient.patientBirthday)
						// this.basicForm.patientPhone = res.data.patient.patientPhone
						this.basicForm.patientDoctor = res.data.patient.patientDoctor
						this.basicForm.organization = res.data.medicalInstitution.institutionId
						
					})
				}
			}
		}
	}
</script>

<style scoped>
    .info {
        overflow: hidden;
    }

    .basic-form {
        margin: 80px auto;
        width: 600px;
    }

    h3 {
        font-size: 18px;
        color: #3EC88C;
        margin: 30px auto;
    }

    .submit-btn {
        width: 196px;
        height: 48px;
        border: 1px solid rgba(227, 241, 216, 1);
        background: rgba(62, 200, 140, 1);
    }
</style>

<style>
    .basic-form .el-input__inner {
        height: 48px;
        background-color: #F3FFEA;
        border: 1px solid #E3F1D8;
        border-radius: 2px;
    }
</style>
