import { GetUserSiteUpCheckerJobsDocument, SiteUpCheckerJob } from "../../generated/graphql";
import { client } from './index'

export const cacheUpdator = {
  addSiteupJob: (job: SiteUpCheckerJob) => {
    const data = client.readQuery({ query: GetUserSiteUpCheckerJobsDocument })
  
    client.writeQuery({
      query: GetUserSiteUpCheckerJobsDocument,
      data: {
        getUserSiteUpCheckerJobs: [
          ...data.getUserSiteUpCheckerJobs,
          job
        ]
      }
    })
  },
  updateSiteupJob: (updatedJob: SiteUpCheckerJob) => {
    const data = client.readQuery({ query: GetUserSiteUpCheckerJobsDocument })
  
    client.writeQuery({
      query: GetUserSiteUpCheckerJobsDocument,
      data: {
        getUserSiteUpCheckerJobs: data.getUserSiteUpCheckerJobs.map((job: SiteUpCheckerJob) => (
          (job._id === updatedJob._id) ? ({
            ...job, ...updatedJob
          }) : ({
            ...job
          })
        ))
      }
    })
  },
  deleteSiteupJob: (jobId: string) => {
    const data = client.readQuery({ query: GetUserSiteUpCheckerJobsDocument })

    client.writeQuery({
      query: GetUserSiteUpCheckerJobsDocument,
      data: {
        getUserSiteUpCheckerJobs: data.getUserSiteUpCheckerJobs.filter(
          (job: SiteUpCheckerJob) => (job._id !== jobId)
        )
      }
    })
  }
}
