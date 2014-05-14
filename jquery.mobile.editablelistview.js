(function ($, undefined) {

    // Whether the widget is already present on the page or not
    var isCreated = false;
    var inEditState = false;

    // Plugin Definition
    $.widget("mobile.editablelistview", $.extend( {
        
        initSelector: ":jqmData(role='editablelistview'), :jqmData(role='editable-listview')",
        
        options: {
            listTitle: "Tap to view list items",
            listEmptyTitle: "No items to view",
            buttonEditLabel: "Edit",
            buttonAddLabel: "Add",
            buttonAddIcon: "plus",
            buttonEditIcon: "edit",
            collapsed: true,
            
            enhanced: false,
            expandCueText: null,
            collapseCueText: null,
//            heading: "h1,h2,h3,h4,h5,h6,legend",
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
            
            var $elem = this.element,   // jQuery Object
                opts = this.options,    // POJO
//                ui = this._ui,          // POJO
                isEnhanced = opts.enhanced; // To be jQuery Object; null initially
            
            (isEnhanced)
            ? this._ui = {
//                            groupLegend: $elem.children( ".ui-controlgroup-label" ).children(),
//                            childWrapper: $elem.children( ".ui-controlgroup-controls" ),
                            wrapper: $elem.parent().parent(),
                            header: $elem.parent().prev(),
                            button: $elem.parent().prev().children('a.ui-btn'),
                            content: $elem,
                         }
            : this._ui = this._enhance();

            var ui = this._ui;

            this._handleExpandCollapse( opts.collapsed );
            
            this._on( ui.header, {
                "tap": "_onHeaderTapped"
            });

            this._on( ui.button, {
                "tap": "_onEditButtonTapped",
            });

//            this.refresh( true );

        },

        // Add Wrapper DOM and all the relevant Classes returning ui hash containing references
        // to elements that we need later for behvaior manipulation
        _enhance: function() {
            var $el = this.element,
                opts = this.options,
                ui = this._ui;

            this._enhanceList($el);

            ui.wrapper = $el.wrap( "<div class='ui-collapsible ui-collapsible-inset ui-corner-all ui-collapsible-themed-content'></div>" )

            ui.header = $Markup.header(this, opts);

            ui.content = $el.wrap( "<div class='ui-collapsible-content ui-body-inherit'></div>" );

            ui.button = ui.header.find('a')

            //drop heading in before content
            ui.header.insertBefore( ui.content.parent() );

            return ui;
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
            this._enableListItemEditing()
        },
        _enableInsertListItemEvent: function() {
            inEditState
            ? this._on( this._ui.content.find('li#temp button#item-add'), { "tap": "_insertListItem" })
            : this._off( this._ui.content.find('li#temp button#item-add'), "tap")
        },

        _enableListItemEditing: function() {
            inEditState
            ? this._on( this._ui.content.find('li a.ui-btn'), { "tap": "_editListItem" })
            : this._off( this._ui.content.find('li a.ui-btn'), "tap")
        },

        _editListItem: function(e) {
            var $parent = $(e.currentTarget).parent()
            console.log(e)
            console.log($(e.currentTarget).parent())
            console.log($(e.currentTarget).text())
            console.log(document.activeElement)

//            var $children = $parent.children()
//            $parent.replaceWith( $Markup.listItemTextInput() )
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
                      .prepend( $Markup.listTextInput() )   // true
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
        
//        _init: function() {
//            this.refresh( isCreated );
//        },
        
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

        _handleExpandCollapse: function( isCollapsed ) {
            var opts = this.options,
                ui = this._ui;

            ui.header
              .toggleClass( "ui-collapsible-heading-collapsed ui-corner-all", isCollapsed )
              .toggleClass( "ui-editable-listview-corner", !isCollapsed )
              .css( "margin-bottom", "0" )
              .find( "a" )
              .first()
              .toggleClass( "ui-icon-" + opts.expandedIcon, !isCollapsed )

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
        
        refresh: function( isCreated ) {
            this.element.trigger( "updatelayout" );
//            var $el = this.container(),
//			els = $el.find( ".ui-btn" ).not( ".ui-slider-handle" ),
//			create = this._initialRefresh;
//
//            if ( $.mobile.checkboxradio ) {
//                $el.find( ":mobile-checkboxradio" ).checkboxradio( "refresh" );
//            }
//
//            this._addFirstLastClasses( els, ( this.options.excludeInvisible ? this._getVisibles(els,create) : els ) , create );
//            this._initialRefresh = false;

//            if ( !created ) {
//                console.log("Happy creation :)")
//                isCreated = true
//            } else {
//                console.log("programmatic refresh")
//            }
        },

    }, $.mobile.behaviors.addFirstLastClasses) );
    
    // Auto-initialize on pagecreate
    $(document).bind("pagecreate", function (e) {
        $(":jqmData(role='editablelistview'), :jqmData(role='editable-listview')", e.target).editablelistview();
    });

}(jQuery));
