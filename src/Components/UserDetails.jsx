import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UserDetails = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/users/${id}`)
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, [id]);

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const email = e.target.elements.email.value;
        const updatedUser = { name, email };

        fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    alert("User has been updated")
                    setUser(updatedUser)
                }
            });
    };

    return (
        <div>
            <form onSubmit={handleUpdateUser}>
                <input type="text" name="name" defaultValue={user.name} />
                <br />
                <input type="email" name="email" defaultValue={user.email} />
                <br />
                <button type="submit">Update user</button>
            </form>
            <p>----------------------------------------------</p>
            <div>
                {user.name} : {user.email}
            </div>
        </div>
    );
};

export default UserDetails;
