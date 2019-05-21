<template>
    <label class="radio-button">
        <input type="radio"
               class="radio"
               :value="value"
               @click="handleChange($event)">
        <span class="radio-text"
              :class="{'radio-active':model == value}">
            <slot></slot>
            <template v-if="!$slots.default">{{value}}</template>
        </span>
    </label>
</template>

<script>
	export default {
		name: "RadioButton",
		model: {
			prop: 'model',
			event: 'change'
		},
		props: ['model', 'value'],
		methods: {
			handleChange(e) {
				// console.log(e.target.value)
				this.$emit('change', e.target.value)
			}
		}
	}
</script>

<style scoped>
    .radio-button {
        display: inline-block;
        position: relative;
    }

    .radio {
        opacity: 0;
        position: absolute;
        z-index: -1;
        outline: none;
    }

    .radio-text {
        font-size: 14px;
        color: #666666;
        cursor: pointer;
        border: 1px solid #E3F1D8;
        border-radius:2px;
        box-sizing: border-box;
        padding: 12px 26px;
        user-select: none;
        display: inline-block;
        background-color: #F3FFEA;
    }

    .radio-active {
        border-color: #3EC88C;
    }
</style>
