<template>
	<div class="home">
		<table class="table">
			<thead>
				<tr class="container">
					<th class="draggable">
						Head1 asdas d sdadasd asdasdasd asdasdasd
						<div class="resizer"></div>
					</th>
					<th class="draggable">
						Head2
						<div class="resizer"></div>
					</th>
					<th class="draggable">
						Head3
						<div class="resizer"></div>
					</th>
					<th class="draggable">
						Head4
						<div class="resizer"></div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
				</tr>
				<tr>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
				</tr>
				<tr>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
				</tr>
				<tr>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
					<td>
						tdtdtdtdtd
						<div class="resizer"></div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		name: "HomeView",
		methods: {
			setResize() {
				const resizers = document.querySelectorAll(".resizer");
				const table = document.querySelector(".table");
				const cols = table
					.querySelector("thead")
					.querySelectorAll("th").length;
				const columnMaxWidth = table.offsetWidth / cols;

				table.querySelectorAll("th").forEach((item) => {
					item.style.width = `${columnMaxWidth}px`;
				});

				resizers.forEach((resizer) => {
					resizer.ondragstart = () => false;

					resizer.addEventListener("mousedown", (event) => {
						event.stopPropagation();

						const parent = resizer.parentElement;
						const startWidth = parent.offsetWidth;
						const startX = resizer.getBoundingClientRect().left;
						//parent.style.maxWidth = `${columnMaxWidth}px`;

						function resize(event) {
							event.stopPropagation();

							let offset = event.clientX - startX;

							parent.style.width =
								startWidth + offset > columnMaxWidth
									? `${columnMaxWidth}px`
									: `${startWidth + offset}px`;
						}

						document.addEventListener("mousemove", resize);

						document.addEventListener("mouseup", () => {
							document.removeEventListener("mousemove", resize);
						});
					});

					resizer.ondragstart = () => false;
				});
			},
			setDraggable() {
				const table = document.querySelector(".table");

				let draggingEle;
				let draggingColumnIndex;
				let placeholder;
				let list;
				let isDraggingStarted = false;
				let x = 0;
				let y = 0;

				const swap = function (nodeA, nodeB) {
					const parentA = nodeA.parentNode;
					const siblingA =
						nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

					nodeB.parentNode.insertBefore(nodeA, nodeB);

					parentA.insertBefore(nodeB, siblingA);
				};

				const isOnLeft = function (nodeA, nodeB) {
					const rectA = nodeA.getBoundingClientRect();
					const rectB = nodeB.getBoundingClientRect();

					return (
						rectA.left + rectA.width / 2 <
						rectB.left + rectB.width / 2
					);
				};

				const cloneTable = function () {
					list = document.createElement("div");
					list.classList.add("clone-list");
					table.parentNode.insertBefore(list, table);

					table.style.visibility = "hidden";

					const originalCells = [].slice.call(
						table.querySelectorAll("tbody td"),
					);

					const originalHeaderCells = [].slice.call(
						table.querySelectorAll("th"),
					);

					const numColumns = originalHeaderCells.length;

					originalHeaderCells.forEach(function (
						headerCell,
						headerIndex,
					) {
						const width = parseInt(
							window.getComputedStyle(headerCell).width,
						);

						const item = document.createElement("div");
						item.classList.add("draggable");

						const newTable = document.createElement("table");
						newTable.setAttribute("class", "clone-table");
						newTable.style.width = `${width}px`;

						const th = headerCell.cloneNode(true);
						let newRow = document.createElement("tr");
						newRow.appendChild(th);
						newTable.appendChild(newRow);

						const cells = originalCells.filter(function (c, idx) {
							return (idx - headerIndex) % numColumns === 0;
						});
						cells.forEach(function (cell) {
							const newCell = cell.cloneNode(true);
							newCell.style.width = `${width}px`;
							newRow = document.createElement("tr");
							newRow.appendChild(newCell);
							newTable.appendChild(newRow);
						});

						item.appendChild(newTable);
						list.appendChild(item);
					});
				};

				const mouseDownHandler = function (e) {
					draggingColumnIndex = [].slice
						.call(table.querySelectorAll("th"))
						.indexOf(e.target);

					x = e.clientX - e.target.offsetLeft;
					y = e.clientY - e.target.offsetTop;

					document.addEventListener("mousemove", mouseMoveHandler);
					document.addEventListener("mouseup", mouseUpHandler);
				};

				const mouseMoveHandler = function (e) {
					if (!isDraggingStarted) {
						isDraggingStarted = true;

						cloneTable();

						draggingEle = [].slice.call(list.children)[
							draggingColumnIndex
						];
						draggingEle.classList.add("dragging");

						placeholder = document.createElement("div");
						placeholder.classList.add("placeholder");
						draggingEle.parentNode.insertBefore(
							placeholder,
							draggingEle.nextSibling,
						);
						placeholder.style.width = `${draggingEle.offsetWidth}px`;
					}

					y = e.clientY;

					draggingEle.style.position = "absolute";

					draggingEle.style.top = `${y}px`;
					draggingEle.style.left = `${
						draggingEle.offsetLeft + e.clientX - x
					}px`;

					x = e.clientX;

					const prevEle = draggingEle.previousElementSibling;
					const nextEle = placeholder.nextElementSibling;

					if (prevEle && isOnLeft(draggingEle, prevEle)) {
						swap(placeholder, draggingEle);
						swap(placeholder, prevEle);
						return;
					}

					if (nextEle && isOnLeft(nextEle, draggingEle)) {
						swap(nextEle, placeholder);
						swap(nextEle, draggingEle);
					}
				};

				const mouseUpHandler = function () {
					if (placeholder && placeholder.parentNode) {
						placeholder.parentNode.removeChild(placeholder);
					}

					if (draggingEle) {
						draggingEle.classList.remove("dragging");
						draggingEle.style.removeProperty("top");
						draggingEle.style.removeProperty("left");
						draggingEle.style.removeProperty("position");

						const endColumnIndex = [].slice
							.call(list.children)
							.indexOf(draggingEle);

						isDraggingStarted = false;

						if (list.parentNode) {
							list.parentNode.removeChild(list);
						}

						table.querySelectorAll("tr").forEach(function (row) {
							const cells = [].slice.call(
								row.querySelectorAll("th, td"),
							);

							/* eslint-disable */
							draggingColumnIndex > endColumnIndex
								? cells[endColumnIndex].parentNode.insertBefore(
										cells[draggingColumnIndex],
										cells[endColumnIndex],
								  )
								: cells[endColumnIndex].parentNode.insertBefore(
										cells[draggingColumnIndex],
										cells[endColumnIndex].nextSibling,
								  );
						});
					}

					table.style.removeProperty("visibility");

					document.removeEventListener("mousemove", mouseMoveHandler);
					document.removeEventListener("mouseup", mouseUpHandler);
				};

				table.querySelectorAll("th").forEach(function (headerCell) {
					headerCell.classList.add("draggable");
					headerCell.addEventListener("mousedown", mouseDownHandler);
				});
			},
		},
		mounted() {
			this.setResize();
			this.setDraggable();
		},
	};
</script>

<style lang="scss">
	.table {
		width: 100%;
		border-collapse: collapse;

		th,
		td {
			position: relative;
			border: 1px solid #000;
		}

		.draggable {
			cursor: move;
		}

		.resizer {
			position: absolute;
			top: 0;
			right: 0;
			width: 1px;
			height: 100%;
			background-color: red;
			cursor: col-resize;
		}
	}

	.clone-list {
		display: flex;

		table {
			border-collapse: collapse;
		}

		th,
		td {
			border: 1px solid #000;
		}
	}
</style>
