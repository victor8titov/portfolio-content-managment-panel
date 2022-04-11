import { Form, FormInstance } from 'antd'
import React, { FC } from 'react'
import ChooseMediaFiles from '../../common/form/choose-media-files'

const HomepageFormImage: FC<{ form: FormInstance }> = ({ form }) => {
  return (
    <Form form={form}>
      <Form.Item name='avatars'>
        <ChooseMediaFiles type='select-one'/>
      </Form.Item>
    </Form>
  )
}

export default HomepageFormImage
