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

let tagifyAuthors;

document.addEventListener('DOMContentLoaded', () => {
    configureTagify();

    const backdropElement = document.getElementById(formBackdrop);
    backdropElement.addEventListener('click', hideAddForm);

    const addBtnElement = document.getElementById(addArticleButton);
    addBtnElement.addEventListener('click', showAddForm);
    const cancelAddBtnElement = document.getElementById(cancelAdd);
    cancelAddBtnElement.addEventListener('click', hideAddForm);
    const addArticleFormElement = document.getElementById(addArticleForm);
    addArticleFormElement.addEventListener('submit', e => {
        e.preventDefault();

        const authors = tagifyAuthors.value.map(tagData => ({
            id: tagifyAuthors.authorMap[tagData.value]
        }));

        const newData = {
            title:   document.getElementById(addFormTitle).value.trim(),
            authors: authors,
            journal: document.getElementById(addFormJournal).value.trim(),
            year:    parseInt(document.getElementById(addFormYear).value, 10),
        };
        addArticleData(newData);
    });

    const cancelEditBtnElement = document.getElementById(cancelEdit);
    cancelEditBtnElement.addEventListener('click', hideEditForm);
    const editArticleFormElement = document.getElementById(editArticleForm);
    editArticleFormElement.addEventListener('submit', function (e) {
        e.preventDefault();
        const authors = Array.from(document.getElementById(editFormAuthors).selectedOptions)
            .map(option => option.value);
        const updatedData = {
            id: document.getElementById(editFormId).value.trim(),
            title: document.getElementById(editFormTitle).value.trim(),
            authors: authors.map(id => ({id})),
            journal: document.getElementById(editFormJournal).value.trim(),
            year: parseInt(document.getElementById(editFormYear).value, 10),
        };
        updateArticleData(updatedData);
    });

    const closeViewBtnElement = document.getElementById(closeView);
    closeViewBtnElement.addEventListener('click', hideViewForm);

    const tableColumns = [
        {
            title: 'ID',
            field: 'id',
            width: 80,
            hozAlign: 'center',
            headerFilter: 'input'
        },
        {
            title: 'Title',
            field: 'title',
            widthGrow: 3,
            editor: 'input',
            headerFilter: 'input'
        },
        {
            title: 'Author(s)',
            field: 'authors',
            formatter: cell => {
                const authors = cell.getValue() || [];
                return authors.map(author => `${author.last_name}, ${author.first_name}`).join('; ');
            },
            headerFilter: 'input'
        },
        {
            title: 'Journal',
            field: 'journal',
            widthGrow: 2,
            editor: 'input',
            headerFilter: 'input'
        },
        {
            title: 'Year',
            field: 'year',
            width: 100,
            hozAlign: 'center',
            editor: 'input',
            sorter: 'number',
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

    const table = new Tabulator('#article-table', {
        index: 'id',
        height: '400px',
        layout: 'fitData',
        columns: tableColumns,
        ajaxURL: '/api/article',
        ajaxProgressiveLoad: 'scroll',
        pagination: 'local',
        paginationSize: 10,
        movableColumns: true,
        cellEdited: cell => {
            console.log('Cell edited:', cell.getField(), 'New value:', cell.getValue());
            updateArticleData(cell.getRow().getData());
        }
    });

});

const addArticleData = articleData => {
    console.log('Adding article:', articleData);
    fetch('/api/article', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
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
            Tabulator.findTable('#article-table')[0].setData();
            hideAddForm();
        })
        .catch(error => {
            console.error('Error adding article:', error);
            alert('Error adding article. See console for details.');
            hideAddForm();
        });
}

const updateArticleData = updatedRowData => {
    const articleId = updatedRowData.id;
    if (!articleId) {
        console.error('Cannot update row without ID');
        return;
    }
    console.log(`Updating article ${articleId}:`, updatedRowData);
    const tableElement = Tabulator.findTable('#article-table')[0];
    fetch(`/api/article/${articleId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(updatedRowData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(updatedArticle => {
            console.log('Article updated successfully:', updatedArticle);
            tableElement.updateRow(articleId, updatedArticle);
            hideEditForm();
        })
        .catch(error => {
            console.error('Error updating article:', error);
            alert('Error updating article. See console for details.');
            hideEditForm();
        });
}

const deleteArticle = id => {
    if (confirm(`Are you sure you want to delete article ID: ${id}?`)) {
        console.log(`Deleting article ${id}`);
        fetch(`/api/article/${id}`, {
            method: 'DELETE',
            headers: {}
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
            })
            .then(() => {
                console.log('Article deleted successfully');
                const table = Tabulator.findTable('#article-table')[0];
                table.deleteRow(id);
            })
            .catch(error => {
                console.error('Error deleting article:', error);
                alert('Error deleting article. See console for details.');
            });
    }
}

const showAddForm = () => {
    if (!response.ok) throw new Error(`Failed to load authors: ${response.statusText}`);
    tagifyAuthors.removeAllTags();
    if (tagifyAuthors.dropdown) {
        tagifyAuthors.dropdown.hide();
    }
    document.getElementById(addFormTitle).focus();
    document.getElementById(formBackdrop).style.display = 'block';
    document.getElementById(addArticleFormContainer).style.display = 'block';
};

const showEditForm = rowData => {
    document.getElementById(formBackdrop).style.display = 'block';
    document.getElementById(editFormId).value = rowData.id;
    document.getElementById(editFormTitle).value = rowData.title;
    const select = document.getElementById(editFormAuthors);
    select.innerHTML = ''; // remove any old <option>s
    (rowData.authors || []).forEach(author => {
        const opt = document.createElement('option');
        opt.value = author.id;
        opt.textContent = `${author.last_name}, ${author.first_name}`;
        opt.selected = true;                           // mark it selected
        select.appendChild(opt);
    });
    document.getElementById(editFormJournal).value = rowData.journal;
    document.getElementById(editFormYear).value = rowData.year;
    document.getElementById(editArticleFormContainer).style.display = 'block';
}

const showViewForm = rowData => {
    document.getElementById(formBackdrop).style.display = 'block';
    document.getElementById(viewArticleFormId).value = rowData.id;
    document.getElementById(viewArticleFormTitle).value = rowData.title;
    const authors = document.getElementById(viewArticleFormAuthors);
    authors.value = (rowData.authors || [])
        .map(author => `${(author.last_name)}, ${(author.first_name)}`)
        .join('; ');
    document.getElementById(viewArticleFormJournal).value = rowData.journal;
    document.getElementById(viewArticleFormYear).value = rowData.year;
    document.getElementById(viewArticleFormContainer).style.display = 'block';
}

const hideAddForm = () => {
    document.getElementById(formBackdrop).style.display = 'none';
    document.getElementById(addArticleFormContainer).style.display = 'none';
    document.getElementById(addArticleForm).reset();
}

const hideEditForm = () => {
    document.getElementById(formBackdrop).style.display = 'none';
    document.getElementById(editArticleFormContainer).style.display = 'none';
    document.getElementById(editArticleForm).reset();
}


const hideViewForm = () => {
    document.getElementById(formBackdrop).style.display = 'none';
    document.getElementById(viewArticleFormContainer).style.display = 'none';
    document.getElementById(viewArticleForm).reset();
}

const actionsContainer = cell => {
    const rowData = cell.getRow().getData();
    const container = document.createElement('span');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showEditForm(rowData);
    });
    container.appendChild(editBtn);

    container.appendChild(document.createTextNode(' '));

    const viewBtn = document.createElement('button');
    viewBtn.textContent = 'View';
    viewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showViewForm(rowData);
    });
    container.appendChild(document.createTextNode(' '));
    container.appendChild(viewBtn);

    container.appendChild(document.createTextNode(' '));

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => deleteArticle(rowData.id));
    container.appendChild(delBtn);

    return container;
}

const configureTagify = () => {
    // 1) grab your hidden <select> for the raw data
    const selectEl = document.getElementById('add-article-form-authors-select');
    if (!selectEl) {
        console.error('configureTagify: no selectEl found');
        return;
    }

    // 2) build a name→id map + an array of names
    const authorMap   = {};
    const authorNames = [];
    Array.from(selectEl.options).forEach(o => {
        const name = o.textContent.trim();
        authorMap[name] = o.value;
        authorNames.push(name);
    });

    // 3) hook Tagify onto your <input>
    const inputEl = document.getElementById(addFormAuthors);
    tagifyAuthors = new Tagify(inputEl, {
        whitelist:        authorNames,
        enforceWhitelist: true,
        dropdown: {
            enabled:   1,
            maxItems: 10,
            position: 'text'
        }
    });

    // 4) store the map for later lookup
    tagifyAuthors.authorMap = authorMap;
};


// Example function to get CSRF token if using Spring Security

// function getCsrfToken() {
//    const token = document.querySelector('meta[name="_csrf"]').getAttribute('content');
//    const header = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
//     return { token, header }; // You'll need to adjust how you send this in fetch headers
// }
// Remember to include <meta name="_csrf" content="${_csrf.token}"/> and <meta name="_csrf_header" content="${_csrf.headerName}"/> in your <head> via Freemarker if using CSRF
