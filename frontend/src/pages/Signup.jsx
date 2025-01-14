import { Link } from 'react-router-dom'
import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [identity, setIdentity] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSignup = async (e) => {
        e.preventDefault()
        await signup(identity, password) // hook
    }

    return (
        <div className="signupPage">
            <div className="container my-5">
                <form className="signupForm" onSubmit={handleSignup}>
                    <h2 className="page-title">Signup</h2>
                    <label>Username or Email<span className='required'>*</span></label><br/>
                    <input required onChange={e=>setIdentity(e.target.value)} value={identity} className="form-control"/><br/>
                    <label>Password<span className='required'>*</span></label><br/>
                    <input required type="password" onChange={e=>setPassword(e.target.value)} value={password} className="form-control"/><br/>
                    <input disabled={isLoading} type="submit" value="Signup" className="btn btn-primary my-2" /><br/>
                    {error && <div className="alert alert-danger my-2">{error}</div>}
                    <div className='signupORlogin'>
                        <i><small>Already have an account?</small> <Link className="text-primary" to="/login">Login</Link></i>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Signup;