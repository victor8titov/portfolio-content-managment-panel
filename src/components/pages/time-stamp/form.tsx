import React, { FC } from 'react'
import { Divider, Form, Input, FormInstance, DatePicker } from 'antd'
import Title from 'antd/lib/typography/Title'
import TextArea from 'antd/lib/input/TextArea'
import moment from 'moment'

type Props = {
  form: FormInstance;
};

const TimeStampForm: FC<Props> = (props) => {
  const { form } = props
  const message = 'There can be no more than 2000 characters'
  const monthFormat = 'YYYY/MM'

  return (
    <Form
      form={form}
      className="time-stamp__form"
      name="form-time-stamp"
      layout="horizontal"
      autoComplete="off">
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="link" label="Link">
        <Input />
      </Form.Item>

      <Form.Item
        name={'start'}
        label="Starting point"
        rules={[{ required: true }]}>
        <DatePicker format={monthFormat} picker="month" />
      </Form.Item>

      <Form.Item
        name={'end'}
        label="Ending point"
        dependencies={['start']}
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator (_, value) {
              if (moment(getFieldValue('start')).isBefore(value)) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('Ending point can not be before Starting point!')
              )
            }
          })
        ]}>
        <DatePicker format={monthFormat} picker="month" />
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

export default TimeStampForm
