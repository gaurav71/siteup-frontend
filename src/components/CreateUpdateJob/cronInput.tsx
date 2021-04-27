import { Input, Row, Col } from 'antd'
import React, { CSSProperties, useState } from 'react'

const inputStyle: CSSProperties = {
  padding: '4px',
  textAlign: 'center'
}

interface CronInputProps {
  cronValue: string
}

const CronInput: React.FC<CronInputProps> = ({
  cronValue
}) => {
  
  return (
    <Input.Group size='default'>
      <Row gutter={4}>
        <Col span={3}>
          <Input defaultValue="*" style={inputStyle}/>
        </Col>
        <Col span={3}>
          <Input defaultValue="*" style={inputStyle} />
        </Col>
        <Col span={3}>
          <Input defaultValue="*" style={inputStyle} />
        </Col>
        <Col span={3}>
          <Input defaultValue="*" style={inputStyle} />
        </Col>
        <Col span={3}>
          <Input defaultValue="*" style={inputStyle} />
        </Col>
      </Row>
    </Input.Group>
  )
}

export default CronInput
