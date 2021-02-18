import React, { useEffect, useReducer, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { erfasseTermin } from "../state/actions";
import { Chip } from "@material-ui/core";

import "./ErfasseTermin.css";
import Kalender from "./Kalender";
import { Button } from "@material-ui/core";
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

  const nextTerminId: string = "5bdf9e40-50a1-46a7-b22d-83e1934a431b";
  const parteiId: string = "0d1aa8f6-a0b5-4fac-a030-060f1ea10949";
  const beginn: string = "1999-02-01";
  const ende: string = "1999-02-01";

  const onSubmitFunction = () => {
    dispatch(erfasseTermin(nextTerminId, parteiId, beginn, ende));
  };

  const handleChange = (event: any) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <div className={"termin-erfassung"}>
      <form>
        <Button onClick={onSubmitFunction} color={"primary"}>
          Erfasse Termin
        </Button>
      </form>
      <div className={"calendarWrapper"}>
        <Kalender />
      </div>
      <div className={"mieterContainer"} ref={containerElRef}>
        <Chip
          className={"draggable"}
          draggable={"true"}
          label={"Waschtermin Beat & Lisa"}
        />
        <Chip
          className={"draggable"}
          draggable={"true"}
          label={"Waschtermin Familie Ramseier"}
        />
        <Chip
          className={"draggable"}
          draggable={"true"}
          label={"Waschtermin Hugo"}
        />
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
