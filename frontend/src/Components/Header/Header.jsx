import { useState } from 'react';
import './Header.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAuthData } from '../../Redux/Slices/AuthSlice';
import LoginIcon from '@mui/icons-material/Login';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Navigation = () => {
    const [selected, setSelected] = useState('Collections');
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleAuth = () => {
        if (!isAuth.isAuthenticated) {
            fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            dispatch(clearAuthData());
        }
        navigate('/auth');
    };

    return (
        <div className="w-full fixed top-0 bg-indigo-600 z-50 shadow-lg">
            <div className="w-full py-5 px-7">
                <nav className="flex justify-between items-center">
                    {/* Logo e título */}
                    <div className="flex items-center space-x-3 pl-0">
                        <CalendarMonthIcon className="text-white" />
                        <h2 className="font-normal text-2xl leading-6 text-white">Consultas Calendar</h2>
                    </div>

                    {/* Navegação */}
                    <ul className="flex space-x-4 m-auto mr-20 ">
                        {['Consultas', 'Alimentação', 'Dicas de Dieta'].map((item) => (
                            <li
                                key={item}
                                onClick={() => setSelected(item)}
                                className={`${
                                    selected === item
                                        ? 'text-white bg-indigo-700'
                                        : 'text-gray-300 bg-indigo-500 hover:bg-indigo-600'
                                } cursor-pointer px-4 py-2 font-normal text-sm rounded`}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>

                    {/* Botão de login/logout */}
                    <div className="ml-auto">
                        <button
                            onClick={toggleAuth}
                            className="text-white bg-indigo-700 px-4 py-2 rounded w-32 drop-shadow-md hover:bg-indigo-800 items-center flex justify-center "
                        >
                            {isAuth ? 'Logout' : 'Login'}
                            {!isAuth ? <LoginIcon className="ml-2" /> : null}
                            {isAuth ? <ExitToAppIcon className="ml-2" /> : null}
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export { Navigation as Header };
