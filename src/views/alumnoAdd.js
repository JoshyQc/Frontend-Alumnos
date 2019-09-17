import React, { Component } from 'react';
import Config from '../util/config';
import { withRouter } from 'react-router-dom';

class AlumnoAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            formulario: {
                firstName: '',
                lastName: '',
                age: '',
                carnet: ''
            },
            loading: false,
        }
    }

    save = (event) => {
        event.preventDefault();
        const { formulario } = this.state;
        this.setState({ loading: true });
        console.log(formulario);
        fetch(Config.server + 'alumno', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formulario),
        }).then(response => response.json()).then(response => {
            console.log(response);
            this.setState({ loading: false });
            if (response) {
                this.props.history.push({
                    pathname: '/alumno',
                });
            }
            else {
                alert.show("No se pudo :c")
            }
        });
    }

    onChangeInput = (event) => {
        let { formulario } = this.state;
        formulario[event.target.name] = event.target.value;
        formulario[event.target.name] = event.target.value;
        formulario[event.target.name] = event.target.value;
        formulario[event.target.name] = event.target.value
        this.setState({ formulario });
    }

    render() {
        const { firstName, lastName, age, carnet } = this.state.formulario;
        const { loading } = this.state;
        return (
            <div >
                <div className="row container-fluid">
                    <div className="col-md-12 degreeEdit">
                        <span className="titleCard">
                            <h1>NUEVO ALUMNO</h1>
                        </span>
                    </div>
                </div>
                <form onSubmit={this.save} className="col-md 6">
                    <div className="form-group">
                        <label>Nombre:  </label>
                        <input name="firstName" type="text" className="form-control" value={firstName} onChange={this.onChangeInput} />
                    </div>
                    <div className="form-group">
                        <label>Apellido: </label>
                        <input name="lastName" type="text" className="form-control" value={lastName} onChange={this.onChangeInput} />
                    </div>
                    <div className="form-group">
                        <label>Edad: </label>
                        <input name="age" type="number" className="form-control" value={age} onChange={this.onChangeInput} />
                    </div>
                    <div className="form-group">
                        <label>Carnet: </label>
                        <input name="carnet" type="number" className="form-control" value={carnet} onChange={this.onChangeInput} />
                    </div>
                    <div className="form-group">
                        <input disabled={this.state.loading} type="submit" value="Guardar Alumno" className="btn btn-primary" />
                    </div>
                    {loading ? /* && para ahorrarme el else, como esta ahorita */
                    <div className="loading-container d-flex">
                        <div className="spinner-border text-primary loading-spinner" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    : null}

                </form>
            </div>
        )
    }
}

export default withRouter(AlumnoAdd);