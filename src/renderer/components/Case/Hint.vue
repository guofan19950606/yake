<template>
    <div class="hint">{{number}}</div>
</template>

<script>
	export default {
		name: "Hint",
		props: ['number']
	}
</script>

<style scoped>
    .hint {
        width: 28px;
        height: 22px;
        background: #90A4AE;
        border-radius: 11px;
        text-align: center;
        line-height: 22px;
        font-size: 14px;
        color: #ffffff;
    }
</style>
