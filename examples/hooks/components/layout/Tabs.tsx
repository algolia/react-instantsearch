import React, { useState } from 'react';
import { cx } from '../../cx';

import './Tabs.css';

export type TabProps = {
  title: string;
};

export const Tabs = ({ children }) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="ais-Tabs">
      <ul className="ais-Tabs-header">
        {React.Children.map<React.ReactChild, React.ReactElement<TabProps>>(
          children,
          (child, index) => (
            <li
              className={cx(
                'ais-Tabs-title',
                currentTab === index && 'ais-Tabs-title--active'
              )}
              key={index}
              onClick={() => setCurrentTab(index)}
            >
              {child.props.title}
            </li>
          )
        )}
      </ul>
      <ul className="ais-Tabs-list">
        {React.Children.map(children, (child, index) => (
          <li
            className={cx(
              'ais-Tabs-item',
              currentTab === index && 'ais-Tabs-item--active'
            )}
            key={index}
          >
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div>{children}</div>;
};
