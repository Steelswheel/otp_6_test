<template>
	<div
		ref="select"
		class="select input-block"
		@click="showDropdown = !showDropdown"
	>
		<div class="select-label" ref="label">
			{{ label ? label : placeholder }}
		</div>
		<div ref="dropdown" class="select-dropdown" v-show="showDropdown">
			<slot :changeValue="changeValue"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "SelectComponent",
		props: {
			label: String,
			modelValue: {},
			placeholder: {
				type: String,
				default: "",
			},
		},
		emits: ["update:modelValue"],
		data() {
			return {
				showDropdown: false,
			};
		},
		computed: {
			value: {
				get() {
					return this.modelValue;
				},
				set(value) {
					this.$emit("update:modelValue", JSON.parse(value));
				},
			},
		},
		methods: {
			changeValue(value) {
				this.$emit("update:modelValue", JSON.parse(value));
			},
		},
		mounted() {
			document.addEventListener("click", (event) => {
				if (this.$refs.select && this.$refs.dropdown) {
					if (
						event.target !== this.$refs.select &&
						event.target !== this.$refs.dropdown &&
						!this.$refs.dropdown.contains(event.target)
					) {
						this.showDropdown = false;
					}
				}
			});
		},
	};
</script>

<style lang="scss" scoped>
	.select {
		position: relative;
		cursor: pointer;

		&-label {
			font-size: 16px;
			line-height: 100%;
			color: #000;
			font-size: 16px;
			line-height: 100%;
			color: #000;
		}

		&-dropdown {
			text-align: left;
			width: 100%;
			position: absolute;
			left: 0;
			bottom: -10px;
			transform: translateY(100%);
			border-radius: 10px;
			box-shadow: 0 0 3px 0 #000,
				inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
			border: solid 1px #eeeff1;
			background-color: #fff;
			font-size: 14px;
		}
	}
</style>
