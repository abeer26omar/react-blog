import { useState, useEffect } from 'react';
import { useAnimate, stagger } from "framer-motion";
import { Link } from 'react-router-dom';
import logo from '../assets/e_vas_tel_logo.png';
import { MenuToggle } from '../ui/MenuToggle';
import MenuNav from '../ui/MenuNav';

function useMenuAnimation(isOpen: boolean) {
    const [scope, animate] = useAnimate();
  
    useEffect(() => {
        const menuAnimations: any = isOpen
        ? [
            [   
                "div",
                { transform: "translateY(0%)" },
                { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.4 }
            ],
            
            [
                "li",
                { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
                { delay: stagger(0.05), at: "-0.1" }
            ]
          ]
        : [
            [
                "div",
                { transform: "translateY(-100%)"},{ duration: 0.4 }
            ],
            [
                "li",
                { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
                { delay: stagger(0.05, { from: "last" }), at: "<" }
            ],
          ];

        animate([
            [
                "path.top",
                { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
                { at: "<" }
            ],
            ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
            [
                "path.bottom",
                { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
                { at: "<" }
            ], 
            ...menuAnimations
        ]);
    }, [isOpen, animate]);
  
    return scope;
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const scope = useMenuAnimation(isOpen);
    const reset = () =>{ setIsOpen(!isOpen) };
    
    return (
        <header className="min-h-full">
            <nav>
                <div className="header mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <img
                                className="h-8 w-8"
                                src={logo}
                                alt="e-vas-tel-logo"
                              />
                            </div>
                            <ul className="hidden md:block">
                              <li className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    to={'/'}
                                    className='nav-link'
                                >
                                    Posts
                                </Link>
                              </li>
                            </ul>
                        </div>
                        <div ref={scope} className={`navbar-toggler p-0 md:hidden`}>
                            <MenuToggle
                                toggle={() => {
                                    setIsOpen(!isOpen);
                                }}
                                isOpen={isOpen}
                            />
                            <MenuNav onClick={reset} />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
};
export default Header;