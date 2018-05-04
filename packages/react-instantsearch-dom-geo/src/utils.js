export const registerEvents = (events, props, instance) => {
  const eventsAvailable = Object.keys(events);
  const listeners = Object.keys(props)
    .filter(key => eventsAvailable.indexOf(key) !== -1)
    .map(name => instance.addListener(events[name], props[name]));

  return () => {
    listeners.forEach(listener => listener.remove());
  };
};
