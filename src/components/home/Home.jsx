import AfterLogin from './AfterLogin.jsx';
import BeforeLogin from './BeforeLogin.jsx';
import useAuth from '../../hooks/useAuth';
import AdminHome from '../../pages/admin/AdminHome.jsx';
function Home() {
  const { token, user } = useAuth();
  return (
    <div>
      {
        token ? ( user.role === 'admin' ? (<AdminHome/>) : (<AfterLogin />)) : (<BeforeLogin />)
      }
    </div>
  )
}

export default Home;