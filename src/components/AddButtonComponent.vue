<template>
	<button class="add-button d-flex align-items-center">
		<img src="../assets/plus.svg" alt="plus-icon" class="add-button-icon" />
		<div class="add-button-label">
			{{ label }}
		</div>
	</button>
</template>

<script>
	export default {
		name: "AddButtonComponent",
		props: {
			label: String,
		},
	};
</script>

<style lang="scss">
	.add-button {
		padding: 10px 15px 10px 10px;
		border-radius: 5px;
		background-color: #2f8cff;
		border: none;
		cursor: pointer;
		transition: all 0.2s;

		&:hover {
			opacity: 0.8;
		}

		&-icon {
			display: block;
			width: 11px;
			height: 11px;
			margin-right: 7px;
		}

		&-label {
			font-family: MyriadPro-Regular;
			color: #fff;
			font-size: 14px;
			line-height: 15px;
		}
	}
</style>
