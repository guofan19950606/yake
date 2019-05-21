<template>
    <div class="info">
        <div>
            <h2>口内检查</h2>
            <p>牙列：{{checkContent.columnTeeth}}</p>
            <p>磨牙关系：左，{{checkContent.molarToothLeft}}、右，{{checkContent.molarToothRight}}</p>
            <p>尖牙关系：左，{{checkContent.canineTeethLeft}}、右，{{checkContent.canineTeethRight}}</p>
            <p>前牙覆合：深覆合，{{checkContent.anteriorTeethDeepOverlap}}、开合，{{checkContent.anteriorTeethOpenClose}}、
                {{checkContent.anteriorTeethDuiren}}
            </p>
            <p>前牙覆盖：深覆盖，{{checkContent.anteriorTeethDeepCover}}</p>
            <p>后牙：左侧反合，{{checkContent.posteriorTeethLeft}}、右侧反合，{{checkContent.posteriorTeethRight}}</p>
            <p>中线关系：上颌中线，{{checkContent.midlineMaxilla}}、下颌中线，{{checkContent.midlineMandible}}</p>
            <p>问题牙：{{checkContent.problemTooth}}</p>
            <p>牙周情况：{{checkContent.dentalPeriphery}}</p>
            <p>口腔卫生：{{checkContent.oralHygiene}}</p>
        </div>
        <div>
            <h2>颌面部检查</h2>
            <p>面型：{{checkContent.faceShape}}</p>
            <p>颌骨关系：{{checkContent.jawBones}}</p>
        </div>
        <div>
            <h2>颞下颌关节检查</h2>
            <p>开口度：{{checkContent.aperture}}</p>
            <p>开口型：{{checkContent.openType}}</p>
            <p>关节区：{{checkContent.articularRegion}}</p>
        </div>
        <div>
            <h2>不良习惯</h2>
            <p>{{checkContent.badHabit}}</p>
        </div>
        <div>
            <h2>面像照片</h2>
            <div class="face">
                <img v-if="checkPhoto.imageFront" :src="`${checkPhoto.imageFront}`"/>
                <img v-if="checkPhoto.imageFrontSmile" :src="`${checkPhoto.imageFrontSmile}`"/>
                <img v-if="checkPhoto.imageLeft45" :src="`${checkPhoto.imageLeft45}`"/>
                <img v-if="checkPhoto.imageRight45" :src="`${checkPhoto.imageRight45}`"/>
                <img v-if="checkPhoto.imageSide" :src="`${checkPhoto.imageSide}`"/>
            </div>
        </div>
        <div>
            <h2>口内像照片</h2>
            <div class="tooth">
                <img v-if="checkPhoto.toothImageFront" :src="`${checkPhoto.toothImageFront}`"/>
                <img v-if="checkPhoto.toothImageSide" :src="`${checkPhoto.toothImageSide}`"/>
                <img v-if="checkPhoto.toothImageLeft45" :src="`${checkPhoto.toothImageLeft45}`"/>
                <img v-if="checkPhoto.toothImageRight45" :src="`${checkPhoto.toothImageRight45}`"/>
                <img v-if="checkPhoto.maxillaImage" :src="`${checkPhoto.maxillaImage}`"/>
                <img v-if="checkPhoto.mandibleImage" :src="`${checkPhoto.mandibleImage}`"/>
            </div>
        </div>
        <div>
            <h2>牙模照片</h2>
            <div v-if="checkPhoto.dentalCastPhoto" class="modal">
                <img v-for="(item, index) in checkPhoto.dentalCastPhoto.split(',')"
                     :src="`${item}`" :key="index"/>
            </div>
        </div>
        <div>
            <h2>牙模照片</h2>
            <div v-if="checkPhoto.otherPhoto" class="modal">
                <img v-for="(item, index) in checkPhoto.otherPhoto.split(',')"
                     :src="`${item}`" :key="index"/>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "CaseInfo",
		data() {
			return {}
		},
		props: ['checkContent', 'checkPhoto'],
		methods: {},
		mounted() {
            console.log('anteriorTeethDuiren    对刃')
            console.log(this.checkContent)
            console.log(this.checkContent.anteriorTeethDuiren)
		},
	}
</script>

<style scoped>
    .info p {
        font-size: 14px;
        color: #666666;
        line-height: 28px;
    }

    .face {
        display: flex;
        flex-wrap: wrap;
    }

    .face img {
        width: 170px;
        height: 254px;
        margin: 10px 15px;
    }

    .tooth {
        display: flex;
        flex-wrap: wrap;
    }

    .tooth img {
        width: 170px;
        height: 114px;
        margin: 10px 15px;
    }


    .modal {
        display: flex;
        flex-wrap: wrap;
    }

    .modal img {
        width: 170px;
        height: 170px;
        margin: 10px 15px;
    }

    h2 {
        margin: 30px 0;
        font-size: 16px;
        color: #3EC88C;
    }
</style>
