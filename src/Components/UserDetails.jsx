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

    return (
        <div>
            {user.name} : {user.email}
        </div>
    );
};

export default UserDetails;
