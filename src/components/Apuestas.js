import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';

export default class Apuestas extends Component {
    constructor(props) {
        super(props);
        // Creando referencias para cada campo del formulario
        this.cajaUsuario = React.createRef();
        this.cajaResultado = React.createRef();
        this.cajaFecha = React.createRef();
    }

    state = {
        apuestas: []
    }

    // Función para crear una nueva apuesta
    createApuesta = (e) => {
        e.preventDefault();

        // Recogemos los datos de las referencias del formulario
        let nuevaApuesta = {
            usuario: this.cajaUsuario.current.value,
            resultado: this.cajaResultado.current.value,
            fecha: this.cajaFecha.current.value
        };

        let request = "/api/Apuestas";
        let url = Global.urlApiEquipos + request;

        axios.post(url, nuevaApuesta).then(response => {
            console.log("Subiendo Apuesta...");
            this.loadApuestas(); // Recargar apuestas después de crear una nueva
        }).catch(error => {
            console.error("Error subiendo apuesta: ", error);
        });
    }

    // Función para cargar las apuestas existentes
    loadApuestas = () => {
        let request = "/api/Apuestas";
        let url = Global.urlApiEquipos + request;

        axios.get(url).then(response => {
            console.log("Cargando Apuestas...");
            this.setState({
                apuestas: response.data
            });
        });
    }

    componentDidMount = () => {
        this.loadApuestas();
    }

    render() {
        return (
            <div className="container mt-4">
                <h2>Apuestas</h2>
                <hr />
                {/* Tabla para mostrar las apuestas */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USUARIO</th>
                            <th>RESULTADO</th>
                            <th>FECHA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.apuestas.map((apuesta, index) => {
                                return (
                                    <tr key={index} value={apuesta.idApuesta}>
                                        <td>{apuesta.idApuesta}</td>
                                        <td>{apuesta.usuario}</td>
                                        <td>{apuesta.resultado}</td>
                                        <td>{apuesta.fecha}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <hr />

                {/* Formulario para crear una nueva apuesta */}
                <h3>Nueva Apuesta</h3>
                <form onSubmit={this.createApuesta} className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="usuario" className="form-label">Usuario:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="usuario"
                            ref={this.cajaUsuario}  // Referencia al campo de usuario
                            placeholder="Introduce el usuario"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="resultado" className="form-label">Resultado:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="resultado"
                            ref={this.cajaResultado}  // Referencia al campo de resultado
                            placeholder="Introduce el resultado"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fecha" className="form-label">Fecha:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fecha"
                            ref={this.cajaFecha}  // Referencia al campo de fecha
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Apostar</button>
                </form>
            </div>
        )
    }
}
