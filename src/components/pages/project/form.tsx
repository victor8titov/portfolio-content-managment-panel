import React, { FC } from 'react'
import { Divider, Form, Input, FormInstance, DatePicker, Space, Button } from 'antd'
import Title from 'antd/lib/typography/Title'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'

type Props = {
  form: FormInstance;
};

const ProjectForm: FC<Props> = (props) => {
  const { form } = props
  const message = 'There can be no more than 2000 characters'
  const monthFormat = 'YYYY/MM'

  return (
    <Form
      form={form}
      className="project-form"
      name="form-project"
      layout="horizontal"
      autoComplete="off">
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="type" label="Type" rules={[{ max: 50 }]}>
        <Input />
      </Form.Item>

      <Form.Item name="spendTime" label="Spend Time" rules={[{ max: 50 }]}>
        <Input placeholder="Indicate in your own words how much time you need" />
      </Form.Item>

      <Title level={4}>Stack</Title>
      <Divider />
      <Form.List name="stack">
        {(fields, { add, remove }) => (
          <div className="project-form__stack-box">
              <Button
                className="project-form__stack-add-button"
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}>
                Add technology
              </Button>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginRight: '10px' }}
                align="baseline">
                <Form.Item name={name} {...restField}>
                  <Input placeholder="technology" style={{ width: '100px' }} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}

          </div>
        )}
      </Form.List>

      <Title level={4}>Events</Title>
      <Divider />
      <Form.List name="events">
        {(fields, { add, remove }) => (
          <div className="project-form__events-box">
              <Button
                className="project-form__event-add-button"
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}>
                Add Event
              </Button>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                align='baseline'
                >
                <Form.Item name={[name, 'status']} {...restField}>
                  <Input />
                </Form.Item>
                <Form.Item name={[name, 'date']} {...restField}>
                  <DatePicker format={monthFormat} picker="month" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
          </div>
        )}
      </Form.List>

      <Title level={4}>Link</Title>
      <Divider />
      <Form.List name="links">
        {(fields, { add, remove }) => (
          <div className="project-form__links-box">
              <Button
                className="project-form__links-add-button"
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}>
                Add link
              </Button>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                align='baseline'
                >
                <Form.Item name={[name, 'name']} {...restField}>
                  <Input />
                </Form.Item>
                <Form.Item name={[name, 'link']} {...restField}>
                  <Input />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
          </div>
        )}
      </Form.List>

      <Title level={4}>Description</Title>
      <Divider />

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
