import MainLayout from '@/components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to AI Notes</h1>
        <p>Select a note from the sidebar or create a new one to get started.</p>
      </div>
    </MainLayout>
  );
}
