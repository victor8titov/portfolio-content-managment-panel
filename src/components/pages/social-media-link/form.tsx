import React, { FC } from 'react'
import { Form, Input, FormInstance } from 'antd'
import ChooseMediaFiles from '../../common/form/choose-media-files'

type Props = {
  form: FormInstance,
}

const SocialMediaLinkForm: FC<Props> = (props) => {
  const { form } = props

  return (
    <Form
      form={form}
      className="social-media__form"
      name="form-social-media"
      layout="horizontal"
      autoComplete="off">

      <Form.Item name='name' label='Name' rules={[{ required: true }, { max: 50, message: 'Maximum number of characters 50' }]}>
        <Input />
      </Form.Item>

      <Form.Item name='link' label='Link' rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name='icon' label='Icon' >
        <ChooseMediaFiles type='select-one' />
      </Form.Item>

    </Form>
  )
}

export default SocialMediaLinkForm
