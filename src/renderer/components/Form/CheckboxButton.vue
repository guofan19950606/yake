<template>
    <label class="checkbox-button">
        <input class="checkbox" type="checkbox" @change="handleChange" :value="value" :checked="isChechbox">
        <span class="checkbox-text"
              :class="{'checkbox-active':model.includes(value)}">
            <slot></slot>
            <template v-if="!$slots.default">{{value}}</template>
        </span>
    </label>
</template>

<script>
	export default {
		name: "CheckBoxButton",
		model: {
			prop: 'model',
			event: 'change'
		},
		props: ['model', 'value'],
		computed: {
			isChechbox() {
				if (this.model instanceof Array) {
					return this.model.includes(this.value)
				}
				return this.model === this.value
			}
		},
		methods: {
			handleChange(e) {
				console.log(e)
				const isChechbox = e.target.checked
				console.log(isChechbox)
				const value = e.target.value
				if (this.model instanceof Array) {
					let newModel = [...this.model]
					if (isChechbox && !newModel.includes(value)) {
						newModel.push(value)
					}
					if (!isChechbox && newModel.includes(value)) {
						newModel.splice(newModel.indexOf(value), 1)
					}
					this.$emit('change', newModel)
				} else {
					this.$emit('change', isChechbox)
				}
			}
		}
	}
</script>

<style scoped>
    .checkbox-button {
        position: relative;
        display: inline-block;
    }

    .checkbox {
        opacity: 0;
        outline: none;
        position: absolute;
        margin: 0;
        z-index: -1;
    }

    .checkbox-text {
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

    .checkbox-active {
        border-color: #3EC88C;
    }
</style>
