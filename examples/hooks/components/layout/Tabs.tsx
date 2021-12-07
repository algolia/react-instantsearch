import React, { useState } from 'react';
import { cx } from '../../cx';

import './Tabs.css';

export type TabProps = {
  children: React.ReactNode;
  title: string;
};

const getTabKey = (index: number, suffix?: string) =>
  [`tab-${index}`, suffix].filter(Boolean).join('-');

export function Tabs({ children }) {
  const [currentTab, setCurrentTab] = useState(0);
  const tabsRefs: HTMLElement[] = [];

  const onKeyPress = (event: React.KeyboardEvent) => {
    let tabIndex;
    switch (event.key) {
      case 'ArrowLeft':
        tabIndex = Math.max(0, currentTab - 1);
        break;
      case 'ArrowRight':
        tabIndex = Math.min(currentTab + 1, React.Children.count(children) - 1);
        break;
      default:
        return;
    }

    tabsRefs[tabIndex].focus();
    setCurrentTab(tabIndex);
  };

  return (
    <div className="Tabs">
      <div role="tablist" className="Tabs-header">
        {React.Children.map<React.ReactChild, React.ReactElement<TabProps>>(
          children,
          (child, index) => (
            <button
              role="tab"
              aria-selected={currentTab === index}
              aria-controls={getTabKey(index, 'item')}
              id={getTabKey(index, 'title')}
              tabIndex={currentTab !== index ? -1 : 0}
              className={cx(
                'Tabs-title',
                currentTab === index && 'Tabs-title--active'
              )}
              ref={(element) => (tabsRefs[index] = element!)}
              key={getTabKey(index)}
              onClick={() => setCurrentTab(index)}
              onKeyDown={(event) => onKeyPress(event)}
            >
              {child.props.title}
            </button>
          )
        )}
      </div>
      <div className="Tabs-list">
        {React.Children.map(children, (child, index) => (
          <div
            tabIndex={0}
            role="tabpanel"
            id={getTabKey(index, 'item')}
            aria-labelledby={getTabKey(index, 'title')}
            hidden={currentTab !== index}
            key={getTabKey(index)}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Tab({ children }: TabProps) {
  return <div>{children}</div>;
}
