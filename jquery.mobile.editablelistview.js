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
        
        _create: function() {
            console.log("Hello _create :)")
            var $el = this.element; // jQuery Object
            var elString = this.element[0].outerHTML; // jQuery Object
            var options = this.options; // POJO
            
            $el = this._convertToListView( $el )
            $el = this._addToolbarButton( $el )
            $el = this._wrapCollapsible( $el )
            
//            
            console.log($el[0])
//            return $el
        },
        
        _addToolbarButton: function($el) {
            return $('<button class="ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-check">' + this.options.buttonLabel + '</button>' + $el[0].outerHTML );
        },
        
        _convertToListView: function($el) {
           return $('<ul data-role="listview">' + $el[0].innerHTML + '</ul>')
        },
        
        _wrapCollapsible: function($el) {
            var $collapsible = $('<div data-role="collapsible"></div>');
            return $collapsible.wrapInner($el)
        },
        
        _init: function() {
            this.refresh( isCreated );
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