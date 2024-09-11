import { NavLink, Link } from "react-router-dom"
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from "react-icons/bs";

// Hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// redux
import {logout, reset} from "../slices/authSlice";

// estilo
import '../styles/components/navbar.sass'

const Navbar = () => {
    const { auth } = useAuth();
    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const dispath = useDispatch()

    const handleLogout = () => {
        dispath(logout());
        dispath(reset());

        navigate("/login");
    }

    return (

        <nav id="nav">
            <Link to="/">ReactGram</Link>

            <form id="search-form">
                <BsSearch />
                <input type="text" placeholder="Pesquisar" />
            </form>
            <ul id="nav-links">
                {auth ? (
                    <>
                        <li>
                            <NavLink to="/">
                                <BsHouseDoorFill />
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink to={`/users/${user._id}`}>
                                    <BsFillCameraFill />
                                </NavLink>
                            </li>
                        )}
                        <li>
                            <NavLink to="/profile">
                                <BsFillPersonFill />
                            </NavLink>
                        </li>
                        <li>
                            <span onClick={handleLogout}>Sair</span>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to='/login'>
                                Entrar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/register'>
                                Cadastrar
                            </NavLink>
                        </li>
                    </>
                )}

            </ul>

        </nav>
    )
}

export default Navbar