import React, { useEffect } from "react";
import { Form, Input, Button, Modal, Select } from "antd";

const UserFormModal = ({ visible, initialData = {}, onSubmit, onCancel }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                fullName: initialData?.fullName || "",
                email: initialData?.email || "",
                phoneNumber: initialData?.phoneNumber || "",
                role: initialData?.role || "",
                password: "",
            });
        }
    }, [visible, initialData, form]);

    const handleFinish = (values) => {
        onSubmit(values);
        form.resetFields();
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title={initialData ? "사용자 편집" : "새 사용자 추가"}
            visible={visible}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                }}
            >
                <Form.Item
                    label="성함"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: "이름은 필수 입력 사항입니다.",
                        },
                    ]}
                >
                    <Input placeholder="이름을 입력하세요" />
                </Form.Item>

                <Form.Item
                    label="이메일"
                    name="email"
                    rules={[
                        {
                            type: "email",
                            message: "유효한 이메일을 입력하세요.",
                        },
                        {
                            required: true,
                            message: "이메일은 필수 입력 사항입니다.",
                        },
                    ]}
                >
                    <Input placeholder="이메일을 입력하세요" />
                </Form.Item>

                <Form.Item
                    label="전화번호"
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: "전화번호는 필수 입력 사항입니다.",
                        },
                    ]}
                >
                    <Input placeholder="전화번호를 입력하세요" />
                </Form.Item>

                <Form.Item
                    label="역할"
                    name="role"
                    initialValue="user"
                    rules={[
                        {
                            required: true,
                            message: "역할은 필수 입력 사항입니다.",
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="user">User</Select.Option>
                        <Select.Option value="admin">Admin</Select.Option>
                    </Select>
                </Form.Item>

                {!initialData && (
                    <Form.Item
                        label="비밀번호"
                        name="password"
                        rules={
                            [
                                {
                                    required: true,
                                    message: "비밀번호는 필수 입력 사항입니다.",
                                },
                            ]
                        }
                    >
                        <Input.Password placeholder="비밀번호를 입력하세요" />
                    </Form.Item>
                )}

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        {initialData ? "수정 저장" : "사용자 추가"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserFormModal;
