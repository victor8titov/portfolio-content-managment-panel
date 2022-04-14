import { Form, FormInstance } from 'antd'
import React, { FC } from 'react'
import ChooseMediaFiles from '../../common/form/choose-media-files'

const ProjectFormImage: FC<{ form: FormInstance }> = ({ form }) => {
  return (
    <Form form={form}>
      <Form.Item name='images'>
        <ChooseMediaFiles type='multiselect' />
      </Form.Item>
    </Form>
  )
}

export default ProjectFormImage
