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

let tagifyAdd, tagifyEdit;

document.addEventListener('DOMContentLoaded', () => {
    configureTagify();
    document.getElementById(formBackdrop).addEventListener('click', hideAddForm);
    document.getElementById(addArticleButton).addEventListener('click', showAddForm);
    document.getElementById(cancelAdd).addEventListener('click', hideAddForm);
    document.getElementById(addArticleForm).addEventListener('submit', e => {
        e.preventDefault();
        const authors = tagifyAdd.value.map(tag => ({
            id: tagifyAdd.authorMap[tag.value]
        }));

        const newData = {
            title: document.getElementById('add-article-form-title').value.trim(),
            authors: authors,
            journal: document.getElementById('add-article-form-journal').value.trim(),
            year: parseInt(document.getElementById('add-article-form-year').value, 10),
        };
        addArticleData(newData);
    });
    document.getElementById(cancelEdit).addEventListener('click', hideEditForm);
    document.getElementById(editArticleForm).addEventListener('submit', function (e) {
        e.preventDefault();
        const authors = tagifyEdit.value.map(tag => ({
            id: tagifyEdit.authorMap[tag.value]
        }));

        const updatedData = {
            id: document.getElementById('edit-article-form-id').value.trim(),
            title: document.getElementById('edit-article-form-title').value.trim(),
            authors: authors,
            journal: document.getElementById('edit-article-form-journal').value.trim(),
            year: parseInt(document.getElementById('edit-article-form-year').value, 10)
        };
        updateArticleData(updatedData);
    });
    document.getElementById(closeView).addEventListener('click', hideViewForm);

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
    // clear any previous tags
    tagifyAdd.removeAllTags();
    if (tagifyAdd.dropdown) tagifyAdd.dropdown.hide();

    // reset other fields if needed
    document.getElementById('add-article-form-title').value = '';

    // display modal
    document.getElementById('form-backdrop').style.display = 'block';
    document.getElementById('add-article-form-container').style.display = 'block';
};

const showEditForm = rowData => {
    // Step 1: Fill all non-Tagify fields first
    document.getElementById(editFormId).value = rowData.id;
    document.getElementById(editFormTitle).value = rowData.title;
    document.getElementById(editFormJournal).value = rowData.journal;
    document.getElementById(editFormYear).value = rowData.year;

    // Step 2: Show modal first (to ensure Tagify is rendered in visible DOM)
    document.getElementById(formBackdrop).style.display = 'block';
    document.getElementById(editArticleFormContainer).style.display = 'block';

    // Step 3: Delay tag insert to next tick
    setTimeout(() => {
        tagifyEdit.removeAllTags();

        const displayNames = (rowData.authors || [])
            .map(author => `${author.last_name}, ${author.first_name}`);

        tagifyEdit.addTags(displayNames);
    }, 0);
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
    // Get data source only once
    const selectEl = document.getElementById('add-article-form-authors-select');
    if (!selectEl) return console.error('Tagify setup: missing hidden <select>');

    const authorMap = {}, names = [];
    Array.from(selectEl.options).forEach(opt => {
        const name = opt.textContent.trim();
        authorMap[name] = opt.value;
        names.push(name);
    });

    const tagifyOpts = {
        whitelist: names,
        enforceWhitelist: true,
        dropdown: { enabled: 1, maxItems: 10, position: 'text' }
    };

    // Destroy old instances if they exist
    if (tagifyAdd) tagifyAdd.destroy();
    if (tagifyEdit) tagifyEdit.destroy();

    // Re-create Tagify instances
    tagifyAdd = new Tagify(document.getElementById('add-article-form-authors-select'), tagifyOpts);
    tagifyAdd.authorMap = authorMap;

    tagifyEdit = new Tagify(document.getElementById('edit-article-form-authors-select'), tagifyOpts);
    tagifyEdit.authorMap = authorMap;
};


// Example function to get CSRF token if using Spring Security

// function getCsrfToken() {
//    const token = document.querySelector('meta[name="_csrf"]').getAttribute('content');
//    const header = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
//     return { token, header }; // You'll need to adjust how you send this in fetch headers
// }
// Remember to include <meta name="_csrf" content="${_csrf.token}"/> and <meta name="_csrf_header" content="${_csrf.headerName}"/> in your <head> via Freemarker if using CSRF
