import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';
import Menu from './Menu';
import Apuestas from './Apuestas';

export default class Home extends Component {
    state = {
        equipoSeleccionado: null,
        detallesEquipo: {}
    }

    seleccionarEquipo = (idEquipo) => {
        let request = "/api/Equipos/" + idEquipo;
        let url = Global.urlApiEquipos + request;

        axios.get(url).then(response => {
            console.log("Cargando equipo seleccionado..." + idEquipo);
            this.setState({
                equipoSeleccionado: idEquipo,
                detallesEquipo: response.data
            });
        });
    }

    render() {
        return (
            <div>
                {/* Aquí paso la función seleccionarEquipo como prop a Menu */}
                <Menu seleccionarEquipo={this.seleccionarEquipo} />
                <div style={{ textAlign: "center", padding: "5%" }}>
                    {
                        this.state.equipoSeleccionado ?
                            <div>
                                <h3><b>{this.state.detallesEquipo.nombre}</b></h3>
                                <hr />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>NOMBRE</th>
                                            <th>IMAGEN</th>
                                            <th>CHAMPIONS</th>
                                            <th>WEB</th>
                                            <th>DESCRIPCIÓN</th>
                                            <th>FINALISTA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{this.state.detallesEquipo.idEquipo}</td>
                                            <td>{this.state.detallesEquipo.nombre}</td>
                                            <td>
                                                <img src={this.state.detallesEquipo.imagen} alt="Logo" style={{ width: "100px" }} />
                                            </td>
                                            <td>{this.state.detallesEquipo.champions}</td>
                                            <td>
                                                <a href={this.state.detallesEquipo.web} target="_blank" rel="noreferrer">
                                                    {this.state.detallesEquipo.web}
                                                </a>
                                            </td>
                                            <td>{this.state.detallesEquipo.descripcion}</td>
                                            <td>{this.state.detallesEquipo.finalista ? 'Sí' : 'No'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            :
                            <p>Seleccione un equipo del menú</p>
                    }
                </div>
                <Apuestas />
            </div>
        );
    }
}
