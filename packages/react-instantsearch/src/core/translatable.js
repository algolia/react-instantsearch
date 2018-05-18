import React from 'react';
import { has } from 'lodash';
import { withKeysPropType } from './propTypes';

export default function translatable(defaultTranslations) {
  return Composed => {
    function Translatable(props) {
      const { translations, ...otherProps } = props;
      const translate = (key, ...params) => {
        const translation =
          translations && has(translations, key)
            ? translations[key]
            : defaultTranslations[key];
        if (typeof translation === 'function') {
          return translation(...params);
        }
        return translation;
      };

      return <Composed translate={translate} {...otherProps} />;
    }

    const name = Composed.displayName || Composed.name || 'UnknownComponent';

    Translatable.displayName = `Translatable(${name})`;

    Translatable.propTypes = {
      translations: withKeysPropType(Object.keys(defaultTranslations)),
    };

    return Translatable;
  };
}
