import React, { FC } from 'react'
import { Button, Col, Row, Spin } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'

import HomepageForm from './form'
import useFormManager from './hooks/form-manager'
import './styles.scss'

import HomepageFormImage from './form-image'

const Homepage: FC = () => {
  const { form, onSave, loadingPage, loadingSave } = useFormManager()

  return (
    <div className="homepage">
      <Title>Home page</Title>
      <Text>Here you can configure content for the main page of the site.</Text>

      <Row gutter={15}>
        <Col xs={{ span: 24 }} lg={{ span: 19 }}>
          <Spin tip='Loading...' spinning={loadingPage} >
            <HomepageForm form={form} />
          </Spin>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 5 }}>
          <div className='homepage__sidebar'>
            <Title level={4}>Avatar</Title>
            <HomepageFormImage form={form} />
          </div>
        </Col>
        <Col span={24}>
          <Button type="primary" onClick={onSave} loading={loadingSave}>Save</Button>
        </Col>
      </Row>

    </div>
  )
}

export default Homepage
