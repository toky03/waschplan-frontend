import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { Chip } from "@material-ui/core";
import Kalender from "./Kalender";

import { Draggable } from "@fullcalendar/interaction";
import "./ErfasseTermin.css";
import { selectMieter } from "../state/selectors";
import { MieterDto } from "../model/model";

const ErfasseTermin = () => {
  const containerElRef = useRef<HTMLDivElement>(null);
  const mieter = useSelector(selectMieter);

  useEffect(() => {
    if (containerElRef.current) {
      new Draggable(containerElRef.current, {
        itemSelector: ".draggable",
        eventData: function (eventEl: HTMLElement) {
          return {
            title: eventEl.innerText,
            duration: { days: 1 },
          };
        },
      });
    }
  }, []);

  return (
    <div className={"termin-erfassung"}>
      <div className={"calendarWrapper"}>
        <Kalender />
      </div>
      <div className={"mieterContainer"} ref={containerElRef}>
        {mieter?.mieter.map((mieter: MieterDto) => (
          <div key={mieter.id}>
            <Chip
              className={"draggable"}
              draggable={"true"}
              label={"Waschtermin " + mieter.name}
            />
            <div className="spaceBetweenIcons" />
          </div>
        ))}
      </div>
      <div>
        Anleitung: Du kannst den Button in den Kalender schieben um einen
        Waschtag zu buchen
      </div>
    </div>
  );
};

export default ErfasseTermin;
