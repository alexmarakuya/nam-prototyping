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
} from 'antd';
import {
  InboxOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  EditOutlined,
  BellOutlined,
  SearchOutlined,
  PlusOutlined,
  MoreOutlined,
  SendOutlined,
  PaperClipOutlined,
  SmileOutlined,
  FileGifOutlined,
  ExpandOutlined,
  CopyOutlined,
  CaretDownOutlined,
  ExclamationCircleOutlined,
  CustomerServiceOutlined,
  RocketOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function ThirtySecondsToFlyPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  // const [expandedResponse, setExpandedResponse] = useState(false);

  // Mock data for flight support scenario
  const tickets = [
    {
      id: 1,
      customer: 'Sarah Mitchell',
      subject: 'Flight delay compensation - BA2847',
      status: 'open',
      priority: 'high',
      lastUpdate: '2 hours ago',
      avatar: 'SM',
      unread: true,
    },
    {
      id: 2,
      customer: 'James Rodriguez',
      subject: 'Baggage allowance for international flight',
      status: 'pending',
      priority: 'medium',
      lastUpdate: '4 hours ago',
      avatar: 'JR',
      unread: false,
    },
    {
      id: 3,
      customer: 'Emily Chen',
      subject: 'Seat upgrade request - Premium Economy',
      status: 'resolved',
      priority: 'low',
      lastUpdate: '1 day ago',
      avatar: 'EC',
      unread: false,
    },
  ];

  const menuItems = [
    {
      key: 'inbox',
      icon: <InboxOutlined />,
      label: 'Inbox',
      children: [
        { key: 'open', label: 'Open', extra: <Badge count={12} size="small" /> },
        { key: 'pending', label: 'Pending', extra: <Badge count={5} size="small" /> },
        { key: 'resolved', label: 'Resolved' },
      ],
    },
    {
      key: 'scheduled',
      icon: <ClockCircleOutlined />,
      label: 'Scheduled',
      extra: <Badge count={3} size="small" />,
    },
    {
      key: 'completed',
      icon: <CheckCircleOutlined />,
      label: 'Completed',
    },
    {
      key: 'drafts',
      icon: <EditOutlined />,
      label: 'Drafts',
      extra: <Badge count={2} size="small" />,
    },
  ];

  const userMenuItems = [
    { key: 'profile', label: 'Profile' },
    { key: 'settings', label: 'Settings' },
    { key: 'logout', label: 'Logout' },
  ];

  const statusMenuItems = [
    { key: 'open', label: 'Open' },
    { key: 'pending', label: 'Pending Review' },
    { key: 'resolved', label: 'Resolved' },
    { key: 'closed', label: 'Closed' },
  ];

  const handleNotificationClose = () => {
    setShowNotification(false);
    notification.success({
      message: 'Notifications Enabled',
      description: 'You will now receive real-time updates for new tickets.',
      placement: 'bottomLeft',
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Left Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={280}
        style={{
          background: '#001529',
        }}
      >
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Space>
            <RocketOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
            {!collapsed && (
              <Title level={4} style={{ color: 'white', margin: 0 }}>
                30 Seconds to Fly
              </Title>
            )}
          </Space>
        </div>
        
        <Menu
          theme="dark"
          defaultSelectedKeys={['open']}
          defaultOpenKeys={['inbox']}
          mode="inline"
          items={menuItems}
        />

        {!collapsed && (
          <div style={{ padding: '16px' }}>
            <Divider style={{ borderColor: '#434343' }} />
            <Text style={{ color: '#8c8c8c', fontSize: '12px' }}>TEAMS</Text>
            <div style={{ marginTop: '8px' }}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
                    <GlobalOutlined />
                  </Avatar>
                  <Text style={{ color: 'white', fontSize: '14px' }}>International</Text>
                  <Badge count={8} size="small" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Avatar size="small" style={{ backgroundColor: '#52c41a' }}>
                    <CustomerServiceOutlined />
                  </Avatar>
                  <Text style={{ color: 'white', fontSize: '14px' }}>Customer Care</Text>
                  <Badge count={3} size="small" />
                </div>
              </Space>
            </div>
          </div>
        )}
      </Sider>

      <Layout>
        {/* Main Content */}
        <Content style={{ background: '#f5f5f5' }}>
          <div style={{ padding: '16px', height: '100vh', display: 'flex', gap: '16px' }}>
            
            {/* Tickets List */}
            <Card
              title={
                <Space>
                  <InboxOutlined />
                  <span>Open Tickets</span>
                  <Badge count={12} />
                </Space>
              }
              extra={
                <Space>
                  <Button icon={<SearchOutlined />} />
                  <Button type="primary" icon={<PlusOutlined />}>
                    New Ticket
                  </Button>
                </Space>
              }
              style={{ width: 400, height: 'fit-content' }}
              bodyStyle={{ padding: 0 }}
            >
              <List
                dataSource={tickets}
                renderItem={(ticket) => (
                  <List.Item
                    style={{
                      padding: '16px',
                      backgroundColor: ticket.unread ? '#f0f9ff' : 'white',
                      borderLeft: ticket.unread ? '4px solid #1890ff' : 'none',
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge dot={ticket.unread}>
                          <Avatar style={{ backgroundColor: '#1890ff' }}>
                            {ticket.avatar}
                          </Avatar>
                        </Badge>
                      }
                      title={
                        <Space>
                          <Text strong>{ticket.customer}</Text>
                          <Tag
                            color={
                              ticket.priority === 'high'
                                ? 'red'
                                : ticket.priority === 'medium'
                                ? 'orange'
                                : 'green'
                            }
                          >
                            {ticket.priority}
                          </Tag>
                        </Space>
                      }
                      description={
                        <div>
                          <Text>{ticket.subject}</Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {ticket.lastUpdate}
                          </Text>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>

            {/* Ticket Details */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Ticket Header */}
              <Card>
                <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                  <div>
                    <Title level={4} style={{ margin: 0 }}>
                      Flight Delay Compensation - BA2847
                    </Title>
                    <Space style={{ marginTop: '8px' }}>
                      <Tag icon={<CustomerServiceOutlined />} color="blue">
                        Customer Service
                      </Tag>
                      <Tag>Ticket #CS-2024-001</Tag>
                    </Space>
                  </div>
                  <Space>
                    <Button icon={<MoreOutlined />} />
                    <Button icon={<ClockCircleOutlined />} />
                    <Dropdown
                      menu={{
                        items: userMenuItems,
                      }}
                    >
                      <Button>
                        <Space>
                          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
                            SM
                          </Avatar>
                          Sarah M.
                          <CaretDownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                    <Dropdown
                      menu={{
                        items: statusMenuItems,
                      }}
                    >
                      <Button>
                        <Space>
                          <ExclamationCircleOutlined style={{ color: '#1890ff' }} />
                          Open
                          <CaretDownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                  </Space>
                </div>
              </Card>

              {/* Messages */}
              <Card
                title="Conversation"
                style={{ flex: 1 }}
                bodyStyle={{ padding: 0, height: '400px', overflow: 'auto' }}
              >
                <div style={{ padding: '16px' }}>
                  {/* Customer Message */}
                  <Card size="small" style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <Avatar style={{ backgroundColor: '#52c41a' }}>SM</Avatar>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '8px' }}>
                          <Text strong>Sarah Mitchell</Text>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            Today, 2:15 PM
                          </Text>
                        </div>
                        <Paragraph>
                          Hello, my flight BA2847 from London to New York was delayed by 4 hours yesterday. 
                          I understand I may be entitled to compensation under EU regulations. Could you please 
                          help me with the claim process? My booking reference is ABC123.
                        </Paragraph>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          Sent via Email • sarah.mitchell@email.com
                        </Text>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>

              {/* Status Bar */}
              <Card size="small">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Space>
                    <ExclamationCircleOutlined style={{ color: '#1890ff' }} />
                    <Text>Open in Customer Service</Text>
                    <Button type="link" size="small">
                      Change Status
                    </Button>
                  </Space>
                </div>
              </Card>

              {/* Reply Input */}
              <Card title="Reply" size="small">
                <TextArea
                  placeholder="Type your response..."
                  autoSize={{ minRows: 3, maxRows: 6 }}
                  style={{ marginBottom: '12px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                  <Space>
                    <Button icon={<PaperClipOutlined />} />
                    <Button icon={<SmileOutlined />} />
                    <Button icon={<FileGifOutlined />} />
                    <Button icon={<ExpandOutlined />} />
                  </Space>
                  <Button type="primary" icon={<SendOutlined />}>
                    Send Reply
                  </Button>
                </div>
              </Card>
            </div>

            {/* AI Assistant Sidebar */}
            <Card
              title={
                <Space>
                  <RocketOutlined style={{ color: '#1890ff' }} />
                  <span>Flight Assistant AI</span>
                </Space>
              }
              style={{ width: 350, height: 'fit-content' }}
              extra={<Button type="text" icon={<MoreOutlined />} />}
            >
              {/* Case Overview */}
              <div style={{ marginBottom: '16px' }}>
                <Title level={5}>Case Overview</Title>
                <Space wrap>
                  <Tag color="blue">Flight: BA2847</Tag>
                  <Tag color="green">Route: LHR → JFK</Tag>
                </Space>
                <Paragraph style={{ fontSize: '13px', marginTop: '8px' }}>
                  Customer experienced a 4-hour delay on BA2847. Under EU261 regulations, 
                  passenger is entitled to €600 compensation for long-haul delays over 3 hours.
                </Paragraph>
              </div>

              <Divider />

              {/* Quick Actions */}
              <div style={{ marginBottom: '16px' }}>
                <Title level={5}>Quick Actions</Title>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button block>Check EU261 Eligibility</Button>
                  <Button block>Generate Compensation Form</Button>
                  <Button block type="link">
                    View Flight Regulations →
                  </Button>
                </Space>
              </div>

              <Divider />

              {/* Smart Response */}
              <Collapse
                items={[
                  {
                    key: '1',
                    label: (
                      <Space>
                        <Text strong>Smart Response Draft</Text>
                        <Tag color="blue">AI Generated</Tag>
                      </Space>
                    ),
                    children: (
                      <div>
                        <Paragraph style={{ fontSize: '13px' }}>
                          <Text strong>Dear Sarah,</Text>
                          <br /><br />
                          Thank you for contacting 30 Seconds to Fly regarding your delayed flight BA2847.
                          <br /><br />
                          I can confirm that your flight qualifies for compensation under EU Regulation 261/2004. 
                          For a delay of 4+ hours on a long-haul flight (LHR-JFK), you are entitled to €600 compensation.
                          <br /><br />
                          I&apos;ll process your claim immediately using booking reference ABC123. You can expect 
                          compensation within 7-10 business days.
                          <br /><br />
                          Best regards,<br />
                          30 Seconds to Fly Customer Service
                        </Paragraph>
                        <Space>
                          <Tooltip title="Copy to clipboard">
                            <Button size="small" icon={<CopyOutlined />} />
                          </Tooltip>
                          <Button size="small" type="primary">
                            Use Response
                          </Button>
                        </Space>
                      </div>
                    ),
                    extra: (
                      <Space>
                        <Tooltip title="Copy">
                          <Button size="small" type="text" icon={<CopyOutlined />} />
                        </Tooltip>
                      </Space>
                    ),
                  },
                ]}
                defaultActiveKey={['1']}
              />
            </Card>
          </div>
        </Content>
      </Layout>

      {/* Notification */}
      {showNotification && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: 1000,
          }}
        >
          <Card
            size="small"
            style={{
              width: '300px',
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
            }}
            bodyStyle={{ padding: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
              <BellOutlined style={{ color: 'white', fontSize: '18px', marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                <Text strong style={{ color: 'white' }}>
                  Enable Flight Notifications
                </Text>
                <br />
                <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>
                  Get instant alerts for flight delays, gate changes, and urgent tickets.
                </Text>
                <div style={{ marginTop: '12px' }}>
                  <Button
                    size="small"
                    style={{ backgroundColor: 'white', color: '#1890ff', border: 'none' }}
                    onClick={handleNotificationClose}
                  >
                    Enable
                  </Button>
                  <Button
                    size="small"
                    type="text"
                    style={{ color: 'white', marginLeft: '8px' }}
                    onClick={() => setShowNotification(false)}
                  >
                    Later
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Layout>
  );
}
