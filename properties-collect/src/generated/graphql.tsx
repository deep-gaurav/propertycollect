import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type NoBroker = {
  __typename?: 'NoBroker';
  place: NoBrokerPlaceDetail;
  searchCity: NoBrokerPredictions;
};


export type NoBrokerPlaceArgs = {
  placeId: Scalars['String'];
};


export type NoBrokerSearchCityArgs = {
  city: Scalars['String'];
  query: Scalars['String'];
};

export type NoBrokerGeometry = {
  __typename?: 'NoBrokerGeometry';
  location: NoBrokerLocation;
};

export type NoBrokerLocation = {
  __typename?: 'NoBrokerLocation';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type NoBrokerPlaceDetail = {
  __typename?: 'NoBrokerPlaceDetail';
  formattedAddress: Scalars['String'];
  geometry: NoBrokerGeometry;
  name: Scalars['String'];
  placeId: Scalars['String'];
  properties: Array<NoBrokerProperty>;
  reference: Scalars['String'];
};


export type NoBrokerPlaceDetailPropertiesArgs = {
  pageNo: Scalars['Int'];
};

export type NoBrokerPrediction = {
  __typename?: 'NoBrokerPrediction';
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  placeId: Scalars['String'];
};

export type NoBrokerPredictions = {
  __typename?: 'NoBrokerPredictions';
  predictions: Array<NoBrokerPrediction>;
};

export type NoBrokerProperty = {
  __typename?: 'NoBrokerProperty';
  balconies: Scalars['Int'];
  deposit: Scalars['Int'];
  latitude: Scalars['Float'];
  location: Scalars['String'];
  longitude: Scalars['Float'];
  negotiable: Scalars['Boolean'];
  propertySize: Scalars['String'];
  rent: Scalars['Int'];
  shortUrl: Scalars['String'];
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  nobroker: NoBroker;
};

export type PredictionFragment = { __typename?: 'NoBrokerPrediction', name: string, placeId: string, description: string, id: string };

export type PropertyFragment = { __typename?: 'NoBrokerProperty', rent: number, type: string, deposit: number, balconies: number, negotiable: boolean, location: string, latitude: number, longitude: number, shortUrl: string };

export type PlaceFragment = { __typename?: 'NoBrokerPlaceDetail', placeId: string, properties: Array<{ __typename?: 'NoBrokerProperty', rent: number, type: string, deposit: number, balconies: number, negotiable: boolean, location: string, latitude: number, longitude: number, shortUrl: string }> };

export type SearchQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchQuery = { __typename?: 'Query', nobroker: { __typename?: 'NoBroker', searchCity: { __typename?: 'NoBrokerPredictions', predictions: Array<{ __typename?: 'NoBrokerPrediction', name: string, placeId: string, description: string, id: string }> } } };

export type PropertiesQueryVariables = Exact<{
  placeId: Scalars['String'];
  pageNo: Scalars['Int'];
}>;


export type PropertiesQuery = { __typename?: 'Query', nobroker: { __typename?: 'NoBroker', place: { __typename?: 'NoBrokerPlaceDetail', placeId: string, properties: Array<{ __typename?: 'NoBrokerProperty', rent: number, type: string, deposit: number, balconies: number, negotiable: boolean, location: string, latitude: number, longitude: number, shortUrl: string }> } } };

export const PredictionFragmentDoc = gql`
    fragment prediction on NoBrokerPrediction {
  name
  placeId
  description
  id
}
    `;
export const PropertyFragmentDoc = gql`
    fragment property on NoBrokerProperty {
  rent
  type
  deposit
  balconies
  negotiable
  location
  latitude
  longitude
  shortUrl
}
    `;
export const PlaceFragmentDoc = gql`
    fragment place on NoBrokerPlaceDetail {
  placeId
  properties(pageNo: $pageNo) {
    ...property
  }
}
    ${PropertyFragmentDoc}`;
export const SearchDocument = gql`
    query search($query: String!) {
  nobroker {
    searchCity(query: $query, city: "bangalore") {
      predictions {
        ...prediction
      }
    }
  }
}
    ${PredictionFragmentDoc}`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const PropertiesDocument = gql`
    query properties($placeId: String!, $pageNo: Int!) {
  nobroker {
    place(placeId: $placeId) {
      ...place
    }
  }
}
    ${PlaceFragmentDoc}`;

/**
 * __usePropertiesQuery__
 *
 * To run a query within a React component, call `usePropertiesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePropertiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePropertiesQuery({
 *   variables: {
 *      placeId: // value for 'placeId'
 *      pageNo: // value for 'pageNo'
 *   },
 * });
 */
export function usePropertiesQuery(baseOptions: Apollo.QueryHookOptions<PropertiesQuery, PropertiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PropertiesQuery, PropertiesQueryVariables>(PropertiesDocument, options);
      }
export function usePropertiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PropertiesQuery, PropertiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PropertiesQuery, PropertiesQueryVariables>(PropertiesDocument, options);
        }
export type PropertiesQueryHookResult = ReturnType<typeof usePropertiesQuery>;
export type PropertiesLazyQueryHookResult = ReturnType<typeof usePropertiesLazyQuery>;
export type PropertiesQueryResult = Apollo.QueryResult<PropertiesQuery, PropertiesQueryVariables>;