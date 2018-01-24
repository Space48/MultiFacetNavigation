define(['jquery', 'uiComponent', 'underscore', 'matchMedia', 'domReady!'], function ($, Component, _, matchMedia) {

    'use strict';

    var self;

    return Component.extend({
        initialize: function (config, node) {
            self = this;
            self.config = config;
            self.$el = $(node);

            self.currentSelection = {};

            self.constructInitialParams();

            self.captureFacetLinkClicks();
            self.bindDoneButtonAction();
        },

        constructInitialParams: function () {
            var splitUrl = window.location.href.split('?');
            var explodedParams;
            self.pageUrl = splitUrl[0];

            if (splitUrl[1]) {
                explodedParams = self.explodeParams(splitUrl[1]);
                delete explodedParams.p; /* Do not include 'page' parameter in initial params */
                self.initialSelection = explodedParams;
            } else {
                self.initialSelection = {};
            }
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

        captureFacetLinkClicks: function () {
            self.$(self.config.linkSelector).on('click', function (evt) {
                var $this = $(this);
                var facetName = $this.data('facet-name');
                var facetValue = $this.data('facet-value');

                if (self.isMobile()) {
                    evt.preventDefault();

                    if (self.currentSelection[facetName] && self.currentSelection[facetName] !== facetValue) {
                        /* Facet has value but it isn't this. Facet is disabled, do nothing */
                        return;
                    } else if (self.currentSelection[facetName] === facetValue) {
                        /* This facet/value pair is selected. Unselect it */
                        $this.removeClass('is-selected');
                        delete self.currentSelection[facetName];
                    } else {
                        /* This facet can be selected. Do it */
                        $this.addClass('is-selected');
                        self.currentSelection[facetName] = facetValue;
                    }

                    self.refreshDisabledStates();
                }
            });
        },

        refreshDisabledStates: function () {
            /*  Add disabled classes */
            $(self.config.linkSelector).each(function () {
                var $this = $(this);
                var facetName = $this.data('facet-name');
                var facetValue = $this.data('facet-value');

                if (self.currentSelection.hasOwnProperty(facetName) && self.currentSelection[facetName] !== facetValue) {
                    /*  If current selection has a value which isn't this */
                    $this.addClass('is-disabled');
                } else {
                    $this.removeClass('is-disabled');
                }
            });
        },

        bindDoneButtonAction: function () {
            $('.js-facets-done').on('click', self.buildUrl);
        },

        buildUrl: function () {
            var mergedSelection = _.extend(self.initialSelection, self.currentSelection);
            var param = '?' + $.param(mergedSelection);

            if (_.isEmpty(self.currentSelection)) {
                if (self.config.closeNavigationSelector) {
                    $(self.config.closeNavigationSelector).trigger('click');
                }
                return;
            }

            window.location.href = self.pageUrl + param;
        },

        $: function (selector) {
            return $(selector, self.$el);
        }
    });
});
