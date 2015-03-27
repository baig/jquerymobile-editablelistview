var cwd = require('fs').workingDirectory;
var dump = require('utils').dump;
var system = require('system');
var webpage = require('webpage');

casper.test.setUp(function () {
    casper.options.clientScripts = [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/jquery-mobile/dist/jquery.mobile.min.js',
        './js/editable-listview.js'
    ];
    //    casper.start().userAgent('Mosaic 0.1');
    casper.start("file://" + cwd + "/tests/functional/simple.html");
});

casper.test.tearDown(function () {
    casper.echo('Goodbye!');
});

casper.test.begin('Simple Editable Listview is enhanced with correct markup', 5, function suite(test) {

    casper.then(function () {
        dump(this.getElementAttribute('h1 button', 'class'))
        test.assertEquals(this.exists('div[data-role="collapsible"]'), true);
        test.assertEquals(this.getElementAttribute('div[data-role="collapsible"]', 'class'), 'ui-collapsible ui-collapsible-inset ui-corner-all ui-collapsible-themed-content ui-collapsible-collapsed');
        test.assertEquals(this.getElementAttribute('h1', 'class'), 'ui-collapsible-heading ui-collapsible-heading-collapsed');
        test.assertEquals(this.exists('h1.ui-collapsible-heading'), true);
        test.assertEquals(this.exists('h1.ui-collapsible-heading'), true);
    });

    casper.run(function () {
        test.done();
    });
});

casper.test.begin('Clicking on Add button takes into Edit mode', 1, function (test) {
    casper.then(function () {
        this.click('h1 button');
    });

    casper.then(function () {
//        console.log('clicked edit button')
        test.assertEquals(this.exists('ul li.ui-editable-temp'), true);
//        dump(this.getElementInfo('div[data-role="collapsible"]').html)
    });

    casper.run(function () {
        test.done();
    });
});

//casper.test.begin('Clicking on plus button inserts the list item', 6, function (test) {
//    casper.start("file://" + cwd + "/tests/functional/simple.html");
//
//    casper.then(function () {
//        test.assertTitle("Casper", "Casper title is ok");
//        test.assertTitle("Casper", "Casper title is ok");
//        test.assertTitle("Casper", "Casper title is ok");
//    });
//
//    casper.run(function () {
//        test.done();
//    });
//});
//
//casper.test.begin('Nothing happens when clicking on plus button when input text is empty', 6, function (test) {
//    casper.start("file://" + cwd + "/tests/functional/simple.html");
//
//    casper.then(function () {
//        test.assertTitle("Casper", "Casper title is ok");
//        test.assertTitle("Casper", "Casper title is ok");
//        test.assertTitle("Casper", "Casper title is ok");
//    });
//
//    casper.run(function () {
//        test.done();
//    });
//});
//
//casper.test.begin('Clicking on Done', 6, function (test) {
//    casper.start("file://" + cwd + "/tests/functional/simple.html");
//
//    casper.then(function () {
//        test.assertTitle("Casper", "Casper title is ok");
//        test.assertTitle("Casper", "Casper title is ok");
//        test.assertTitle("Casper", "Casper title is ok");
//    });
//
//    casper.run(function () {
//        test.done();
//    });
//});
//
//
//
//casper.test.begin('ClientUtils.exists() tests', 5, function (test) {
//    var clientutils = require('clientutils').create();
//    fakeDocument('<ul class="foo"><li>bar</li><li>baz</li></ul>');
//    test.assert(clientutils.exists('ul'),
//        'ClientUtils.exists() checks that an element exist');
//    test.assertNot(clientutils.exists('ol'),
//        'ClientUtils.exists() checks that an element exist');
//    test.assert(clientutils.exists('ul.foo li'),
//        'ClientUtils.exists() checks that an element exist');
//    // xpath
//    test.assert(clientutils.exists(x('//ul')),
//        'ClientUtils.exists() checks that an element exist using XPath');
//    test.assertNot(clientutils.exists(x('//ol')),
//        'ClientUtils.exists() checks that an element exist using XPath');
//    fakeDocument(null);
//    test.done();
//});
//
//casper.test.begin('ClientUtils.getElementBounds() tests', 3, function (test) {
//    casper.start().then(function () {
//        this.page.content = '<div id="b1" style="position:fixed;top:10px;left:11px;width:50px;height:60px"></div>';
//        test.assertEquals(
//            this.getElementBounds('#b1'), {
//                top: 10,
//                left: 11,
//                width: 50,
//                height: 60
//            },
//            'ClientUtils.getElementBounds() retrieves element boundaries'
//        );
//    });
//    casper.then(function () {
//        var html = '<div id="boxes">';
//        html += '  <div style="position:fixed;top:10px;left:11px;width:50px;height:60px"></div>';
//        html += '  <div style="position:fixed;top:20px;left:21px;width:70px;height:80px"></div>';
//        html += '</div>';
//        this.page.content = html;
//        var bounds = this.getElementsBounds('#boxes div');
//        test.assertEquals(
//            bounds[0], {
//                top: 10,
//                left: 11,
//                width: 50,
//                height: 60
//            },
//            'ClientUtils.getElementsBounds() retrieves multiple elements boundaries'
//        );
//        test.assertEquals(
//            bounds[1], {
//                top: 20,
//                left: 21,
//                width: 70,
//                height: 80
//            },
//            'ClientUtils.getElementsBounds() retrieves multiple elements boundaries'
//        );
//    });
//    casper.run(function () {
//        test.done();
//    });
//});
//
//
//casper.test.begin('ClientUtils.getElementBounds() page zoom factor tests', 3, function (test) {
//    casper.start().zoom(2).then(function () {
//        var html = '<div id="boxes">';
//        html += '  <div id="b1" style="position:fixed;top:10px;left:11px;width:50px;height:60px"></div>';
//        html += '  <div style="position:fixed;top:20px;left:21px;width:70px;height:80px"></div>';
//        html += '</div>';
//        this.page.content = html;
//        test.assertEquals(
//            this.getElementBounds('#b1'), {
//                top: 20,
//                left: 22,
//                width: 100,
//                height: 120
//            },
//            'ClientUtils.getElementBounds() is aware of the page zoom factor'
//        );
//        var bounds = this.getElementsBounds('#boxes div');
//        test.assertEquals(
//            bounds[0], {
//                top: 20,
//                left: 22,
//                width: 100,
//                height: 120
//            },
//            'ClientUtils.getElementsBounds() is aware of the page zoom factor'
//        );
//        test.assertEquals(
//            bounds[1], {
//                top: 40,
//                left: 42,
//                width: 140,
//                height: 160
//            },
//            'ClientUtils.getElementsBounds() is aware of the page zoom factor'
//        );
//    });
//    casper.run(function () {
//        test.done();
//    });
//});
