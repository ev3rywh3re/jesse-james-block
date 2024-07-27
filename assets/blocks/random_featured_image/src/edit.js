import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit(props) {
  const blockProps = useBlockProps();
  const [category, setCategory] = useState(props.attributes.category || '');

  const getCategoriesForDropdown = () => {
    // Fetch categories from WordPress API
    // ... (Implementation for fetching categories)
  };

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Category', 'random-featured-image-block')}>
          <SelectControl
            label={__('Category', 'random-featured-image-block')}
            value={category}
            onChange={(value) => {
              setCategory(value);
              props.setAttributes({ category: value });
            }}
            options={getCategoriesForDropdown()}
          />
        </PanelBody>
      </InspectorControls>
      {/* ... (Rest of your block editor content) */}
    </div>
  );
}
