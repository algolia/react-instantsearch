import React from 'react';
import { storiesOf } from '@storybook/react';
import { QueryRuleCustomData, Panel } from 'react-instantsearch-dom';
import { WrapWithHits } from './util';

type CustomDataItem = {
  title: string;
  banner: string;
  link: string;
};

const stories = storiesOf('QueryRuleCustomData', module);

const storyProps = {
  appId: 'latency',
  apiKey: 'af044fb0788d6bb15f807e4420592bc5',
  indexName: 'instant_search_movies',
  linkedStoryGroup: 'QueryRuleCustomData',
};

stories
  .add('default', () => (
    <WrapWithHits {...storyProps}>
      <p>
        Type <q>music</q> and a banner will appear.
      </p>

      <QueryRuleCustomData>
        {({ items }: { items: CustomDataItem[] }) =>
          items.map(({ banner, title, link }) => {
            if (!banner) {
              return null;
            }

            return (
              <section key={title}>
                <h2>{title}</h2>

                <a href={link}>
                  <img src={banner} alt={title} />
                </a>
              </section>
            );
          })
        }
      </QueryRuleCustomData>
    </WrapWithHits>
  ))
  .add('with default banner', () => (
    <WrapWithHits {...storyProps}>
      <p>
        Kill Bill appears whenever no other results are promoted. Type{' '}
        <q>music</q> to see another movie promoted.
      </p>

      <QueryRuleCustomData
        transformItems={(items: CustomDataItem[]) => {
          if (items.length > 0) {
            return items;
          }

          return [
            {
              title: 'Kill Bill',
              banner: 'http://static.bobatv.net/IMovie/mv_2352/poster_2352.jpg',
              link: 'https://www.netflix.com/title/60031236',
            },
          ];
        }}
      >
        {({ items }: { items: CustomDataItem[] }) =>
          items.map(({ banner, title, link }) => {
            if (!banner) {
              return null;
            }

            return (
              <section key={title}>
                <h2>{title}</h2>

                <a href={link}>
                  <img src={banner} alt={title} />
                </a>
              </section>
            );
          })
        }
      </QueryRuleCustomData>
    </WrapWithHits>
  ))
  .add('with Panel', () => (
    <WrapWithHits {...storyProps}>
      <p>
        Type <q>music</q> and a banner will appear.
      </p>

      <Panel header="QueryRuleCustomData" footer="footer">
        <QueryRuleCustomData>
          {({ items }: { items: CustomDataItem[] }) =>
            items.map(({ banner, title, link }) => {
              if (!banner) {
                return null;
              }

              return (
                <section key={title}>
                  <h2>{title}</h2>

                  <a href={link}>
                    <img src={banner} alt={title} />
                  </a>
                </section>
              );
            })
          }
        </QueryRuleCustomData>
      </Panel>
    </WrapWithHits>
  ));
