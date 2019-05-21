<template>
    <div class="photo" id="photo">
        <form @submit.prevent="onsubmit" style="margin-bottom: 80px;">
            <h3>面像上传<span>（单张图片大小不超过0.5M）</span></h3>
            <div class="form-group">
                <div class="face-upload">
                    <!-- <img :src= photoForm.imageFrontUrl > -->

                    <ImgInputer v-model="photoForm.imageFront"
                                :style="{backgroundImage: 'url('+require('../../assets/images/正面像.png')+')'}"/>
                    <p>正面像</p>
                </div>
                <div class="face-upload">
                    <ImgInputer v-model="photoForm.imageFrontSmile"
                                :style="{backgroundImage: 'url('+require('../../assets/images/正面微笑像.png')+')'}"/>
                    <p>正面微笑像</p>
                </div>
                <div class="face-upload">
                    <ImgInputer v-model="photoForm.imageLeft45"
                                :style="{backgroundImage: 'url('+require('../../assets/images/左45度像.png')+')'}"/>
                    <p>左侧45度像</p>
                </div>
                <div class="face-upload">
                    <ImgInputer v-model="photoForm.imageRight45"
                                :style="{backgroundImage: 'url('+require('../../assets/images/右45度像.png')+')'}"/>
                    <p>右侧45度像</p>
                </div>
                <div class="face-upload">
                    <ImgInputer v-model="photoForm.imageSide"
                                :style="{backgroundImage: 'url('+require('../../assets/images/侧面像.png')+')'}"/>
                    <p>侧面像</p>
                </div>
            </div>
            <h3>口内像上传<span>（单张图片大小不超过0.5M）</span></h3>
            <div class="form-group">
                <div class="mouth-upload">
                    <ImgInputer v-model="photoForm.toothImageFront"
                                :style="{backgroundImage: 'url('+require('../../assets/images/正位像.png')+')'}"/>
                    <p>正位像</p>
                </div>
                <div class="mouth-upload">
                    <ImgInputer v-model="photoForm.toothImageSide"
                                :style="{backgroundImage: 'url('+require('../../assets/images/侧位像.png')+')'}"/>
                    <p>侧位像</p>
                </div>
                <div class="mouth-upload">
                    <ImgInputer v-model="photoForm.toothImageLeft45"
                                :style="{backgroundImage: 'url('+require('../../assets/images/左磨牙像.png')+')'}"/>
                    <p>左磨牙像</p>
                </div>
                <div class="mouth-upload">
                    <ImgInputer v-model="photoForm.toothImageRight45"
                                :style="{backgroundImage: 'url('+require('../../assets/images/右磨牙像.png')+')'}"/>
                    <p>右磨牙像</p>
                </div>
                <div class="mouth-upload">
                    <ImgInputer v-model="photoForm.maxillaImage"
                                :style="{backgroundImage: 'url('+require('../../assets/images/上颌颌面像.png')+')'}"/>
                    <p>上颌颌面像</p>
                </div>
                <div class="mouth-upload">
                    <ImgInputer v-model="photoForm.mandibleImage"
                                :style="{backgroundImage: 'url('+require('../../assets/images/下颌颌面像.png')+')'}"/>
                    <p>下颌颌面像</p>
                </div>
            </div>
            <h3>牙模图片<span>（单张图片大小不超过0.5M）</span></h3>
            <div>

                <!-- <ImgMultipleInputer v-model="photoForm.dentalCastPhoto"/> -->

                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-remove="handleRemove"
                    :file-list="fileList">
                <i class="el-icon-plus"></i>
                </el-upload>  

            </div>
            <h3>其他图片<span>（单张图片大小不超过0.5M）</span></h3>
            <div>
                <ImgMultipleInputer v-model="photoForm.otherPhoto"/>
            </div>
            <p class="label">注：可上传关节ct，埋伏牙ct定位，下颌偏斜正位片，牙周病多张牙片等</p>
            <div style="margin-top: 60px;text-align: center">
                <el-button native-type="submit">提交</el-button>
            </div>
        </form>
    </div>
</template>

<script>
	import {mapState} from 'vuex'
	import ImgInputer from '../../components/Form/ImgInputer'
	import ImgMultipleInputer from '../../components/Form/ImgMultipleInputer'
	import {fetchAddCase, fetchGetCaseDesc} from '../../common/api'
	import {objectToFormData} from '../../common/utlis'
	import SubmitButton from '../../components/Form/SubmitButton'
import { constants } from 'fs';

	export default {
		name: "Photo",
		components: {ImgInputer, ImgMultipleInputer, SubmitButton},
		computed: mapState(['CaseInfo']),
		data() {
			return {
                fileList:[],
				photoForm: {
					imageFront: '',
					imageFrontSmile: '',
					imageLeft45: '',
					imageRight45: '',
					imageSide: '',
					toothImageFront: '',
					toothImageSide: '',
					toothImageLeft45: '',
					toothImageRight45: '',
					maxillaImage: '',
					mandibleImage: '',
					dentalCastPhoto: [],
                    otherPhoto: [],
                    

                    // imageFrontUrl: ''
				},
			}
		},
		methods: {
			onsubmit() {
				const params = {
					caseId: this.CaseInfo.caseId,
					infoStatus: 3,
					checkPhotoFiles: this.photoForm
				}
				fetchAddCase(objectToFormData(params)).then(res => {
					if (res.resultStatus) {
						this.$router.push('/case')
					}
				})
            },
            
            
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },           
			getCaseDesc() {   // 进入页面，获取数据
				if (this.CaseInfo.caseId) {
					fetchGetCaseDesc({infoStatus: 3, caseId: this.CaseInfo.caseId}).then(res => {
                        console.log('res__________________________')
                        // console.log(res)
                        let faceBackgroundImage = document.getElementsByClassName('face-upload')
                        let mouthUploadImage = document.getElementsByClassName('mouth-upload') 

                        let photoObj =res.data.checkPhoto
                        for (var index in photoObj) {
                            // console.log('key=', index, 'value=', photoObj[index])
                            if (index == 'imageFront') {                                
                                this.photoForm.imageFront = photoObj[index]
                                faceBackgroundImage[0].children[0].style.backgroundImage = 'url('+ photoObj[index] +')'
                            } else if (index == 'imageFrontSmile'){
                                    this.photoForm.imageFrontSmile = photoObj[index]
                                    faceBackgroundImage[1].children[0].style.backgroundImage = 'url('+ photoObj[index] +')'
                                } else if (index == 'imageLeft45'){
                                    this.photoForm.imageLeft45 = photoObj[index]
                                    faceBackgroundImage[2].children[0].style.backgroundImage = 'url('+ photoObj[index] +')'
                                }
                                else if (index == 'imageRight45'){
                                    this.photoForm.imageRight45 = photoObj[index]
                                    faceBackgroundImage[3].children[0].style.backgroundImage = 'url('+ photoObj[index] +')'
                                }
                                else if (index == 'imageSide'){
                                    this.photoForm.imageSide = photoObj[index]
                                    faceBackgroundImage[4].children[0].style.backgroundImage = 'url('+ photoObj[index] +')'
                                }
                                else if (index == 'toothImageFront'){
                                    this.photoForm.toothImageFront = photoObj[index]
                                    mouthUploadImage[0].children[0].style.backgroundImage = 'url('+ photoObj[index] +')'
                                }
                                else if (index == 'toothImageSide'){
                                    this.photoForm.toothImageSide = photoObj[index]
                                     mouthUploadImage[1].children[0].style.backgroundImage = 'url('+ photoObj[index] +')'
                                }
                                else if (index == 'toothImageLeft45'){
                                    this.photoForm.toothImageLeft45 = photoObj[index]
                                     mouthUploadImage[2].children[0].style.backgroundImage = 'url('+ photoObj[index] +')'
                                }
                                else if (index == 'toothImageRight45'){
                                    this.photoForm.toothImageRight45 = photoObj[index]
                                     mouthUploadImage[3].children[0].style.backgroundImage = 'url('+ photoObj[index] +')'
                                } else if (index == 'maxillaImage'){
                                    this.photoForm.maxillaImage = photoObj[index]
                                     mouthUploadImage[4].children[0].style.backgroundImage = 'url('+ photoObj[index] +')'
                                }
                                else if (index == 'mandibleImage'){
                                    this.photoForm.mandibleImage = photoObj[index]
                                     mouthUploadImage[5].children[0].style.backgroundImage = 'url('+ photoObj[index] +')'
                                }
                            else if (index == 'dentalCastPhoto'){
                                this.photoForm.dentalCastPhoto.push(photoObj[index]) 
                                console.log(this.photoForm.dentalCastPhoto)
                            }
                             else if (index == 'otherPhoto'){
                                this.photoForm.otherPhoto.push(photoObj[index])
                                // console.log(this.photoForm.otherPhoto)
                            }
                        }
					})
				}
			}            
		},
		mounted() {
            document.body.scrollTop = 0;
            this.getCaseDesc()
		}
	}
</script>

<style scoped>
    .photo {
        max-width: 1039px;
        width: 95%;
        margin: auto;
        overflow: hidden;
    }

    .form-group {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-gap: 40px;
    }

    .face-upload {
        width: 172px;
    }

    .face-upload > div {
        width: 100%;
        height: 256px;
    }

    .face-upload > p {
        margin-top: 23px;
        text-align: center;
    }

    .mouth-upload {
        width: 172px;
    }

    .mouth-upload > div {
        width: 100%;
        height: 115px;
    }

    .mouth-upload > p {
        margin-top: 23px;
        text-align: center;
    }

    .label {
        margin-top: 31px;
        font-size: 12px;
        color: #999999;
        line-height: 18px;
    }

    h3 {
        margin-top: 60px;
        margin-bottom: 30px;
        color: #3EC88C;
        font-size: 18px;
    }

    h3 span {
        color: #999999;
        font-size: 14px;
    }
</style>
