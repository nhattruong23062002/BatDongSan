import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Popconfirm } from "antd";
import Highlighter from "react-highlight-words";
import { ToastContainer, toast } from "react-toastify";
import {
    deleteProperty,
    getProperties,
} from "../services/propertyService";
import { useLocation, useNavigate } from "react-router-dom";

const ManageProperty = () => {
    const [searchText, setSearchText] = useState("");
    const [properties, setProperties] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleAddProperty = () => {
        navigate("/admin/createProperty");
    };

    const handleEditProperty = (property) => {
        navigate(`/admin/editProperty/${property._id}`)
    };


    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message, { autoClose: 1500 });
        }
    }, [location]);

    useEffect(() => {
        const getAllProperties = async () => {
            try {
                const properties = await getProperties();
                setProperties(properties);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        getAllProperties();
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const handleDelete = async (propertyId) => {
        try {
            await deleteProperty(propertyId);
            setProperties((prevProperties) =>
                prevProperties.filter((property) => property._id !== propertyId)
            );
            toast.success("부동산이 성공적으로 삭제되었습니다.", { autoClose: 1500 });
        } catch (error) {
            console.error("Error deleting property:", error);
            toast.error("부동산 삭제 중 오류가 발생했습니다.", { autoClose: 1500 });
        }
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`${dataIndex} 검색`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        검색
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        초기화
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        필터
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        닫기
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: "제목",
            dataIndex: "title",
            key: "title",
            width: "18%",
            ...getColumnSearchProps("title"),
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: "가격",
            dataIndex: "price",
            key: "price",
            width: "12%",
            render: (text) => {
                return new Intl.NumberFormat("ko-KR", {
                    style: "decimal",
                }).format(text);
            },
        },
        {
            title: "위치",
            dataIndex: "address",
            key: "address",
            width: "22%",
        },
        {
            title: "부동산 유형",
            dataIndex: "propertyTypes",
            key: "propertyTypes",
            width: "12%",
            render: (propertyTypes) => (propertyTypes?.name ? propertyTypes.name : "N/A"),
        },
        {
            title: "면적 (㎡)",
            dataIndex: "area",
            key: "area",
            width: "8%",
        },
        {
            title: "거래 유형",
            dataIndex: "listingType",
            key: "listingType",
            width: "8%",
            render: (value) => (value === "Sell" ? "판매" : "임대"),
        },
        {
            title: "방 개수/층 수",
            dataIndex: "numberRoom",
            key: "numberRoom",
            width: "12%",
        },
        {
            title: "상태",
            dataIndex: "status",
            key: "status",
            width: "10%",
            render: (value) => {
                const statusMap = {
                    Available: "사용 가능",
                    Rented: "임대됨",
                    Sold: "판매됨",
                };
                return statusMap[value] || "알 수 없음";
            },
        },

        {
            title: "작업",
            key: "action",
            width: "10%",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEditProperty(record)}
                    >
                        수정
                    </Button>
                    <Popconfirm
                        title="이 부동산을 삭제하시겠습니까?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="예"
                        cancelText="아니요"
                    >
                        <Button type="link" icon={<DeleteOutlined />} danger>
                            삭제
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <h1 className="text-3xl text-center pb-10">부동산 관리</h1>
            <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={handleAddProperty}
                className="mb-4"
            >
                추가 부동산
            </Button>
            <Table columns={columns} dataSource={properties} rowKey="_id" />
            <ToastContainer />
        </>
    );
};

export default ManageProperty;
