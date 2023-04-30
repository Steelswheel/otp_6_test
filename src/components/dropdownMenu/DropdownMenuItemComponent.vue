<template>
	<div :class="`dropdown-menu-item ${active ? 'active' : ''}`">
		<div
			:class="`dropdown-menu-item-label ${
				active ? 'active' : ''
			} d-flex align-items-center justify-content-between`"
			@click="setListVisible"
		>
			<div>{{ label }}</div>
			<img
				v-if="list.length > 0"
				class="dropdown-menu-item-arrow"
				src="../../assets/arrow-black.svg"
				alt="arrow-right"
			/>
		</div>
		<div v-show="active" class="dropdown-menu-item-list">
			<div
				class="dropdown-menu-item-list-item d-flex align-items-center"
				v-for="item in list"
				:key="item.id"
			>
				<input
					class="dropdown-menu-item-list-item-checkbox"
					type="checkbox"
					:name="item.id"
					:id="item.id"
				/>
				<label
					class="dropdown-menu-item-list-item-label"
					:for="item.id"
				>
					{{ item.label }}
				</label>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "DropdownMenuItemComponent",
		props: {
			label: String,
			list: Array,
			index: Number,
		},
		data() {
			return {
				active: false,
			};
		},
		methods: {
			setListVisible() {
				this.active = !this.active;

				this.$emit("setVibility", this.index, this.active);
			},
		},
	};
</script>

<style lang="scss">
	.dropdown-menu-item {
		font-size: 14px;
		line-height: 15px;

		&-label {
			user-select: none;
			white-space: nowrap;
			padding: 7px 10px;
			transition: background-color 0.2s;
			cursor: pointer;

			&:first-child {
				border-radius: 5px 5px 0 0;
			}

			&:last-child {
				border-radius: 0 0 5px 5px;
			}

			&:hover {
				background-color: #eef3f8;
			}

			&.active {
				font-weight: bold;
				background-color: #eef3f8;
				justify-content: flex-start;

				& > .dropdown-menu-item-arrow {
					order: 1;
					margin-right: 9px;
					margin-left: 0;
					transform: rotate(-180deg);
				}

				& > div {
					order: 2;
				}
			}
		}

		&-arrow {
			width: 5.3px;
			height: 9px;
			margin-left: 9px;
			margin-right: 0;
		}

		&-list {
			padding: 7px 10px;

			&-item {
				&-checkbox {
					margin: 2px 5px 2px 0;
				}

				&-label {
					font-size: 12px;
					line-height: 13px;
				}
			}
		}
	}
</style>
