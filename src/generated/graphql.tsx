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
  properties: NoBrokerPropertiesResult;
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

export type NoBrokerPropertiesResult = {
  __typename?: 'NoBrokerPropertiesResult';
  data: Array<NoBrokerProperty>;
  otherParams: NoBrokerPropertyOtherParams;
  status: Scalars['String'];
};

export type NoBrokerProperty = {
  __typename?: 'NoBrokerProperty';
  balconies?: Maybe<Scalars['Int']>;
  deposit?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  latitude?: Maybe<Scalars['Float']>;
  leaseType?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['Float']>;
  negotiable?: Maybe<Scalars['Boolean']>;
  parking?: Maybe<Scalars['String']>;
  photoAvailable?: Maybe<Scalars['Boolean']>;
  propertySize?: Maybe<Scalars['Int']>;
  propertyTitle?: Maybe<Scalars['String']>;
  rent?: Maybe<Scalars['Int']>;
  shortUrl?: Maybe<Scalars['String']>;
  thumbnailImage?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  waterSupply?: Maybe<Scalars['String']>;
};

export type NoBrokerPropertyOtherParams = {
  __typename?: 'NoBrokerPropertyOtherParams';
  count: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  nobroker: NoBroker;
};

export type PredictionFragment = { __typename?: 'NoBrokerPrediction', name: string, placeId: string, description: string, id: string };

export type PropertyFragment = { __typename?: 'NoBrokerProperty', id: string, rent?: number | null | undefined, type?: string | null | undefined, deposit?: number | null | undefined, balconies?: number | null | undefined, negotiable?: boolean | null | undefined, location?: string | null | undefined, latitude?: number | null | undefined, longitude?: number | null | undefined, shortUrl?: string | null | undefined, thumbnailImage?: string | null | undefined, propertyTitle?: string | null | undefined, photoAvailable?: boolean | null | undefined, leaseType?: string | null | undefined, parking?: string | null | undefined };

export type PlaceFragment = { __typename?: 'NoBrokerPlaceDetail', placeId: string, name: string, reference: string, formattedAddress: string, geometry: { __typename?: 'NoBrokerGeometry', location: { __typename?: 'NoBrokerLocation', lng: number, lat: number } }, properties: { __typename?: 'NoBrokerPropertiesResult', status: string, data: Array<{ __typename?: 'NoBrokerProperty', id: string, rent?: number | null | undefined, type?: string | null | undefined, deposit?: number | null | undefined, balconies?: number | null | undefined, negotiable?: boolean | null | undefined, location?: string | null | undefined, latitude?: number | null | undefined, longitude?: number | null | undefined, shortUrl?: string | null | undefined, thumbnailImage?: string | null | undefined, propertyTitle?: string | null | undefined, photoAvailable?: boolean | null | undefined, leaseType?: string | null | undefined, parking?: string | null | undefined }>, otherParams: { __typename?: 'NoBrokerPropertyOtherParams', totalCount: number, count: number } } };

export type SearchQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchQuery = { __typename?: 'Query', nobroker: { __typename?: 'NoBroker', searchCity: { __typename?: 'NoBrokerPredictions', predictions: Array<{ __typename?: 'NoBrokerPrediction', name: string, placeId: string, description: string, id: string }> } } };

export type PropertiesQueryVariables = Exact<{
  placeId: Scalars['String'];
  pageNo: Scalars['Int'];
}>;


export type PropertiesQuery = { __typename?: 'Query', nobroker: { __typename?: 'NoBroker', place: { __typename?: 'NoBrokerPlaceDetail', placeId: string, name: string, reference: string, formattedAddress: string, geometry: { __typename?: 'NoBrokerGeometry', location: { __typename?: 'NoBrokerLocation', lng: number, lat: number } }, properties: { __typename?: 'NoBrokerPropertiesResult', status: string, data: Array<{ __typename?: 'NoBrokerProperty', id: string, rent?: number | null | undefined, type?: string | null | undefined, deposit?: number | null | undefined, balconies?: number | null | undefined, negotiable?: boolean | null | undefined, location?: string | null | undefined, latitude?: number | null | undefined, longitude?: number | null | undefined, shortUrl?: string | null | undefined, thumbnailImage?: string | null | undefined, propertyTitle?: string | null | undefined, photoAvailable?: boolean | null | undefined, leaseType?: string | null | undefined, parking?: string | null | undefined }>, otherParams: { __typename?: 'NoBrokerPropertyOtherParams', totalCount: number, count: number } } } } };

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
  id
  rent
  type
  deposit
  balconies
  negotiable
  location
  latitude
  longitude
  shortUrl
  thumbnailImage
  propertyTitle
  photoAvailable
  leaseType
  parking
}
    `;
export const PlaceFragmentDoc = gql`
    fragment place on NoBrokerPlaceDetail {
  placeId
  geometry {
    location {
      lng
      lat
    }
  }
  name
  reference
  formattedAddress
  properties(pageNo: $pageNo) {
    status
    data {
      ...property
    }
    otherParams {
      totalCount
      count
    }
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