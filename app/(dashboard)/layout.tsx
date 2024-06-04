import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <div className='w-full md:pl-56 h-[80px] fixed inset-y-0 z-50'>
        <Navbar />
      </div>
      <div className='hidden md:flex w-56 h-full z-50 fixed flex-col inset-y-0'>
        <Sidebar />
      </div>
      <main className='md:pl-56 pt-[80px] h-full'>{children}</main>
    </div>
  )
}

export default DashboardLayout
