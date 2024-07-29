import { searchTable } from './searchFunctions';

document.addEventListener('DOMContentLoaded', function () {
    // botón de búsqueda
    document.getElementById('searchButton')?.addEventListener('click', () => {
        const input = document.getElementById('searchField') as HTMLInputElement;
        const table = document.getElementById('dataTable') as HTMLElement;
        if (input && table) {
            searchTable(input.id, table.id);
        }
    });

    // controlador de eventos
    document.getElementById('searchField')?.addEventListener('input', () => {
        const input = document.getElementById('searchField') as HTMLInputElement;
        const table = document.getElementById('dataTable') as HTMLElement;
        if (input && table) {
            searchTable(input.id, table.id);
        }
    });
});