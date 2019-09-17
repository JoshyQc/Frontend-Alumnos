import React, {Component} from 'react';
import Config from '../util/config';
import { withRouter } from 'react-router-dom';
class Alumno extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            alumno:[],
            formulario: {
                firstName: '',
                lastName: '',
                age:'',
                carnet:''
            }
        }
    }
    show = (event) => {
        fetch(Config.server + 'alumno', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()).then(response => {
            this.setState({
                alumno: response.recordset,
            });
            console.log(response);
        });
    }
    
    delete = (alumno_Id) => {
        const body = {
            alumno_Id
        };
        fetch(Config.server + 'alumno', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(response=>response.json()).then(response=>{
            console.log(response);
            if(response){
              //Como aqui estamos en la misma pagina y donde estan los datos, simplemente llamare a la funcion show()
              this.show();
            }else {
                //si  hay error vamos a mostrar un alert
                alert("Error al Eliminar registro");
            }
        });
    }

    goEdit(item){
        this.props.history.push({
            pathname: '/alumno/edit',
            state: item
        });
    }

    goAdd(item){
        this.props.history.push({
            pathname: '/alumno/add',
            state: item
        });
    }

    componentDidMount(){
        this.show(); 

    }

    render(){
        const{alumno} = this.state;
        console.log(alumno);

        return(
            <div className="container-fluid 12">
                <div className="row">
                    <div className="col-md-12 degree">
                        <span className="titleCard">
                           <h1>AlUMNO</h1> 
                        </span>
                    </div>
                </div>
                <div className="row">
                <table className="table" >
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Carnet</th>
                                <th scope="col">Edad</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alumno.map((item) => (
                                <tr key={item.alumno_Id}>
                                    <th>{item.alumno_Id}</th>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.carnet}</td>
                                    <td>{item.age}</td>
                                    <td>
                                    <button onClick={this.goEdit.bind(this, item)} className="btn btn-primary">Edit</button>
                                    <button onClick={this.delete.bind(this, item.alumno_Id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="container-fluid addButton">
                    <button onClick={this.goAdd.bind(this, alumno.alumno_Id)} className="btn btn-success btn-block">AGREGAR ALUMNO</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Alumno);