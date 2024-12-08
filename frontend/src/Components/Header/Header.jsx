import { useState } from 'react';
import './Header.css';

const Navigation = () => {
    const [selected, setSelected] = useState('Collections');
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para login/logout

    const toggleAuth = () => {
        setIsAuthenticated(!isAuthenticated);
    };

    return (
        <div className="w-full fixed top-0 bg-indigo-600 z-50 shadow-lg">
            <div className="w-full py-5 px-7">
                <nav className="flex justify-between items-center">
                    {/* Logo e título */}
                    <div className="flex items-center space-x-3 pl-0">
                        <svg
                            className="cursor-pointer"
                            width="34"
                            height="34"
                            viewBox="0 0 34 34"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918Z"
                                fill="#ffffff"
                            />
                        </svg>
                        <h2 className="font-normal text-2xl leading-6 text-white">Consultas Calendar</h2>
                    </div>

                    {/* Navegação */}
                    <ul className="flex space-x-4 ml-auto mr-60 ">
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
                            className="text-white bg-indigo-700 px-4 py-2 rounded shadow-md hover:bg-indigo-800"
                        >
                            {isAuthenticated ? 'Logout' : 'Login'}
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export { Navigation as Header };
