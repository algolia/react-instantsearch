export * from './translatable';

// @TODO: this should somehow be related to ConnectorDescription
export interface Widget {
  getMetadata?(...args: any[]): any;
  getSearchParameters?(...args: any[]): any;
  transitionState?(...args: any[]): any;
  props: any;
}
