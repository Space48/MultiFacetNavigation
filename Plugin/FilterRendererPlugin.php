<?php
/**
 * FilterRenderer
 *
 * @copyright Copyright © 2017 Space48. All rights reserved.
 * @author    raul@space48.com
 */

namespace Space48\MultiFacetNavigation\Plugin;

use Magento\Catalog\Model\Layer\Filter\AbstractFilter;
use Magento\LayeredNavigation\Block\Navigation\FilterRenderer;

class FilterRendererPlugin
{

    /**
     * @param FilterRenderer $filterRenderer
     * @param AbstractFilter $filter
     */
    public function beforeRender(FilterRenderer $filterRenderer, AbstractFilter $filter)
    {
        $filterRenderer->assign('facetName', $filter->getRequestVar());
    }
}
