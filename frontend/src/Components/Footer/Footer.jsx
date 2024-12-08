import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer bg-indigo-700">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Institucional</h4>
                    <ul>
                        <li>Sobre</li>
                        <li>Vida Saudavel</li>
                        <li>Melhores alimentos para sua saúde</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Ajuda</h4>
                    <ul>
                        <li>Suporte</li>
                        <li>Termos de Uso</li>
                        <li>Política de Privacidade</li>
                        <li>Procon-Mg</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Siga-nos nas redes Socias </h4>
                    <ul className="social-media">
                        <li>
                            <a
                                href="https://www.facebook.com/?locale=pt_BR"
                                className="text-blue-500 hover:underline ml-2"
                            >
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a href="https://x.com/elonmusk" className="text-blue-500 hover:underline ml-2">
                                X
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.instagram.com/inoviacorp/"
                                className="text-blue-500 hover:underline ml-2"
                            >
                                Instagram
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom ">
                &copy; 2010 - 2024 Super Nutri Calendar Ltda. Todos os direitos reservados.
            </div>
        </footer>
    );
};

export default Footer;
