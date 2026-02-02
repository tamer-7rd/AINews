import Header from './Header'
import SidebarNav from './SidebarNav'

type AppShellProps = {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="">
      <Header />
      <SidebarNav />
      <main>{children}</main>
    </div>
  )
}
