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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type AuditLog = {
  __typename?: 'AuditLog';
  userId: Scalars['String'];
  jobId: Scalars['String'];
  status: Scalars['Boolean'];
  createdOn: Scalars['Float'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CreateSiteUpCheckerJobInput = {
  url: Scalars['String'];
  cron: Scalars['String'];
  resetAfterDownCount: Scalars['Float'];
  sendMailOnFailure: Scalars['Boolean'];
};

export type CreateUserInput = {
  userName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  sendMailOnFailure: Scalars['Boolean'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  root?: Maybe<Scalars['String']>;
  createUser: User;
  logout: Scalars['String'];
  createSiteUpCheckerJob: SiteUpCheckerJob;
  updateSiteUpCheckerJob: SiteUpCheckerJob;
  pauseSiteUpCheckerJob: SiteUpCheckerJob;
  startSiteUpCheckerJob: SiteUpCheckerJob;
  removeSiteUpCheckerJob: Scalars['String'];
  checkMultipleSitesStatus: Array<SiteUpCheckerJob>;
  checkAllUserSitesStatus: Array<SiteUpCheckerJob>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateSiteUpCheckerJobArgs = {
  input: CreateSiteUpCheckerJobInput;
};


export type MutationUpdateSiteUpCheckerJobArgs = {
  input: UpdateSiteUpCheckerJobInput;
};


export type MutationPauseSiteUpCheckerJobArgs = {
  jobId: Scalars['String'];
};


export type MutationStartSiteUpCheckerJobArgs = {
  jobId: Scalars['String'];
};


export type MutationRemoveSiteUpCheckerJobArgs = {
  jobId: Scalars['String'];
};


export type MutationCheckMultipleSitesStatusArgs = {
  jobIds: Array<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  root?: Maybe<Scalars['String']>;
  user: User;
  login: User;
  getSiteUpCheckerJobById: SiteUpCheckerJob;
  getUserSiteUpCheckerJobs: Array<SiteUpCheckerJob>;
  getSiteAuditLogs: AuditLog;
  getSiteFailureAuditLogs: AuditLog;
};


export type QueryLoginArgs = {
  input: LoginUserInput;
};


export type QueryGetSiteUpCheckerJobByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetSiteAuditLogsArgs = {
  jobId: Scalars['String'];
};


export type QueryGetSiteFailureAuditLogsArgs = {
  jobId: Scalars['String'];
};

export type SiteUpCheckerJob = {
  __typename?: 'SiteUpCheckerJob';
  _id: Scalars['String'];
  userId: Scalars['String'];
  url: Scalars['String'];
  cron: Scalars['String'];
  status: Scalars['String'];
  resetAfterDownCount: Scalars['Float'];
  totalDownCounter: Scalars['Float'];
  downCounterBeforeReset: Scalars['Float'];
  lastCheckedOn?: Maybe<Scalars['Float']>;
  siteUpOnLastChecked?: Maybe<Scalars['Boolean']>;
  sendMailOnFailure?: Maybe<Scalars['Boolean']>;
  lastFailureOn?: Maybe<Scalars['Float']>;
  lastFailureEmailSentOn?: Maybe<Scalars['Float']>;
  createdOn: Scalars['Float'];
  lastUpdatedOn: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  root?: Maybe<Scalars['String']>;
  siteUpCheckerJobUpdated: SiteUpCheckerJob;
};


export type SubscriptionSiteUpCheckerJobUpdatedArgs = {
  userId: Scalars['String'];
};

export type UpdateSiteUpCheckerJobInput = {
  jobId: Scalars['String'];
  cron: Scalars['String'];
  resetAfterDownCount: Scalars['Float'];
  sendMailOnFailure: Scalars['Boolean'];
};


export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  userName: Scalars['String'];
  email: Scalars['String'];
  userType: Scalars['String'];
  sendMailOnFailure: Scalars['Boolean'];
};

export type SiteUpCheckerJobFragmentFragment = (
  { __typename?: 'SiteUpCheckerJob' }
  & Pick<SiteUpCheckerJob, '_id' | 'userId' | 'url' | 'cron' | 'status' | 'downCounterBeforeReset' | 'resetAfterDownCount' | 'totalDownCounter' | 'lastCheckedOn' | 'siteUpOnLastChecked' | 'lastFailureOn' | 'lastFailureEmailSentOn' | 'lastUpdatedOn' | 'createdOn' | 'sendMailOnFailure'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'userName' | 'email' | 'userType' | 'sendMailOnFailure'>
);

export type CheckAllUserSitesStatusMutationVariables = Exact<{ [key: string]: never; }>;


export type CheckAllUserSitesStatusMutation = (
  { __typename?: 'Mutation' }
  & { checkAllUserSitesStatus: Array<(
    { __typename?: 'SiteUpCheckerJob' }
    & SiteUpCheckerJobFragmentFragment
  )> }
);

export type CheckMultipleSitesStatusMutationVariables = Exact<{
  jobIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type CheckMultipleSitesStatusMutation = (
  { __typename?: 'Mutation' }
  & { checkMultipleSitesStatus: Array<(
    { __typename?: 'SiteUpCheckerJob' }
    & SiteUpCheckerJobFragmentFragment
  )> }
);

export type CreateSiteUpCheckerJobMutationVariables = Exact<{
  url: Scalars['String'];
  cron: Scalars['String'];
  resetAfterDownCount: Scalars['Float'];
  sendMailOnFailure: Scalars['Boolean'];
}>;


export type CreateSiteUpCheckerJobMutation = (
  { __typename?: 'Mutation' }
  & { createSiteUpCheckerJob: (
    { __typename?: 'SiteUpCheckerJob' }
    & SiteUpCheckerJobFragmentFragment
  ) }
);

export type CreateUserMutationVariables = Exact<{
  userName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  sendMailOnFailure: Scalars['Boolean'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & UserFragmentFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type PauseSiteUpCheckerJobMutationVariables = Exact<{
  jobId: Scalars['String'];
}>;


export type PauseSiteUpCheckerJobMutation = (
  { __typename?: 'Mutation' }
  & { pauseSiteUpCheckerJob: (
    { __typename?: 'SiteUpCheckerJob' }
    & SiteUpCheckerJobFragmentFragment
  ) }
);

export type RemoveSiteUpCheckerJobMutationVariables = Exact<{
  jobId: Scalars['String'];
}>;


export type RemoveSiteUpCheckerJobMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeSiteUpCheckerJob'>
);

export type StartSiteUpCheckerJobMutationVariables = Exact<{
  jobId: Scalars['String'];
}>;


export type StartSiteUpCheckerJobMutation = (
  { __typename?: 'Mutation' }
  & { startSiteUpCheckerJob: (
    { __typename?: 'SiteUpCheckerJob' }
    & SiteUpCheckerJobFragmentFragment
  ) }
);

export type UpdateSiteUpCheckerJobMutationVariables = Exact<{
  jobId: Scalars['String'];
  cron: Scalars['String'];
  resetAfterDownCount: Scalars['Float'];
  sendMailOnFailure: Scalars['Boolean'];
}>;


export type UpdateSiteUpCheckerJobMutation = (
  { __typename?: 'Mutation' }
  & { updateSiteUpCheckerJob: (
    { __typename?: 'SiteUpCheckerJob' }
    & SiteUpCheckerJobFragmentFragment
  ) }
);

export type GetSiteUpCheckerJobByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSiteUpCheckerJobByIdQuery = (
  { __typename?: 'Query' }
  & { getSiteUpCheckerJobById: (
    { __typename?: 'SiteUpCheckerJob' }
    & SiteUpCheckerJobFragmentFragment
  ) }
);

export type GetUserSiteUpCheckerJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserSiteUpCheckerJobsQuery = (
  { __typename?: 'Query' }
  & { getUserSiteUpCheckerJobs: Array<(
    { __typename?: 'SiteUpCheckerJob' }
    & SiteUpCheckerJobFragmentFragment
  )> }
);

export type LoginQueryVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = (
  { __typename?: 'Query' }
  & { login: (
    { __typename?: 'User' }
    & UserFragmentFragment
  ) }
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & UserFragmentFragment
  ) }
);

export type SiteUpCheckerJobUpdatedSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type SiteUpCheckerJobUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & { siteUpCheckerJobUpdated: (
    { __typename?: 'SiteUpCheckerJob' }
    & SiteUpCheckerJobFragmentFragment
  ) }
);

export const SiteUpCheckerJobFragmentFragmentDoc = gql`
    fragment SiteUpCheckerJobFragment on SiteUpCheckerJob {
  _id
  userId
  url
  cron
  status
  downCounterBeforeReset
  resetAfterDownCount
  totalDownCounter
  lastCheckedOn
  siteUpOnLastChecked
  lastFailureOn
  lastFailureEmailSentOn
  lastUpdatedOn
  createdOn
  sendMailOnFailure
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  _id
  userName
  email
  userType
  sendMailOnFailure
}
    `;
export const CheckAllUserSitesStatusDocument = gql`
    mutation checkAllUserSitesStatus {
  checkAllUserSitesStatus {
    ...SiteUpCheckerJobFragment
  }
}
    ${SiteUpCheckerJobFragmentFragmentDoc}`;
export type CheckAllUserSitesStatusMutationFn = Apollo.MutationFunction<CheckAllUserSitesStatusMutation, CheckAllUserSitesStatusMutationVariables>;

/**
 * __useCheckAllUserSitesStatusMutation__
 *
 * To run a mutation, you first call `useCheckAllUserSitesStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckAllUserSitesStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkAllUserSitesStatusMutation, { data, loading, error }] = useCheckAllUserSitesStatusMutation({
 *   variables: {
 *   },
 * });
 */
export function useCheckAllUserSitesStatusMutation(baseOptions?: Apollo.MutationHookOptions<CheckAllUserSitesStatusMutation, CheckAllUserSitesStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckAllUserSitesStatusMutation, CheckAllUserSitesStatusMutationVariables>(CheckAllUserSitesStatusDocument, options);
      }
export type CheckAllUserSitesStatusMutationHookResult = ReturnType<typeof useCheckAllUserSitesStatusMutation>;
export type CheckAllUserSitesStatusMutationResult = Apollo.MutationResult<CheckAllUserSitesStatusMutation>;
export type CheckAllUserSitesStatusMutationOptions = Apollo.BaseMutationOptions<CheckAllUserSitesStatusMutation, CheckAllUserSitesStatusMutationVariables>;
export const CheckMultipleSitesStatusDocument = gql`
    mutation checkMultipleSitesStatus($jobIds: [String!]!) {
  checkMultipleSitesStatus(jobIds: $jobIds) {
    ...SiteUpCheckerJobFragment
  }
}
    ${SiteUpCheckerJobFragmentFragmentDoc}`;
export type CheckMultipleSitesStatusMutationFn = Apollo.MutationFunction<CheckMultipleSitesStatusMutation, CheckMultipleSitesStatusMutationVariables>;

/**
 * __useCheckMultipleSitesStatusMutation__
 *
 * To run a mutation, you first call `useCheckMultipleSitesStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckMultipleSitesStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkMultipleSitesStatusMutation, { data, loading, error }] = useCheckMultipleSitesStatusMutation({
 *   variables: {
 *      jobIds: // value for 'jobIds'
 *   },
 * });
 */
export function useCheckMultipleSitesStatusMutation(baseOptions?: Apollo.MutationHookOptions<CheckMultipleSitesStatusMutation, CheckMultipleSitesStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckMultipleSitesStatusMutation, CheckMultipleSitesStatusMutationVariables>(CheckMultipleSitesStatusDocument, options);
      }
export type CheckMultipleSitesStatusMutationHookResult = ReturnType<typeof useCheckMultipleSitesStatusMutation>;
export type CheckMultipleSitesStatusMutationResult = Apollo.MutationResult<CheckMultipleSitesStatusMutation>;
export type CheckMultipleSitesStatusMutationOptions = Apollo.BaseMutationOptions<CheckMultipleSitesStatusMutation, CheckMultipleSitesStatusMutationVariables>;
export const CreateSiteUpCheckerJobDocument = gql`
    mutation createSiteUpCheckerJob($url: String!, $cron: String!, $resetAfterDownCount: Float!, $sendMailOnFailure: Boolean!) {
  createSiteUpCheckerJob(
    input: {url: $url, cron: $cron, resetAfterDownCount: $resetAfterDownCount, sendMailOnFailure: $sendMailOnFailure}
  ) {
    ...SiteUpCheckerJobFragment
  }
}
    ${SiteUpCheckerJobFragmentFragmentDoc}`;
export type CreateSiteUpCheckerJobMutationFn = Apollo.MutationFunction<CreateSiteUpCheckerJobMutation, CreateSiteUpCheckerJobMutationVariables>;

/**
 * __useCreateSiteUpCheckerJobMutation__
 *
 * To run a mutation, you first call `useCreateSiteUpCheckerJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSiteUpCheckerJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSiteUpCheckerJobMutation, { data, loading, error }] = useCreateSiteUpCheckerJobMutation({
 *   variables: {
 *      url: // value for 'url'
 *      cron: // value for 'cron'
 *      resetAfterDownCount: // value for 'resetAfterDownCount'
 *      sendMailOnFailure: // value for 'sendMailOnFailure'
 *   },
 * });
 */
export function useCreateSiteUpCheckerJobMutation(baseOptions?: Apollo.MutationHookOptions<CreateSiteUpCheckerJobMutation, CreateSiteUpCheckerJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSiteUpCheckerJobMutation, CreateSiteUpCheckerJobMutationVariables>(CreateSiteUpCheckerJobDocument, options);
      }
export type CreateSiteUpCheckerJobMutationHookResult = ReturnType<typeof useCreateSiteUpCheckerJobMutation>;
export type CreateSiteUpCheckerJobMutationResult = Apollo.MutationResult<CreateSiteUpCheckerJobMutation>;
export type CreateSiteUpCheckerJobMutationOptions = Apollo.BaseMutationOptions<CreateSiteUpCheckerJobMutation, CreateSiteUpCheckerJobMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($userName: String!, $email: String!, $password: String!, $sendMailOnFailure: Boolean!) {
  createUser(
    input: {userName: $userName, email: $email, password: $password, sendMailOnFailure: $sendMailOnFailure}
  ) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      userName: // value for 'userName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      sendMailOnFailure: // value for 'sendMailOnFailure'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const PauseSiteUpCheckerJobDocument = gql`
    mutation pauseSiteUpCheckerJob($jobId: String!) {
  pauseSiteUpCheckerJob(jobId: $jobId) {
    ...SiteUpCheckerJobFragment
  }
}
    ${SiteUpCheckerJobFragmentFragmentDoc}`;
export type PauseSiteUpCheckerJobMutationFn = Apollo.MutationFunction<PauseSiteUpCheckerJobMutation, PauseSiteUpCheckerJobMutationVariables>;

/**
 * __usePauseSiteUpCheckerJobMutation__
 *
 * To run a mutation, you first call `usePauseSiteUpCheckerJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePauseSiteUpCheckerJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pauseSiteUpCheckerJobMutation, { data, loading, error }] = usePauseSiteUpCheckerJobMutation({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function usePauseSiteUpCheckerJobMutation(baseOptions?: Apollo.MutationHookOptions<PauseSiteUpCheckerJobMutation, PauseSiteUpCheckerJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PauseSiteUpCheckerJobMutation, PauseSiteUpCheckerJobMutationVariables>(PauseSiteUpCheckerJobDocument, options);
      }
export type PauseSiteUpCheckerJobMutationHookResult = ReturnType<typeof usePauseSiteUpCheckerJobMutation>;
export type PauseSiteUpCheckerJobMutationResult = Apollo.MutationResult<PauseSiteUpCheckerJobMutation>;
export type PauseSiteUpCheckerJobMutationOptions = Apollo.BaseMutationOptions<PauseSiteUpCheckerJobMutation, PauseSiteUpCheckerJobMutationVariables>;
export const RemoveSiteUpCheckerJobDocument = gql`
    mutation removeSiteUpCheckerJob($jobId: String!) {
  removeSiteUpCheckerJob(jobId: $jobId)
}
    `;
export type RemoveSiteUpCheckerJobMutationFn = Apollo.MutationFunction<RemoveSiteUpCheckerJobMutation, RemoveSiteUpCheckerJobMutationVariables>;

/**
 * __useRemoveSiteUpCheckerJobMutation__
 *
 * To run a mutation, you first call `useRemoveSiteUpCheckerJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSiteUpCheckerJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSiteUpCheckerJobMutation, { data, loading, error }] = useRemoveSiteUpCheckerJobMutation({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useRemoveSiteUpCheckerJobMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSiteUpCheckerJobMutation, RemoveSiteUpCheckerJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSiteUpCheckerJobMutation, RemoveSiteUpCheckerJobMutationVariables>(RemoveSiteUpCheckerJobDocument, options);
      }
export type RemoveSiteUpCheckerJobMutationHookResult = ReturnType<typeof useRemoveSiteUpCheckerJobMutation>;
export type RemoveSiteUpCheckerJobMutationResult = Apollo.MutationResult<RemoveSiteUpCheckerJobMutation>;
export type RemoveSiteUpCheckerJobMutationOptions = Apollo.BaseMutationOptions<RemoveSiteUpCheckerJobMutation, RemoveSiteUpCheckerJobMutationVariables>;
export const StartSiteUpCheckerJobDocument = gql`
    mutation startSiteUpCheckerJob($jobId: String!) {
  startSiteUpCheckerJob(jobId: $jobId) {
    ...SiteUpCheckerJobFragment
  }
}
    ${SiteUpCheckerJobFragmentFragmentDoc}`;
export type StartSiteUpCheckerJobMutationFn = Apollo.MutationFunction<StartSiteUpCheckerJobMutation, StartSiteUpCheckerJobMutationVariables>;

/**
 * __useStartSiteUpCheckerJobMutation__
 *
 * To run a mutation, you first call `useStartSiteUpCheckerJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartSiteUpCheckerJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startSiteUpCheckerJobMutation, { data, loading, error }] = useStartSiteUpCheckerJobMutation({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useStartSiteUpCheckerJobMutation(baseOptions?: Apollo.MutationHookOptions<StartSiteUpCheckerJobMutation, StartSiteUpCheckerJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartSiteUpCheckerJobMutation, StartSiteUpCheckerJobMutationVariables>(StartSiteUpCheckerJobDocument, options);
      }
export type StartSiteUpCheckerJobMutationHookResult = ReturnType<typeof useStartSiteUpCheckerJobMutation>;
export type StartSiteUpCheckerJobMutationResult = Apollo.MutationResult<StartSiteUpCheckerJobMutation>;
export type StartSiteUpCheckerJobMutationOptions = Apollo.BaseMutationOptions<StartSiteUpCheckerJobMutation, StartSiteUpCheckerJobMutationVariables>;
export const UpdateSiteUpCheckerJobDocument = gql`
    mutation updateSiteUpCheckerJob($jobId: String!, $cron: String!, $resetAfterDownCount: Float!, $sendMailOnFailure: Boolean!) {
  updateSiteUpCheckerJob(
    input: {jobId: $jobId, cron: $cron, resetAfterDownCount: $resetAfterDownCount, sendMailOnFailure: $sendMailOnFailure}
  ) {
    ...SiteUpCheckerJobFragment
  }
}
    ${SiteUpCheckerJobFragmentFragmentDoc}`;
export type UpdateSiteUpCheckerJobMutationFn = Apollo.MutationFunction<UpdateSiteUpCheckerJobMutation, UpdateSiteUpCheckerJobMutationVariables>;

/**
 * __useUpdateSiteUpCheckerJobMutation__
 *
 * To run a mutation, you first call `useUpdateSiteUpCheckerJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSiteUpCheckerJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSiteUpCheckerJobMutation, { data, loading, error }] = useUpdateSiteUpCheckerJobMutation({
 *   variables: {
 *      jobId: // value for 'jobId'
 *      cron: // value for 'cron'
 *      resetAfterDownCount: // value for 'resetAfterDownCount'
 *      sendMailOnFailure: // value for 'sendMailOnFailure'
 *   },
 * });
 */
export function useUpdateSiteUpCheckerJobMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSiteUpCheckerJobMutation, UpdateSiteUpCheckerJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSiteUpCheckerJobMutation, UpdateSiteUpCheckerJobMutationVariables>(UpdateSiteUpCheckerJobDocument, options);
      }
export type UpdateSiteUpCheckerJobMutationHookResult = ReturnType<typeof useUpdateSiteUpCheckerJobMutation>;
export type UpdateSiteUpCheckerJobMutationResult = Apollo.MutationResult<UpdateSiteUpCheckerJobMutation>;
export type UpdateSiteUpCheckerJobMutationOptions = Apollo.BaseMutationOptions<UpdateSiteUpCheckerJobMutation, UpdateSiteUpCheckerJobMutationVariables>;
export const GetSiteUpCheckerJobByIdDocument = gql`
    query getSiteUpCheckerJobById($id: String!) {
  getSiteUpCheckerJobById(id: $id) {
    ...SiteUpCheckerJobFragment
  }
}
    ${SiteUpCheckerJobFragmentFragmentDoc}`;

/**
 * __useGetSiteUpCheckerJobByIdQuery__
 *
 * To run a query within a React component, call `useGetSiteUpCheckerJobByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSiteUpCheckerJobByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSiteUpCheckerJobByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSiteUpCheckerJobByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSiteUpCheckerJobByIdQuery, GetSiteUpCheckerJobByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSiteUpCheckerJobByIdQuery, GetSiteUpCheckerJobByIdQueryVariables>(GetSiteUpCheckerJobByIdDocument, options);
      }
export function useGetSiteUpCheckerJobByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSiteUpCheckerJobByIdQuery, GetSiteUpCheckerJobByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSiteUpCheckerJobByIdQuery, GetSiteUpCheckerJobByIdQueryVariables>(GetSiteUpCheckerJobByIdDocument, options);
        }
export type GetSiteUpCheckerJobByIdQueryHookResult = ReturnType<typeof useGetSiteUpCheckerJobByIdQuery>;
export type GetSiteUpCheckerJobByIdLazyQueryHookResult = ReturnType<typeof useGetSiteUpCheckerJobByIdLazyQuery>;
export type GetSiteUpCheckerJobByIdQueryResult = Apollo.QueryResult<GetSiteUpCheckerJobByIdQuery, GetSiteUpCheckerJobByIdQueryVariables>;
export const GetUserSiteUpCheckerJobsDocument = gql`
    query getUserSiteUpCheckerJobs {
  getUserSiteUpCheckerJobs {
    ...SiteUpCheckerJobFragment
  }
}
    ${SiteUpCheckerJobFragmentFragmentDoc}`;

/**
 * __useGetUserSiteUpCheckerJobsQuery__
 *
 * To run a query within a React component, call `useGetUserSiteUpCheckerJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSiteUpCheckerJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSiteUpCheckerJobsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserSiteUpCheckerJobsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserSiteUpCheckerJobsQuery, GetUserSiteUpCheckerJobsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserSiteUpCheckerJobsQuery, GetUserSiteUpCheckerJobsQueryVariables>(GetUserSiteUpCheckerJobsDocument, options);
      }
export function useGetUserSiteUpCheckerJobsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserSiteUpCheckerJobsQuery, GetUserSiteUpCheckerJobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserSiteUpCheckerJobsQuery, GetUserSiteUpCheckerJobsQueryVariables>(GetUserSiteUpCheckerJobsDocument, options);
        }
export type GetUserSiteUpCheckerJobsQueryHookResult = ReturnType<typeof useGetUserSiteUpCheckerJobsQuery>;
export type GetUserSiteUpCheckerJobsLazyQueryHookResult = ReturnType<typeof useGetUserSiteUpCheckerJobsLazyQuery>;
export type GetUserSiteUpCheckerJobsQueryResult = Apollo.QueryResult<GetUserSiteUpCheckerJobsQuery, GetUserSiteUpCheckerJobsQueryVariables>;
export const LoginDocument = gql`
    query login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const UserDocument = gql`
    query user {
  user {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const SiteUpCheckerJobUpdatedDocument = gql`
    subscription siteUpCheckerJobUpdated($userId: String!) {
  siteUpCheckerJobUpdated(userId: $userId) {
    ...SiteUpCheckerJobFragment
  }
}
    ${SiteUpCheckerJobFragmentFragmentDoc}`;

/**
 * __useSiteUpCheckerJobUpdatedSubscription__
 *
 * To run a query within a React component, call `useSiteUpCheckerJobUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSiteUpCheckerJobUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSiteUpCheckerJobUpdatedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSiteUpCheckerJobUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<SiteUpCheckerJobUpdatedSubscription, SiteUpCheckerJobUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SiteUpCheckerJobUpdatedSubscription, SiteUpCheckerJobUpdatedSubscriptionVariables>(SiteUpCheckerJobUpdatedDocument, options);
      }
export type SiteUpCheckerJobUpdatedSubscriptionHookResult = ReturnType<typeof useSiteUpCheckerJobUpdatedSubscription>;
export type SiteUpCheckerJobUpdatedSubscriptionResult = Apollo.SubscriptionResult<SiteUpCheckerJobUpdatedSubscription>;