# MultiFacetNavigation
Magento 2 module to add facet navigation with multi-facet selection on mobile.

## Installation

**Manual Installation**

Copy the contents of this repo to the `app/code/Space48/MultiFacetNavigation` folder of your Magento 2 project, and run php `bin/magento setup:upgrade [--keep-generated]`.

**Composer Installation**:

Execute the following in your project root:

`composer config repositories.space48-multi-facet-navigation vcs git@github.com:Space48/MultiFacetNavigation.git`

then

`composer require "space48/multifacetnavigation:{release-version}"`

## Usage

After installation, a product listing page should have a 'done' button at the bottom and multiple facet options can be selected before pressing this button to apply.

## Notes

This functionality will only affect mobile (below 768px screen width by default). The media query that will be used to determine mobile view can be modified in `view/frontend/templates/layer/filter-footer.phtml`.

A very basic stylesheet is included to provide mock functionality. It is expected that this stylesheet will be removed in the theme and theme-specific styling added via the theme's particular CSS prepocessor (e.g. as a SASS partial).
