import React, { createContext, useContext, useEffect, useState } from 'react';

const MyContext = createContext({ token: '', user: {} });

export const MyProvider = ({ children, value }: any) => {

    return (
        <MyContext.Provider value={{ ...value }}>
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => useContext(MyContext);
