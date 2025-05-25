const formBackdrop = 'form-backdrop';

const addAuthorFormContainer = 'add-author-form-container';
const addAuthorForm = 'add-author-form';
const addAuthorButton = 'add-author-button';
const addFormFirstName = 'add-author-form-first-name';
const addFormLastName = 'add-author-form-last-name';
const cancelAdd = 'cancel-add';

document.addEventListener('DOMContentLoaded', () => {
    const backdropElement = document.getElementById(formBackdrop);
    backdropElement.addEventListener('click', hideAddForm);

    const addBtnElement = document.getElementById(addAuthorButton);
    addBtnElement.addEventListener('click', showAddForm);
    const cancelAddBtnElement = document.getElementById(cancelAdd);
    cancelAddBtnElement.addEventListener('click', hideAddForm);
    const addAuthorFormElement = document.getElementById(addAuthorForm);
    addAuthorFormElement.addEventListener('submit', function (e) {
        e.preventDefault();
        const newData = {
            'first-name': document.getElementById(addFormFirstName).value.trim(),
            'last-name': document.getElementById(addFormLastName).value.trim(),
        };
        addAuthorData(newData);
    });

    const tableColumns = [
        {
            title: 'ID',
            field: 'id',
            width: 80,
            hozAlign: 'center',
            headerFilter: 'input'
        },
        {
            title: 'First Name',
            field: 'first-name',
            widthGrow: 3,
            editor: 'input',
            headerFilter: 'input'
        },
        {
            title: 'Last Name',
            field: 'last-name',
            widthGrow: 3,
            editor: 'input',
            headerFilter: 'input'
        },
        {
            title: 'Actions',
            hozAlign: 'center',
            formatter: cell => actionsContainer(cell),
            cellClick: e => {
                e.stopPropagation();
            }
        }
    ];

    const table = new Tabulator('#author-table', {
        index: 'id',
        height: '400px',
        layout: 'fitData',
        columns: tableColumns,
        ajaxURL: '/api/author',
        ajaxProgressiveLoad: 'scroll',
        pagination: 'local',
        paginationSize: 10,
        movableColumns: true,
    });

});

const addAuthorData = authorData => {
    console.log('Adding author:', authorData);
    fetch('/api/author', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(authorData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(newAuthor => {
            console.log('Author added successfully:', newAuthor);
            Tabulator.findTable('#author-table')[0].setData();
            hideAddForm();
        })
        .catch(error => {
            console.error('Error adding author:', error);
            alert('Error adding author. See console for details.');
            hideAddForm();
        });
}

const deleteAuthor = id => {
    if (confirm(`Are you sure you want to delete author ID: ${id}?`)) {
        console.log(`Deleting author ${id}`);
        fetch(`/api/author/${id}`, {
            method: 'DELETE',
            headers: {}
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
            })
            .then(() => {
                console.log('Author deleted successfully');
                const table = Tabulator.findTable('#author-table')[0];
                table.deleteRow(id);
            })
            .catch(error => {
                console.error('Error deleting author:', error);
                alert('Error deleting author. See console for details.');
            });
    }
}

const showAddForm = () => {
    document.getElementById(formBackdrop).style.display = 'block';
    document.getElementById(addAuthorFormContainer).style.display = 'block';
}

const hideAddForm = () => {
    document.getElementById(formBackdrop).style.display = 'none';
    document.getElementById(addAuthorFormContainer).style.display = 'none';
    document.getElementById(addAuthorForm).reset();
}

const actionsContainer = cell => {
    const rowData = cell.getRow().getData();
    const container = document.createElement('span');

    container.appendChild(document.createTextNode(' '));

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => deleteAuthor(rowData.id));
    container.appendChild(delBtn);

    return container;
}

// Example function to get CSRF token if using Spring Security

// function getCsrfToken() {
//    const token = document.querySelector('meta[name="_csrf"]').getAttribute('content');
//    const header = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
//     return { token, header }; // You'll need to adjust how you send this in fetch headers
// }
// Remember to include <meta name="_csrf" content="${_csrf.token}"/> and <meta name="_csrf_header" content="${_csrf.headerName}"/> in your <head> via Freemarker if using CSRF
