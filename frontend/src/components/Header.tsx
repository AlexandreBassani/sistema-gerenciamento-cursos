import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/dt-logo.png'; 

interface HeaderProps {
    title: string;
    backTo?: string;
    showDelete?: boolean;
}

const Header = ({ title, backTo, showDelete }: HeaderProps) => {
    return (
        <header className="bg-red-600 text-white p-4 shadow-md font-montserrat flex items-center justify-between fixed top-0 left-0 w-full z-50">
            <div className="flex items-center">
                {backTo && (
                    <Link to={backTo} className="text-white hover:text-gray-200 mr-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                )}
                <img src={logo} alt="Logo" className="h-8 w-auto mr-4" />
                <h1 className="text-xl font-semibold">{title}</h1>
            </div>
            {showDelete && (
                <button className="text-white hover:text-gray-200">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.203 21H7.797a2 2 0 01-1.936-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3m3 4v-3m2 6v-6" />
                    </svg>
                </button>
            )}
        </header>
    );
};

export default Header;