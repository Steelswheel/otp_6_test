<template>
	<MainLayout>
		<router-view />
	</MainLayout>
</template>

<script>
	import MainLayout from "@/layouts/MainLayout";
	export default {
		name: "App",
		components: {
			MainLayout,
		},
	};
</script>

<style lang="scss">
	@font-face {
		font-family: "MyriadPro-Regular";
		src: url("@/fonts/MyriadPro-Regular.otf") format("truetype");
	}

	@font-face {
		font-family: "MyriadPro-Semibold";
		src: url("@/fonts/MyriadPro-Semibold.otf") format("truetype");
	}

	@font-face {
		font-family: "Verdana";
		src: url("@/fonts/Verdana.ttf") format("truetype");
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html,
	body,
	#app {
		height: 100%;
	}

	.d-flex {
		display: flex;

		&.align-items {
			&-center {
				align-items: center;
			}

			&-start {
				align-items: start;
			}

			&-end {
				align-items: end;
			}
		}

		&.flex-column {
			flex-direction: column;
		}

		&.justify-content {
			&-between {
				justify-content: space-between;
			}

			&-center {
				justify-content: center;
			}
		}
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.2s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.shadow-block {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
		border: solid 1px #eeeff1;
	}

	.input-block {
		display: flex;
		align-items: center;
		background-color: #fff;
		border: 1px solid #cccccc;
		border-radius: 5px;
		height: 35px;
		width: 100%;
		outline: none;
		padding: 0 15px;
		font-size: 16px;
		line-height: 100%;
		text-align: left;
	}
</style>
