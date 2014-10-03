/**global QUnit */

QUnit.module("Editable Listview Initialization");

QUnit.test("Collapsible", function () {
    var $collapsible = $("#test-list").parent().parent();

    ok($collapsible.data("role", "collapsible"), "collapsbile data role is assiged");
    ok($collapsible.hasClass("ui-collapsible"), "collapsbile is present");
    ok($collapsible.hasClass("ui-collapsible-inset"), "collapsbile inset is present");
    ok($collapsible.hasClass("ui-corner-all"), "collapsible corners are rounded");
    ok($collapsible.hasClass("ui-collapsible-themed-content"), "collapsible themed content class is present");

});

QUnit.test("Collapsible Header", function () {
    var $header = $("#test-list").parent().prev();

    ok($header.data("role", "header"), "header in collapsbile has data role correctly assiged");
    ok($header.attr("role") === "banner", "banner role is present");
    ok($header.hasClass("ui-header"), "ui-header class is present");
    ok($header.hasClass("ui-bar-inherit"), "ui-bar-inherit class is present");
    ok($header.hasClass("ui-collapsible-heading"), "ui-collapsible-heading class is present");
});

QUnit.test("Collapsible Content", function () {
    var $content = $("#test-list").parent();

    ok($content.hasClass("ui-collapsible-content"), "content in collapsbile is present");
    ok($content.hasClass("ui-body-inherit"), "content inherits from body");
});

QUnit.test("Clicking the header should expand the list if it is collapsed", function () {
    // Collapsible the collapsible before triggering click event
    $(".ui-collapsible").collapsible().collapsible("collapse")

    var $header = $(".ui-header");

    // attaching click handler to $header
    $header.click(function () {
        // $header should not have this class
        ok(!$header.hasClass("ui-collapsible-heading-collapsed"), "Header expands when clicked");
    })

    // trigerring programmatic click on $header
    $header.click()
});

QUnit.test("Clicking the header should collapse the list if it is expanded", function () {
    // Expanding the collapsible before triggering click event
    $(".ui-collapsible").collapsible().collapsible("expand")

    var $header = $(".ui-header");

    // programmatic click triggered on header
    $header.click(function () {
        // $header should have this class
        ok($header.hasClass("ui-collapsible-heading-collapsed"), "Header collapses when clicked");
    })

    // trigerring programmatic click on $header
    $header.click()
});

QUnit.test("Clicking on header should be disabled when in edit mode", function () {
    var $editBtn = $(".ui-header > .ui-btn"),
        $header = $(".ui-header"),
        // caching the header state whether collapsed or expanded
        headerState = $header.hasClass("ui-collapsible-heading-collapsed")

    var clicked = true;

    $editBtn.click(function () {
        // comparing the fresh header state to cached one before click on header
        ok(headerState == $header.hasClass("ui-collapsible-heading-collapsed"), "Header state \"" + headerState + "\" before clicking");
        // trigerring programmatic click on $header
        $header.click()
        // comparing the fresh header state to cached one after click on header
        ok(headerState == $header.hasClass("ui-collapsible-heading-collapsed"), "Header state \"" + headerState + "\" after clicking");
    })

    // trigerring programmatic click on edit button
    $editBtn.click()
});

QUnit.test("List item insertion at the bottom", function () {
    expect(0)
});

QUnit.test("Pressing Enter Key inserts the list item", function () {
    expect(0)
});

QUnit.test("Clicking the Add button when text box is empty - nothing happens", function () {
    expect(0)
});

QUnit.test("Clicking the Add button when text box is filled inserts the item", function () {
    expect(0)
});

QUnit.test("Refresh enhances the newly added list items", function () {
    expect(0)
});

QUnit.test("Programmatic insertion of list items working", function () {
    expect(0)
});