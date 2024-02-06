import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Gc from './Gc';
import '../Styles/Home.css'; 
import '../Styles/Button.css'

const Home = () => {
    const [data, setData] = useState({ _id: '', password: '' }); 
    const obj = useContext(Gc);
    const navigate = useNavigate();
    const [err, setErr] = useState('');

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/login', data);
            if (res.data.token !== undefined) {
                obj.fun(res.data);
                navigate('/landingpage');
            } else {
                setErr(res.data.err || 'An error occurred during login.');
            }
        } catch (error) {
            console.error(error);
            setErr('An error occurred during login.');
        }
    };

    return (
        <div>
            <div className='login-container'> 
                {err !== '' && <h3 style={{ color: 'red' }}>{err}</h3>}
                <input type='text' name='_id' placeholder='enter email' onChange={handleChange} />
                <input type='password' name='password' placeholder='enter password' onChange={handleChange} />
                <button type='button' className='secondary-button'  onClick={handleLogin}>Login</button> {/* Added type attribute */}
            </div>
            <div className='register-link'> 
                If you do not have an account
                <button className="primary-button">
                    <Link to='/reg'>REGISTER</Link>
                </button>
            </div>
        </div>
    );
};

export default Home;
