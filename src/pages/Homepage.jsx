import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Homepage = () => {
    const [count, setCount] = useState(0);
    const [userData, setUserData] = useState([]);

    useEffect(async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log(data);
        setUserData(data);

    }, [count]);


    const addUsers = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({ title: "Subash", body: 'Dummy Text', userId: 101 }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        const data = await res.json();
        console.log("cuv75", data);
        // setPosts([data, ...posts]);
        // setTitle('');
    }


    return (
        <div>
            <button className='bg-blue-500 text-white p-2 rounded' onClick={addUsers}>Add Post</button>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 5)}>Increment</button>
            <button onClick={() => setCount(count - 5)} disabled={count === 0}>Decrement</button>


            <div className='mt-4'>
                <h2 className='bg-blue-500 text-white text-2xl'>Users Data</h2>

                <ul className='mt-4'>
                    {userData.map(list => (
                        <li key={list.id}>
                            <span>{list.title}</span>
                        </li>
                    ))}

                    {/* {Array.map(() => {})} */}
                </ul>
            </div>

        </div>
    );
};

export default Homepage;