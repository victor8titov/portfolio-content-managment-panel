import React, { FC, useCallback, useState } from 'react'
import { Button, Form, Input, Modal, Space, Spin, Upload } from 'antd'
import { RcFile } from 'antd/lib/upload'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import { UploadFile } from 'antd/lib/upload/interface'

import useFormManager from './hooks/form-manager'
import './styles.scss'

type Props = {
  onLoaded?: () => void;
};

const ImageLoader: FC<Props> = ({ onLoaded }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const callbackAfterSuccessfulSaving = useCallback(() => {
    setIsOpen(false)
    setFileList([])
    if (onLoaded) onLoaded()
  }, [onLoaded])

  const { form, onSave, isUploading } = useFormManager(callbackAfterSuccessfulSaving)

  const beforeUpload = (file: RcFile) => {
    form.setFields([{ name: 'name', value: file.name }])

    setFileList((state) => [...state, file])
    return false
  }

  const handleCancel = () => {
    setIsOpen(false)
    form.resetFields()
    setFileList([])
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleRemove = () => {
    setFileList([])
  }

  return (
    <>
      <div className="image-loader" onClick={handleOpenModal}>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>

      <Modal
        visible={isOpen}
        title="Upload image"
        footer={null}
        onCancel={handleCancel}>
        <Spin spinning={isUploading}>
          <Form
            form={form}
            autoComplete="off"
            labelAlign="left"
            layout="horizontal">
            <Form.Item name="file" required rules={[{ required: true }]}>
              <Upload
                listType="text"
                beforeUpload={beforeUpload}
                fileList={fileList}
                maxCount={1}
                onRemove={handleRemove}>
                {fileList.length < 1
                  ? <Button icon={<UploadOutlined />}>Upload</Button>
                  : null
                }
              </Upload>
            </Form.Item>

            <Form.Item label="Name" name="name" rules={[{ max: 1000 }]}>
              <Input placeholder="File name" />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[{ max: 1000 }]}
              label="Description">
              <Input placeholder="File description" />
            </Form.Item>
            <Space>
              <Button type="primary" loading={isUploading} onClick={onSave}>
                Save
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form>
        </Spin>
      </Modal>
    </>
  )
}

export default ImageLoader
