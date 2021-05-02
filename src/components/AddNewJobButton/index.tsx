import React from 'react'
import { Button } from 'antd'
import { DashboardContextType, useDashboardContext } from '../Dashboard'
import { AddNewButtonWrapper } from './styled'

interface AddNewJobButtonProps {}

const AddNewJobButton: React.FC<AddNewJobButtonProps> = () => {
  const { setAddEditJobModal } = useDashboardContext() as DashboardContextType

  const handleClick = () => {
    setAddEditJobModal('add')
  }

  return (
    <AddNewButtonWrapper>
      <Button type="primary" size="middle" onClick={handleClick}>
        Add New
      </Button>
    </AddNewButtonWrapper>
  )
}

export default AddNewJobButton
