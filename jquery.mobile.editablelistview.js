(function ($, undefined) {

    //auto-init on pagecreate
    $(document).bind("pagecreate", function (e) {
        $(":jqmData(role='editablelistview'), :jqmData(role='editable-listview')", e.target).editablelistview();
    });
    
    // Whether the widget is already present on the page or not
    var isCreated = false;
    var inEditState = false;
    

    //create widget
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
            
            this._on( this._ui.header, {
                "click": function( event ) {
                    this._handleExpandCollapse( !ui.header.hasClass( "ui-collapsible-heading-collapsed" ) );
                    event.preventDefault();
                }
            });

            this._on( this._ui.button, {
                "tap": "_onEditButtonTapped",
            });

        },

        // -- Event Handlers --
        _onEditButtonTapped: function(e) {
            inEditState = !inEditState;
            
            this._changeEditButtonState()
            this._changeEditButtonLabel()
            this._insertTextInputBox()
            this._toggleSplitIcon()
            
            console.log("EDIT", e.target)
        },
        // -- Event Handlers --

        // -- Event Handler Helper Functions --
        _changeEditButtonState: function() {
            inEditState ? this._ui.button.addClass( "ui-btn-active" ) : this._ui.button.removeClass( "ui-btn-active" );
        },
         _changeEditButtonLabel: function() {
            inEditState ? this._ui.button.text( "Done" ) : this._ui.button.text( "Edit" );
        },
         _insertTextInputBox: function() {
            inEditState
            ? this._ui.content.children().first().before( $('<li id="temp">Hello</li>') )   // true
            : this._ui.content.find( 'li#temp' ).remove()   // false
        },
        _toggleSplitIcon: function() {
            inEditState
            ? this._ui.content.find('li')   // true
                              .remove( 'li#temp' )
                              .addClass( 'ui-li-has-alt' )
                              .append( '<a class="ui-editable-temp ui-btn ui-btn-icon-notext ui-icon-minus ui-btn-a"></a>' )
            : this._ui.content.find('li')   // false
                              .removeClass( 'ui-li-has-alt' )
                              .find( 'a.ui-editable-temp' )
                              .remove()
        },

        // -- Event Handler Helper Functions --
        
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
        
        _wrapCollapsible: function($el) {
            return $('<div data-role="collapsible">' +  // class="ui-collapsible ui-collapsible-inset ui-corner-all ui-collapsible-themed-content ui-collapsible-collapsed"
                        '<div role="heading">' +        // class="ui-collapsible-heading ui-header ui-bar-inherit"
                        '</div>' +
                        '<div rol="content">' +         // class="ui-collapsible-content ui-body-inherit"
                            $el[0].outerHTML +
                        '</div>' +
                     '</div>');
        },
        
        _wrapToolbar: function($el) {
            return $('<div>' + $el[0].outerHTML + '</div>');
        },
        
        _wrap: function($el) {
            return $('<div>' + $el[0].outerHTML + '</div>');
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
        
//        <div class="ui-header ui-bar-inherit" role="banner" data-role="header">
//            <h1 aria-level="1" role="heading" class="ui-title">Page Title</h1>
//            <a role="button" data-role="button" href="#" class="ui-btn-right ui-btn ui-icon-gear ui-btn-icon-right ui-btn-inline ui-corner-all ui-mini">Options</a>
//        </div>
        
        // Add all relevant classes
        _enhance: function($el, ui) {
            var opts = this.options
            
            ui.wrapper = $el.wrap( "<div class='ui-collapsible ui-collapsible-inset ui-corner-all ui-collapsible-themed-content'></div>" )
            
            ui.header = $(  '<div class="ui-collapsible-heading-toggle ui-btn ui-btn-inherit ' + (function(context){ if(context._isListEmpty()) { return '' } else {return 'ui-btn-icon-left ui-icon-carat-d' }}(this)) + '"role="banner" data-role="header">' +
                                '<div class="ui-bar ui-editable-listview-title">' +
                                    '<span>' + ( this._isListEmpty() ? opts.listEmptyTitle : opts.listTitle ) + '</span>' +
                                '</div>' +
                                '<a class="ui-btn ui-btn-right ui-btn-inline ui-corner-all ui-mini ui-btn-icon-right ui-icon-gear">Edit</a>' +
                            '</div>' );
            
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
