import React from 'react'
import { Wrapper } from './styled'

interface LoaderProps {
  darkenBackground?: boolean
}

const Loader: React.FC<LoaderProps> = (props) => {
  const { darkenBackground } = props

  return (
    <Wrapper darkenBackground={!!darkenBackground}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Wrapper>
  )
}

export default Loader
