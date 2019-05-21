import http from './http';

const config = {
	formData: {
		headers: {'Content-Type': 'multipart/form-data'}
	},
}

export const fetchLogin = (params) => {
	return http('post', '/admin/login', params)
}

export const fetchLogout = params => {
	return http('get', '/admin/logout', params)
}

export const fetchCreate = (params) => {
	return http('post', '/admin/create', params)
}

/**
 * 获取患者列表
 * @param params
 * @return {*}
 */
export const fetchCaseList = params => {
	return http('get', '/treatmentCase/getTreatmentCaseInfoList', params)
}

/**
 * 获取患者病例详情
 * @param params: infoStatus步骤, caseId病例id
 * @return {*}
 */
export const fetchGetCaseDesc = params => {
	return http('get', '/treatmentCase/getTreatmentCaseInfoDetails', params)
}

/**
 * 新增病例
 * @param params
 * @return {*}
 */
export const fetchAddCase = params => {
	return http('post', '/treatmentCase/insertOrUpdateTreatmentCaseDetailsInfo', params, config.formData)
}

/**
 * 获取医疗机构列表
 * @param params
 * @return {*}
 */
export const fetchGetOrgs = params => {
	return http('get', '/medicalInstitution/getMedicalInstitutionList', params)
}

/**
 * 删除待提交病例
 * @param params
 * @return {*}
 */
export const fetchDelCase = params => {
	return http('delete', '/treatmentCase/deleteTreatmentCase', params)
}

export const fetchAddAdvisory = params => {
	return http('post', '/messageBoard/insertMessageBoard', params)
}

/**
 * 微信支付
 * @param params
 * @return {*}
 */
export const goPayWechat = params => {
	return http('get', '/pay/weChatPay', params)
}
// 判断是否支付成功
export const goPayWechatSucceed = params => {
	return http('get', '/pay/getOrder', params)
}
// 未支付关闭二维码时调取接口
export const goPayWechatCloseOrder = params => {
	return http('get', '/pay/closeOrder', params)
}

/**
 * 支付宝支付
 * @param params
 * @return {*}
 */

export const goPayAli = params => {
	return http('get', '/pay/aliPay', params)
}   
// 判断是否支付成功
export const goAliPaySucceed = params => {
	return http('get', '/pay/aliPayTradeQuery', params)
}

/**
 * 驳回后,再提交
 */
export const resubmission = params => {
	console.log(params)
	return http('get', '/treatmentCase/insertOrUpdateTreatmentCaseDetailsInfo', params)
}