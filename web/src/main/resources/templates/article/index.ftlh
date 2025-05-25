<!DOCTYPE html>
<html lang="en_US">
<head>
    <#-- Freemarker template for Scientific Articles with modal form -->
    <meta charset="UTF-8" />
    <title>Scientific Articles</title>
    <link href="../../lib/tabulator/css/tabulator_simple.css" rel="stylesheet">
    <style>
        #add-article-button { margin-bottom: 15px; }
        #article-table { margin-top: 20px; }

        /* Modal styling */
        #form-backdrop {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.4);
            z-index: 999;
        }
        #add-article-form-container {
            display: none;
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: #fff;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
            z-index: 1000;
            width: 90%;
            max-width: 400px;
        }
        #add-article-form-container h3 { margin-top: 0; }
        #add-article-form-container label { font-weight: bold; margin-top: 0.5rem; display: block; }
        #add-article-form-container input { width: 100%; margin-top: 4px; padding: 6px; }
        #add-article-form-container .add-article-form-actions { text-align: right; margin-top: 1rem; }
        #add-article-form-container .add-article-form-actions button { margin-left: 0.5rem; }
        #edit-article-form-container {
            display: none;
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: #fff;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
            z-index: 1000;
            width: 90%;
            max-width: 400px;
        }
        #edit-article-form-container h3 { margin-top: 0; }
        #edit-article-form-container label { font-weight: bold; margin-top: 0.5rem; display: block; }
        #edit-article-form-container input { width: 100%; margin-top: 4px; padding: 6px; }
        #edit-article-form-container .edit-article-form-actions { text-align: right; margin-top: 1rem; }
        #edit-article-form-container .edit-article-form-actions button { margin-left: 0.5rem; }
    </style>
</head>
<body>

<h1>Manage Scientific Articles</h1>
<button id="add-article-button">Add New Article</button>
<div id="article-table"></div>

<#-- Backdrop and Modal Form -->
<div id="form-backdrop"></div>
<div id="add-article-form-container">
    <h3>Add New Article</h3>
    <form id="add-article-form">
        <label for="add-article-form-title">Title</label>
        <input type="text" id="add-article-form-title" name="title" placeholder="Article title…" required />

        <label for="add-article-form-authors">Author(s)</label>
        <input type="text" id="add-article-form-authors" name="authors" placeholder="Lastname, Firstname; …" required />

        <label for="add-article-form-journal">Journal</label>
        <input type="text" id="add-article-form-journal" name="journal" placeholder="Journal name" required />

        <label for="add-article-form-year">Publication Year</label>
        <input type="number" id="add-article-form-year" name="year" placeholder="YYYY" required />

        <div class="add-article-form-actions">
            <button type="button" id="cancel-add">Cancel</button>
            <button type="submit">Add Article</button>
        </div>
    </form>
</div>
<div id="edit-article-form-container">
    <h3>Edit Article</h3>
    <form id="edit-article-form">
        <label for="edit-article-form-id">ID</label>
        <input type="text" id="edit-article-form-id" name="title" required />
        <label for="edit-article-form-title">Title</label>
        <input type="text" id="edit-article-form-title" name="title" placeholder="Article title…" required />

        <label for="edit-article-form-authors">Author(s)</label>
        <input type="text" id="edit-article-form-authors" name="authors" placeholder="Lastname, Firstname; …" required />

        <label for="edit-article-form-journal">Journal</label>
        <input type="text" id="edit-article-form-journal" name="journal" placeholder="Journal name" required />

        <label for="edit-article-form-year">Publication Year</label>
        <input type="number" id="edit-article-form-year" name="year" placeholder="YYYY" required />

        <div class="edit-article-form-actions">
            <button type="button" id="cancel-edit">Cancel</button>
            <button type="submit">Edit Article</button>
        </div>
    </form>
</div>

<script type="text/javascript" src="../../static/lib/tabulator/js/tabulator.js"></script>
<script type="text/javascript" src="../../static/article/index.js"></script>
</body>
</html>
