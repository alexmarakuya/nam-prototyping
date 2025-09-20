'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

const AntdProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            // Primary colors for "30 Seconds to Fly" aviation theme
            colorPrimary: '#1890ff', // Sky blue
            colorSuccess: '#52c41a', // Green for success states
            colorWarning: '#faad14', // Orange for warnings
            colorError: '#ff4d4f', // Red for errors
            colorInfo: '#1890ff', // Info blue
            
            // Typography
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 14,
            
            // Layout
            borderRadius: 8,
            wireframe: false,
          },
          components: {
            Layout: {
              bodyBg: '#f5f5f5',
              headerBg: '#001529',
              siderBg: '#001529',
            },
            Menu: {
              darkItemBg: '#001529',
              darkItemSelectedBg: '#1890ff',
            },
            Card: {
              boxShadowTertiary: '0 2px 8px rgba(0, 0, 0, 0.06)',
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
