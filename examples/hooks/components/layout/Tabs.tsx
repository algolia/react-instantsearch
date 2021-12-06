import React, { useState } from 'react';
import { cx } from '../../cx';

import './Tabs.css';

export type TabProps = {
  children: React.ReactNode;
  title: string;
};

export function Tabs({ children }) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="Tabs">
      <ul className="Tabs-header">
        {React.Children.map<React.ReactChild, React.ReactElement<TabProps>>(
          children,
          (child, index) => (
            <li
              className={cx(
                'Tabs-title',
                currentTab === index && 'Tabs-title--active'
              )}
              key={index}
              onClick={() => setCurrentTab(index)}
            >
              {child.props.title}
            </li>
          )
        )}
      </ul>
      <ul className="Tabs-list">
        {React.Children.map(children, (child, index) => (
          <li
            className={cx(
              'Tabs-item',
              currentTab === index && 'Tabs-item--active'
            )}
            key={index}
          >
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Tab({ children }: TabProps) {
  return <div>{children}</div>;
}
