import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import {
  Configure,
  ExperimentalConfigureRelatedItems,
  Hits,
  Index,
  connectPagination,
} from 'react-instantsearch-dom';
import { WrapWithHits } from './util';

type Hit = any;

const stories = storiesOf('ConfigureRelatedItems', module);

const baseHit = {
  sport_en: 'ROAD CYCLING',
  sport_pratice_en: 'ROAD CYCLING',
  nature_id_en: 'Road bike',
  gender_id_en: 'ADULT',
  business_color: '#FFFFFE',
  category_id: ['2', '1001', '1320', '1320', '6105', '10504', '10505'],
  image_link_small_en:
    'http://media.decathlon.sg/1665586-home_default/triban-520-road-bike-black-white.jpg',
  link_en: '/p/8389938-triban-520-road-bike-black-white.html',
  manufacturer_en: "B'Twin",
  name_en: 'Road Bike Triban 520 (Black/White)',
  price: 550.000001,
  reference: '8389938',
  item_codes: '2241007,2241008,2241009,2241010',
  price_nodiscount: 650.000001,
  clearance: 'Clearance',
  variations: [
    {
      id_code_model: '8389938',
      id_code_article: '2241007',
      stock: 6,
      size: 'XS',
    },
    {
      id_code_model: '8389938',
      id_code_article: '2241008',
      stock: 3,
      size: 'S',
    },
    {
      id_code_model: '8389938',
      id_code_article: '2241009',
      stock: 11,
      size: 'M',
    },
    {
      id_code_model: '8389938',
      id_code_article: '2241010',
      stock: 8,
      size: 'L',
    },
  ],
  objectID: '8389938',
};

stories.add('with optionalFilters', () => (
  <ConfigureRelatedItemsExample
    relatedItemsConfig={{
      hit: baseHit,
      matchingPatterns: {
        sport_en: { score: 2 },
        nature_id_en: { score: 1 },
        gender_id_en: { score: 3 },
      },
    }}
  />
));
stories.add('with personalization', () => (
  <ConfigureRelatedItemsExample
    relatedItemsConfig={{
      hit: baseHit,
      matchingPatterns: {},
      transformSearchParameters: searchParameters => {
        return {
          ...searchParameters,
          enablePersonalization: true,
          userToken: 'anonymous-4c418333-3964-4f7d-ae27-02ea7729c439',
        };
      },
    }}
  />
));
stories.add('with optionaFilters and personalization', () => (
  <ConfigureRelatedItemsExample
    relatedItemsConfig={{
      hit: baseHit,
      matchingPatterns: {
        sport_en: { score: 2 },
        nature_id_en: { score: 1 },
        gender_id_en: { score: 3 },
      },
      transformSearchParameters: searchParameters => {
        return {
          ...searchParameters,
          enablePersonalization: true,
          userToken: 'anonymous-4c418333-3964-4f7d-ae27-02ea7729c439',
        };
      },
    }}
  />
));

function RelatedHit({ hit }: { hit: Hit }) {
  return (
    <div>
      <div className="ais-RelatedHits-item-image">
        <img src={hit.image_link_small_en} alt={hit.name_en} />
      </div>

      <div className="ais-RelatedHits-item-title">
        <h4>{hit.name_en}</h4>
      </div>
    </div>
  );
}

const PreviousPagination = connectPagination(
  ({ currentRefinement, refine }) => {
    return (
      <button
        className="ais-RelatedHits-button"
        disabled={currentRefinement === 1}
        onClick={() => {
          refine(currentRefinement - 1);
        }}
      >
        ←
      </button>
    );
  }
);

const NextPagination = connectPagination(
  ({ currentRefinement, refine, nbPages }) => {
    return (
      <button
        className="ais-RelatedHits-button"
        disabled={currentRefinement + 1 === nbPages}
        onClick={() => {
          refine(currentRefinement + 1);
        }}
      >
        →
      </button>
    );
  }
);

function ConfigureRelatedItemsExample({ relatedItemsConfig }) {
  const [referenceHit, setReferenceHit] = useState<Hit | null>(null);

  const ReferenceHit = React.memo<{ hit: Hit }>(
    ({ hit }) => {
      return (
        <div ref={() => setReferenceHit(hit)}>
          <img src={hit.image_link_small_en} alt={hit.name_en} />
          <h3>{hit.name_en}</h3>
        </div>
      );
    },
    (prevProps, nextProps) => {
      return prevProps.hit.objectID === nextProps.hit.objectID;
    }
  );

  return (
    <WrapWithHits
      linkedStoryGroup="ConfigureRelatedItems"
      indexName="prod_singapore"
      appId="LR431A4C5G"
      apiKey="41fed36d8b52d65a9b9e7475a267319a"
    >
      <Index indexName="prod_singapore" indexId="mainIndex">
        <Configure hitsPerPage={1} />

        <Hits hitComponent={ReferenceHit} />
      </Index>

      {referenceHit && (
        <Index indexName="prod_singapore" indexId="relatedIndex">
          <Configure hitsPerPage={4} />
          <ExperimentalConfigureRelatedItems {...relatedItemsConfig} />

          <h2>Related items</h2>

          <div className="related-items">
            <PreviousPagination />
            <Hits hitComponent={RelatedHit} />
            <NextPagination />
          </div>
        </Index>
      )}
    </WrapWithHits>
  );
}
