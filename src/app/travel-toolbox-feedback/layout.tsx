import AntdProvider from '@/components/providers/AntdProvider';

export default function TravelToolboxFeedbackLayout({
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
