<template>
	<div class="option" @click="handler(JSON.stringify(value))">
		{{ label }}
	</div>
</template>

<script>
	export default {
		name: "OptionComponent",
		props: {
			value: {},
			label: String,
			handler: {},
		},
	};
</script>

<style lang="scss" scoped>
	.option {
		margin: 7px 10px !important;
		cursor: pointer;

		&:hover {
			background-color: #cccccc;
		}
	}
</style>
