Editable Listview (jQuery Mobile Plugin)
========================================
A customized version of the [jQuery Mobile Listview Widget](http://demos.jquerymobile.com/1.4.2/listview/) that supports insertion of new list items and removal of existing list items out of the box.

![Editable Listview Plugin](editable-listview.png?raw=true)

## Why
Many a times, you come across a situation where you want to allow editing of list items. To do this simple task, you have to build extra functionality around the Listview widget to allow for insertion of new list items and removal of existing list items. **Editable Listview** plugin is designed to take the pain out of this situaiton by having all this functionality baked-in.

## Features

1. Allows insertion of new list items right in the Listview.
2. Allows easy removal of existing list items.

## How to Use it!
There are two ways you can install the plugin.

1. Download and unzip the package into your project folder OR install using bower

    `bower install jqm-editable-istview`
    
2. Include the plugin script after the jQuery Mobile source file
    
    `<script src="jquery.mobile.editablelistview.js" type="text/javascript"></script>`
    
3. Include the plugin stylesheet right after the jQuery Mobile stylesheet

    `<link href="../jquery.mobile.editablelistview.css" rel="stylesheet" type="text/css">`

### Simple Type
Use the following HTML/DOM structure

```
    <ul data-role="listview" data-editable="true">
        <li>Apple</li>
        <li>Banana</li>
        <li>Cranberry</li>
        <li>Cherry</li>
    </ul>
```

See [below](#attributes) for a full list of available "`data-`" attributes

### Complex Type
For complex type, link a form to the listview through `data-editable-form` attribute by putting in the id of the form as the value. That form will be shown embedded in the collapsible listview in `Edit` Mode. The user is at liberty to make the form look however they feel like, but they are supposed to add some specific `data` attributes to form elements. See the working example below.

```
    <ul data-role="listview" data-editable="true" data-editable-type="complex" data-editable-form="editing-form">
        <li>
            <a>
                <h3>Apple</h3>
                <p>round</p>
                <p>Red</p>
            </a>
        </li>
        <li>
            <a>
                <h3>Pineapple</h3>
                <p>oval</p>
                <p>Yellow</p>
            </a>
        </li>
        <li>
            <a>
                <h3>Orange</h3>
                <p>round</p>
                <p>Orange</p>
            </a>
        </li>
    </ul>
    
    <form id="editing-form">
        <input type="text" data-item-name="fruitName" data-item-element="h3">
        <input type="text" data-item-name="fruitShape" data-item-element="p">
        <input type="text" data-item-name="fruitColor" data-item-element="p">
        <button class="ui-btn ui-corner-all" data-add-button="true">Add</button>
        <button class="ui-btn ui-corner-all" data-clear-button="true">Clear</button>
    </form>
```

`data-item-name` is the name of the variable to hold the value of the input field. `data-item-element` signifies the HTML Element that value will be rendered inside. `data-add-button` indicates the button that can be clicked/tapped/pressed to insert the new list item having values specified in the input fields. `data-clear-button` clears all the text from the input fields.

## Roadmap
This is a preliminary list of planned fatures.

1. In-place editing of existing list items.
2. Re-ordering of list items tap and hold on the list item and drag it back and forth.
3. Deleting item by swiping left or right.

## List of `data-` Attributes<a name="attributes"></a>

**`data-editable`**
    
A boolean value required on the `ul` tag with `data-role="listview"` for the list to be initialized as an **Editable Listview**.

**`data-editable-type`**
    
Indicates the type of the editable listview. The value can either be `simple` or `complex`. Simple Editable Listview has only one value per list item. Complex Editable Listview can have multiple values per list item and user is required to provide a custom form for entry of new list items.
Default value is `simple`
    
**`data-list-title`**

Title of the list when the list has at least one item to show. Default is "View list items"
    
**`data-list-empty-title`**

Title of the list when the lis tis empty. Default is "No items to view"
    
**`data-add-label`**

Label of the button when the list is empty. Default is "Add"
    
**`data-add-icon`**

Icon of the button when the list is empty. See [this](http://api.jquerymobile.com/icons/) page for the list of available icons. Default is "plus"
    
**`data-edit-label`**

Label of the Edit button. Default is "Edit"
    
**`data-edit-icon`**

Icon of the button when the list is not empty. See [this](http://api.jquerymobile.com/icons/) page for the list of available icons. Default is "edit"

**`data-done-label`**

Label of the button when the list is in edit mode. Default is "Done"
    
**`data-done-icon`**

Icon of the button when the list is in **edit** mode empty. See [this](http://api.jquerymobile.com/icons/) page for the list of available icons. Default is "check"
    
**`data-collapsed`**

A boolean value indicating whether the list will be collapsed or not when initialized. Default is "true"
    
**`data-collapsed-icon`**

Icon next to list title when the list is collapsed. See [this](http://api.jquerymobile.com/icons/) page for the list of available icons. Default is "carat-r"
    
**`data-expanded-icon`**

Icon next to list title when the list is expanded. See [this](http://api.jquerymobile.com/icons/) page for the list of available icons. Default is "carat-d"
    
**`data-enhanced`**

A boolean value indicating whether the DOM has already been enhanced or not. If so, then all the required DOM structure along with relevant CSS classes and corresponding data attributes must be present. Default is "false"

**`data-item-name`**
The name of the variable to hold the value of input fields of the linked form.

**`data-item-element`**
The type of HTML element to be used to render the form input values inside list item

**`data-add-button`**
Indicates the button to insert the new list items in complex type.

**`data-clear-button`**
Indicates the button to clear input fields in the form in complex type.
    

## Author
[Wasif Hasan Baig](https://github.com/baig)

## License
Copyright &copy; 2014 Wasif Hasan Baig

This plugin is released under the Terms and Conditions of [MIT License](http://opensource.org/licenses/MIT). Please refer to the [License file](https://github.com/baig/jquerymobile-editablelistview/blob/master/LICENSE.txt) in the source code project directory.
