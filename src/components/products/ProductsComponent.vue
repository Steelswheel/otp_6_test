<template>
	<div class="products">
		<div
			class="products-buttons shadow-block d-flex align-items-center justify-content-between"
		>
			<AddButtonComponent @click="addProduct" label="Добавить строку" />
		</div>
		<div class="products-wrap shadow-block">
			<table class="table">
				<thead>
					<tr>
						<th>Номер</th>
						<th>Действие</th>
						<th>Наименование единицы</th>
						<th>Цена</th>
						<th>Кол-во</th>
						<th>Название товара</th>
						<th>Итого</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(product, index) in addedProducts"
						:key="product.name"
					>
						<td>
							<div
								class="products-table-number d-flex align-items-start"
							>
								<img src="../../assets/drag.svg" alt="drag" />
								{{ index + 1 }}
							</div>
						</td>
						<td>
							<button
								class="products-table-actions"
								@click="addedProducts.splice(index, 1)"
							>
								<img src="../../assets/dots.svg" alt="dots" />
							</button>
						</td>
						<td>
							<SelectComponent
								v-if="product.id"
								v-model="product.type"
								:label="product.type.name"
							>
								<template v-slot="{ changeValue }">
									<OptionComponent
										:label="item.name"
										:value="item"
										:key="item.name"
										:handler="changeValue"
										v-for="item in products.find(
											(p) => p.id === product.id,
										).types"
									/>
								</template>
							</SelectComponent>
						</td>
						<td>
							<div class="input-block">
								{{ product.type.price }}
							</div>
						</td>
						<td>
							<InputNumberComponent v-model="product.quantity" />
						</td>
						<td>
							<SelectComponent
								v-model="product.id"
								:label="
									products.find((p) => p.id === product.id)
										?.name
								"
							>
								<template v-slot="{ changeValue }">
									<OptionComponent
										v-for="p in products"
										:label="p.name"
										:value="p.id"
										:key="p.id"
										:handler="changeValue"
									/>
								</template>
							</SelectComponent>
						</td>
						<td>
							<div class="input-block">
								{{
									product.type.price && product.quantity
										? product.type.price * product.quantity
										: 0
								}}
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="products-count d-flex flex-column align-items-end">
				<div class="products-count-block">
					<div
						class="d-flex align-items-center justify-content-between"
					>
						<div class="products-count-block-label">Сумма:</div>
						<div class="products-count-block-sum">
							{{ getFullSum }}
						</div>
					</div>
					<div
						class="d-flex align-items-center justify-content-between"
					>
						<div class="products-count-block-label">
							Количество:
						</div>
						<div class="products-count-block-sum">
							{{ getFullQuantity }}
						</div>
					</div>
					<div
						class="d-flex align-items-center justify-content-between"
					>
						<div class="products-count-block-label">Общий вес:</div>
						<div class="products-count-block-sum">
							{{ getFullWeight }}
						</div>
					</div>
				</div>
				<div
					class="products-count-block-total d-flex align-items-center justify-content-between"
				>
					<div class="products-count-block-total-label">
						Общая сумма:
					</div>
					<div class="products-count-block-total-sum">
						{{ getFullSum }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import AddButtonComponent from "@/components/AddButtonComponent";
	import SelectComponent from "@/components/select/SelectComponent";
	import OptionComponent from "@/components/select/OptionComponent";
	import InputNumberComponent from "@/components/inputNumber/InputNumberComponent";

	export default {
		name: "ProductsComponent",
		components: {
			AddButtonComponent,
			SelectComponent,
			OptionComponent,
			InputNumberComponent,
		},
		data() {
			return {
				products: [
					{
						id: 1,
						name: "Мраморный щебень",
						types: [
							{
								name: "Мраморный щебень фр. 2-5 мм, 25кг",
								price: 100,
								weight: 25,
							},
							{
								name: "Мраморный щебень фр. 2-5 мм, 25кг (белый)",
								price: 200,
								weight: 25,
							},
							{
								name: "Мраморный щебень фр. 2-5 мм, 25кг (вайт)",
								price: 300,
								weight: 25,
							},
							{
								name: "Мраморный щебень фр. 2-5 мм, 25кг, возврат",
								price: 400,
								weight: 25,
							},
							{
								name: "Мраморный щебень фр. 2-5 мм, 1т",
								price: 500,
								weight: 1000,
							},
						],
					},
				],
				addedProducts: [],
			};
		},
		computed: {
			getFullSum() {
				return (
					this.addedProducts
						.map((item) => item.type.price * item.quantity)
						.reduce((sum, current) => sum + current, 0)
						.toLocaleString() + " руб"
				);
			},
			getFullQuantity() {
				return (
					this.addedProducts
						.map((item) => item.quantity)
						.reduce((sum, current) => sum + current, 0)
						.toLocaleString() + " шт"
				);
			},
			getFullWeight() {
				return (
					this.addedProducts
						.map((item) => item.type.weight * item.quantity)
						.reduce((sum, current) => sum + current, 0)
						.toLocaleString() + " кг"
				);
			},
		},
		methods: {
			addProduct() {
				this.addedProducts.push({
					id: 0,
					quantity: 0,
					type: {
						name: "",
						price: 0,
						weight: 0,
					},
				});
			},
			getAddedProducts() {
				let ls = localStorage.getItem("addedProducts");

				if (ls) {
					this.addedProducts = JSON.parse(ls);
				}
			},
		},
		watch: {
			addedProducts: {
				deep: true,
				handler(value) {
					localStorage.setItem(
						"addedProducts",
						JSON.stringify(value),
					);
				},
			},
		},
		mounted() {
			this.getAddedProducts();
		},
	};
</script>

<style lang="scss">
	.products {
		&-table {
			&-number {
				font-size: 16px;
				line-height: 100%;

				img {
					margin-right: 5px;
					cursor: pointer;
				}
			}

			&-actions {
				border: none;
				cursor: pointer;
			}
		}

		&-buttons {
			padding: 20px 25px;
		}

		&-wrap {
			margin-top: 25px;
			padding-bottom: 25px;
		}

		&-count {
			margin-top: 15px;
			padding: 0 15px;

			&-block,
			&-block-total {
				width: 304px;
				padding: 15px;
				border-radius: 5px;
				border: solid 1px #eeeff1;
				background-color: #fbfcfd;
				font-size: 14px;
			}

			&-block {
				&-label {
					color: #8f8f8f;
				}
			}

			&-block-total {
				margin-top: 5px;

				&-label {
					color: #000;
				}

				&-sum {
					font-weight: bold;
				}
			}
		}
	}

	.table {
		width: 100%;
		border-collapse: collapse;

		th {
			border: 1px solid #eeeff1;
			padding: 14px 7px;

			&:first-child {
				border-left: none;
			}

			&:last-child {
				border-right: none;
			}
		}

		td {
			vertical-align: middle;
			padding: 5px 9px;
		}
	}
</style>
