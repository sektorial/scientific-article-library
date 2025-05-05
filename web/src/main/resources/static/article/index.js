// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {

    // --- Define Table Columns ---
    // Adjust 'field' to match the property names in your ScientificArticle domain object
    const tableColumns = [
        {
            title: 'UUID',
            field: 'uuid',
            width: 80,
            hozAlign: 'center',
            headerFilter: 'input'
        }, // Assuming 'uuid' field exists
        {
            title: 'Title',
            field: 'title',
            widthGrow: 3,
            editor: 'input',
            editorParams: { placeholder: "Enter article title…" },
            headerFilter: 'input'
        }, // 'title' field, editable input
        {
            title: 'Author(s)',
            field: 'authors',
            widthGrow: 2,
            editor: 'input',
            editorParams: { placeholder: "Lastname, Firstname; …" },
            headerFilter: 'input'
        }, // 'authors' field
        {
            title: 'Journal',
            field: 'journal',
            widthGrow: 2,
            editor: 'input',
            editorParams: { placeholder: "Journal name" },
            headerFilter: 'input'
        }, // 'journal' field
        {
            title: 'Year',
            field: 'publicationYear',
            width: 100,
            hozAlign: 'center',
            editor: 'input',
            editorParams: { placeholder: "YYYY" },
            sorter: 'number',
            headerFilter: 'input'
        }, // 'publicationYear' field
        // --- Add Action Buttons ---
        {
            title: 'Actions',
            hozAlign: 'center',
            formatter: function (cell, formatterParams, onRendered) {
                // Create buttons dynamically
                const uuid = cell.getRow().getData().uuid; // Get the UUID for this row
                const editButton = `<button onclick="editArticle('${uuid}')">Edit</button>`;
                const deleteButton = `<button onclick="deleteArticle('${uuid}')">Delete</button>`;
                return editButton + '&nbsp;' + deleteButton; // Return HTML string for buttons
            },
            cellClick: function (e, cell) {
                // Prevent click event from triggering edit on the action cell itself
                e.stopPropagation();
            }
        }
    ];

    // --- Initialize Tabulator ---
    const table = new Tabulator('#article-table', {
        index: 'uuid',
        height: '400px', // Optional: Set table height
        layout: 'fitData', // Adjust layout as needed
        columns: tableColumns,
        ajaxURL: '/api/article', // URL to fetch initial data (GET request)
        ajaxProgressiveLoad: 'scroll', // Optional: Load data as user scrolls
        pagination: 'local',        // Optional: Add local pagination
        paginationSize: 10,         // Optional: Rows per page
        movableColumns: true,       // Optional: Allow column reordering
        // --- Enable data editing feedback ---
        cellEdited: function (cell) {
            // Called after a cell has been successfully edited
            console.log('Cell edited:', cell.getField(), 'New value:', cell.getValue());
            // You MUST now trigger the update to the backend here if using inline editing directly
            updateArticleData(cell.getRow().getData()); // See function below
        }
    });

    // --- Handle Add Button Click ---
    document.getElementById('add-article-button').addEventListener('click', function () {
        // Option 1: Add a blank row directly for inline editing
        // table.addRow({}, true); // Add to top

        // Option 2: Show a modal/form (Recommended for better UX)
        alert('Show Add Article Form/Modal Here!');
        // When form is submitted, call addArticleData(newData);
    });

}); // End DOMContentLoaded

// --- Helper Functions for CRUD Actions ---

function addArticleData(articleData) {
    console.log('Adding article:', articleData);
    fetch('/api/article', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add CSRF token header if Spring Security CSRF protection is enabled
            // 'X-CSRF-TOKEN': getCsrfToken() // You'd need a function to get the token
        },
        body: JSON.stringify(articleData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(newArticle => {
            console.log('Article added successfully:', newArticle);
            // Refresh the table data to show the new article
            // Tabulator might add the row automatically if configured, otherwise:
            Tabulator.findTable('#article-table')[0].setData(); // Reload data
            // Or: Tabulator.findTable("#article-table")[0].addRow(newArticle, true); // Add row directly
            alert('Article added!'); // Close modal etc.
        })
        .catch(error => {
            console.error('Error adding article:', error);
            alert('Error adding article. See console for details.');
        });
}


// Function to handle inline edit data submission (called from cellEdited)
// Or call this after submitting an Edit Modal/Form
function updateArticleData(updatedRowData) {
    const articleId = updatedRowData.uuid;
    if (!articleId) {
        console.error('Cannot update row without UUID');
        return; // Don't try to update if UUID is missing (e.g., a newly added unsaved row)
    }
    console.log(`Updating article ${articleId}:`, updatedRowData);

    fetch(`/api/article/${articleId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // Add CSRF token header if needed
            // 'X-CSRF-TOKEN': getCsrfToken()
        },
        body: JSON.stringify(updatedRowData)
    })
        .then(response => {
            if (!response.ok) {
                // Maybe revert cell value in UI on failure?
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(updatedArticle => {
            console.log('Article updated successfully:', updatedArticle);
            // Tabulator's inline edit might already reflect the change visually.
            // If using a modal, you might need to refresh the row or table:
            // Tabulator.findTable("#article-table")[0].updateRow(articleId, updatedArticle); // Update specific row
            alert('Article updated!'); // Or close modal
        })
        .catch(error => {
            console.error('Error updating article:', error);
            alert('Error updating article. See console for details.');
            // Optional: Revert the cell's value in Tabulator if the backend update failed
            // table.getRow(articleId).getCell(cell.getField()).setValue(cell.getOldValue());
        });
}

// Function called by the Edit button in the actions column
function editArticle(uuid) {
    alert(`Show Edit Form/Modal for Article UUID: ${uuid}`);
    // 1. Fetch full article data? GET /api/article/{uuid} (optional)
    // 2. Populate a modal/form with data.
    // 3. On form submit, call updateArticleData(updatedData);
}


// Function called by the Delete button in the actions column
function deleteArticle(uuid) {
    if (confirm(`Are you sure you want to delete article UUID: ${uuid}?`)) {
        console.log(`Deleting article ${uuid}`);
        fetch(`/api/article/${uuid}`, {
            method: 'DELETE',
            headers: {
                // Add CSRF token header if needed
                // 'X-CSRF-TOKEN': getCsrfToken()
            }
        })
            .then(response => {
                if (!response.ok) {
                    // Check for specific statuses like 404 Not Found
                    throw new Error('Network response w not ok ' + response.statusText);
                }
                // No content expected on successful DELETE (status 204)
                return; // Or check for response.status === 204
            })
            .then(() => {
                console.log('Article deleted successfully');
                // Remove the row from the table
                const table = Tabulator.findTable('#article-table')[0];
                table.deleteRow(uuid);
                alert('Article deleted!');
            })
            .catch(error => {
                console.error('Error deleting article:', error);
                alert('Error deleting article. See console for details.');
            });
    }
}

// Example function to get CSRF token if using Spring Security
// function getCsrfToken() {
//    const token = document.querySelector('meta[name="_csrf"]').getAttribute('content');
//    const header = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
//     return { token, header }; // You'll need to adjust how you send this in fetch headers
// }
// Remember to include <meta name="_csrf" content="${_csrf.token}"/> and <meta name="_csrf_header" content="${_csrf.headerName}"/> in your <head> via Freemarker if using CSRF
