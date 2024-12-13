import { Header } from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import './AuthPage.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const API_URL = import.meta.env.VITE_API_URL;

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log('Email:', email);
            console.log('Senha:', senha);
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email: email, password: senha }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login efetuado com sucesso:', data);
                dispatch(setAuthData({ user: data.user, token: data.token }));
                navigate('/');
            } else if (response.status === 401) {
                const errorData = await response.json();
                console.log(errorData);
                setError('Email ou senha incorretos ou invalidos.');
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error('Erro ao tentar logar:', error);

            if (error.name === 'TypeError') {
                setError('Erro de conexão com o servidor.');
            } else if (error.name === 'SyntaxError') {
                setError('Resposta inesperada do servidor.');
            } else {
                setError('Erro inesperado ao tentar logar');
            }
        }
    };

    return (
        <div>
            <Header />
            <div className="Config">
                <div className="LoginContainer">
                    <section className="AuthContainer flex flex-col items-center">
                        <h1 className=" text-center text-xl font-black text-3xl font-mono">Faça seu Login</h1>
                        <div className="Line"></div>
                        {error && <div className="Error mb-10 ml-10">{error}</div>}

                        <div className="flex flex-col items-start space-y-6 w-full max-w-sm">
                            <div className="flex items-center w-full mb-4">
                                <PersonIcon className="text-black mr-4 " fontSize="large" />
                                <input
                                    className="formss-input w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className=" flex items-center w-full mb-4">
                                <LockIcon className="text-black mr-4" fontSize="large" />
                                <input
                                    className="formss-input w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
                                    type="password"
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className=" ButtonEdit text-white bg-blue-500 hover:bg-blue-700 rounded ml-5"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthPage;
