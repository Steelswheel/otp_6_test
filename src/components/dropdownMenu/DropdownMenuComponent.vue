<template>
	<div class="dropdown-menu">
		<slot></slot>
		<div v-show="showMenu" class="dropdown-menu-wrap">
			<DropdownMenuItemComponent
				v-for="(item, index) in menu"
				:index="index"
				:label="item.label"
				:list="item.list"
				:key="item.label"
				v-show="item.visible"
				@setVibility="setVibility"
			/>
		</div>
	</div>
</template>

<script>
	import DropdownMenuItemComponent from "./DropdownMenuItemComponent";

	export default {
		name: "DropdownMenuComponent",
		props: {
			showMenu: Boolean,
			menu: Array,
		},
		components: {
			DropdownMenuItemComponent,
		},
		methods: {
			setVibility(index, active) {
				if (active) {
					this.menu
						.filter((item, i) => i !== index)
						.forEach((item) => (item.visible = false));
				} else {
					this.menu.forEach((item) => (item.visible = true));
				}
			},
		},
	};
</script>

<style lang="scss">
	.dropdown-menu {
		position: relative;

		&-wrap {
			position: absolute;
			right: 0;
			box-shadow: 0 0 3px 0 #000,
				inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
			background-color: #fff;
			border-radius: 5px;
		}
	}
</style>
