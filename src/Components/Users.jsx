import React, { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

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
                console.log(`Data after save: `, data);
                if (data.insertedId) {
                    e.target.reset();
                    newUser._id = data.insertedId;
                    setUsers([...users, newUser]);
                    alert("User added successfully");
                }
            });
    };

    const handleDeleteUser = (userId) => {
        const id = { userId };

        fetch("http://localhost:3000/users", {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(id),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.deletedCount) {
                    alert("User deleted successfully")
                    const newUsers = users.filter(user => user._id !== userId)
                    setUsers(newUsers)
                }
            });
    };

    return (
        <div>
            <p>Users: {users.length}</p>
            <form onSubmit={handleAddUser}>
                <input type="text" name="name" />
                <br />
                <input type="text" name="email" />
                <br />
                <button type="submit">Add user</button>
            </form>
            <p>----------------------------------------------</p>
            <div>
                {users?.map((user) => (
                    <p key={user._id}>
                        {" "}
                        {user.name} : {user.email}{" "}
                        <button onClick={() => handleDeleteUser(user._id)}>
                            x
                        </button>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Users;
