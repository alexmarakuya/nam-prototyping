'use client';

import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Card,
  Avatar,
  Badge,
  Button,
  Input,
  Dropdown,
  Space,
  Typography,
  Tag,
  Divider,
  List,
  Tooltip,
  notification,
  Collapse,
  Progress,
  Statistic,
  Row,
  Col,
  Table,
  DatePicker,
} from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  PlusOutlined,
  MoreOutlined,
  SendOutlined,
  FileTextOutlined,
  GlobalOutlined,
  CarOutlined,
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  RiseOutlined,
  FallOutlined,
  UserOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';

const { Sider, Content, Header } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

export default function AmexGBTConsultingPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedClient, setSelectedClient] = useState('microsoft');

  // Mock data for business travel management
  const clients = [
    {
      id: 'microsoft',
      name: 'Microsoft Corporation',
      logo: 'MS',
      travelers: 2847,
      monthlySpend: 1250000,
      savings: 18.5,
      status: 'active',
      priority: 'enterprise',
    },
    {
      id: 'salesforce',
      name: 'Salesforce Inc.',
      logo: 'SF',
      travelers: 1623,
      monthlySpend: 890000,
      savings: 22.1,
      status: 'active',
      priority: 'enterprise',
    },
    {
      id: 'adobe',
      name: 'Adobe Systems',
      logo: 'AD',
      travelers: 945,
      monthlySpend: 567000,
      savings: 15.8,
      status: 'active',
      priority: 'premium',
    },
  ];

  const recentBookings = [
    {
      id: 1,
      traveler: 'Sarah Johnson',
      destination: 'London → New York',
      date: '2024-03-15',
      type: 'Flight + Hotel',
      status: 'confirmed',
      cost: 2450,
      savings: 320,
    },
    {
      id: 2,
      traveler: 'Michael Chen',
      destination: 'San Francisco → Tokyo',
      date: '2024-03-18',
      type: 'Flight',
      status: 'pending',
      cost: 1890,
      savings: 180,
    },
    {
      id: 3,
      traveler: 'Emma Rodriguez',
      destination: 'Chicago → Berlin',
      date: '2024-03-20',
      type: 'Flight + Car',
      status: 'confirmed',
      cost: 1650,
      savings: 245,
    },
  ];

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'clients',
      icon: <TeamOutlined />,
      label: 'Client Management',
      children: [
        { key: 'active-clients', label: 'Active Clients', extra: <Badge count={12} size="small" /> },
        { key: 'onboarding', label: 'Onboarding', extra: <Badge count={3} size="small" /> },
        { key: 'renewals', label: 'Renewals' },
      ],
    },
    {
      key: 'bookings',
      icon: <CalendarOutlined />,
      label: 'Travel Bookings',
      extra: <Badge count={24} size="small" />,
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics & Reports',
    },
    {
      key: 'finance',
      icon: <DollarOutlined />,
      label: 'Financial Management',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const userMenuItems = [
    { key: 'profile', label: 'Profile' },
    { key: 'preferences', label: 'Preferences' },
    { key: 'logout', label: 'Logout' },
  ];

  const bookingColumns = [
    {
      title: 'Traveler',
      dataIndex: 'traveler',
      key: 'traveler',
      render: (text: string) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
            {text.split(' ').map(n => n[0]).join('')}
          </Avatar>
          {text}
        </Space>
      ),
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color="blue">{type}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'confirmed' ? 'green' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost: number) => `$${cost.toLocaleString()}`,
    },
    {
      title: 'Savings',
      dataIndex: 'savings',
      key: 'savings',
      render: (savings: number) => (
        <Text style={{ color: '#52c41a' }}>
          +${savings}
        </Text>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Top Header */}
      <Header style={{ background: '#001529', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Space>
          <CreditCardOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
          <Title level={4} style={{ color: 'white', margin: 0 }}>
            AmexGBT Consulting Portal
          </Title>
        </Space>
        <Space>
          <Button type="text" icon={<BellOutlined />} style={{ color: 'white' }} />
          <Dropdown menu={{ items: userMenuItems }}>
            <Button type="text" style={{ color: 'white' }}>
              <Space>
                <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
                  JD
                </Avatar>
                John Davis
              </Space>
            </Button>
          </Dropdown>
        </Space>
      </Header>

      <Layout>
        {/* Left Sidebar */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={280}
          style={{ background: '#f5f5f5' }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            defaultOpenKeys={['clients']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>

        {/* Main Content */}
        <Content style={{ background: '#f0f2f5', padding: '24px' }}>
          
          {/* Client Selector */}
          <Card style={{ marginBottom: '24px' }}>
            <Row gutter={16} align="middle">
              <Col>
                <Text strong>Current Client:</Text>
              </Col>
              <Col>
                <Dropdown
                  menu={{
                    items: clients.map(client => ({
                      key: client.id,
                      label: (
                        <Space>
                          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
                            {client.logo}
                          </Avatar>
                          {client.name}
                        </Space>
                      ),
                    })),
                    onClick: ({ key }) => setSelectedClient(key),
                  }}
                >
                  <Button>
                    <Space>
                      <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
                        {clients.find(c => c.id === selectedClient)?.logo}
                      </Avatar>
                      {clients.find(c => c.id === selectedClient)?.name}
                    </Space>
                  </Button>
                </Dropdown>
              </Col>
              <Col flex="auto">
                <div style={{ textAlign: 'right' }}>
                  <Space>
                    <RangePicker />
                    <Button icon={<SearchOutlined />} />
                    <Button type="primary" icon={<PlusOutlined />}>
                      New Booking
                    </Button>
                  </Space>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Key Metrics */}
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Active Travelers"
                  value={clients.find(c => c.id === selectedClient)?.travelers}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Monthly Spend"
                  value={clients.find(c => c.id === selectedClient)?.monthlySpend}
                  prefix={<DollarOutlined />}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Cost Savings"
                  value={clients.find(c => c.id === selectedClient)?.savings}
                  suffix="%"
                  prefix={<RiseOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Pending Approvals"
                  value={7}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* Recent Bookings */}
            <Col span={16}>
              <Card
                title={
                  <Space>
                    <CalendarOutlined />
                    Recent Travel Bookings
                  </Space>
                }
                extra={
                  <Button type="link">View All →</Button>
                }
              >
                <Table
                  dataSource={recentBookings}
                  columns={bookingColumns}
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>

            {/* Travel Insights */}
            <Col span={8}>
              <Card
                title={
                  <Space>
                    <BarChartOutlined />
                    Travel Insights
                  </Space>
                }
                style={{ marginBottom: '16px' }}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text strong>Top Destinations</Text>
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <Text>New York</Text>
                        <Text>32%</Text>
                      </div>
                      <Progress percent={32} size="small" />
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <Text>London</Text>
                        <Text>28%</Text>
                      </div>
                      <Progress percent={28} size="small" />
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <Text>Tokyo</Text>
                        <Text>18%</Text>
                      </div>
                      <Progress percent={18} size="small" />
                    </div>
                  </div>
                </Space>
              </Card>

              {/* Quick Actions */}
              <Card
                title="Quick Actions"
                size="small"
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button block icon={<PlusOutlined />}>
                    New Travel Request
                  </Button>
                  <Button block icon={<FileTextOutlined />}>
                    Generate Report
                  </Button>
                  <Button block icon={<SettingOutlined />}>
                    Policy Settings
                  </Button>
                  <Button block icon={<PhoneOutlined />}>
                    24/7 Support
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>

          {/* Travel Policy Compliance */}
          <Row gutter={16} style={{ marginTop: '24px' }}>
            <Col span={12}>
              <Card
                title={
                  <Space>
                    <CheckCircleOutlined />
                    Policy Compliance
                  </Space>
                }
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Text>Flight Bookings</Text>
                      <Text strong style={{ color: '#52c41a' }}>94% Compliant</Text>
                    </div>
                    <Progress percent={94} status="success" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Text>Hotel Bookings</Text>
                      <Text strong style={{ color: '#52c41a' }}>87% Compliant</Text>
                    </div>
                    <Progress percent={87} status="success" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Text>Ground Transportation</Text>
                      <Text strong style={{ color: '#faad14' }}>76% Compliant</Text>
                    </div>
                    <Progress percent={76} status="active" />
                  </div>
                </Space>
              </Card>
            </Col>

            <Col span={12}>
              <Card
                title={
                  <Space>
                    <ExclamationCircleOutlined />
                    Alerts & Notifications
                  </Space>
                }
              >
                <List
                  size="small"
                  dataSource={[
                    {
                      title: 'Policy Violation Alert',
                      description: '3 bookings exceed hotel rate limits',
                      type: 'warning',
                      time: '2 hours ago',
                    },
                    {
                      title: 'Travel Advisory',
                      description: 'Weather delays expected in NYC',
                      type: 'info',
                      time: '4 hours ago',
                    },
                    {
                      title: 'Cost Savings Opportunity',
                      description: 'Alternative flight options available',
                      type: 'success',
                      time: '6 hours ago',
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            size="small"
                            style={{
                              backgroundColor:
                                item.type === 'warning'
                                  ? '#faad14'
                                  : item.type === 'success'
                                  ? '#52c41a'
                                  : '#1890ff',
                            }}
                          >
                            {item.type === 'warning' ? '!' : item.type === 'success' ? '✓' : 'i'}
                          </Avatar>
                        }
                        title={<Text strong>{item.title}</Text>}
                        description={
                          <div>
                            <Text>{item.description}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {item.time}
                            </Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
