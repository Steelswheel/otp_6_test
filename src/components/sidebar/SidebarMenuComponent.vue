<template>
	<div class="sidebar-menu">
		<Container>
			<Draggable
				v-for="route in $router.options.routes.filter(
					(route) => !route.meta?.hidden,
				)"
				:key="route.path"
			>
				<SidebarMenuItemComponent :route="route" />
			</Draggable>
		</Container>
	</div>
</template>

<script>
	import SidebarMenuItemComponent from "@/components/sidebar/SideBarMenuItemComponent";
	import { Container, Draggable } from "vue-dndrop";

	export default {
		name: "SidebarMenuComponent",
		components: {
			SidebarMenuItemComponent,
			Container,
			Draggable,
		},
	};
</script>

<style lang="scss">
	.sidebar-menu {
		margin-top: -7px;
	}
</style>
