import { Maybe } from 'graphql/jsutils/Maybe'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { GetUserSiteUpCheckerJobsDocument, SiteUpCheckerJob, useGetUserSiteUpCheckerJobsQuery, useSiteUpCheckerJobUpdatedSubscription } from '../../generated/graphql'
import AddNewJobButton from '../AddNewJobButton'
import { client } from '../Apollo'
import { useAuthContext } from '../Auth/AuthProvider'
import CreateUpdateJob from '../CreateUpdateJob'
import JobsTable from '../JobsTable'
import {  Wrapper } from './styled'

type AddEditModalType = 'add' | 'edit' | ''

interface DashboardContextType {
  addEditJobModal: AddEditModalType;
  setAddEditJobModal: (status: AddEditModalType) => void;
  jobsData: SiteUpCheckerJob[];
  getJobsLoader: boolean;
  selectedJob: Maybe<SiteUpCheckerJob>;
  updateSelectedJob: (job: Maybe<SiteUpCheckerJob>) => void; 
}

const dashboardContext = createContext<DashboardContextType>(null as any as DashboardContextType)

const DashboardContextProvider = dashboardContext.Provider

const Dashboard: React.FC = () => {
  const [addEditJobModal, setAddEditJobModal] = useState<AddEditModalType>('')
  const [selectedJob, updateSelectedJob] = useState<Maybe<SiteUpCheckerJob>>(null)
  const { loading: getJobsLoader, data: jobsData } = useGetUserSiteUpCheckerJobsQuery()
  const { user } = useAuthContext()

  if (!user) {
    return null
  }

  const { data: jobUpdatedData } = useSiteUpCheckerJobUpdatedSubscription({
    variables: {
      userId: user._id
    }
  })
  
  useEffect(() => {
    if (jobUpdatedData) {
      const data = client.readQuery({ query: GetUserSiteUpCheckerJobsDocument })

      client.writeQuery({
        query: GetUserSiteUpCheckerJobsDocument,
        data: {
          getUserSiteUpCheckerJobs: data.getUserSiteUpCheckerJobs.map((job: SiteUpCheckerJob) => (
            jobUpdatedData.siteUpCheckerJobUpdated._id === job._id ? ({
              ...job, ...jobUpdatedData.siteUpCheckerJobUpdated
            }) : ({
              ...job
            })
          ))
        }
      })
    }
  }, [jobUpdatedData])

  const contextValue: DashboardContextType = {
    addEditJobModal,
    setAddEditJobModal,
    getJobsLoader,
    selectedJob,
    updateSelectedJob,
    jobsData: (jobsData && jobsData.getUserSiteUpCheckerJobs) || []
  }

  console.log(jobsData)

  return (
    <DashboardContextProvider value={contextValue}>
      <Wrapper>
        <div>
          <CreateUpdateJob />   
          <AddNewJobButton />
          <JobsTable />
        </div>
      </Wrapper>
    </DashboardContextProvider>
  )
}

export default Dashboard

export const useDashboardContext = () => useContext(dashboardContext)
