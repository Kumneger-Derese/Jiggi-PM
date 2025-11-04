import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Toaster position={'top-center'} />
      <Outlet />
    </div>
  )
}
export default App
