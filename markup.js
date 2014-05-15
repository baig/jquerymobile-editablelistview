var $Markup = {

//    listTextInput: function() {
//        return $(
//            '<li id="temp" class="ui-btn" style="padding: .8em 25px;">' +
////                '<div style="margin: 0" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all">' +
//                    '<div style="width: inherit" class="ui-controlgroup-controls ui-editable-flex">' +
//                        '<div style="background-color: white" class="ui-editable-flex-item ui-input-text ui-body-inherit ui-corner-all controlgroup-textinput ui-btn ui-shadow-inset ui-first-child ui-block-a">' +
//                            '<input type="text">' +
//                        '</div>' +
//                        '<button id="item-add" class="ui-editable-flex-item ui-btn ui-shadow ui-corner-all ui-btn-icon-notext ui-icon-plus ui-last-child ui-block-b">Add</button>' +
//                    '</div>' +
////                '</div>' +
//            '</li>'
//        );
//    },
    listTextInput: function() {
        return $(
            '<li id="temp" class="ui-btn" style="padding: 0.3em 0.8em;">' +
                '<div class="ui-editable-flex">' +
                    '<div style="background-color: white; padding: 0;" class="ui-editable-flex-item-left ui-editable-border-left ui-input-text ui-btn ui-shadow-inset">' +
                        '<input type="text">' +
                    '</div>' +
                    '<button id="item-add" style="height: auto" class="ui-editable-flex-item-right ui-editable-border-right ui-btn ui-shadow ui-btn-icon-notext ui-icon-plus">Add</button>' +
                '</div>' +
            '</li>'
        );
    },

    header: function(context, opts) {
        var listTitle = ( context._isListEmpty() ? opts.listEmptyTitle : opts.listTitle );
        var buttonLabel = ( context._isListEmpty() ? opts.buttonAddLabel : opts.buttonEditLabel );
        var buttonIcon = ( context._isListEmpty() ? opts.buttonAddIcon : opts.buttonEditIcon );;
        var listIcon = (function(ctx) {
            if (ctx._isListEmpty()) {
                return '';
            } else {
                return 'ui-icon-' + opts.collapsedIcon;
            }
        } (context) );

        return $(
            '<div role="banner" class="ui-collapsible-heading-toggle ui-btn ui-btn-inherit ui-btn-icon-left ' + listIcon + '">' +
                '<div class="ui-bar ui-editable-listview-title">' +
                    '<span>' + listTitle + '</span>' +
                '</div>' +
                '<a class="ui-btn ui-btn-right ui-btn-inline ui-corner-all ui-mini ui-btn-icon-right ui-icon-' + buttonIcon + '">' + buttonLabel + '</a>' +
            '</div>'
        );
    },

    // For v0.2
    /*listItemTextInput: function() {
        return $(
            '<div style="width: 100%" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all">' +
                '<div style="width: inherit" class="ui-controlgroup-controls ">' +
                    '<div style="width: 91%" class="ui-input-text ui-body-inherit ui-corner-all controlgroup-textinput ui-btn ui-shadow-inset ui-first-child">' +
                        '<input type="text">' +
                    '</div>' +
                    '<button class="ui-btn ui-shadow ui-corner-all ui-btn-icon-notext ui-icon-check ui-btn-a">Add</button>' +
                    '<button class="ui-btn ui-shadow ui-corner-all ui-btn-icon-notext ui-icon-delete ui-last-child">Dismiss</button>' +
                '</div>' +
            '</div>'
        );
    }*/

};
