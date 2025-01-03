import { createContext, useState } from 'react'
export const HotelDataContext = createContext()
const HotelData = () => {
    const [Responce, setResponce] = useState(null)
    return (
        <div>HotelData</div>
    )
}

export default HotelData