import AntdProvider from '@/components/providers/AntdProvider';

export default function AmexGBTConsultingLayout({
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
