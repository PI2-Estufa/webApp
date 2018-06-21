import React from 'react';
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import './login.css';

export default (props) => {
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={props.handleSubmit}>
        <FormInputs
          ncols={["col-xs-6"]}
          proprieties={[
            {
              label: "Usuário",
              type: "text",
              bsClass: "form-control",
              placeholder: "Usuário",
            },
            {
              label: "Senha",
              type: "password",
              bsClass: "form-control",
              placeholder: "Senha",
            },
          ]}
        />
        <FormInputs
          ncols={["col-xs-6"]}
          proprieties={[
            {
              label: "Senha",
              type: "password",
              bsClass: "form-control",
              placeholder: "Senha",
            },
          ]}
        />
        {
          props.loginError && (
            <p style={{ color: 'red' }}>
              Login ou senha incorretos
            </p>
          )
        }
        
        <Button bsStyle="info" fill type="submit">
          Entrar
        </Button>
      </form>
    </div>
  );
}