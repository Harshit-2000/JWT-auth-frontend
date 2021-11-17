import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

function Update(props: any) {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch('http://jwt-token-api-2000.herokuapp.com/api/update/' + props.match.params.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                email,
                password,
                address
            })
        });
        setRedirect(true);
    }


    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Update</h1>

            <input className="form-control" placeholder="Name" required
                onChange={e => setName(e.target.value)}
            />

            <input type="email" className="form-control" placeholder="Email address" required
                onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                onChange={e => setPassword(e.target.value)}
            />

            <input type="text" className="form-control" placeholder="Address"
                onChange={e => setAddress(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default withRouter(Update);


