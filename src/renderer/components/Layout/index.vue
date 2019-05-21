<template>
    <div class="layout">
        <Header/>
        <main class="main">
            <slot></slot>
        </main>
    </div>
</template>

<script>
	import Header from '../Header/index';

	export default {
		name: "index",
		components: {Header}
	}
</script>

<style scoped>
    .layout {
        width: 100%;
        min-width: 1200px;
    }

    .main {
        min-height: calc(100vh - 80px);
        overflow: hidden;
        background-color: #FAFAFF
    }
</style>
