import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [identity, setIdentity] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const handleLogin = async (e) => {
        e.preventDefault()
        await login(identity, password)
    }

    return (
        <div className="loginPage container my-5">
            <form className="loginForm" onSubmit={handleLogin}>
                <h3 className='title'>Login</h3>
                <label>Username or Email</label><br/>
                <input onChange={e=>setIdentity(e.target.value)} value={identity} className='form-control'/><br/>
                <label>Password</label><br/>
                <input type="password" onChange={e=>setPassword(e.target.value)} value={password} className='form-control'/><br/>
                <input disabled={isLoading} type="submit" value="Login" className="btn btn-success"/><br/>
                {error && <div className="alert alert-danger my-2">{error}</div>}
            </form>
        </div>
    );
}
 
export default Login;
