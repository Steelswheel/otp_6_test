<template>
	<div class="personal-settings d-flex align-items-center">
		<div class="personal-settings-menu-wrap" ref="menu">
			<PersonalSettingsMenuComponent :show="menuVisibility" />
		</div>
		<div
			class="personal-settings-image d-flex align-items-center justify-content-center"
			ref="image"
			:style="
				user.image
					? `background-image: url(${user.image})`
					: 'background-color: #f6f5f3'
			"
			@click="menuVisibility = !menuVisibility"
		>
			<div v-if="user.name" class="personal-settings-image-text">
				{{ user.name[0] }}
			</div>
		</div>
		<div v-if="user.name" class="personal-settings-name">
			{{ user.name }}
		</div>
	</div>
</template>

<script>
	import PersonalSettingsMenuComponent from "./PersonalSettingsMenuComponent";

	export default {
		name: "PersonalSettingsComponent",
		components: {
			PersonalSettingsMenuComponent,
		},
		data() {
			return {
				user: {
					name: "Денис Потемкин",
					image: "",
				},
				menuVisibility: false,
			};
		},
		mounted() {
			document.addEventListener("click", (event) => {
				if (
					event.target !== this.$refs.image &&
					event.target !== this.$refs.menu &&
					!this.$refs.menu.contains(event.target)
				) {
					if (!this.$refs.image.contains(event.target)) {
						this.menuVisibility = false;
					}
				}
			});

			// TODO: дописать axios-запрос для получения данных о пользователе
		},
	};
</script>

<style lang="scss">
	.personal-settings {
		position: relative;
		border-top: 1px solid #2c3d51;
		padding: 9.5px 0 10px 0;
		margin: 0 15px;

		&-image {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			cursor: pointer;
			background-position: center center;
			background-repeat: no-repeat;
			background-size: cover;

			&-text {
				font-family: Verdana;
				font-weight: bold;
				font-size: 12px;
				line-height: 100%;
				color: #1c2734;
				user-select: none;
			}
		}

		&-name {
			margin-left: 7px;
			font-family: MyriadPro-Regular;
			color: #fff;
			font-size: 14px;
		}
	}
</style>
