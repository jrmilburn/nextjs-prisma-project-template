
export default function PublicLayout({ children }) {
  return (
    <main className="grid-public overflow-y-auto h-[calc(100vh-var(--topbar-h))] pt-[var(--topbar-h)]">
      {children}
    </main>
  );
}
