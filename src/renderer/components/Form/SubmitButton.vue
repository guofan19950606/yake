<template>
    <button class="button" :type="type">
        <slot></slot>
    </button>
</template>

<script>
	export default {
		name: "Button",
		props: ['type']
	}
</script>

<style scoped>
    .button {
        width: 196px;
        height: 48px;
        background: rgba(62, 200, 140, 1);
        border: 1px solid rgba(227, 241, 216, 1);
        border-radius: 2px;
        color: #ffffff;
        cursor: pointer;
    }

    .button:focus {
        outline: 0;
    }
</style>
