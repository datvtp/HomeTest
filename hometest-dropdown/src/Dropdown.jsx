import { useState } from "react"

function Dropdown ({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false)
    const options = ['Pizza', 'Hamburger', 'Sandwich', 'Ice cream', 'Soda']
    return (
        <div className="dropdown">
            <div className="dropdown-button" onClick={e => {
                setIsActive(!isActive)
            }}>
                {selected ? selected : 'Choose one food'}
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {options.map(option => (
                        <div 
                        className="dropdown-item" 
                        onClick={(e) => {
                            setSelected(option);
                            setIsActive(false);
                        }}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown