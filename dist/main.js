"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searchFunctions_1 = require("./searchFunctions");
document.addEventListener('DOMContentLoaded', function () {
    var _a, _b;
    // botón de búsqueda
    (_a = document.getElementById('searchButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const input = document.getElementById('searchField');
        const table = document.getElementById('dataTable');
        if (input && table) {
            (0, searchFunctions_1.searchTable)(input.id, table.id);
        }
    });
    // controlador de eventos
    (_b = document.getElementById('searchField')) === null || _b === void 0 ? void 0 : _b.addEventListener('input', () => {
        const input = document.getElementById('searchField');
        const table = document.getElementById('dataTable');
        if (input && table) {
            (0, searchFunctions_1.searchTable)(input.id, table.id);
        }
    });
});
