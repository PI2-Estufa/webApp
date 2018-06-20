import React from 'react';

export default (props) => {
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={props.handleSubmit}>
                <input type="text" name="username" />
                <input type="password" name="password" />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}