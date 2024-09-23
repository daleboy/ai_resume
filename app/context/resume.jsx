"use client"
import React from 'react'

const ResumeContext = React.createContext();
const initialState = {
    name: "",
    job: "",
    address: "",
    phone: "",
    email: "",
    themeColor: "",
};

export default function ResumeProvider({ children }) {
    const [resume, setResume] = React.useState(initialState);
    const [step, setStep] = React.useState(1);
    return (
        <ResumeContext.Provider value={{ resume, setResume, step, setStep }} >{children}</ResumeContext.Provider>
    )
}

export const useResume = () => {
    const context = React.useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};