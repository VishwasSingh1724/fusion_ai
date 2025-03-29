

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pt-[50px] md:pl-64">
      <div className="  ">
        {children}
      </div>
    </div>
  )
}

