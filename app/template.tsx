/** Re-mounts on every navigation → soft page-enter transition (pure CSS, no JS delay). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
