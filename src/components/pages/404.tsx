import { Col, Result, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  HOMEPAGE,
  ADMIN,
  PROJECTS,
  pathJoin,
  SKILLS,
  SOCIAL_MEDIA,
  TIME_STAMPS,
  GALLERY
} from '../../constants/routes'

const Error404: FC = () => {
  return (
    <Row align="middle" justify="center" style={{ height: '100vh' }}>
      <Col>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <>
              <Text>
                Perhaps you were mistaken by the address. Go to any of the
                pages:
              </Text>
              <ul style={{ marginTop: '20px', textAlign: 'left' }}>
                <li>
                  <Link to={pathJoin(ADMIN, HOMEPAGE)}>{HOMEPAGE}</Link>
                </li>
                <li>
                  <Link to={pathJoin(ADMIN, PROJECTS)}>{PROJECTS}</Link>
                </li>
                <li>
                  <Link to={pathJoin(ADMIN, SKILLS)}>{SKILLS}</Link>
                </li>
                <li>
                  <Link to={pathJoin(ADMIN, SOCIAL_MEDIA)}>{SOCIAL_MEDIA}</Link>
                </li>
                <li>
                  <Link to={pathJoin(ADMIN, TIME_STAMPS)}>{TIME_STAMPS}</Link>
                </li>
                <li>
                  <Link to={pathJoin(ADMIN, GALLERY)}>{GALLERY}</Link>
                </li>
              </ul>
            </>
          }
        />
        ,
      </Col>
    </Row>
  )
}

export default Error404
