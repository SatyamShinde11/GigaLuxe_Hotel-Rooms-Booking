import React from 'react'

const Button = ({ text }) => {
    return (
        <button className="px-6 py-2 mt-4 bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium flex items-center justify-center">
            {text}
        </button>
    )
}

export default Button