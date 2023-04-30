<template>
	<div class="layout">
		<div class="layout-menu">
			<SidebarComponent />
		</div>
		<div class="layout-content">
			<div class="layout-content-header">
				{{ $route.name }}
			</div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import SidebarComponent from "@/components/sidebar/SidebarComponent";

	export default {
		name: "MainLayout",
		components: { SidebarComponent },
	};
</script>

<style lang="scss">
	.layout {
		height: 100%;
		display: flex;
		justify-content: space-between;

		&-menu {
			width: 229px;
		}

		&-content {
			flex: 1 0 auto;
			background-color: #fbfcfd;
			padding: 25px;
			font-family: MyriadPro-Regular;

			&-header {
				font-family: MyriadPro-Semibold;
				font-size: 30px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				line-height: normal;
				letter-spacing: normal;
				color: #000;
				margin-bottom: 25px;
			}
		}
	}
</style>
