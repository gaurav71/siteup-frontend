import React from 'react'
import { Button } from 'antd'
import { useDashboardContext } from '../Dashboard'
import { AddNewButtonWrapper } from './styled'

interface AddNewJobButtonProps {}

const AddNewJobButton: React.FC<AddNewJobButtonProps> = () => {
  const { setAddEditJobModal } = useDashboardContext()

  const handleClick = () => {
    setAddEditJobModal('add')
  }

  return (
    <AddNewButtonWrapper>
      <Button
        type="primary"
        size='middle'
        onClick={handleClick}>
        Add New
      </Button>
    </AddNewButtonWrapper>
  )
}

export default AddNewJobButton
