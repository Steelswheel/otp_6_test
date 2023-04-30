<template>
	<div :class="`sidebar-menu-item ${isActiveLink ? 'active' : ''}`">
		<div
			class="sidebar-menu-item-wrap d-flex align-items-center justify-content-between"
		>
			<router-link :to="route.path" class="sidebar-menu-item-link">
				{{ route.name }}
			</router-link>

			<img
				ref="icon"
				class="sidebar-menu-item-icon"
				v-if="route.children?.length > 0"
				src="../../assets/arrow.svg"
				alt="arrow"
				@click="setVisibility"
			/>
		</div>
		<transition name="fade">
			<div v-show="visible" class="sidebar-menu-item-children" key="menu">
				<SidebarMenuItemComponent
					v-for="r in route.children"
					:route="{ ...r, path: `${route.path + r.path}` }"
					:key="r.path"
				/>
			</div>
		</transition>
	</div>
</template>

<script>
	import SidebarMenuItemComponent from "@/components/sidebar/SideBarMenuItemComponent";

	export default {
		name: "SidebarMenuItemComponent",
		components: {
			SidebarMenuItemComponent,
		},
		props: {
			route: Object,
		},
		data() {
			return {
				visible: false,
			};
		},
		computed: {
			isActiveLink() {
				if (this.$route.path === this.route.path) {
					return true;
				} else {
					if (this.route.children) {
						let result = false;

						this.route.children.forEach((child) => {
							if (
								this.$route.path ===
								`${this.route.path + child.path}`
							) {
								result = true;
							}
						});

						return result;
					}

					return false;
				}
			},
		},
		methods: {
			setVisibility() {
				this.visible = !this.visible;

				if (this.visible) {
					this.$refs.icon.style.transform = "rotate(90deg)";
				} else {
					this.$refs.icon.style.transform = "rotate(0)";
				}
			},
		},
	};
</script>

<style lang="scss">
	.sidebar-menu-item {
		font-family: Verdana;

		&-wrap {
			padding: 7px 17.5px 7px 25px;
			position: relative;
		}

		&-link {
			color: #fff;
			text-decoration: none;
			font-size: 14px;
		}

		&.active {
			background-color: #1f344a;

			.sidebar-menu-item-wrap {
				&::before {
					content: "";
					position: absolute;
					left: 0;
					top: 0;
					height: 100%;
					width: 2px;
					background-color: #fd8301;
				}
			}
		}

		&-icon {
			cursor: pointer;
			transition: all 0.2s;
		}

		&-children {
			.sidebar-menu-item {
				&-wrap {
					&::before {
						display: none;
					}
				}

				&-link {
					color: #a6b7d4;
				}

				&.active {
					.sidebar-menu-item-link {
						color: #fff;
					}
				}
			}
		}
	}
</style>
