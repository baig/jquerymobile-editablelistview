(function ($, undefined) {

    //auto-init on pagecreate
    $(document).bind("pagecreate", function (e) {
        $(":jqmData(role='editablelistview'), :jqmData(role='editable-listview')", e.target).editablelistview();
    });
    
    // Whether the widget is already present on the page or not
    var isCreated = false;
    var inEditState = false;
    
    var $listTextInputMarkup = $(
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

    var $listItemTextInputMarkup = $(
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

    var $headerMarkup = function(context) {
        return $(
            '<div class="ui-collapsible-heading-toggle ui-btn ui-btn-inherit ' + (function(ctx){ if(ctx._isListEmpty()) { return '' } else {return 'ui-btn-icon-left ui-icon-carat-d' }}(context)) + '"role="banner" data-role="header">' +
                '<div class="ui-bar ui-editable-listview-title">' +
                    '<span>' + ( context._isListEmpty() ? context.options.listEmptyTitle : context.options.listTitle ) + '</span>' +
                '</div>' +
                '<a class="ui-btn ui-btn-right ui-btn-inline ui-corner-all ui-mini ui-btn-icon-right ui-icon-edit">Edit</a>' +
            '</div>'
        );
    }


    // Plugin Definition
    $.widget("mobile.editablelistview", $.extend( {
        
        initSelector: ":jqmData(role='editablelistview'), :jqmData(role='editable-listview')",
        
        options: {
            listTitle: "",
            listEmptyTitle: "",
            buttonLabel: "Edit",
            collapsed: true,
            
            enhanced: false,
            expandCueText: null,
            collapseCueText: null,
            heading: "h1,h2,h3,h4,h5,h6,legend",
            collapsedIcon: "carat-d",
            expandedIcon: "carat-u",
            iconpos: null,
            theme: null,
            contentTheme: null,
            inset: null,
            corners: null,
            mini: null
        },
        
        _ui : {},
        
        _create: function() {
            var ui = this._ui;
            
            console.log("Hello _create :)")
            var $el = this.element; // jQuery Object
            var options = this.options; // POJO
            
            this._enhanceList($el);
            this._enhance($el, this._ui);
            
            this._on( ui.header, {
                "tap": "_onHeaderTapped"
            });

            this._on( ui.button, {
                "tap": "_onEditButtonTapped",
            });

        },

        // --(start)-- Event Handlers --
        _onEditButtonTapped: function(e) {
            inEditState = !inEditState;
            
            this._handleExpandCollapse( !inEditState )

            this._changeEditButton()
            this._insertTextInputBox()
            this._toggleSplitIcon()
            this._attachDetachEventHandlers()

            
            console.log("EDIT", e.target)
        },
        _onHeaderTapped: function() {
            this._handleExpandCollapse( !this._ui.header.hasClass( "ui-collapsible-heading-collapsed" ) )
        },
        // --(end)-- Event Handlers --

        // --(start)-- Event Handler Helper Functions --
        _attachDetachEventHandlers: function() {
            this._disableHeaderTapEvent()
            this._enableInsertListItemEvent()
            this._enableListItemDeleteEvent()
        },
        _enableInsertListItemEvent: function() {
            inEditState
            ? this._on( this._ui.content.find('li#temp button#item-add'), { "tap": "_insertListItem" })
            : this._off( this._ui.content.find('li#temp button#item-add'), "tap")
        },

        _insertListItem: function(e) {
            var $target = $(e.target)
            var $input = $target.prev().find('input')
            var inputTextString = $input.val()
            var firstLiTextString = $target.parents('li#temp').next().text()
            console.log(firstLiTextString, ( !!firstLiTextString ? firstLiTextString : inputTextString ))
            var $li = this._enhanceListItem( '<li class="' + ( !!firstLiTextString ? "" : "ui-last-child" ) + '">' + ( !!firstLiTextString ? firstLiTextString : inputTextString ) + '</li>')

            // Clearing the input text field
            $input.val("")

            !!firstLiTextString
            ? $target.parents('li#temp')
                     .next()
                         .find('a')
                         .first()
                         .text(inputTextString)
                     .parent()
                     .after($li)
            : $target.parents('li#temp').after($li)
        },

        _deleteListItem: function(e) {
            console.log(e.currentTarget)
            console.log($(e.currentTarget).parent())
            $(e.currentTarget).parent().remove();
        },

        _enableListItemDeleteEvent: function() {
            inEditState
            ? this._on( this._ui.content.find('li.ui-li-has-alt a.ui-editable-temp'), { "tap": "_deleteListItem" })
            : this._off( this._ui.content.find('li.ui-li-has-alt a.ui-editable-temp'), "tap")
        },
        _disableHeaderTapEvent: function() {
            inEditState
            ? this._off( this._ui.header, "tap")
            : this._on( this._ui.header, { "tap": "_onHeaderTapped" })
        },
        _changeEditButton: function() {
            // Change "Edit" button state, icon and label
            inEditState
            ? this._ui.button
                      .removeClass( "ui-icon-edit" )
                      .addClass( "ui-btn-active ui-icon-check" )
                      .text( "Done" )
            : this._ui.button
                      .removeClass( "ui-btn-active ui-icon-check" )
                      .addClass( "ui-icon-edit" )
                      .text( "Edit" )
        },

        _insertTextInputBox: function() {
            inEditState
            ? this._ui.content  // true
                      .prepend( $listTextInputMarkup )   // true
            : this._ui.content  // false
                      .find( 'li#temp' )
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
            console.log(this.element.find('li').length)
            return ( this.element.find('li').length === 0 ? true : false )
        },
        
        _init: function() {
            this.refresh( isCreated );
        },
        
        _addToolbarButton: function($el) {
            return $('<button class="ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-check">' + this.options.buttonLabel + '</button>' + $el[0].outerHTML );
        },

        widget: function() {
            return ( this.inputNeedsWrap ) ? this.element.parent() : this.element;
        },
        
        _handleFocus: function() {
//            // In many situations, iOS will zoom into the input upon tap, this
//            // prevents that from happening
//            if ( this.options.preventFocusZoom ) {
//                $.mobile.zoom.disable( true );
//            }
//            this.widget().addClass( $.mobile.focusClass );
            console.log("focuseDDD")
            this.element.addClass( "ui-focus" );
        },

        // Add all relevant classes
        _enhance: function($el, ui) {
//            var opts = this.options
            
            ui.wrapper = $el.wrap( "<div class='ui-collapsible ui-collapsible-inset ui-corner-all ui-collapsible-themed-content'></div>" )
            
            ui.header = $headerMarkup(this);
            
            ui.content = $el.wrap( "<div class='ui-collapsible-content ui-body-inherit'></div>" );
            
            ui.button = ui.header.find('a')
            
            console.log(ui.button)
            
            //drop heading in before content
            ui.header.insertBefore( ui.content.parent() );
            
            this._handleExpandCollapse( this.options.collapsed );

            return ui;
            
        },
        
        _enhanceList: function($el) {
            var $ul = $el.filter('ul'),
                $li = $ul.children();
            
            $ul.addClass( 'ui-listview ui-corner-all ui-shadow' )
            $li.wrapInner( '<a class="ui-btn"></a>' );
            $li.first().addClass( 'ui-first-child' )
            $li.last().addClass( 'ui-last-child' )
            
            console.log($el[0])
        },
        
        _enhanceListItem: function( li ) {
            var $li = $( li );

            // Building DOM
            $li.wrapInner( '<a class="ui-btn"></a>' );
            $li.first().addClass( 'ui-li-has-alt' )
            $li.append('<a class="ui-editable-temp ui-btn ui-btn-icon-notext ui-icon-minus ui-btn-a"></a>')

            // Attaching Delete List Item event to Delete icon button
            this._on( $li.find('a.ui-editable-temp'), { "tap": "_deleteListItem" })

            return $li;
        },

        refresh: function( created ) {
            if ( !created ) {
                console.log("Happy creation :)")
                isCreated = true
            } else {
                console.log("programmatic refresh")
            }
        },
        
        _handleExpandCollapse: function( isCollapsed ) {
            var opts = this.options,
                ui = this._ui;

//            ui.status.text( isCollapsed ? opts.expandCueText : opts.collapseCueText );
            ui.header
              .toggleClass( "ui-collapsible-heading-collapsed ui-corner-all", isCollapsed )
              .toggleClass( "ui-editable-listview-corner", !isCollapsed )
              .css( "margin-bottom", "0" )
              .find( "a" )
              .first()
              .toggleClass( "ui-icon-" + opts.expandedIcon, !isCollapsed )
//              // logic or cause same icon for expanded/collapsed state would remove the ui-icon-class
//              .toggleClass( "ui-icon-" + opts.collapsedIcon, ( isCollapsed || opts.expandedIcon === opts.collapsedIcon ) )
//              .removeClass( $.mobile.activeBtnClass );

            this.element.toggleClass( "ui-collapsible-collapsed", isCollapsed );
            
            ui.content
              .parent()
              .toggleClass( "ui-collapsible-content-collapsed", isCollapsed )
              .attr( "aria-hidden", isCollapsed )
              .trigger( "updatelayout" );
            
            // If List is empty
            if (!ui.content.find('li').length && !inEditState) {
                ui.header.addClass( "ui-corner-all" )
                ui.content.parent().removeClass("ui-collapsible-content")
            }

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
                opts = this.options;

            if ( opts.enhanced ) {
                return;
            }

            if ( ui.placeholder ) {
                ui.originalHeading.insertBefore( ui.placeholder );
                ui.placeholder.remove();
                ui.heading.remove();
            } else {
                ui.status.remove();
                ui.heading
                    .removeClass( "ui-collapsible-heading ui-collapsible-heading-collapsed" )
                    .children()
                        .contents()
                            .unwrap();
            }

            ui.anchor.contents().unwrap();
            ui.content.contents().unwrap();
            this.element
                .removeClass( "ui-collapsible ui-collapsible-collapsed " +
                    "ui-collapsible-themed-content ui-collapsible-inset ui-corner-all" );
        }
        
        

    }, $.mobile.behaviors.addFirstLastClasses) );
    
}(jQuery));
