import { InMemoryCache } from '@apollo/client'
import {
  GetUserSiteUpCheckerJobsDocument,
  LoginDocument,
  SiteUpCheckerJob,
  User,
  UserDocument,
} from '../../generated/graphql'
import { client } from './index'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getSiteAuditLogs: {
          keyArgs: ['input', ['jobId']],
          merge(existing, incoming, obj: any) {
            const {
              args: {
                input: { cursor },
              },
              readField,
            } = obj
            const merged = existing ? existing.slice(0) : []
            let offset = offsetFromCursor(merged, cursor, readField)
            // If we couldn't find the cursor, default to appending to
            // the end of the list, so we don't lose any data.
            if (offset < 0) offset = merged.length
            // Now that we have a reliable offset, the rest of this logic
            // is the same as in offsetLimitPagination.
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i]
            }
            return merged
          },
        },
      },
    },
  },
})

function offsetFromCursor(items: any, cursor: any, readField: any) {
  // Search from the back of the list because the cursor we're
  // looking for is typically the ID of the last item.
  for (let i = items.length - 1; i >= 0; --i) {
    const item = items[i]
    // Using readField works for both non-normalized objects
    // (returning item.id) and normalized references (returning
    // the id field from the referenced entity object), so it's
    // a good idea to use readField when you're not sure what
    // kind of elements you're dealing with.
    if (readField('createdOn', item) === cursor) {
      // Add one because the cursor identifies the item just
      // before the first item in the page we care about.
      return i + 1
    }
  }
  // Report that the cursor could not be found.
  return -1
}

export const cacheUpdator = {
  udpateUser: (user: User): void => {
    const data = client.readQuery({ query: UserDocument })

    client.writeQuery({
      query: UserDocument,
      data: {
        user: {
          ...data.user,
          ...user,
        },
      },
    })
  },
  addSiteupJob: (job: SiteUpCheckerJob): void => {
    const data = client.readQuery({ query: GetUserSiteUpCheckerJobsDocument })

    client.writeQuery({
      query: GetUserSiteUpCheckerJobsDocument,
      data: {
        getUserSiteUpCheckerJobs: [...data.getUserSiteUpCheckerJobs, job],
      },
    })
  },
  updateSiteupJob: (updatedJob: SiteUpCheckerJob): void => {
    const data = client.readQuery({ query: GetUserSiteUpCheckerJobsDocument })

    client.writeQuery({
      query: GetUserSiteUpCheckerJobsDocument,
      data: {
        getUserSiteUpCheckerJobs: data.getUserSiteUpCheckerJobs.map(
          (job: SiteUpCheckerJob) =>
            job._id === updatedJob._id
              ? {
                  ...job,
                  ...updatedJob,
                }
              : {
                  ...job,
                }
        ),
      },
    })
  },
  deleteSiteupJob: (jobId: string): void => {
    const data = client.readQuery({ query: GetUserSiteUpCheckerJobsDocument })

    client.writeQuery({
      query: GetUserSiteUpCheckerJobsDocument,
      data: {
        getUserSiteUpCheckerJobs: data.getUserSiteUpCheckerJobs.filter(
          (job: SiteUpCheckerJob) => job._id !== jobId
        ),
      },
    })
  },
  clearAuditCache: (): void => {
    cache.modify({
      fields: {
        getSiteAuditLogs: () => undefined,
      },
    })
  },
}
