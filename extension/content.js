(function() {
    var HIGHLIGHT_COLOR = '#E6E9FF';
    var TAB_KEY_CODE = 9;
    var SHIFT_KEY_CODE = 16;

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
            }
        }
    };

    var keyboardFix = KeyboardFix();


    var shiftTriggered = false;
    $(document.body).keydown(function (event) {
        if (event.keyCode == SHIFT_KEY_CODE) {
            shiftTriggered = true;
        }

        if (event.keyCode == TAB_KEY_CODE) {
            event.preventDefault();

            shiftTriggered? keyboardFix.prevResult(): keyboardFix.nextResult();
        }
    });


    $(document.body).keyup(function (event) {
        if (event.keyCode == SHIFT_KEY_CODE) {
            shiftTriggered = false;
        }
    });

    $(document).ready(function () {
        keyboardFix.selectIndex(0);
    });
})();