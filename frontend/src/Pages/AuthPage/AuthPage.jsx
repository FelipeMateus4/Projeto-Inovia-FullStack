import { Header } from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import './AuthPage.css';
import { useState } from 'react';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <div>
            <Header />
            <div className="Config">
                <div className="LoginContainer">
                    <section className="AuthContainer flex flex-col items-center">
                        <h1 className=" text-center text-xl font-black text-3xl font-mono">Faça seu Login</h1>
                        <div className="Line"></div>
                        <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
                            <input
                                className="formss-input w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="formss-input w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                        <button type="submit" className=" ButtonEdit text-white bg-blue-500 hover:bg-blue-700 rounded">
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
