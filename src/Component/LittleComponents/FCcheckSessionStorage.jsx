import React from 'react';
import { Link } from 'react-router-dom';

const checkSessionStorage = () => {
    alert('checkSessionStorage');
    if (sessionStorage.SPhone == null || sessionStorage.Spassword == null)
        return false;
    return true;
}

export default checkSessionStorage;     