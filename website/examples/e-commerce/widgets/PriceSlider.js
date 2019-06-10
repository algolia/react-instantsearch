import React, { useState } from 'react';
import { Range, createSliderWithTooltip } from 'rc-slider';
import { connectRange } from 'react-instantsearch-dom';

const RangeWithTooltip = createSliderWithTooltip(Range);

const PriceSlider = ({ min, max, refine, currentRefinement, canRefine }) => {
  if (min === undefined || max === undefined) {
    return null;
  }

  const [draggedMin, setDraggedMin] = useState(currentRefinement.min);
  const [draggedMax, setDraggedMax] = useState(currentRefinement.max);

  const onChange = values => {
    const [refinedMin, refinedMax] = values;

    setDraggedMin(refinedMin);
    setDraggedMax(refinedMax);
  };

  const onAfterChange = values => {
    const [refinedMin, refinedMax] = values;

    refine({ min: refinedMin, max: refinedMax });
  };

  return (
    <RangeWithTooltip
      min={min}
      max={max}
      value={[draggedMin, draggedMax]}
      disabled={!canRefine}
      tipProps={{ visible: true }}
      tipFormatter={value => (
        <div>
          <span className="rc-slider-tooltip-before">$</span>
          {value}
        </div>
      )}
      onChange={onChange}
      onAfterChange={onAfterChange}
    />
  );
};

export default connectRange(PriceSlider);
