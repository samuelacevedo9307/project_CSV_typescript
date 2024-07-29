"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTable = updateTable;
const searchFunctions_1 = require("./searchFunctions");
function updateTable(data, currentPage, pageSize) {
    const table = document.querySelector('table');
    if (!table)
        return;
    // Limpiar
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    // Calcular índices de inicio y fin para la página actual
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data.length);
    // Extraer los datos
    const pagedData = data.slice(startIndex, endIndex);
    // Reconstruir la tabla 
    pagedData.forEach((row) => {
        const rowElement = document.createElement('tr');
        row.forEach((value) => {
            const cell = document.createElement('td');
            cell.textContent = value;
            rowElement.appendChild(cell);
        });
        table.appendChild(rowElement);
    });
}
(_a = document.getElementById('csvFile')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const input = event.target;
    const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
    if (!file) {
        console.error('No se seleccionó ningún archivo.');
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const content = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            if (typeof content === 'string') {
                const lines = content.split('\n').filter((line) => line.trim() !== '');
                const headers = lines[0].split(',');
                const dataRows = lines.slice(1).map((line) => line.split(','));
                console.log(dataRows);
                // Crear tabla
                const tableContainer = document.getElementById('tableContainer');
                const table = document.createElement('table');
                tableContainer.appendChild(table);
                // Encabezados
                const headerRow = document.createElement('tr');
                headers.forEach((header) => {
                    const th = document.createElement('th');
                    th.textContent = header;
                    headerRow.appendChild(th);
                });
                table.appendChild(headerRow);
                // Mostrar datos
                dataRows.forEach((row) => {
                    const rowElement = document.createElement('tr');
                    row.forEach((value) => {
                        const cell = document.createElement('td');
                        cell.textContent = value;
                        rowElement.appendChild(cell);
                    });
                    table.appendChild(rowElement);
                });
                //paginación
                let currentPage = 1;
                const pageSize = 30;
                updateTable(dataRows, currentPage, pageSize);
                // Controles de paginación
                const paginationControls = document.createElement('div');
                paginationControls.innerHTML = `
        <button id="prevPage">Anterior</button>
        <button id="nextPage">Siguiente</button>`;
                document.body.appendChild(paginationControls);
                (_b = document.getElementById('prevPage')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                    if (currentPage > 1) {
                        currentPage--;
                        updateTable(dataRows, currentPage, pageSize);
                    }
                });
                (_c = document.getElementById('nextPage')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
                    currentPage++;
                    updateTable(dataRows, currentPage, pageSize);
                });
            }
        });
    };
    reader.readAsText(file);
}));
(_b = document.getElementById('searchButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    const input = document.getElementById('searchField');
    const table = document.getElementById('tableContainer');
    if (input && table) {
        (0, searchFunctions_1.searchTable)(input.id, table.id);
    }
});
(_c = document.getElementById('searchField')) === null || _c === void 0 ? void 0 : _c.addEventListener('input', () => {
    const input = document.getElementById('searchField');
    const table = document.getElementById('tableContainer');
    if (input && table) {
        (0, searchFunctions_1.searchTable)(input.id, table.id);
    }
});
