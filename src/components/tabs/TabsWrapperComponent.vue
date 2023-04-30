<template>
	<div class="tabs">
		<div class="tabs-header d-flex align-items-center">
			<div
				:class="`tabs-title ${title === selectedTitle ? 'active' : ''}`"
				v-for="title in tabTitles"
				:key="title"
				@click="selectedTitle = title"
			>
				{{ title }}
			</div>
		</div>
		<div class="tabs-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import { ref, provide } from "vue";

	export default {
		setup(props, { slots }) {
			const tabTitles = ref(
				slots.default().map((tab) => tab.props.title),
			);
			const selectedTitle = ref(tabTitles.value[0]);

			provide("selectedTitle", selectedTitle);

			return {
				tabTitles,
				selectedTitle,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.tabs {
		&-header {
			margin-bottom: 25px;
		}

		&-title {
			font-size: 16px;
			font-weight: 600;
			cursor: pointer;
			transition: color 0.2s;
			color: #000;
			margin-right: 20px;

			&:last-child {
				margin-right: 0;
			}

			&.active,
			&:hover {
				color: #1253a2;
			}
		}
	}
</style>
