'use client';

import React, { useState } from 'react';
import { Form, Input, Radio, Button, Space, Typography, Rate, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function TravelToolboxFeedbackPage() {
  const [form] = Form.useForm();
  const [satisfactionRating, setSatisfactionRating] = useState(0);
  const [easeRating, setEaseRating] = useState(0);
  const [meetsExpectations, setMeetsExpectations] = useState('');

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    // Handle form submission here
  };

  const onCancel = () => {
    // Handle cancel action
    console.log('Form cancelled');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#00175A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
        }}
      >
        {/* Header Section */}
        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
          <Title
            level={1}
            style={{
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold',
              margin: '0 0 16px 0',
              lineHeight: '1.2',
            }}
          >
            Travel Toolbox
          </Title>
          <Title
            level={2}
            style={{
              color: 'white',
              fontSize: '36px',
              fontWeight: 'bold',
              margin: '0 0 32px 0',
              lineHeight: '1.2',
            }}
          >
            User Feedback Form
          </Title>
          <Paragraph
            style={{
              color: 'white',
              fontSize: '16px',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            Thank you for using Travel Toolbox! Your feedback is invaluable as we continue to enhance 
            and improve our platform. Please share your experience with us - whether it's about 
            functionality, design, ease of use, or any suggestions you have. Your input helps us 
            deliver the best possible travel management experience for you and other users.
          </Paragraph>
        </div>

        {/* Form Section */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Close Button */}
          <Button
            type="text"
            icon={<CloseOutlined />}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              fontSize: '16px',
              color: '#6b7280',
            }}
            onClick={onCancel}
          />

          {/* Header */}
          <Title
            level={3}
            style={{
              color: '#374151',
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '32px',
              marginTop: '8px',
            }}
          >
            Provide Feedback
          </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          {/* Satisfaction Rating */}
          <Form.Item
            label={
              <span style={{ fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '16px', display: 'block' }}>
                How satisfied are you with the Travel Toolbox Pilot Program?
              </span>
            }
            name="satisfaction"
            style={{ marginBottom: '32px' }}
          >
            <Rate
              value={satisfactionRating}
              onChange={setSatisfactionRating}
              style={{ fontSize: '28px', color: '#fbbf24' }}
            />
          </Form.Item>

          {/* Ease of Use Rating */}
          <Form.Item
            label={
              <span style={{ fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '16px', display: 'block' }}>
                How easy is it for you to use the Pilot Program?
              </span>
            }
            name="ease"
            style={{ marginBottom: '32px' }}
          >
            <Rate
              value={easeRating}
              onChange={setEaseRating}
              style={{ fontSize: '28px', color: '#d1d5db' }}
            />
          </Form.Item>

          {/* Meets Expectations */}
          <Form.Item
            label={
              <span style={{ fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '16px', display: 'block' }}>
                Does the Pilot Program meet your expectations?
              </span>
            }
            name="expectations"
            style={{ marginBottom: '32px' }}
          >
            <Radio.Group
              value={meetsExpectations}
              onChange={(e) => setMeetsExpectations(e.target.value)}
              style={{ display: 'flex', gap: '24px' }}
            >
              <Radio
                value="yes"
                style={{ fontSize: '16px', color: '#374151' }}
              >
                Yes
              </Radio>
              <Radio
                value="no"
                style={{ fontSize: '16px', color: '#374151' }}
              >
                No
              </Radio>
            </Radio.Group>
          </Form.Item>

          {/* What do you like most */}
          <Form.Item
            label={
              <span style={{ fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '16px', display: 'block' }}>
                What do you like most about the Travel Toolbox Pilot Program?
              </span>
            }
            name="likeMost"
            style={{ marginBottom: '32px' }}
          >
            <TextArea
              placeholder="Write here..."
              autoSize={{ minRows: 4, maxRows: 6 }}
              style={{
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '16px',
                backgroundColor: '#f9fafb',
              }}
            />
          </Form.Item>

          {/* What do you like least */}
          <Form.Item
            label={
              <span style={{ fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '16px', display: 'block' }}>
                What do you like least?
              </span>
            }
            name="likeLeast"
            style={{ marginBottom: '32px' }}
          >
            <TextArea
              placeholder="Write here..."
              autoSize={{ minRows: 4, maxRows: 6 }}
              style={{
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '16px',
                backgroundColor: '#f9fafb',
              }}
            />
          </Form.Item>

          {/* Suggestions for improvement */}
          <Form.Item
            label={
              <span style={{ fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '16px', display: 'block' }}>
                Do you have any suggestions for improvement?
              </span>
            }
            name="suggestions"
            style={{ marginBottom: '32px' }}
          >
            <TextArea
              placeholder="Write here..."
              autoSize={{ minRows: 4, maxRows: 6 }}
              style={{
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '16px',
                backgroundColor: '#f9fafb',
              }}
            />
          </Form.Item>

          {/* Additional comments */}
          <Form.Item
            label={
              <span style={{ fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '16px', display: 'block' }}>
                Any additional comments?
              </span>
            }
            name="additionalComments"
            style={{ marginBottom: '40px' }}
          >
            <TextArea
              placeholder="Write here..."
              autoSize={{ minRows: 4, maxRows: 6 }}
              style={{
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '16px',
                backgroundColor: '#f9fafb',
              }}
            />
          </Form.Item>

          {/* Action Buttons */}
          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button
                onClick={onCancel}
                style={{
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  height: '40px',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                  border: '1px solid #d1d5db',
                  color: '#374151',
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: '#3b82f6',
                  borderColor: '#3b82f6',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  height: '40px',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                }}
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
        </div>
      </div>
    </div>
  );
}
