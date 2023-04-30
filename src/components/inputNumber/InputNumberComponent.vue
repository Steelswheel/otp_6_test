<template>
	<input
		class="input-number input-block"
		:disabled="disabled"
		type="number"
		v-model="value"
	/>
</template>

<script>
	export default {
		name: "InputNumberComponent",
		props: {
			modelValue: Number,
			disabled: Boolean,
		},
		computed: {
			value: {
				get() {
					return this.modelValue;
				},
				set(value) {
					this.$emit("update:modelValue", value);
				},
			},
		},
	};
</script>

<style lang="scss">
	input[type="number"] {
		appearance: none;
		-moz-appearance: textfield;

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
		}

		&:hover,
		&:focus {
			appearance: none;
			-moz-appearance: textfield;
		}
	}
</style>
