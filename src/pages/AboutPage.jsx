import React from 'react';
import Button from '../ant/components/Button'; // Importing the Ant Design Button component

const AboutPage = () => {
    const isLoggedIn = false;
    
    return (
        <div>
            <h1>About Page</h1>
            {isLoggedIn ? (
                <p>Welcome back, user!</p>
            ) : (
                <p>Please log in to access more features.</p>
            )}

            <Button label="Click Me" />
        </div>
    );
};

export default AboutPage;