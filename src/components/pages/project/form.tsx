import React, { FC } from 'react'
import { Divider, Form, Input, FormInstance, DatePicker } from 'antd'
import Title from 'antd/lib/typography/Title'
import TextArea from 'antd/lib/input/TextArea'
import moment from 'moment'

type Props = {
  form: FormInstance;
};

const ProjectForm: FC<Props> = (props) => {
  const { form } = props
  const message = 'There can be no more than 2000 characters'

  return (
    <Form
      form={form}
      className="project__form"
      name="form-project"
      layout="horizontal"
      autoComplete="off">
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Divider />
      <Title level={4}>Description</Title>

      <Form.Item
        name={['description', 'en']}
        label="en"
        rules={[{ max: 2000, message }]}>
        <TextArea rows={8} placeholder="Description in English" />
      </Form.Item>

      <Form.Item
        name={['description', 'ru']}
        label="ru"
        rules={[{ max: 2000, message }]}>
        <TextArea rows={8} placeholder="Description in Russian" />
      </Form.Item>

      <Divider />
    </Form>
  )
}

export default ProjectForm
