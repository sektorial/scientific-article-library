const formBackdrop = 'form-backdrop';

const addArticleFormContainer = 'add-article-form-container';
const addArticleForm = 'add-article-form';
const addArticleButton = 'add-article-button';
const addFormTitle = 'add-article-form-title';
const addFormAuthors = 'add-article-form-authors';
const addFormJournal = 'add-article-form-journal';
const addFormYear = 'add-article-form-year';
const cancelAdd = 'cancel-add';

const editArticleFormContainer = 'edit-article-form-container';
const editArticleForm = 'edit-article-form';
const editFormId = 'edit-article-form-id';
const editFormTitle = 'edit-article-form-title';
const editFormAuthors = 'edit-article-form-authors';
const editFormJournal = 'edit-article-form-journal';
const editFormYear = 'edit-article-form-year';
const cancelEdit = 'cancel-edit';

const viewArticleFormContainer = 'view-article-form-container';
const viewArticleForm = 'view-article-form';
const viewArticleFormId = 'view-article-form-id';
const viewArticleFormTitle = 'view-article-form-title';
const viewArticleFormAuthors = 'view-article-form-authors';
const viewArticleFormJournal = 'view-article-form-journal';
const viewArticleFormYear = 'view-article-form-year';
const closeView = 'close-view';

document.addEventListener('DOMContentLoaded', function () {

    const backdropElement = document.getElementById(formBackdrop);
    backdropElement.addEventListener('click', hideAddForm);

    const addBtnElement = document.getElementById(addArticleButton);
    addBtnElement.addEventListener('click', showAddForm);
    const cancelAddBtnElement = document.getElementById(cancelAdd);
    cancelAddBtnElement.addEventListener('click', hideAddForm);
    const addArticleFormElement = document.getElementById(addArticleForm);
    addArticleFormElement.addEventListener('submit', function (e) {
        e.preventDefault();
        const newData = {
            title: document.getElementById(addFormTitle).value.trim(),
            authors: document.getElementById(addFormAuthors).value.trim(),
            journal: document.getElementById(addFormJournal).value.trim(),
            year: parseInt(document.getElementById(addFormYear).value, 10),
        };
        // call your POST helper
        addArticleData(newData);
    });

    const cancelEditBtnElement = document.getElementById(cancelEdit);
    cancelEditBtnElement.addEventListener('click', hideEditForm);
    const editArticleFormElement = document.getElementById(editArticleForm);
    editArticleFormElement.addEventListener('submit', function (e) {
        e.preventDefault();
        const updatedData = {
            id: document.getElementById(editFormId).value.trim(),
            title: document.getElementById(editFormTitle).value.trim(),
            authors: document.getElementById(editFormAuthors).value.trim(),
            journal: document.getElementById(editFormJournal).value.trim(),
            year: parseInt(document.getElementById(editFormYear).value, 10),
        };
        // call your POST helper
        updateArticleData(updatedData);
    });

    const closeViewBtnElement = document.getElementById(closeView);
    closeViewBtnElement.addEventListener('click', hideViewForm);

    // --- Define Table Columns ---
    // Adjust 'field' to match the property names in your ScientificArticle domain object
    const tableColumns = [
        {
            title: 'ID',
            field: 'id',
            width: 80,
            hozAlign: 'center',
            headerFilter: 'input'
        }, // Assuming 'id' field exists
        {
            title: 'Title',
            field: 'title',
            widthGrow: 3,
            editor: 'input',
            headerFilter: 'input'
        }, // 'title' field, editable input
        {
            title: 'Author(s)',
            field: 'authors',
            widthGrow: 2,
            editor: 'input',
            headerFilter: 'input'
        }, // 'authors' field
        {
            title: 'Journal',
            field: 'journal',
            widthGrow: 2,
            editor: 'input',
            headerFilter: 'input'
        }, // 'journal' field
        {
            title: 'Year',
            field: 'year',
            width: 100,
            hozAlign: 'center',
            editor: 'input',
            sorter: 'number',
            headerFilter: 'input'
        }, // 'year' field
        // --- Add Action Buttons ---
        {
            title: 'Actions',
            hozAlign: 'center',
            formatter: function (cell, formatterParams, onRendered) {
                // grab the row’s data object
                const rowData = cell.getRow().getData();

                // make a container for the buttons
                const container = document.createElement('span');

                // — Edit button —
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    showEditForm(rowData);
                });
                container.appendChild(editBtn);

                // small spacer
                container.appendChild(document.createTextNode(' '));

                // — View button —
                const viewBtn = document.createElement('button');
                viewBtn.textContent = 'View';
                viewBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    showViewForm(rowData);
                });
                container.appendChild(document.createTextNode(' ')); // space
                container.appendChild(viewBtn);

                // small spacer
                container.appendChild(document.createTextNode(' '));

                // — Delete button —
                const delBtn = document.createElement('button');
                delBtn.textContent = 'Delete';
                delBtn.addEventListener('click', () => deleteArticle(rowData.id));
                container.appendChild(delBtn);

                // return the element; Tabulator will insert it into the cell
                return container;
            },
            cellClick: function (e, cell) {
                // Prevent click event from triggering edit on the action cell itself
                e.stopPropagation();
            }
        }
    ];

    // --- Initialize Tabulator ---
    const table = new Tabulator('#article-table', {
        index: 'id',
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
            hideAddForm();
        })
        .catch(error => {
            console.error('Error adding article:', error);
            alert('Error adding article. See console for details.');
            hideAddForm();
        });
}



// Function to handle inline edit data submission (called from cellEdited)
// Or call this after submitting an Edit Modal/Form
function updateArticleData(updatedRowData) {
    const articleId = updatedRowData.id;
    if (!articleId) {
        console.error('Cannot update row without ID');
        return; // Don't try to update if ID is missing (e.g., a newly added unsaved row)
    }
    console.log(`Updating article ${articleId}:`, updatedRowData);

    const tableElement = Tabulator.findTable('#article-table')[0];
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
            tableElement.updateRow(articleId, updatedArticle); // Update specific row
            hideEditForm();
        })
        .catch(error => {
            console.error('Error updating article:', error);
            alert('Error updating article. See console for details.');
            hideEditForm();
        });
}

// Function called by the Delete button in the actions column
function deleteArticle(id) {
    if (confirm(`Are you sure you want to delete article ID: ${id}?`)) {
        console.log(`Deleting article ${id}`);
        fetch(`/api/article/${id}`, {
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
                table.deleteRow(id);
            })
            .catch(error => {
                console.error('Error deleting article:', error);
                alert('Error deleting article. See console for details.');
            });
    }
}

function showAddForm() {
    document.getElementById(formBackdrop).style.display = 'block';
    document.getElementById(addArticleFormContainer).style.display = 'block';
}

function showEditForm(rowData) {
    document.getElementById(formBackdrop).style.display = 'block';
    document.getElementById(editFormId).value = rowData.id;
    document.getElementById(editFormTitle).value = rowData.title;
    document.getElementById(editFormAuthors).value = rowData.authors;
    document.getElementById(editFormJournal).value = rowData.journal;
    document.getElementById(editFormYear).value = rowData.year;
    document.getElementById(editArticleFormContainer).style.display = 'block';
}

function showViewForm(rowData) {
    document.getElementById(formBackdrop).style.display = 'block';
    document.getElementById(viewArticleFormId).value = rowData.id;
    document.getElementById(viewArticleFormTitle).value = rowData.title;
    document.getElementById(viewArticleFormAuthors).value = rowData.authors;
    document.getElementById(viewArticleFormJournal).value = rowData.journal;
    document.getElementById(viewArticleFormYear).value = rowData.year;
    document.getElementById(viewArticleFormContainer).style.display = 'block';
}


function hideAddForm() {
    document.getElementById(formBackdrop).style.display = 'none';
    document.getElementById(addArticleFormContainer).style.display = 'none';
    document.getElementById(addArticleForm).reset();
}

function hideEditForm() {
    document.getElementById(formBackdrop).style.display = 'none';
    document.getElementById(editArticleFormContainer).style.display = 'none';
    document.getElementById(editArticleForm).reset();
}

function hideViewForm() {
    document.getElementById(formBackdrop).style.display = 'none';
    document.getElementById(viewArticleFormContainer).style.display = 'none';
    document.getElementById(viewArticleForm).reset();
}

// Example function to get CSRF token if using Spring Security
// function getCsrfToken() {
//    const token = document.querySelector('meta[name="_csrf"]').getAttribute('content');
//    const header = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
//     return { token, header }; // You'll need to adjust how you send this in fetch headers
// }
// Remember to include <meta name="_csrf" content="${_csrf.token}"/> and <meta name="_csrf_header" content="${_csrf.headerName}"/> in your <head> via Freemarker if using CSRF
