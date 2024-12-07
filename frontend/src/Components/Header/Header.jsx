import { useState } from 'react';

const Navigation = () => {
    const [selected, setSelected] = useState('Collections');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSelection = (item) => {
        setSelected(item);
        setIsDropdownOpen(false);
    };

    return (
        <div className="2xl:container 2xl:mx-auto">
            <div className="bg-dark-blue rounded shadow-lg py-5 px-7">
                <nav className="flex justify-between">
                    <div className="flex items-center space-x-3 lg:pr-16 pr-6">
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
                                fill="#1F2937"
                            />
                        </svg>
                        <h2 className="font-normal text-2xl leading-6 text-gray-800">Inovia Calendar</h2>
                    </div>

                    {/* For medium and plus-sized devices */}
                    <ul className="hidden md:flex flex-auto space-x-2">
                        {['Collections', 'Arts', 'Space', 'Game', 'Utility', 'Cards'].map((item) => (
                            <li
                                key={item}
                                onClick={() => setSelected(item)}
                                className={`${
                                    selected === item
                                        ? 'text-white bg-indigo-600'
                                        : 'text-gray-600 bg-gray-50 border border-white'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded`}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="flex space-x-5 justify-center items-center pl-2">
                        <div className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                                    stroke="#1F2937"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="animate-ping w-1.5 h-1.5 bg-indigo-700 rounded-full absolute -top-1 -right-1 m-auto duration-200"></div>
                            <div className="w-1.5 h-1.5 bg-indigo-700 rounded-full absolute -top-1 -right-1 m-auto shadow-lg"></div>
                        </div>
                    </div>
                </nav>

                {/* For smaller devices */}
                <div className="block md:hidden w-full mt-5">
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="cursor-pointer px-4 py-3 text-white bg-indigo-600 rounded flex justify-between items-center w-full"
                    >
                        <div className="flex space-x-2">
                            <span
                                id="s1"
                                className={`font-semibold text-sm leading-3 ${isDropdownOpen ? 'block' : 'hidden'}`}
                            >
                                Selected:{' '}
                            </span>
                            <p className="font-normal text-sm leading-3">{selected}</p>
                        </div>
                        <svg
                            className={`transform ${isDropdownOpen ? 'rotate-180' : ''} duration-200`}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 9L12 15L18 9"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {isDropdownOpen && (
                        <ul className="relative font-normal text-base leading-4 absolute top-2 w-full rounded shadow-md bg-white">
                            {['Arts', 'Space', 'Game', 'Utility', 'Cards'].map((item) => (
                                <li
                                    key={item}
                                    onClick={() => handleSelection(item)}
                                    className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export { Navigation as Header };
