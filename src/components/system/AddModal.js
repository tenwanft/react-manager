import React, { useState } from 'react';
import { Modal, Form, Input, Select} from 'antd';
const { Option } = Select
export function AddModal({ visible, onCreate, onCancel }) {
    const [form] = Form.useForm();
    return <>
        <Modal
            visible={visible}
            title="新增"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="type"
                    label="类型"
                    rules={[
                        {
                            required: true,
                            message: '请选择类型',
                        },
                    ]}
                >
                    <Select>
                        <Option value={'menu'}>menu</Option>
                        <Option value={'route'}>route</Option>
                        <Option value={'button'}>button</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="title"
                           label="菜单名称"
                           rules={[
                               {
                                   required: true,
                                   message: '请输入菜单名称',
                               },
                           ]}
                >
                    <Input placeholder={'请输入菜单名称'} />
                </Form.Item>
                <Form.Item name="url"
                           label="路由地址"
                >
                    <Input placeholder={'请输入路由地址'} />
                </Form.Item>
            </Form>
        </Modal>
    </>
}
