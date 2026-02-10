import React from "react";

const Users = () => {
    const handleAddUser = (e) => {
        e.preventDefault();

        const name = e.target.elements.name.value;
        const email = e.target.elements.email.value;

        console.log(name, email);
        const newUser = {
            name,
            email,
        };

        // Sending user data to server
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(`Data after save ${data}`);
            });
    };

    return (
        <div>
            <form onSubmit={handleAddUser}>
                <input type="text" name="name" />
                <br />
                <input type="text" name="email" />
                <br />
                <button type="submit">Add user</button>
            </form>
        </div>
    );
};

export default Users;
