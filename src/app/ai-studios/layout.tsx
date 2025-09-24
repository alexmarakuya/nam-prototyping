import AntdProvider from '@/components/providers/AntdProvider';

export default function ThirtySecondsToFlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AntdProvider>
      {children}
    </AntdProvider>
  );
}

