import React, {Component} from 'react';
import Config from '../util/config';
import  { withRouter } from 'react-router-dom';

class AlumnoEdit extends Component{
    
    constructor(props) {
        super(props);

        

        this.state = {
            data: [],
            formulario: {
                firstName: '',
                lastName: '',
                age:'',
                carnet:'',
                alumno_Id:''
            }
        }
    }

    update = (event) => {
        event.preventDefault();
        let {formulario} = this.state;
        console.log(formulario);
        fetch(Config.server + 'alumno', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formulario),
        }).then(response=>response.json()).then(response=>{
            console.log(response);
            if(response){
                this.props.history.push({
                    pathname: '/alumno',

                });
            }else {
                //si  hay error vamos a mostrar un alert
                alert("Error al actualizar registro");
            }
        });
    }


    onChangeUpdate = (event) => {
        let {formulario} = this.state;
        formulario[event.target.name] = event.target.value;
        formulario[event.target.lastName] = event.target.value;
        formulario[event.target.age] = event.target.value; 
        formulario[event.target.carnet] = event.target.value;
        formulario[event.target.alumno_Id] = event.target.value;   
        this.setState({formulario});
    }


    componentDidMount(){
        this.setState({
           formulario: {
            firstName: this.props.location.state.firstName,
            lastName: this.props.location.state.lastName,
            age: this.props.location.state.age,
            carnet: this.props.location.state.carnet
           }
        });
    }

    render(){
        const {firstName, lastName, age, carnet} = this.state.formulario;
        return(
            <div className="container-fluid">
            <div className="row">
                    <div className="col-md-12 degreeEdit">
                        <span className="titleCard">
                           <h1>EDITAR REGISTRO</h1> 
                        </span>
                    </div>
                </div>
            <form onSubmit={this.update} className="col-md 6"> 
                <div className="form-group editMode">
                    <label>Primer nombre:  </label>
                    <input  name="firstName" type="text" className="form-control" value={firstName} onChange={this.onChangeUpdate} />
                </div>
                <div className="form-group editMode">
                    <label>Apellidos: </label>
                    <input name="lastName" type="text" className="form-control" value={lastName} onChange={this.onChangeUpdate}/>
                </div>
                <div className="form-group editMode">
                    <label>Edad: </label>
                    <input name="age" type="number" className="form-control" value={age} onChange={this.onChangeUpdate}/>
                </div>
                <div className="form-group editMode">
                    <label>Carnet: </label>
                    <input name="carnet" type="text" className="form-control" value={carnet} onChange={this.onChangeUpdate}/>
                </div>
                <div className="form-group buttonEdit">
                    <input type="submit" value="Actualizar" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        )
    }
}

export default withRouter(AlumnoEdit) ;