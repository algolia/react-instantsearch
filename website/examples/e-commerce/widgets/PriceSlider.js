import React, { useState } from 'react';
import { connectRange } from 'react-instantsearch-dom';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';

function Handle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}) {
  return (
    <>
      {/* Dummy component to make the tooltip draggable */}
      <div
        style={{
          position: 'absolute',
          left: `${percent}%`,
          width: 40,
          height: 25,
          transform: 'translate(-50%, -100%)',
          cursor: disabled ? 'not-allowed' : 'grab',
          zIndex: 1,
        }}
        aria-hidden={true}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          backgroundImage: 'linear-gradient(to top, #f5f5fa, #fff)',
          borderRadius: '50%',
          cursor: disabled ? 'not-allowed' : 'grab',
          height: 16,
          outline: 'none',
          width: 16,
          boxShadow:
            '0 4px 11px 0 rgba(37, 44, 97, 0.15), 0 2px 3px 0 rgba(93, 100, 148, 0.2)',
          zIndex: 2,
        }}
        {...getHandleProps(id)}
      />
    </>
  );
}

const PriceSlider = ({ min, max, refine, currentRefinement, canRefine }) => {
  if (!canRefine) {
    return null;
  }

  const domain = [min, max];
  const [draggedValues, setDraggedValues] = useState([
    currentRefinement.min,
    currentRefinement.max,
  ]);
  const [tickValues, setTickValues] = useState([
    currentRefinement.min,
    currentRefinement.max,
  ]);

  const onSlideEnd = values => {
    setDraggedValues(values);
  };

  const onChange = values => {
    refine({ min: values[0], max: values[1] });
  };

  const onUpdate = values => {
    setTickValues(values);
  };

  return (
    <Slider
      mode={2}
      step={1}
      domain={domain}
      values={draggedValues}
      disabled={!canRefine}
      onSlideEnd={onSlideEnd}
      onChange={onChange}
      onUpdate={onUpdate}
      rootStyle={{ position: 'relative', marginTop: '1.5rem' }}
    >
      <Rail>
        {({ getRailProps }) => (
          <div
            style={{
              position: 'absolute',
              cursor: 'pointer',
              height: 3,
              borderRadius: 3,
              width: '100%',
              backgroundColor: 'rgba(65, 66, 71, 0.08)',
            }}
            {...getRailProps()}
          />
        )}
      </Rail>

      <Tracks left={false} right={false}>
        {({ tracks, getTrackProps }) => (
          <div>
            {tracks.map(({ id, source, target }) => (
              <div
                key={id}
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  height: 3,
                  borderRadius: 3,
                  backgroundColor: '#e2a400',
                  left: `${source.percent}%`,
                  width: `${target.percent - source.percent}%`,
                }}
                {...getTrackProps()}
              />
            ))}
          </div>
        )}
      </Tracks>

      <Handles>
        {({ handles, getHandleProps }) => (
          <div>
            {handles.map(handle => (
              <Handle
                key={handle.id}
                handle={handle}
                domain={domain}
                getHandleProps={getHandleProps}
              />
            ))}
          </div>
        )}
      </Handles>

      <Ticks values={tickValues}>
        {({ ticks }) => (
          <div>
            {ticks.map(({ id, count, value, percent }) => (
              <div
                key={id}
                style={{
                  position: 'absolute',
                  display: 'flex',
                  cursor: 'grab',
                  userSelect: 'none',
                  top: -28,
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  textAlign: 'center',
                  transform: 'translateX(-50%)',
                  marginLeft: `${-(100 / count) / 2}%`,
                  width: `${100 / count}%`,
                  left: `${percent}%`,
                }}
              >
                <span style={{ color: '#e2a400', marginRight: 4 }}>$</span>{' '}
                {value}
              </div>
            ))}
          </div>
        )}
      </Ticks>
    </Slider>
  );
};

export default connectRange(PriceSlider);
