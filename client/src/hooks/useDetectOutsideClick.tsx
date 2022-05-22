import { useState, useEffect } from "react";
import React from "react";

const useDetectOutsideClick = (element: any, initialState: boolean) : [boolean, React.Dispatch<React.SetStateAction<boolean>>]  => {
    const [isActive, setActive] = useState<boolean>(false);

    useEffect(() => {
        const pageClickElement = (e: any) => {
            if (element.current !== null && !element.current!.contains(e.target)) {
                setActive(!isActive);
            }
        }

        if (isActive) {
            window.addEventListener("click", pageClickElement);
        }

        return () => {
            window.removeEventListener("click", pageClickElement);
        }
    }, [isActive, element])

    return [isActive, setActive]

}

export default useDetectOutsideClick;
