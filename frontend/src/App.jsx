import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div className={'px-8'}>
      <Toaster />
      <Outlet />
    </div>
  )
}
export default App
