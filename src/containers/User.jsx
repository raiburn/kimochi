import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export default function MaterialTableDemo() {
    const [state, setState] = React.useState({
      columns: [
        { title: 'Nombre', field: 'Nombre' },
        { title: 'Apellido', field: 'Apellidop' },
        { title: 'Apellidom', field: 'Apellidom' },
        { title: 'usuario', field: 'usuario' },
        { title: 'contra', field: 'contra' },
        { title: 'Tusuario', field: 'Tusuario' },
        { title: 'Telefono', field: 'Telefono' },
        { title: 'perfil', field: 'id_perfil' },
      ],
    });
useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(function (response) {
        setState({...state,data: response.data});
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
    });


  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>{
          return new Promise(resolve => {
           axios.post('http://localhost:3000/users', newData)
           .then(function (response) {
             resolve();
             const data=[...state.data];
             data.push(newData);
             setState({...state, data});
             console.log(response);
           })
           .catch(function (error) {
             console.log(error);
           });
         }, 600);
         }, 
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}