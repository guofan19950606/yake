<template>
    <div class="box">
        <ul class="img-view">
            <li v-for="(image, index) in imageList" :key="index">
                <div class="img-delete" @click="imgDelete(index)"></div>
                <img :src="imgPreview(image)">
            </li>
            <li>
                <label class="file-label">
                    <input type="file" class="file-input" @change="handleFileChange" accept="image/*"
                           multiple="multiple" ref="inputFile">
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
	export default {
		name: "ImgMultipleInputer",
		props: ['value'],
		data() {
			return {
				imageList: []
			}
		},
		mounted() {
			this.imageList = this.value
		},
		methods: {
			handleFileChange(e) {
				// console.log(e.value)
				this.imageList = [...this.imageList, ...e.target.files]
				this.$emit('input', this.imageList)
				this.$refs.inputFile.value = ""
			},
			imgPreview(file) {
				// 看支持不支持FileReader
				if (!file || !URL.createObjectURL) return;
				if (/^image/.test(file.type)) {
					// 创建一个reader
					return URL.createObjectURL(file)
				}
			},
			imgDelete(index) {
				console.log(index)
				this.imageList.splice(index, 1)
			}
		}
	}
</script>

<style scoped>
    .box {
        display: flex;
        justify-content: start;
    }

    .img-view {

    }

    .img-view li {
        float: left;
        margin-right: 10px;
        position: relative;
    }

    .img-delete {
        width: 32px;
        height: 32px;
        position: absolute;
        top: 0;
        right: 0;
        background-image: url("../../assets/images/upload_delete.png");
        background-repeat: no-repeat;
        background-position: center;
    }

    .img-view img {
        width: 172px;
        height: 172px;
    }

    .file-label {
        display: block;
        width: 172px;
        height: 172px;
        border-radius: 2px;
        border: 1px solid #E3F1D8;
        position: relative;
        background-color: #FAFCFF;
        background-image: url("../../assets/images/upload_bg.png");
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }

    .file-input {
        opacity: 0;
        position: absolute;
        z-index: -1;
        outline: none;
    }
</style>
