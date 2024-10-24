import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import imagenLogo from './../assets/images/laliga.jpg';
import axios from 'axios';
import Global from './Global';

export default class Menu extends Component {
    state = {
        equipos: []
    }

    loadEquipos = () => {
        let request = "/api/Equipos";
        let url = Global.urlApiEquipos + request;

        axios.get(url).then(response => {
            console.log("Cargando equipos...");
            this.setState({
                equipos: response.data
            });
        });
    }

    componentDidMount = () => {
        this.loadEquipos();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <img src={imagenLogo} style={{ width: '5%' }} alt="Logo"></img>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/create">Crear apuesta</NavLink>
                            </li> */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Equipos
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    {
                                        this.state.equipos.map((equipo, index) => {
                                            return (
                                                <li className="dropdown-item"
                                                    key={index}
                                                    onClick={() => this.props.seleccionarEquipo(equipo.idEquipo)}>
                                                    {equipo.nombre}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
