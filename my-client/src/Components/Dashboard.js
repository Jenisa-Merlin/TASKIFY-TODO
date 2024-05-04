import React, { Fragment, useState, useEffect } from 'react';

// `Dashboard` receives setAuth as a prop used to update authentication state of the application
const Dashboard = ({ setAuth }) => {
    // initializes state variable name using useState hook to represent user's name
    const [name, setName] = useState("");
    // `getName` asynchronous function responsible for fetching user's name from server
    async function getName() {
        // token stored in localStorage retrieves user's name from responses and updates name state variable accordingly
        try{
            const response = await fetch('http://localhost:5000/dashboard', {
                method: "GET",
                headers: {token: localStorage.token}
            });
            const parseRes = await response.json();
            setName(parseRes.user_name);
        } catch (err) {
            console.error(err.message);
        }
    }
    // handles logout, removes authentication token from localStorage and updates authentication state using setAuth function
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    };
    // useEffect hook runs once when the component mounts, getName function to fetch user's name
    useEffect(() => {
        getName()
    }, []);
    // JSX representing component's UI
    return(
        /* used to wrap multiple children elements without indroducing an extra DOM element */
        <Fragment>
            <h1>Dashboard: <i>{name.charAt(0).toUpperCase()}{name.substring(1,)}</i></h1>
            <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
        </Fragment>
    )
};

export default Dashboard;