import React from 'react';
import PropTypes from 'prop-types';
import Index from '../components/Index';

/**
 * Creates a specialized root Index component. It accepts
 * a specification of the root Element.
 * @param {object} defaultRoot - the defininition of the root of an Index sub tree.
 * @return {object} a Index root
 */
const createIndex = defaultRoot => {
  let hasAlreadyWarn = false;
  const CreateIndex = ({ indexName, indexId, root, children }) => {
    if (process.env.NODE_ENV !== 'production' && !hasAlreadyWarn && !indexId) {
      hasAlreadyWarn = true;
      // eslint-disable-next-line no-console
      console.warn(
        '[React InstantSearch]: `indexId` is required for the `Index` component. Please use this prop before the next major version.'
      );
    }

    return (
      <Index indexName={indexName} indexId={indexId || indexName} root={root}>
        {children}
      </Index>
    );
  };

  CreateIndex.propTypes = {
    indexName: PropTypes.string.isRequired,
    // @MAJOR: indexId must be required
    indexId: PropTypes.string,
    root: PropTypes.shape({
      Root: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]).isRequired,
      props: PropTypes.object,
    }),
    children: PropTypes.node,
  };

  CreateIndex.defaultProps = {
    root: defaultRoot,
  };

  return CreateIndex;
};

export default createIndex;
