import React, { FC } from 'react'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import { Button, Col, Row, Spin } from 'antd'

import HomepageForm from './form'
import './styles.scss'
import useFormManager from './hooks/form-manager'

const Homepage: FC = () => {
  const { form, onSave, loadingPage, loadingSave } = useFormManager()
  return (
    <div className="homepage">
      <Title>Home page</Title>
      <Text>Here you can configure content for the main page of the site.</Text>

      <Row gutter={15}>
        <Col xs={{ span: 24 }} md={{ span: 18 }}>
          <Spin tip='Loading...' spinning={loadingPage} >
            <HomepageForm form={form} />
          </Spin>
          <Button type="primary" onClick={onSave} loading={loadingSave}>Save</Button>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 6 }}>
          <div style={{ backgroundColor: 'gray', width: '100%', height: '500px' }}> this will be avatar block</div>
        </Col>
      </Row>
    </div>
  )
}

export default Homepage
