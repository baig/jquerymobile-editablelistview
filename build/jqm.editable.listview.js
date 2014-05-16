/*!
* jQuery Mobile Editable Listview Plugin
* https://github.com/baig/jquerymobile-editablelistview
*
* Copyright 2014 (c) Wasif Hasan Baig
*
* Released under the MIT license
* https://github.com/baig/jquerymobile-editablelistview/blob/master/LICENSE.txt
*/

(function ($, undefined ) {

    // Whether the widget is already present on the page or not
    var isCreated = false;
    var inEditState = false;
    var liInsertion = true;

    // Plugin Definition
    $.widget("mobile.editablelistview", $.extend( {

        initSelector: ":jqmData(role='editablelistview'), :jqmData(role='editable-listview')",

        options: {
            listTitle: "View list items",
            listEmptyTitle: "No items to view",
            buttonEditLabel: "Edit",
            buttonAddLabel: "Add",
            buttonDoneLabel: "Done",
            buttonAddIcon: "plus",
            buttonEditIcon: "edit",
            buttonDoneIcon: "check",
            collapsed: true,
            enhanced: false,
            collapsedIcon: "carat-r",
            expandedIcon: "carat-d",

//            expandCueText: null,
//            collapseCueText: null,
//            iconpos: null,
//            theme: null,
//            contentTheme: null,
//            inset: null,
//            corners: null,
//            mini: null
        },

        _create: function() {
            var $elem = this.element,   // jQuery Object
                opts = this.options,    // POJO
                ui = {},
                isEnhanced = opts.enhanced; // To be jQuery Object; null initially

            $.extend( this, {
                _ui: null,
                _initialRefresh: true
            });

            if ( isEnhanced ) {
                this._ui = {
                    wrapper: $elem.parent().parent(),
                    header: $elem.parent().prev(),
                    button: $elem.parent().prev().children('a.ui-btn'),
                    content: $elem,
                 }
            } else {
                this._ui = this._enhance();
            }

            this._handleExpandCollapse( opts.collapsed );

            this._on( this._ui.header, {
                "tap": "_onHeaderTapped"
            });

            this._on( this._ui.button, {
                "tap": "_onEditButtonTapped",
            });

            this.refresh();
        },

        // Add Wrapper DOM and all the relevant Classes returning ui hash containing references
        // to elements that we need later for behvaior manipulation
        _enhance: function() {
            var $el = this.element,
                opts = this.options,
                $markup = this._$markup,
                ui = {};

            this._enhanceList($el);

            ui.wrapper = $el.wrap( '<div class="ui-editable ui-collapsible ui-collapsible-inset ui-corner-all ui-collapsible-themed-content"></div>' )

            ui.header = $markup.header(this, opts);

            ui.content = $el.wrap( "<div class='ui-collapsible-content ui-body-inherit'></div>" );

            ui.button = ui.header.find('a')

            //drop heading in before content
            ui.header.insertBefore( ui.content.parent() );

            return ui;
        },


        // --(start)-- Event Handlers --
        _onEditButtonTapped: function(e) {
            // Toggling Edit State
            inEditState = !inEditState;

            // Keeps the list expanded when you exit Edit Mode
            inEditState
            ? this._handleExpandCollapse( false )
            : this._handleExpandCollapse( !this._ui.header.hasClass( "ui-collapsible-heading-collapsed" ) )

            this._updateHeader()
            this._insertTextInputBox()
            this._toggleSplitIcon()
            this._attachDetachEventHandlers()

        },

        _onHeaderTapped: function(e) {
            // returns immediately if list is empty
            if (this._isListEmpty()) return;

            inEditState
            ? this._handleExpandCollapse( false )
            : this._handleExpandCollapse( !this._ui.header.hasClass( "ui-collapsible-heading-collapsed" ) )

            // QUICK FIX: fixed ul margin after dynamic li insertion
            !liInsertion
            ? inEditState
              ? this._ui.content.filter('ul').css("margin", "-0.5em -1em")
              : this._ui.content.filter('ul').css("margin", "-0.6em -1em")
            : this._ui.content.filter('ul').css("margin", "-0.5em -1em")
        },
        // --(end)-- Event Handlers --

        // --(start)-- Event Handler Helper Functions --
        _attachDetachEventHandlers: function() {
            this._enableInsertListItemEvent()
            this._enableListItemDeleteEvent()

            this._enableListItemEditing() // v0.2
        },

        _enableInsertListItemEvent: function() {
            var $addBtn = this._ui.content.find('li.ui-editable-temp button#item-add'),
                $textField = this._ui.content.find('input[type=text]');

            if ( inEditState ) {
                this._on( $addBtn, { "tap": "_insertListItem" })
                this._on( $textField, { "keyup": "_insertListItem" })
            } else {
                this._off( $addBtn, "tap")
                this._off( $textField, "keyup")
            }
        },

        _enableListItemDeleteEvent: function() {
            inEditState
            ? this._on( this._ui.content.find('li.ui-li-has-alt a.ui-editable-temp'), { "tap": "_deleteListItem" })
            : this._off( this._ui.content.find('li.ui-li-has-alt a.ui-editable-temp'), "tap")
        },

        // updates header label and show/hide icon based on whether list is empty or not
        _updateHeader: function() {
            var opts = this.options,
                isListEmpty = this._isListEmpty(),
                isCollapsed = this.options.collapsed;

            this._ui.header.find('span').text( isListEmpty? opts.listEmptyTitle : opts.listTitle )

            // Change "Edit" button state, icon and label
            this._ui.button.removeClass('ui-icon-' + opts.buttonDoneIcon + ' ui-icon-' + opts.buttonAddIcon + ' ui-icon-' + opts.buttonEditIcon)
                           .addClass( inEditState
                                      ? 'ui-icon-' + opts.buttonDoneIcon
                                      : isListEmpty
                                        ? 'ui-icon-' + opts.buttonAddIcon
                                        : 'ui-icon-' + opts.buttonEditIcon )
                           .text( inEditState
                                  ? opts.buttonDoneLabel
                                  : isListEmpty
                                    ? opts.buttonAddLabel
                                    : opts.buttonEditLabel )

            this._ui.header.removeClass('ui-btn-icon-left ui-icon-' + opts.expandedIcon + ' ui-icon-' + opts.expandedIcon)
                           .addClass( inEditState
                                      ? isListEmpty
                                        ? ''
                                        : 'ui-btn-icon-left ui-icon-' + opts.expandedIcon
                                      : isListEmpty
                                        ? ''
                                        : isCollapsed
                                          ? 'ui-btn-icon-left ui-icon-' + opts.collapsedIcon
                                          : 'ui-btn-icon-left ui-icon-' + opts.expandedIcon )

        },

        // TODO v0.2
        _enableListItemEditing: function() {
            inEditState
            ? this._on( this._ui.content.find('li a.ui-btn'), { "tap": "_editListItem" })
            : this._off( this._ui.content.find('li a.ui-btn'), "tap")
        },

        // TODO v0.2
        _editListItem: function(e) {},

        _insertListItem: function(e) {
            // returning immediately if keyup keycode does not match keyCode.ENTER i.e. 13
            if (e.type !== "tap"  && e.keyCode !== $.mobile.keyCode.ENTER)
                return;

            var $target = $(e.target),
                $input = (e.type === "keyup")
                         ? $target
                         : $target.prev().find('input'),
                inputTextString = $input.val();

            // Inserting list item only if input string is not empty
            if (!!inputTextString) {
                var $li = this._attachDeleteListItemEvent(this._enhanceListItem('<li>' + inputTextString + '</li>'))
                $input.val("")  // Clearing the input text field
                $target.parents('ul')
                           .children('li')
                           .first()
                           .css( "border-bottom-width", "0") // QUICK FIX for li.ui-editable-temp: setting List Text Input bottom border width to zero
                           .after($li)

                this.refresh();

                // QUICK FIX
                liInsertion = false;
            }
        },

        _deleteListItem: function(e) {
            $(e.currentTarget).parent().remove();
            this._updateHeader();
            e.preventDefault();
        },

        _insertTextInputBox: function() {
            var $markup = this._$markup;

            // QUICK CSS FIX
            var borderWidth = liInsertion ? "0 0 1px 0" : "0"

            inEditState
            ? this._ui.content  // true
                      .prepend( $markup.listTextInput().css( /* QUICK FIX */ "border-width", borderWidth) )   // true
            : this._ui.content  // false
                      .find( 'li.ui-editable-temp' )
                      .remove()
        },

        _toggleSplitIcon: function() {
            inEditState
            ? this._ui.content.find('li')   // true
                              .next()
                              .addClass( 'ui-li-has-alt' )
                              .append( '<a class="ui-editable-temp ui-btn ui-btn-icon-notext ui-icon-minus ui-btn-a"></a>' )
            : this._ui.content.find('li')   // false
                              .removeClass( 'ui-li-has-alt' )
                              .find( 'a.ui-editable-temp' )
                              .remove()
        },

        // --(end)-- Event Handler Helper Functions --

        _isListEmpty: function() {
              return (this.element.find('li').not('li.ui-editable-temp').length === 0) ? true : false
        },

        _addToolbarButton: function($el) {
            return $('<button class="ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-check">' + this.options.buttonLabel + '</button>' + $el[0].outerHTML );
        },

        _enhanceList: function($el) {
            var $ul = $el.filter('ul'),
                $li = $ul.children();

            $ul.addClass( 'ui-listview ui-corner-all ui-shadow' )
            $li.each( function() {
                !$(this).children().length ? $(this).wrapInner( '<a class="ui-btn"></a>' ) : 0;
            })
        },

        _enhanceListItem: function( li ) {
            var $li = $( li );

            // Building DOM
            $li.wrapInner( '<a class="ui-btn"></a>' );
            $li.first().addClass( 'ui-li-has-alt' )
            $li.append('<a class="ui-editable-temp ui-btn ui-btn-icon-notext ui-icon-minus ui-btn-a"></a>')

            return $li;
        },

        _attachDeleteListItemEvent: function( $li ) {
            this._on( $li.find('a.ui-editable-temp'), { "tap": "_deleteListItem" });
            return $li;
        },

        _handleExpandCollapse: function( isCollapsed ) {
            var opts = this.options,
                ui = this._ui;

            ui.header
              .toggleClass( "ui-collapsible-heading-collapsed ui-corner-all", isCollapsed )
              .toggleClass( "ui-editable-listview-corner", !isCollapsed )
              .css( "margin-bottom", "0" )
              .toggleClass( "ui-icon-" + opts.expandedIcon, !isCollapsed )
              .toggleClass( "ui-icon-" + opts.collapsedIcon, isCollapsed )

            this.element.toggleClass( "ui-collapsible-collapsed", isCollapsed );

            ui.content
              .parent()
              .toggleClass( "ui-collapsible-content-collapsed", isCollapsed )
              .attr( "aria-hidden", isCollapsed )
              .trigger( "updatelayout" );

            this.options.collapsed = isCollapsed;
            this._trigger( isCollapsed ? "collapse" : "expand" );
        },

        expand: function() {
            this._handleExpandCollapse( false );
        },

        collapse: function() {
            this._handleExpandCollapse( true );
        },

        _destroy: function() {
            var ui = this._ui,
                opts = this.options,
                $ul = ui.content.filter('ul'),
                $li = $ul.find('li'),
                items = this.items()

            // Not doing anything if DOM was already enhanced
            if ( opts.enhanced ) {
                return this;
            }

            ui.header.remove()
            ui.content = ui.content.unwrap().unwrap()

            $ul.removeClass("ui-listview ui-corner-all ui-shadow ui-collapsible-collapsed")
            $ul.find('a').remove()
            this._removeFirstLastClasses($li)
            $li.removeClass('ui-li-has-alt')
            $li.each( function(idx, val) {
                this.textContent = items[idx]
            })

            return ui
        },

        // Public API

        length: function() {
            return this.element.find('li').length
        },

        items: function() {
            var arr = [];
            this.element.find('li').each( function(idx, el) {
                arr.push(el.textContent)
            })
            return arr
        },

        widget: function() {
            return this._ui.wrapper;
        },

        refresh: function() {
            var $el = this._ui.content,
                opts = this.options,
                create = this._initialRefresh,
                $li = $el.find( "li" );

            this._updateHeader();
            this._enhanceList($el)
            this._addFirstLastClasses( $li, ( opts.excludeInvisible ? this._getVisibles($li ,create) : $li ), create );
            this._initialRefresh = false;
        },

        _$markup: {

            listTextInput: function() {
                return $(
                    '<li class="ui-editable-temp ui-btn" style="padding: 0.3em 0.8em;">' +
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
                        '<a class="ui-btn ui-btn-right ui-btn-inline ui-corner-all ui-mini ui-btn-icon-right">' + buttonLabel + '</a>' +
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

        }

    }, $.mobile.behaviors.addFirstLastClasses) );

}(jQuery));

/* Auto-initialize on pagecreate */
$(document).bind("pagecreate", function (e) {
    $(":jqmData(role='editablelistview'), :jqmData(role='editable-listview')", e.target).editablelistview();
});
