import { Link } from "react-router-dom";


const MenuNav = (props: any) => {
    return (
        <div className='mobile_nav__wrapper'>
            <div className='mobile_nav__content'>
                <div className='my-auto'>
                    <div className="container">
                        <ul className="">
                            <li className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    to={'/'}
                                    className='nav-link'
                                    onClick={props.onClick}
                                >Posts</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MenuNav;