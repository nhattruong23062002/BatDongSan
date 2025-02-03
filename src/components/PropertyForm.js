import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Button, Checkbox, Row, Col, Upload } from "antd";
import axios from "axios";
import { API_URL } from "../config/apiUrls";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;

const PropertyForm = ({ initialData = {}, onSubmit }) => {
    const [form] = Form.useForm();
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [mainImageURL, setMainImageURL] = useState([]);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const response = await axios.get(`${API_URL}/propertyTypes`);
                const filteredData = response.data.payload.slice(1);
                setPropertyTypes(filteredData);
            } catch (error) {
                console.error("Error fetching property types:", error);
            }
        };
        fetchPropertyTypes();
    }, []);


    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
            if (initialData.mainImageURL) {
                setMainImageURL([
                    {
                        uid: "-1",
                        name: "main_image.png",
                        status: "done",
                        url: initialData.mainImageURL,
                    },
                ]);
            }
            if (initialData.additionalImages) {
                setAdditionalImages(
                    initialData.additionalImages.map((url, index) => ({
                        uid: `-${index + 2}`,
                        name: `gallery_image_${index + 1}.png`,
                        status: "done",
                        url,
                    }))
                );
            }
        }
    }, [initialData, form]);


    const handleFinish = async (values) => {
        setLoading(true);
        try {
            await onSubmit({
                ...values,
                mainImageURL,
                additionalImages,
            });
        } finally {
            setLoading(false);
        }
    };


    const handleMainImageChange = ({ fileList }) => {
        setMainImageURL(fileList);
    };

    const handleGalleryImagesChange = ({ fileList }) => {
        setAdditionalImages(fileList);
    };


    return (
        <div className="min-h-[500px] flex items-center justify-center px-2 sm:px-4 lg:px-0">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    {initialData._id ? "부동산 수정" : "새 부동산 추가"}
                </h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    initialValues={{
                        furnished: false,
                        status: "Available",
                    }}
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label="제목"
                                name="title"
                                rules={[{ required: true, message: "제목은 필수 입력 사항입니다." }]}
                            >
                                <Input placeholder="부동산 제목을 입력하세요" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="위치"
                                name="address"
                                rules={[{ required: true, message: "위치는 필수 입력 사항입니다." }]}
                            >
                                <Input placeholder="주소를 입력하세요" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item
                                label="가격 (đ)"
                                name="price"
                                rules={[{ required: true, message: "가격은 필수 입력 사항입니다." }]}
                            >
                                <InputNumber
                                    placeholder="가격을 입력하세요"
                                    style={{ width: "100%" }}
                                    formatter={(value) =>
                                        `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="보증금 (đ)"
                                name="deposit"
                                rules={[{ required: true, message: "보증금은 필수 입력 사항입니다." }]}
                            >
                                <InputNumber
                                    placeholder="보증금을 입력하세요"
                                    style={{ width: "100%" }}
                                    formatter={(value) =>
                                        `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="거래 유형"
                                name="listingType"
                                rules={[{ required: true, message: "거래 유형을 선택하세요." }]}
                            >
                                <Select placeholder="거래 유형을 선택하세요">
                                    <Option value="Rent">임대</Option>
                                    <Option value="Sale">판매</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item
                                label="부동산 유형"
                                name="propertyTypeId"
                                rules={[{ required: true, message: "부동산 유형은 필수 입력 사항입니다." }]}
                            >
                                <Select placeholder="부동산 유형을 선택하세요">
                                    {propertyTypes.map((type) => (
                                        <Option key={type._id} value={type._id}>
                                            {type.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="면적 (㎡)"
                                name="area"
                                rules={[{ required: true, message: "면적은 필수 입력 사항입니다." }]}
                            >
                                <InputNumber
                                    placeholder="면적을 입력하세요"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="상태"
                                name="status"
                                rules={[{ required: true, message: "상태는 필수 입력 사항입니다." }]}
                            >
                                <Select placeholder="상태를 선택하세요">
                                    <Option value="Available">사용 가능</Option>
                                    <Option value="Rented">임대됨</Option>
                                    <Option value="Sold">판매됨</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item
                                label="침실 수"
                                name="bedrooms"
                                rules={[{ required: true, message: "침실 수는 필수 입력 사항입니다." }]}
                            >
                                <InputNumber
                                    placeholder="침실 수를 입력하세요"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="화장실 수"
                                name="bathrooms"
                                rules={[{ required: true, message: "화장실 수는 필수 입력 사항입니다." }]}
                            >
                                <InputNumber
                                    placeholder="화장실 수를 입력하세요"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="방 개수/층 수"
                                name="numberRoom"
                                rules={[{ required: true, message: "방 개수는 필수 입력 사항입니다." }]}
                            >
                                <Input placeholder="방 개수를 입력하세요" style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item
                                label="유닛 타입"
                                name="unitType"
                                rules={[{ required: true, message: "유닛 타입은 필수 입력 사항입니다." }]}
                            >
                                <Input placeholder="유닛 타입을 입력하세요" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="빌딩 이름"
                                name="building"
                            >
                                <Input placeholder="빌딩 이름을 입력하세요" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="임대 기간"
                                name="leaseTerm"
                            >
                                <Input placeholder="임대 기간을 입력하세요 (예: 12개월)" style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="설명"
                                name="description"
                            >
                                <Input.TextArea
                                    placeholder="부동산에 대한 설명을 입력하세요."
                                    rows={4}
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item
                                label="대표 이미지 (메인)"
                                name="mainImageURL"
                                rules={[{ required: true, message: "대표 이미지는 필수 입력 사항입니다." }]}
                            >
                                <Upload
                                    listType="picture-card"
                                    fileList={mainImageURL}
                                    onChange={handleMainImageChange}
                                    beforeUpload={() => false}
                                >
                                    {mainImageURL.length < 1 && (
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item label="갤러리 이미지">
                                <Upload
                                    listType="picture-card"
                                    fileList={additionalImages}
                                    onChange={handleGalleryImagesChange}
                                    beforeUpload={() => false}
                                    multiple
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full" disabled={loading} >
                            {loading ? <LoadingOutlined /> : initialData._id ? "수정 저장" : "부동산 추가"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default PropertyForm;
