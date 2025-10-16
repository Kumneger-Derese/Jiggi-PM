import App from '../App'
import Homepage from '../pages/Homepage'
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import LoginPage from '../pages/Loginpage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import ProjectList from '../Project/ProjectList.jsx'
import Lists from '../Lists/Lists.jsx'
import Error from "../components/Error.jsx";
import Dashboard from "../components/Dashboard.jsx";
import InvitationPage from "../pages/InvitationPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App/>} errorElement={<Error/>}>
            <Route path='/' index element={<Homepage/>}/>
            <Route path='/login' index element={<LoginPage/>}/>
            <Route path='/register' index element={<RegisterPage/>}/>

            <Route path='' element={<ProtectedRoute/>}>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/projects' element={<ProjectList/>}/>
                <Route path='/projects/:projectId' element={<Lists/>}/>
                <Route path='/accept-invitation/:token' element={<InvitationPage/>}/>
            </Route>
        </Route>
    )
)

export default router
