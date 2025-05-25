<!DOCTYPE html>
<html lang="en_US">
<head>
    <meta charset="UTF-8"/>
    <title>Authors</title>
    <link href="../../lib/tabulator/css/tabulator_simple.css" rel="stylesheet">
    <link href="../../author/index.css" rel="stylesheet">
    <link href="../../common/sidebar.css" rel="stylesheet">
    <script type="text/javascript" src="../../static/lib/tabulator/js/tabulator.js" defer></script>
    <script type="text/javascript" src="../../static/author/index.js" defer></script>
</head>

<body>
<div id="page-container">
    <#-- pull in the sidebar -->
    <#include "../common/sidebar.ftlh"/>
    <main id="main-content">
        <h1>Manage Authors</h1>
        <button id="add-author-button">Add New Author</button>
        <div id="author-table"></div>
        <div id="form-backdrop"></div>
        <div id="add-author-form-container" class="modal-panel">
            <h3>Add New Author</h3>
            <form id="add-author-form">
                <label for="add-author-form-first-name">First Name</label>
                <input type="text" id="add-author-form-first-name" name="first-name" placeholder="Author's First Name…"
                       required/>
                <label for="add-author-form-last-name">Last Name</label>
                <input type="text" id="add-author-form-last-name" name="last-name" placeholder="Author's Last Name…"
                       required/>

                <div class="author-form-actions">
                    <button type="button" id="cancel-add">Cancel</button>
                    <button type="submit">Add Author</button>
                </div>
            </form>
        </div>
    </main>
</div>

</body>
</html>
