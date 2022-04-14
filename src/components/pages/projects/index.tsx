import React, { FC, useCallback, useState } from 'react'
import { Affix, Button, Pagination, Space, Spin, Switch } from 'antd'
import Title from 'antd/lib/typography/Title'

import { Language } from '../../../types/common'
import './styles.scss'
import useProjectsManager from './hooks/projects-manager'
import ProjectCard from './project-card'

const Projects: FC = () => {
  const [language, setLanguage] = useState<Language>(Language.EN)
  const { projects, isLoading, onUpdate, onDelete, isDeleting, onAddNew, pagination, onChangePage } = useProjectsManager(language)
  const { page, pageSize, totalPages } = pagination

  const handleChangeLanguage = useCallback((checked: boolean) => {
    setLanguage(checked ? Language.EN : Language.RU)
  }, [])

  return (
    <div className='projects'>
      <Title>Projects</Title>

      <div className='projects__add-box'>
        <Affix offsetTop={10}>
          <Button type='primary' onClick={onAddNew}>
            Add new project
          </Button>
        </Affix>

        <Switch
          checkedChildren={'En'}
          unCheckedChildren={'Ru'}
          onChange={handleChangeLanguage}
          defaultChecked
        />
      </div>

      <Spin spinning={isLoading}>
        <div className='projects__body'>

        <Space align='start' wrap>
          {projects.map(item => (
            <ProjectCard key={item.id} project={item} onDelete={onDelete} onUpdate={onUpdate} isDeleting={isDeleting} />
          ))}
        </Space>

        <div className='projects__pagination'>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={totalPages * pageSize}
              onChange={onChangePage}
              showSizeChanger
              hideOnSinglePage
              pageSizeOptions={[10, 20, 50]}
              />
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default Projects
