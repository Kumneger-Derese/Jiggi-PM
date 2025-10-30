import {Outlet} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

const App = () => {
    return (
        <div className={'sm:px-8'}>
            <Toaster position={'bottom-right'} toastOptions={{
                style:{
                    backgroundColor: '#1a1919',
                    color: '#08b6f5',
                    fontWeight: 400,
                    border: '1px solid #727272',
                }
            }}/>
            <Outlet/>
        </div>
    )
}
export default App
