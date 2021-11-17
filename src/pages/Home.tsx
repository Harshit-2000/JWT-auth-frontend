import React, { useEffect, useState } from 'react';
import Update from "./Update";
import { Link, Redirect, Route } from "react-router-dom";

const Home = (props: { name: string }) => {

    const [userdata, setUserdata] = useState([])

    async function deleteData(id: string) {
        const response = await fetch('http://jwt-token-api-2000.herokuapp.com/api/delete/' + id, {
            method: 'DELETE',
        });

        window.location.reload();
    };


    function updateData(id: string) {
        return <Link to="/update/${id}" className="navbar-brand">Home</Link>
    }


    const fetchdata = async () => {
        const response = await fetch('http://jwt-token-api-2000.herokuapp.com/api/users', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });

        const content = await response.json();

        setUserdata(content);

        console.log(userdata);
    };

    useEffect(() => {
        fetchdata();
    }, [])

    if (props.name) {
        return (
            <table>
                <td>Email</td>
                <td>Username</td>
                <td>Address</td>
                <td>Delete</td>
                <td>Update</td>

                {userdata.map(function (obj, index) {
                    return <tr key={obj['id']}>
                        <td>{obj['email']}</td>
                        <td>{obj['username']}</td>
                        <td>{obj['address']}</td>
                        <td><button className="btn btn-danger" onClick={() => { deleteData(obj['id']) }}> Delete </button></td>
                        <Link to={`/update/${obj["id"]}`} className="btn btn-primary"> Update </Link>
                    </tr>
                })}
            </table>
        )
    }
    else {
        return (
            <div>
                "You are not logged in! TRY AGAIN."
            </div>
        )
    }
};

export default Home;
