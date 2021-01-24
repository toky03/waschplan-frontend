import React, {useEffect, useReducer} from "react";
import {connect, useDispatch} from "react-redux";
import {erfasseTermin} from "../actions";
import { Chip } from '@material-ui/core';



import './ErfasseTermin.css'
import Kalender from "./Kalender";
import {Button} from "@material-ui/core";
import {Draggable} from "@fullcalendar/interaction";

const ErfasseTermin = () => {

    const dispatch = useDispatch();

    const formReducer = (state: { name: string, date: string }, event: any) => {
        return {
            ...state,
            [event.name]: event.value
        }
    }

    useEffect(() => {
        const containerEl = document.getElementById('externe-events');
        console.log(containerEl);
        // TODO kann dies auch anders gemacht werden?
        if(containerEl){
            new Draggable(containerEl, {
                itemSelector: '.draggable',
                eventData: function(eventEl) {
                    return {
                        title: eventEl.innerText,
                        duration: {days:1}
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
            <form >
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
            <div id={"externe-events"}>
                <Chip className={"draggable"} draggable={"true"} label={"Waschtermin Marco"} ></Chip>
                <Chip className={"draggable"} draggable={"true"} label={"Waschtermin Vanessa"}></Chip>
            </div>
            <Kalender></Kalender>

        </div>


    );
};

export default connect()(ErfasseTermin);
