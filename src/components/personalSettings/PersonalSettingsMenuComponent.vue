<template>
	<div class="personal-settings-menu" v-show="show">
		<router-link
			:to="menuItem.url"
			v-for="menuItem in menu"
			:key="menuItem.url"
			class="personal-settings-menu-item"
		>
			{{ menuItem.name }}
		</router-link>
	</div>
</template>

<script>
	export default {
		name: "PersonalSettingsMenuComponent",
		props: {
			show: Boolean,
		},
		data() {
			return {
				menu: [
					{
						name: "Личные настройки",
						url: "/personal",
					},
					{
						name: "Выйти",
						url: "/logout",
					},
				],
			};
		},
	};
</script>

<style lang="scss">
	.personal-settings-menu {
		position: absolute;
		top: -4.5px;
		transform: translateY(-100%);
		width: 199px;
		border-radius: 5px;
		box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
		background-color: #fff;

		&-item {
			display: block;
			padding: 7px 9.6px;
			transition: all 0.2s;
			background-color: #fff;
			font-family: MyriadPro-Regular;
			font-size: 14px;
			color: #000;
			text-decoration: none;

			&:first-child {
				border-radius: 5px 5px 0 0;
			}

			&:last-child {
				border-radius: 0 0 5px 5px;
			}

			&:hover {
				background-color: #eef3f8;
			}
		}
	}
</style>
