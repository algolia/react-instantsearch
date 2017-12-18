import classNames from './classNames';

describe('classNames', () => {
  it('correctly transforms class names', () => {
    const cx = classNames('Widget');
    const widgetClassNames = cx('', null, undefined, 'one', 'two').split(' ');

    expect(widgetClassNames).toHaveLength(3);
    expect(widgetClassNames[0]).toEqual('ais-Widget');
    expect(widgetClassNames[1]).toEqual('ais-Widget-one');
    expect(widgetClassNames[2]).toEqual('ais-Widget-two');
  });
});
