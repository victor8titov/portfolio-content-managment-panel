import React, { FC, useCallback, useState, BaseSyntheticEvent, useEffect } from 'react'
import { Input, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import CheckableTag from 'antd/lib/tag/CheckableTag'
import './styles.scss'

type Props = {
  value?: string[]
  tags?: string[]
  onChange?: (value: string[]) => void
  type?: 'select-one' | 'multiselect'
  max?: number
}

const ChooseTags: FC<Props> = (props) => {
  const { onChange, value = [], type = 'multiselect', max = 50 } = props

  const [tags, setTags] = useState<string[]>([])
  const [inputVisible, setInputVisible] = useState<boolean>(false)

  useEffect(() => {
    if (onChange) onChange(value)
    // eslint-disable-next-line
  }, [])

  const setValue = useCallback((newValue: string[]) => {
    if (!onChange) return

    if (type === 'select-one') onChange([newValue.pop() || ''])
    if (type === 'multiselect') onChange(newValue)
  }, [onChange, type])

  const showInput = useCallback(() => {
    setInputVisible(true)
  }, [])

  const handleChangeTag = useCallback((tag: string) => (checked: boolean) => {
    const _value = value.filter(i => i !== tag)
    if (checked) {
      setValue([..._value, tag])
    } else {
      setValue(_value)
    }
  }, [setValue, value])

  const handleInputConfirm = useCallback((e: BaseSyntheticEvent) => {
    const inputValue = e.target.value

    if (inputValue && !tags.some(i => i === inputValue)) {
      setTags(state => [...state, inputValue])
      setValue([...value, inputValue])
      e.target.value = ''
    }
    setInputVisible(false)
  }, [value, setValue, tags])

  useEffect(() => {
    if (props.tags && props.tags.length) setTags(props.tags.filter(i => i))
  }, [props.tags])

  return (
    <div className='choose-tag'>
      {tags.map((tag) => (
        <CheckableTag
          className='choose-tag__tag'
          key={tag}
          checked={value.some(i => i === tag)}
          onChange={handleChangeTag(tag)}
        >
          {tag}
        </CheckableTag>
      ))}

      {inputVisible && tags.length <= max && (
        <Input
          type="text"
          className='choose-tag__input'
          autoFocus
          style={{ width: 100 }}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}

      {!inputVisible && tags.length <= max && (
        <Tag onClick={showInput} className='choose-tag__tag-add'>
          <PlusOutlined /> Add new
        </Tag>
      )}
    </div>
  )
}

export default ChooseTags
