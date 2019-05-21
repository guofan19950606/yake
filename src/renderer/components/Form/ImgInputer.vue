<template>
    <div class="box" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <div class="action" v-show="seen">
            <div class="edit">
                <label class="file-label">
                    <input type="file" class="file-input" ref="inputFile" @change="handleFileChange" accept="image/*">
                </label>
            </div>
            <div v-if="dataUrl" class="delete" @click="imgDelete"></div>
        </div>
        <img v-if="dataUrl" class="img-view" :src="dataUrl"/>
        <!--<div v-if="dataUrl" class="file-delete" @click="imgDelete"></div>-->
    </div>
</template>

<script>
	export default {
		name: "ImgInputer",
		props: ['value'],
		data() {
			return {
				dataUrl: null,
				seen: false
			}
		},
		methods: {
			handleFileChange(e) {
				this.$emit('input', e.target.files[0])
				this.imgPreview(e.target.files[0]);
			},

			imgPreview(file) {
				// 看支持不支持FileReader
				if (!file || !URL.createObjectURL) return;
				if (/^image/.test(file.type)) {
                    // 创建一个reader
                    
					this.dataUrl = URL.createObjectURL(file)
				}
			},

			imgDelete() {
				this.$emit('input', "")
				this.dataUrl = null
				this.$refs.inputFile.value = ""
			},

			mouseenter() {
				this.seen = true
			},

			mouseleave() {
				this.seen = false
			}
		}
	}
</script>

<style scoped>
    .box {
        width: 100px;
        height: 100px;
        border: 1px solid #E3F1D8;
        position: relative;
        display: inline-block;
        background-color: #FAFCFF;
        background-image: url("../../assets/images/upload_bg.png");
        background-repeat: no-repeat;
        background-position: center;
    }

    .file-label {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
    }

    .file-input {
        display: none;
        /*opacity: 0;*/
        /*position: absolute;*/
        /*z-index: -1;*/
        /*outline: none;*/
    }

    .img-view {
        width: 100%;
        height: 100%;
    }

    .file-delete {
        width: 32px;
        height: 32px;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 9999;
        background-image: url("../../assets/images/upload_delete.png");
    }

    .action {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 28px;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index: 9999;
    }

    .edit {
        width: 17px;
        height: 17px;
        position: relative;
        background-image: url("../../assets/images/ic_modification.png");
        background-repeat: no-repeat;
        background-position: center;
    }

    .delete {
        width: 14px;
        height: 16px;
        background-image: url("../../assets/images/ic_cancle.png");
        background-repeat: no-repeat;
        background-position: center;
    }
</style>
