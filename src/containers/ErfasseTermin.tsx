import React, {useEffect, useReducer, useRef} from "react";
import {connect, useDispatch} from "react-redux";
import {erfasseTermin} from "../actions";
import {Chip} from '@material-ui/core';


import './ErfasseTermin.css'
import Kalender from "./Kalender";
import {Button} from "@material-ui/core";
import {Draggable} from "@fullcalendar/interaction";

const ErfasseTermin = () => {

    const dispatch = useDispatch();
    const containerElRef = useRef<HTMLDivElement>(null);

    const formReducer = (state: { name: string, date: string }, event: any) => {
        return {
            ...state,
            [event.name]: event.value
        }
    }

    useEffect(() => {
        if (containerElRef.current) {
            new Draggable(containerElRef.current, {
                itemSelector: '.draggable',

                eventData: function (eventEl) {
                    return {
                        title: eventEl.innerText,
                        duration: {days: 1}
                    };
                }
            });
        }
    })


    const [formData, setFormData] = useReducer(formReducer, {name: '', date: ''});

    const onSubmitFunction = () => {
        dispatch(erfasseTermin(formData.name, formData.date));
    };

    const handleChange = (event: any) => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }

    return (
        <div className={"termin-erfassung"}>
            <form>
                <label>
                    {"Name"}
                    <input name="name" onChange={handleChange}/>
                </label>
                <label>
                    {"Datum"}
                    <input name="date" onChange={handleChange}/>
                </label>
                <Button onClick={onSubmitFunction} color={"primary"}>Erfasse Termin</Button>
            </form>
            <div className={"calendarWrapper"}>
                <Kalender/>
            </div>
            <div className={'mieterContainer'} ref={containerElRef}>
                <Chip className={"draggable"} draggable={"true"} label={"Waschtermin Beat & Lisa"}/>
                <Chip className={"draggable"} draggable={"true"} label={"Waschtermin Familie Ramseier"}/>
                <Chip className={"draggable"} draggable={"true"} label={"Waschtermin Hugo"}/>
                <Chip className={"draggable"} draggable={"true"} label={"Waschtermin Brönnimann"}/>
            </div>

        </div>


    );
};

export default ErfasseTermin;
