(function ($, undefined) {

    //auto-init on pagecreate
    $(document).bind("pagecreate", function (e) {
        $(":jqmData(role='editablelistview'), :jqmData(role='editable-listview')", e.target).editablelistview();
    });
    
    // Whether the widget is already present on the page or not
    var isCreated = false;

    //create widget
    $.widget("mobile.editablelistview", $.mobile.widget, {
        
        initSelector: ":jqmData(role='editablelistview'), :jqmData(role='editable-listview')",
        
        options: {
            listTitle: "",
            listEmptyTitle: "",
            buttonLabel: "Edit"
        },
        
        _ui : {},
        
        _create: function() {
            console.log("Hello _create :)")
            var $el = this.element; // jQuery Object
            var options = this.options; // POJO
            
            this._enhanceList($el);
            this._enhance($el, this._ui);
            
            this._on( this._ui.header, {
                "tap": function() {
                    console.log("TAPPED")
                }
            })
//            
            this._on( this._ui.button, {
                "tap": function() {
                    console.log("EDIT")
                }
            })
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
        
//        <div class="ui-header ui-bar-inherit" role="banner" data-role="header">
//            <h1 aria-level="1" role="heading" class="ui-title">Page Title</h1>
//            <a role="button" data-role="button" href="#" class="ui-btn-right ui-btn ui-icon-gear ui-btn-icon-right ui-btn-inline ui-corner-all ui-mini">Options</a>
//        </div>
        
        // Add all relevant classes
        _enhance: function($el, ui) {
            
            ui.wrapper = $el.wrap( "<div class='ui-collapsible ui-collapsible-inset ui-corner-all ui-collapsible-themed-content'></div>" )
            
            ui.header = $(  //'<h1 class="ui-collapsible-heading">' +
                                '<div class="ui-header ui-editable-listview-corner ui-inset ui-bar-inherit" role="banner" data-role="header">' +
//                                    '<h1 aria-level="1" role="heading" class="ui-title">Page Title</h1>' +
                                    '<a class="ui-collapsible-heading-toggle ui-btn">Options</a>' +
                                    '<a class="ui-btn ui-btn-right ui-btn-inline ui-corner-all ui-mini ui-btn-icon-right ui-icon-gear">Edit</a>' +
                                '</div>' );
//                            '</h1>' );
            
            ui.content = $el.wrap( "<div class='ui-collapsible-content ui-body-inherit'></div>" );
            
            ui.button = ui.header.find('a').last()
            
            console.log(ui.content)
            
            //drop heading in before content
            ui.header.insertBefore( ui.content.parent() );
            
        },
        
        _enhanceList: function($el) {
            var $ul = $el.filter('ul'),
                $li = $ul.children();
            
            $ul.addClass( 'ui-listview ui-corner-all ui-shadow' )
            $li.wrapInner( '<a class="ui-btn ui-btn-icon-right ui-icon-carat-r"></a>' );
            $li.first().addClass( 'ui-first-child' )
            $li.last().addClass( 'ui-last-child' )
            
            console.log($el[0])
        },
//        
        _enhanceCollapsible: function( $elem, ui ) {
            var iconclass,
                opts = this._renderedOptions,
//                contentThemeClass = this._themeClassFromOption( "ui-body-", opts.contentTheme );
//
            contentThemeClass = "hello";
            console.log($elem);
            
//            $elem.addClass( "ui-collapsible " +
//                          ( opts.inset ? "ui-collapsible-inset " : "" ) +
//                          ( opts.inset && opts.corners ? "ui-corner-all " : "" ) +
//                          ( contentThemeClass ? "ui-collapsible-themed-content " : "" ) );
            
            ui.originalHeading = $elem.children( this.options.heading ).first();
            
            ui.content = $elem.wrapInner( "<div class='ui-collapsible-content " + contentThemeClass + "'></div>" )
                              .children( ".ui-collapsible-content" );
            
            ui.heading = ui.originalHeading;

            // Replace collapsibleHeading if it's a legend
            if ( ui.heading.is( "legend" ) ) {
                ui.heading = $( "<div role='heading'>"+ ui.heading.html() +"</div>" );
                ui.placeholder = $( "<div><!-- placeholder for legend --></div>" ).insertBefore( ui.originalHeading );
                ui.originalHeading.remove();
            }

            iconclass = opts.collapsed
                        ? ( opts.collapsedIcon
                            ? "ui-icon-" + opts.collapsedIcon
                            : "" )
                        : ( opts.expandedIcon
                            ? "ui-icon-" + opts.expandedIcon
                            : "" )

            ui.status = $( "<span class='ui-collapsible-heading-status'></span>" );
            
            ui.anchor = ui.heading
                          .detach()
                          //modify markup & attributes
                          .addClass( "ui-collapsible-heading" )
                          .append( ui.status )
                          .wrapInner( "<a href='#' class='ui-collapsible-heading-toggle'></a>" )
                          .find( "a" )
                          .first()
                          .addClass( "ui-btn " +
                                     ( iconclass ? iconclass + " " : "" ) +
                                     ( iconclass ? iconposClass( opts.iconpos ) + " " : "" ) +
                                     this._themeClassFromOption( "ui-btn-", opts.theme ) +
                                     " " +
                                     ( opts.mini ? "ui-mini " : "" )
                                   );

            //drop heading in before content
            ui.heading.insertBefore( ui.content );

            this._handleExpandCollapse( this.options.collapsed );

            return ui;
        },
        
        refresh: function( created ) {
            if ( !created ) {
                console.log("Happy creation :)")
                isCreated = true
            } else {
                console.log("programmatic refresh")
            }
        },

    });

}(jQuery));