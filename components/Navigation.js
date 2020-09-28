import Link from 'next/link'
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../context/auth'


const Navigation = () => {
    const router = useRouter();
    const AuthContext = useAuth();

    const handleLogout = useCallback(() => {
        AuthContext.handleSetUser(null)
        router.push('/')
    })

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
            <div className="container">
                <Link href="/">
                    <a className="navbar-brand">
                        <i className="fas fa-laptop-code"></i>
                        &nbsp; DevCamper
                    </a>
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link href="bootcamps.html">
                                <a className="nav-link">
                                    <i className="fas fa-search"></i>
                                    &nbsp; Browse Bootcamps
                                </a>
                            </Link>
                        </li>

                        {
                            AuthContext.user
                                ? <React.Fragment>
                                    <li>
                                        <Link href="#">
                                            <a className="nav-link" onClick={handleLogout}>
                                                Logout
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="#">
                                            <a className="nav-link">
                                                Logged in
                                            </a>
                                        </Link>
                                    </li>
                                </React.Fragment>
                                : <React.Fragment>
                                    <li className="nav-item">
                                        <Link href="/auth/login">
                                            <a className="nav-link">
                                                <i className="fas fa-sign-in-alt"></i>
                                                &nbsp; Login
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/auth/register">
                                            <a className="nav-link">
                                                <i className="fas fa-user-plus"></i>
                                                &nbsp; Register
                                            </a>
                                        </Link>
                                    </li>
                                </React.Fragment>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;