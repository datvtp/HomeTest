import { useRef, useState } from "react"

function Dropdown ({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false)
    const inputRef = useRef()
    const defaultOptions = ['Pizza', 'Hamburger', 'Sandwich', 'Ice cream', 'Soda']
    const [options, setOptions] = useState(defaultOptions)
    return (
        <div className="dropdown">
            <div style={{textAlign: "center", marginBottom: "10%"}}>
                <h3> This is a dropdown for choosing food.</h3>
                <h4> Input to search your food.</h4>
            </div>

            <div className="dropdown-button" onClick={e => {
                setIsActive(!isActive)
            }}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Choose one food"
                    ref={inputRef}
                    onChange={e => {
                        if (inputRef.current.value) {
                            setOptions(
                                defaultOptions.filter((option) => {
                                    if(option.toUpperCase().includes(inputRef.current.value.toUpperCase())) {
                                        return option
                                    }
                                    return null
                                })
                            )
                        } else {
                            setOptions(defaultOptions)
                            setSelected('')
                        }
                    }}
                />
                <span><i className={isActive ? "up-arrow" : "down-arrow"}></i></span>
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {options.map(option => (
                        <div 
                        className="dropdown-item" 
                        onClick={(e) => {
                            setSelected(option);
                            inputRef.current.value = option;
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