import React, { FC } from 'react'
import { Form, Input, Button, Col, Row } from 'antd'
import useLogin from './hooks/login'

const Login: FC = () => {
  const { onLogin, isLoading } = useLogin()

  return (
      <Row align="middle" justify="center" style={{ height: '100vh' }} className='login-page'>
        <Col xs={{ span: 18 }} sm={{ span: 8 }} md={{ span: 5 }}>
          <Form
            name="login"
            layout='vertical'
            onFinish={onLogin}
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
              <Button type="primary" htmlType="submit" loading={isLoading} >
                Submit
              </Button>
            </Form.Item>

          </Form>
        </Col>
      </Row>
  )
}

export default Login
