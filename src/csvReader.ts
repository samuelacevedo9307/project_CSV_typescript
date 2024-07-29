import { searchTable } from "./searchFunctions";

export function updateTable(data: any[], currentPage: number, pageSize: number) {
    const table = document.querySelector('table');
    if (!table) return;

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
    pagedData.forEach((row: string[]) => {
        const rowElement = document.createElement('tr');
        row.forEach((value) => {
            const cell = document.createElement('td');
            cell.textContent = value;
            rowElement.appendChild(cell);
        });
        table.appendChild(rowElement);
    });
}

document.getElementById('csvFile')?.addEventListener('change', async (event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
        console.error('No se seleccionó ningún archivo.');
        return;
    }

    const reader = new FileReader();
    reader.onload = async function (e) {
        const content = e.target?.result;
        if (typeof content === 'string') {
            const lines = content.split('\n').filter((line) => line.trim() !== '');
            const headers = lines[0].split(',');
            const dataRows = lines.slice(1).map((line) => line.split(','));

            console.log(dataRows);

            // Crear tabla
            const tableContainer = document.getElementById('tableContainer') as HTMLElement;
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

            document.getElementById('prevPage')?.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    updateTable(dataRows, currentPage, pageSize);
                }
            });
            document.getElementById('nextPage')?.addEventListener('click', () => {
                currentPage++;
                updateTable(dataRows, currentPage, pageSize);
            });
        }
    };
    reader.readAsText(file);
});

document.getElementById('searchButton')?.addEventListener('click', () => {
    const input = document.getElementById('searchField') as HTMLInputElement;
    const table = document.getElementById('tableContainer') as HTMLElement;
    if (input && table) {
        searchTable(input.id, table.id);
    }
});

document.getElementById('searchField')?.addEventListener('input', () => {
    const input = document.getElementById('searchField') as HTMLInputElement;
    const table = document.getElementById('tableContainer') as HTMLElement;
    if (input && table) {
        searchTable(input.id, table.id);
    }
});