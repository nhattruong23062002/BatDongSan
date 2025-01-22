import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import UserFormModal from '../components/ModalUser';
import { addUser, deleteUser, getUsers, updateUser } from '../services/userService';
import { ToastContainer, toast } from "react-toastify";

const ManageUser = () => {
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleAddUser = () => {
        setEditingUser(null);
        setIsModalVisible(true);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsModalVisible(true);
    };

    const handleSubmit = async (userData) => {
        try {
            if (editingUser) {
                const updatedUser = await updateUser(editingUser._id, userData);
                toast.success("사용자가 성공적으로 업데이트되었습니다.");
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === editingUser._id ? updatedUser : user
                    )
                );
            } else {
                const newUser = await addUser(userData);
                toast.success("사용자가 성공적으로 추가되었습니다.");
                setUsers((prevUsers) => [...prevUsers, newUser]);
            }
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error submitting user:", error);
            toast.error("서버 요청에 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const users = await getUsers();
                setUsers(users);
            } catch (error) {
                console.error("Error fetching property types:", error);
            }
        };

        getAllUsers();
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            toast.success("사용자가 성공적으로 삭제되었습니다.");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("사용자를 삭제하는 중 오류가 발생했습니다.");
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
                        display: 'block',
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
                    color: filtered ? '#1677ff' : undefined,
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
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: '이름',
            dataIndex: 'fullName',
            key: 'fullName',
            width: '20%',
            ...getColumnSearchProps('fullName'),
        },
        {
            title: '이메일',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            ...getColumnSearchProps('email'),
        },
        {
            title: '전화번호',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: '20%',
            ...getColumnSearchProps('phoneNumber'),
        },
        {
            title: '역할',
            dataIndex: 'role',
            key: 'role',
            width: '20%',
            ...getColumnSearchProps('role'),
        },
        {
            title: '작업',
            key: 'action',
            width: '20%',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEditUser(record)}
                    >
                        수정
                    </Button>
                    <Popconfirm
                        title="이 사용자를 삭제하시겠습니까?"
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
            <h1 className='text-3xl text-center pb-10'>사용자 관리</h1>
            <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={handleAddUser}
            >
                추가 사용자
            </Button>
            <UserFormModal
                visible={isModalVisible}
                initialData={editingUser}
                onSubmit={handleSubmit}
                onCancel={() => setIsModalVisible(false)}
            />
            <Table columns={columns} dataSource={users} rowKey="_id" />
            <ToastContainer />
        </>
    );
};

export default ManageUser;
