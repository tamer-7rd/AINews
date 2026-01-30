import Header from './Header'

type AppShellProps = {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <>
      <div className="flex flex-col">
        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}
