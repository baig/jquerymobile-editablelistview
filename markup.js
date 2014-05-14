var $Markup = {

    listTextInput: function() {
        return $(
            '<li id="temp" class="ui-btn" style="padding: .8em 25px">' +
                '<div style="width: 100%; margin: 0" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all">' +
                    '<div style="width: inherit" class="ui-controlgroup-controls ">' +
                        '<div style="width: 95%; background-color: white" class="ui-input-text ui-body-inherit ui-corner-all controlgroup-textinput ui-btn ui-shadow-inset ui-first-child">' +
                            '<input type="text">' +
                        '</div>' +
                        '<button id="item-add" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-notext ui-icon-plus ui-last-child">Add</button>' +
                    '</div>' +
                '</div>' +
            '</li>'
        );
    },

    listItemTextInput: function() {
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
    }

};
