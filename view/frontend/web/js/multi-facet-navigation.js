define(['jquery', 'matchMedia'], function ($, matchMedia) {

    'use strict';

    var self = {
        initialize: function (config, node) {
            self.config = config;
            self.$el = $(node);

            self.constructInitialParams();

            self.captureFacetLinks();
            self.bindDoneButtonAction();
        },

        constructInitialParams: function () {
            var splitUrl = window.location.href.split('?');
            self.pageUrl = splitUrl[0];
            self.currentSelection = splitUrl[1] ? self.explodeParams(splitUrl[1]) : {};

            console.log(self.currentSelection);
        },

        explodeParams: function (str) {
            return str.split('&').reduce(function (params, param) {
                var paramSplit = param.split('=').map(function (value) {
                    return decodeURIComponent(value.replace('+', ' '));
                });
                params[paramSplit[0]] = paramSplit[1];
                return params;
            }, {});
        },

        isMobile: function () {
            return window.matchMedia(self.config.isMobileMediaQuery).matches;
        },

        captureFacetLinks: function () {
            self.$(self.config.linkSelector).on('click', function (evt) {
                var $this = $(this);
                var facetName = $this.data('facet-name');
                var facetValue = $this.data('facet-value');

                if (self.isMobile()) {
                    evt.preventDefault();

                    if (self.currentSelection[facetName]) {
                        $this.removeClass('is-selected');
                        delete self.currentSelection[facetName];
                    } else {
                        $this.addClass('is-selected');
                        self.currentSelection[facetName] = facetValue;
                    }
                }
            });
        },

        bindDoneButtonAction: function () {
            $('.js-facets-done').on('click', self.constructPageUrl);
        },

        constructPageUrl: function () {
            console.log(self.pageUrl + $.param(self.currentSelection));
        },

        $: function (selector) {
            return $(selector, self.$el);
        }
    };

    return self.initialize;
});