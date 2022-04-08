import React, { FC } from 'react'
import Title from 'antd/lib/typography/Title'
import { Divider, Form, Input, FormInstance } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

const HomepageForm: FC<{ form: FormInstance }> = ({ form }) => {
  const message = 'There can be no more than 1000 characters'
  return (
    <Form
      form={form}
      className="homepage__form"
      name="form-home-page"
      layout="horizontal"
      autoComplete="off">
      <Title level={4}>Title</Title>

      <Form.Item name="title_en" rules={[{ max: 1000, message }]}>
        <Input addonBefore="en" placeholder="Title in English" />
      </Form.Item>

      <Form.Item name="title_ru" rules={[{ max: 1000, message }]}>
        <Input addonBefore="ru" placeholder="Title in Russian" />
      </Form.Item>

      <Divider />

      <Title level={4}>Subtitle</Title>

      <Form.Item name="subtitle_en" rules={[{ max: 1000, message }]}>
        <Input addonBefore="en" placeholder="Subtitle in English" />
      </Form.Item>

      <Form.Item name="subtitle_ru" rules={[{ max: 1000, message }]}>
        <Input addonBefore="ru" placeholder="Subtitle in Russian" />
      </Form.Item>

      <Divider />

      <Title level={4}>Description</Title>

      <Form.Item name="description_en" label="en" rules={[{ max: 2000 }]}>
        <TextArea rows={8} placeholder="Description in English" />
      </Form.Item>

      <Form.Item name="description_ru" label="ru" rules={[{ max: 2000 }]}>
        <TextArea rows={8} placeholder="Description in Russian" />
      </Form.Item>

      <Divider />
    </Form>
  )
}

export default HomepageForm
