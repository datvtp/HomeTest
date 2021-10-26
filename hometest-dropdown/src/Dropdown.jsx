import { useEffect, useCallback, useRef, useState } from "react"
import axios from "axios";

function Dropdown ({selected, setSelected, zIndex = 1, position}) {
    const [isActive, setIsActive] = useState(false)
    const [userList, setUserList] = useState([])
    const inputRef = useRef()
    const contentRef = useRef()
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    let defaultOptions = []
    const [options, setOptions] = useState(defaultOptions)

    const fetchUser = useCallback((page) => {
        axios
        .get(`https://reqres.in/api/users?page=${page}`)
        .then((res) => {
            console.log(res.data)
            const emails = res.data.data.map(({email}) => email)
            setOptions((prev) => [...prev, ...emails]);
            // defaultOptions = [...userList]
        })
        .catch(() => {
            
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        fetchUser(page)
    }, [fetchUser, page])

    useEffect(() => {
        const onClick = (e) => {
            // element.contains(other)
            if (contentRef.current && !contentRef.current.contains(e.target)) {
                setIsActive(false)
            }

        }
        window.addEventListener("click", onClick)

        return () => {
            window.removeEventListener("click", onClick)
        }
    }, [])


    let positionStyle = {}

    if (position === 'right') {
        positionStyle = {top: "20%", left: "105%"}
    }

    if (position === 'bottom') {
        positionStyle = {top: "110%", left: "0%"}
    }


    return (
        
        <div className="dropdown" ref={contentRef}>
        {loading ? <span>loading...</span> : 
            <>
            {/* <div style={{textAlign: "center", marginBottom: "10%"}}>
                <h3> This is a dropdown for choosing food.</h3>
                <h4> Input to search your food.</h4>
            </div> */}

            <div className="dropdown-button" onClick={e => {
                setIsActive(!isActive)
            }}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Choose one food"
                    value={selected}
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

                    onBlur={() => {
                        console.log('Blur')
                    }}
                />
                <span><i className={isActive ? "up-arrow" : "down-arrow"}></i></span>
            </div>
            </>}
            {isActive && (
                <div className="dropdown-content" style={{zIndex: zIndex, ...positionStyle}} >
                    {options.map(option => (
                        <div 
                        className="dropdown-item" 
                        onClick={(e) => {
                            if (!selected.includes(option)){
                                setSelected(selected + ', ' + option);
                            }
                            
                            // ahihihihihihihi ahahahahaha
                        }}>
                            {option}
                        </div>
                    ))}
                    <button onClick={() => {
                        setPage(page + 1)
                        
                    }}>
                        Add more
                    </button>
                </div>
            )}

            
        </div>
    )
}

export default Dropdown