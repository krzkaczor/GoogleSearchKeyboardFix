(function() {
    var HIGHLIGHT_COLOR = '#E6E9FF';
    var TAB = 9;
    var SHIFT = 16;
    var ARROW_DOWN = 40;
    var ARROW_UP = 38;
    var ESC = 27;

    var KeyboardFix = function () {
        var previouslySelectedIndex = undefined;
        var currentIndex = 0;

        var selectSearchResultIndex = function () {
            var searchResults = $('.rc');
            if (previouslySelectedIndex != undefined) {
                searchResults.eq(previouslySelectedIndex).css('background-color', "#fff");
            }
            var selectedSearchResult = searchResults.eq(currentIndex);
            selectedSearchResult.css('background-color', HIGHLIGHT_COLOR);
            selectedSearchResult.find('a').eq(0).focus();
            previouslySelectedIndex = currentIndex;
        };

        return {
            selectIndex: function(index) {
                previouslySelectedIndex = undefined;
                currentIndex = index;
                selectSearchResultIndex();
            },

            nextResult: function () {
                ++currentIndex;
                selectSearchResultIndex();

            },

            prevResult: function () {
                --currentIndex;
                selectSearchResultIndex();
            },

            focusSearchBar: function() {
                $('input[name="q"]').focus();
            }


        }
    };

    var keyboardFix = KeyboardFix();


    var shiftTriggered = false;
    $(document.body).keydown(function (event) {
        switch(event.keyCode) {
            case SHIFT: shiftTriggered = true; break;
            case TAB: shiftTriggered? keyboardFix.prevResult(): keyboardFix.nextResult(); event.preventDefault(); break;
            case ARROW_DOWN: keyboardFix.nextResult(); event.preventDefault(); break;
            case ARROW_UP: keyboardFix.prevResult(); event.preventDefault(); break;
            case ESC: keyboardFix.focusSearchBar(); event.preventDefault(); break;
        }
    });


    $(document.body).keyup(function (event) {
        if (event.keyCode == SHIFT) {
            shiftTriggered = false;
        }
    });

    $(document).ready(function () {
        keyboardFix.selectIndex(0);
    });
})();