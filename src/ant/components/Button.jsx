import React from 'react';
import { Button } from 'antd'; // Importing Ant Design Button

const AntButton = (props) => {
    return (
        <div>
            <Button type='primary'>{props.label}</Button>
        </div>
    );
}   

export default AntButton;