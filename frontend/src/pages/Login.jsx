import { useState } from "react"
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const { login, isLoading, error } = useLogin()
    const [identity, setIdentity] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        await login(identity, password)
    }

    return (
        <div className="loginPage container my-5">
            <form className="loginForm" onSubmit={handleLogin}>
                <h2 className="page-title"><u>Login</u></h2>
                <label>Username or Email<span className='required'>*</span></label><br/>
                <input required onChange={e=>setIdentity(e.target.value)} value={identity} className="form-control"/><br/>
                <label>Password<span className='required'>*</span></label><br/>
                <input required type="password" onChange={e=>setPassword(e.target.value)} value={password} className="form-control"/><br/>
                <input disabled={isLoading} type="submit" value="Login" className="btn btn-success my-2" /><br/>
                {error && <div className="alert alert-danger">{error}</div>}
            </form>
        </div>
    );
}
 
export default Login;
