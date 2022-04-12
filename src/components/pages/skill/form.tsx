import React, { FC } from 'react'
import { Divider, Form, Input, FormInstance } from 'antd'
import Title from 'antd/lib/typography/Title'
import TextArea from 'antd/lib/input/TextArea'
import Text from 'antd/lib/typography/Text'

import ChooseTags from '../../common/form/choose-tag'
import ChooseRate from '../../common/form/choose-rate'

type Props = {
  form: FormInstance,
  groups?: string[]
}

const SkillForm: FC<Props> = (props) => {
  const { groups = [], form } = props
  const message = 'There can be no more than 2000 characters'

  return (
    <Form
      form={form}
      className="skill__form"
      name="form-skill"
      layout="horizontal"
      autoComplete="off">

      <Form.Item name='name' label='Name' rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Divider />
      <Title level={4}>Group</Title>
      <Form.Item name='group'>
        <ChooseTags tags={groups} type='select-one' />
      </Form.Item>

      <Divider />
      <Title level={4}>Level</Title>
      <Text>What do you think you are well posted by this skill on a 10 point scale</Text>
      <Form.Item name='level'>
        <ChooseRate total={10} />
      </Form.Item>

      <Divider />
      <Title level={4}>Description</Title>

      <Form.Item name="description_en" label="en" rules={[{ max: 2000, message }]}>
        <TextArea rows={8} placeholder="Description in English" />
      </Form.Item>

      <Form.Item name="description_ru" label="ru" rules={[{ max: 2000, message }]}>
        <TextArea rows={8} placeholder="Description in Russian" />
      </Form.Item>

      <Divider />
    </Form>
  )
}

export default SkillForm
