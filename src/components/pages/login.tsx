import React, { FC, useEffect } from 'react'
import { Form, Input, Button, Col, Row } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../../store'
import { useForm } from 'antd/lib/form/Form'
import { profileActions } from '../../store/slices/profile'
import { PayloadAction } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'

export type DispatchWithActionFunction = PayloadAction<unknown, string, { payload: void; type: string }, { message: string }>

const Login: FC = () => {
  const navigate = useNavigate()
  // const [form] = useForm()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: State) => state.profile.isLoggedIn)

  const handleSubmit = (fields: { username: string, password: string }) => {
    dispatch(profileActions.fetchLogin(fields))
  }

  useEffect(() => {
    if (isLoggedIn) navigate('/homepage')
  }, [isLoggedIn, navigate])

  return (
      <Row align="middle" justify="center" style={{ height: '100vh' }}>
        <Col span={5}>
          <Form
            name="login"
            layout='vertical'
            onFinish={handleSubmit}
            // validateMessages={validateMessages}
            autoComplete='off'>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}>
              <Input autoFocus />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={false} >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
  )
}

export default Login
