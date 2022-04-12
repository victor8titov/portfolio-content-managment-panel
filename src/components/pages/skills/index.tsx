import React, { FC, useCallback, useState } from 'react'
import { Affix, Button, Divider, Space, Spin, Switch } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'

import SkillCard from './skill-card'
import useSkillsManager from './hooks/skills-manager'
import { Language } from '../../../types/common'
import './styles.scss'

const Skills: FC = () => {
  const [language, setLanguage] = useState<Language>(Language.EN)
  const { skills, groups, isLoading, onUpdate, onDelete, isDeleting, onAddNew } = useSkillsManager(language)

  const handleChangeLanguage = useCallback((checked: boolean) => {
    setLanguage(checked ? Language.EN : Language.RU)
  }, [])

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

        <Switch
          checkedChildren={'En'}
          unCheckedChildren={'Ru'}
          onChange={handleChangeLanguage}
          defaultChecked
        />
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
