"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTable = searchTable;
function searchTable(inputId, tableId) {
    const input = document.getElementById(inputId);
    const table = document.getElementById(tableId);
    if (!input || !table) {
        console.warn(`Elemento con ID '${inputId}' o '${tableId}' no encontrado.`);
        return;
    }
    const filter = input.value.toUpperCase();
    const rows = table.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let match = false;
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell) {
                const text = cell.textContent || cell.innerText;
                if (text.toUpperCase().indexOf(filter) > -1) {
                    match = true;
                    break;
                }
            }
        }
        rows[i].style.display = match ? "" : "none";
    }
}
