import React, { createContext, useContext, useEffect, useState } from 'react'
import { Maybe } from 'graphql/jsutils/Maybe'
import {
  SiteUpCheckerJob,
  useGetUserSiteUpCheckerJobsQuery,
  useSiteUpCheckerJobUpdatedSubscription,
} from '../../generated/graphql'
import { cacheUpdator } from '../Apollo'
import { AuthContextType, useAuthContext } from '../Auth/AuthProvider'
import CreateUpdateJob from '../CreateUpdateJob'
import JobsTable from '../JobsTable'
import { Wrapper } from './styled'

type AddEditModalType = 'add' | 'edit' | ''

export interface DashboardContextType {
  addEditJobModal: AddEditModalType
  setAddEditJobModal: (status: AddEditModalType) => void
  jobsData: SiteUpCheckerJob[]
  getJobsLoader: boolean
  selectedJob: Maybe<SiteUpCheckerJob>
  updateSelectedJob: (job: Maybe<SiteUpCheckerJob>) => void
}

const dashboardContext = createContext<DashboardContextType | null>(null)

const DashboardContextProvider = dashboardContext.Provider

const Dashboard: React.FC = () => {
  const [addEditJobModal, setAddEditJobModal] = useState<AddEditModalType>('')
  const [selectedJob, updateSelectedJob] = useState<Maybe<SiteUpCheckerJob>>(
    null
  )
  const {
    loading: getJobsLoader,
    data: jobsData,
  } = useGetUserSiteUpCheckerJobsQuery()
  const { user } = useAuthContext() as AuthContextType

  const {
    data: jobUpdatedSubscriptionData,
  } = useSiteUpCheckerJobUpdatedSubscription({
    variables: {
      userId: user ? user._id : '',
    },
  })

  useEffect(() => {
    if (jobUpdatedSubscriptionData) {
      cacheUpdator.updateSiteupJob(
        jobUpdatedSubscriptionData.siteUpCheckerJobUpdated
      )
    }
  }, [jobUpdatedSubscriptionData])

  const contextValue: DashboardContextType = {
    addEditJobModal,
    setAddEditJobModal,
    getJobsLoader,
    selectedJob,
    updateSelectedJob,
    jobsData: (jobsData && jobsData.getUserSiteUpCheckerJobs) || [],
  }

  return (
    <DashboardContextProvider value={contextValue}>
      <Wrapper>
        <CreateUpdateJob />
        <JobsTable />
      </Wrapper>
    </DashboardContextProvider>
  )
}

export default Dashboard

export const useDashboardContext = (): DashboardContextType | null =>
  useContext(dashboardContext)
