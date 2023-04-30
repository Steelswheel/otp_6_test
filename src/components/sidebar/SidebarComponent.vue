<template>
	<div class="sidebar">
		<div class="sidebar-content">
			<div
				class="sidebar-header d-flex align-items-center justify-content-center"
			>
				<router-link to="/">
					<img
						class="sidebar-logo"
						src="../../assets/logo.svg"
						alt="logo"
					/>
				</router-link>
			</div>
			<SidebarMenuComponent />
		</div>
		<div class="sidebar-footer">
			<PersonalSettingsComponent />
		</div>
	</div>
</template>

<script>
	import SidebarMenuComponent from "@/components/sidebar/SidebarMenuComponent";
	import PersonalSettingsComponent from "@/components/personalSettings/PersonalSettingsComponent";

	export default {
		name: "SidebarComponent",
		components: {
			SidebarMenuComponent,
			PersonalSettingsComponent,
		},
	};
</script>

<style lang="scss">
	.sidebar {
		font-family: Verdana;
		height: 100%;
		background-image: radial-gradient(circle at 29% 0, #000, #1c2734 103%);
		background-repeat: no-repeat;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		&-logo {
			display: block;
			width: 118.6px;
			height: 20px;
		}

		&-header {
			padding: 31px 0 30px 0;
		}
	}
</style>
