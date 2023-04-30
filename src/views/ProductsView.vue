<template>
	<div class="products-view">
		<TabsWrapperComponent>
			<TabComponent title="Общее">
				<ProductsComponent />
			</TabComponent>
			<TabComponent title="Товар списания">
				<div>Товар списания</div>
			</TabComponent>
			<TabComponent title="Доп. расходы">
				<div>Расходы</div>
			</TabComponent>
		</TabsWrapperComponent>
	</div>
</template>

<script>
	import ProductsComponent from "@/components/products/ProductsComponent";
	import TabsWrapperComponent from "@/components/tabs/TabsWrapperComponent";
	import TabComponent from "@/components/tabs/TabComponent";

	export default {
		name: "ProductsView",
		components: {
			ProductsComponent,
			TabsWrapperComponent,
			TabComponent,
		},
	};
</script>

<style lang="scss" scoped>
	.products-view {
		.tabs-wrapper {
			margin-bottom: 25px;
		}
	}
</style>
