import React, { useEffect, useReducer, useRef } from "react";
import { useDispatch } from "react-redux";
import { Chip } from "@material-ui/core";

import "./ErfasseTermin.css";
import Kalender from "./Kalender";
import { Draggable } from "@fullcalendar/interaction";

const ErfasseTermin = () => {
  const dispatch = useDispatch();
  const containerElRef = useRef<HTMLDivElement>(null);

  const formReducer = (state: { name: string; date: string }, event: any) => {
    return {
      ...state,
      [event.name]: event.value,
    };
  };

  useEffect(() => {
    if (containerElRef.current) {
      new Draggable(containerElRef.current, {
        itemSelector: ".draggable",

        eventData: function (eventEl) {
          return {
            title: eventEl.innerText,
            duration: { days: 1 },
          };
        },
      });
    }
  });

  const [formData, setFormData] = useReducer(formReducer, {
    name: "",
    date: "",
  });

  const handleChange = (event: any) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <div className={"termin-erfassung"}>
      <div className={"anleitungContainer"}>
        <div className={"anleitung"}>ANLEITUNG: DU KANNST DAS BILD DES VERMIETERS IN DEN KALENDER SCHIEBEN UM EINEN WASCHTAG ZU BUCHEN!</div>
      </div>
      <div className={"mieterContainerLinks"} ref={containerElRef}>
        <Chip
          className={"draggable"}
          draggable={"true"}
          label={"Waschtermin Beat & Lisa"}
        />
        <div className="spaceBetweenIcons"></div>
        <Chip
          className={"draggable"}
          draggable={"true"}
          label={"Waschtermin Familie Ramseier"}
        />
      </div>
      <div className={"calendarWrapper"}>
        <Kalender />
      </div>
      <div className={"mieterContainerRechts"} ref={containerElRef}>
        <Chip
          className={"draggable"}
          draggable={"true"}
          label={"Waschtermin Hugo"}
        />
        <div className="spaceBetweenIcons"></div>
        <Chip
          className={"draggable"}
          draggable={"true"}
          label={"Waschtermin Brönnimann"}
        />
      </div>
    </div>
  );
};

export default ErfasseTermin;
