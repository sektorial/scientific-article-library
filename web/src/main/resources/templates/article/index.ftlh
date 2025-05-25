<!DOCTYPE html>
<html lang="en_US">
<head>
    <meta charset="UTF-8"/>
    <title>Scientific Articles</title>
    <link href="../../lib/tabulator/css/tabulator_simple.css" rel="stylesheet">
    <link href="../../article/article.css" rel="stylesheet">
</head>

<body>

<h1>Manage Scientific Articles</h1>
<button id="add-article-button">Add New Article</button>
<div id="article-table"></div>

<div id="form-backdrop"></div>
<div id="add-article-form-container" class="modal-panel">
    <h3>Add New Article</h3>
    <form id="add-article-form">
        <label for="add-article-form-title">Title</label>
        <input type="text" id="add-article-form-title" name="title" placeholder="Article title…" required/>

        <label for="add-article-form-authors">Author(s)</label>
        <input type="text" id="add-article-form-authors" name="authors" placeholder="Lastname, Firstname; …" required/>

        <label for="add-article-form-journal">Journal</label>
        <input type="text" id="add-article-form-journal" name="journal" placeholder="Journal name" required/>

        <label for="add-article-form-year">Publication Year</label>
        <input type="number" id="add-article-form-year" name="year" placeholder="YYYY" min="1900" max="2100" required/>

        <div class="article-form-actions">
            <button type="button" id="cancel-add">Cancel</button>
            <button type="submit">Add Article</button>
        </div>
    </form>
</div>
<div id="edit-article-form-container" class="modal-panel">
    <h3>Edit Article</h3>
    <form id="edit-article-form">
        <label for="edit-article-form-id">ID</label>
        <input type="text" id="edit-article-form-id" name="title" required/>
        <label for="edit-article-form-title">Title</label>
        <input type="text" id="edit-article-form-title" name="title" placeholder="Article title…" required/>

        <label for="edit-article-form-authors">Author(s)</label>
        <input type="text" id="edit-article-form-authors" name="authors" placeholder="Lastname, Firstname; …" required/>

        <label for="edit-article-form-journal">Journal</label>
        <input type="text" id="edit-article-form-journal" name="journal" placeholder="Journal name" required/>

        <label for="edit-article-form-year">Publication Year</label>
        <input type="number" id="edit-article-form-year" name="year" placeholder="YYYY" min="1900" max="2100" required/>

        <div class="article-form-actions">
            <button type="button" id="cancel-edit">Cancel</button>
            <button type="submit">Edit Article</button>
        </div>
    </form>
</div>
<div id="view-article-form-container" class="modal-panel">
    <h3>View Article</h3>
    <form id="view-article-form">
        <label for="view-article-form-id">ID</label>
        <input type="text" id="view-article-form-id" name="id" readonly/>

        <label for="view-article-form-title">Title</label>
        <input type="text" id="view-article-form-title" name="title" readonly/>

        <label for="view-article-form-authors">Author(s)</label>
        <input type="text" id="view-article-form-authors" name="authors" readonly/>

        <label for="view-article-form-journal">Journal</label>
        <input type="text" id="view-article-form-journal" name="journal" readonly/>

        <label for="view-article-form-year">Publication Year</label>
        <input type="number" id="view-article-form-year" name="year" readonly/>

        <div class="article-form-actions">
            <button type="button" id="close-view">Close</button>
        </div>
    </form>
</div>


<script type="text/javascript" src="../../static/lib/tabulator/js/tabulator.js"></script>
<script type="text/javascript" src="../../static/article/index.js"></script>
</body>
</html>
