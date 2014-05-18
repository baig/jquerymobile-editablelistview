Editable Listview (jQuery Mobile Plugin)
========================================
A customized version of the [jQuery Mobile Listview Widget](http://demos.jquerymobile.com/1.4.2/listview/) that supports insertion of new list items and removal of existing list items out of the box.

![Editable Listview Plugin](editable-listview.png?raw=true =350x308)

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
    
4. Use the following HTML/DOM structure

    ```
    <ul data-role="editable-listview">
        <li>Apple</li>
        <li>Apple</li>
        <li>Apple</li>
        <li>Apple</li>
    </ul>
    ```
    See [below](#attributes) for a full list of available "`data-`" attributes

## Roadmap
This is a preliminary list of planned fatures.

1. In-place editing of existing list items.
2. Re-ordering of list items tap and hold on the list item and drag it back and forth. 

## List of "`data-`" Attributes<a name="attributes"></a>

1. data-role
    
    Required on the `ul` tag for it to be initialized as **Editable Listview**. The value can either be "editable-listview" or "editablelistview"
    
2. data-list-title

    Title of the list when the list has at least one item to show. Default is "View list items"
    
3. data-list-empty-title

    Title of the list when the lis tis empty. Default is "No items to view"
    
4. data-button-add-label

    Label of the button when the list is empty. Default is "Add"
    
5. data-button-add-icon

    Icon of the button when the list is empty. See [this](http://api.jquerymobile.com/icons/) page for the list of available icons. Default is "plus"
    
6. data-button-edit-label

    Label of the Edit button. Default is "Edit"
    
7. data-button-edit-icon

    Icon of the button when the list is not empty. See [this](http://api.jquerymobile.com/icons/) page for the list of available icons. Default is "edit"
    
8. data-button-done-label

    Label of the button when the list is in edit mode. Default is "Done"
    
9. data-button-done-icon

    Icon of the button when the list is in **edit** mode empty. See [this](http://api.jquerymobile.com/icons/) page for the list of available icons. Default is "check"
    
10. data-collapsed

    A boolean value indicating whether the list will be collapsed or not when initialized. Default is "true"
    
11. data-collapsed-icon

    Icon next to list title when the list is collapsed. See [this](http://api.jquerymobile.com/icons/) page for the list of available icons. Default is "carat-r"
    
12. data-expanded-icon: "carat-d"

    Icon next to list title when the list is expanded. See [this](http://api.jquerymobile.com/icons/) page for the list of available icons. Default is "carat-d"
    
13. data-enhanced

    A boolean value indicating whether the DOM has already been enhanced or not. If so, then all the required DOM structure along with relevant CSS classes and corresponding data attributes must be present. Default is "false"
    

## Author
<a href="mailto:pr.wasif@gmail.com?subject=About%20Editable%20Listview%20Plugin">Wasif Hasan Baig</a>

## License
This plugin is released under the Terms and Conditions of [MIT License](http://opensource.org/licenses/MIT). Please refer to the [License file](https://github.com/baig/jquerymobile-editablelistview/blob/master/LICENSE.txt) in the root of the project directory.
