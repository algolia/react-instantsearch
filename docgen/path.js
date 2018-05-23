import { join } from 'path';

export const rootPath = (...args) => join(__dirname, '..', ...args);

export const reactPackage = (...args) =>
  rootPath('packages/react-instantsearch/', ...args);

export const corePackage = (...args) =>
  rootPath('packages/react-instantsearch-core/', ...args);
