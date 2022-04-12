import React, { FC } from 'react'
import { Affix, Button, Divider, Space, Spin } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'

import SkillCard from './skill-card'
import useSkillsManager from './hooks/skills-manager'
import './styles.scss'

const Skills: FC = () => {
  const { skills, groups, isLoading, onUpdate, onDelete, isDeleting, onAddNew } = useSkillsManager()
  return (
    <div className='skills'>
      <Title>Skills</Title>
      <Text>Here you can configure content for sills.</Text>

      <div className='skills__add-box'>
        <Affix offsetTop={10}>
          <Button type='primary' onClick={onAddNew}>
            Add new skill
          </Button>
        </Affix>
      </div>

      <Spin spinning={isLoading}>
        <div className='skills__body'>
          {groups.map((group, index) =>
            <div key={`${group}-${index}`} className='skills__group'>
              <Divider >
                {group ? <Title level={5}>Group: {group}</Title> : null}
              </Divider>
              <div className='skills__list'>
                <Space direction='horizontal' wrap>
                  {skills
                    .filter(i => i.group === group)
                    .map((skill) => <SkillCard skill={skill} isDeleting={isDeleting} onDelete={onDelete} onUpdate={onUpdate} key={skill.id}/>)}
                </Space>
              </div>
            </div>
          )}
        </div>
      </Spin>
    </div>
  )
}

export default Skills
