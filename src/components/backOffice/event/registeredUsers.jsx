import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch all events
        const eventsResponse = await axios.get(`http://localhost:3000/events`);
        const events = eventsResponse.data;
    
        // For each event, fetch its users
        let allUsers = [];
        for (const event of events) {
          const usersResponse = await axios.get(`http://localhost:3000/events/event/${event._id}/users`);
          const usersWithEventInfo = usersResponse.data.map(user => ({ ...user, eventTitle: event.title, eventDate: event.date, uniqueKey: `${user._id}-${event._id}` }));
          allUsers = [...allUsers, ...usersWithEventInfo];
        }
    
        // Remove duplicates
        const uniqueUsers = Array.from(new Set(allUsers.map(user => user.uniqueKey)))
          .map(key => allUsers.find(user => user.uniqueKey === key));
    
        setUsers(uniqueUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'fullname',
      ...getColumnSearchProps('fullname'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Event',
      dataIndex: 'eventTitle',
      key: 'eventTitle',
      ...getColumnSearchProps('eventTitle'),
    },
    {
      title: 'Date',
      dataIndex: 'eventDate',
      key: 'eventDate',
      render: text => new Date(text).toLocaleDateString(),
    },
  ];

  return (
    <div className="container">
      <h1 className="my-3">Registered Users</h1>
      <Table columns={columns} dataSource={users} rowKey="uniqueKey" />
    </div>
  );
};
export default RegisteredUsers;