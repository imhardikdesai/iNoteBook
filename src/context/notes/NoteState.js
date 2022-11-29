import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const noteInitial = [
        {
            "_id": "6383395a77f376d8e53f5b04",
            "user": "638208c9acb3e399a94ed209",
            "title": "Buy Car",
            "description": "i want to buy car",
            "tag": "Shopping",
            "date": "2022-11-27T10:18:02.751Z",
            "__v": 0
        },
        {
            "_id": "63835273d88f11bc734480c2",
            "user": "638208c9acb3e399a94ed209",
            "title": "Home buy",
            "description": "i want to buy home",
            "tag": "Shopping",
            "date": "2022-11-27T12:05:07.175Z",
            "__v": 0
        },
        {
            "_id": "63835273d88fs1bc734480c2",
            "user": "638208c9acb3e399a94ed209",
            "title": "Home buy",
            "description": "i want to buy home",
            "tag": "Shopping",
            "date": "2022-11-27T12:05:07.175Z",
            "__v": 0
        },
        {
            "_id": "6383g273d88f11bc734480c2",
            "user": "638208c9acb3e399a94ed209",
            "title": "Home buy",
            "description": "i want to buy home",
            "tag": "Shopping",
            "date": "2022-11-27T12:05:07.175Z",
            "__v": 0
        },
        {
            "_id": "6383527kd88f11bc734480c2",
            "user": "638208c9acb3e399a94ed209",
            "title": "Home buy",
            "description": "i want to buy home",
            "tag": "Shopping",
            "date": "2022-11-27T12:05:07.175Z",
            "__v": 0
        },
        {
            "_id": "6383527ad88f11bc734480c2",
            "user": "638208c9acb3e399a94ed209",
            "title": "Home buy",
            "description": "i want to buy home",
            "tag": "Shopping",
            "date": "2022-11-27T12:05:07.175Z",
            "__v": 0
        },
    ]

    const [notes, setNotes] = useState(noteInitial);

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
