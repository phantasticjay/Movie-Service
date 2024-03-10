import React from "react"
export default function Movie(props){
    return(
        <div className="movie--data">
            <p className="bold">{props.name}</p>
            <img
                className="movie--img"
                src={`./images/${props.imgSrc}`}
            />
            <p> ({props.year})</p>
        </div>
    )
}