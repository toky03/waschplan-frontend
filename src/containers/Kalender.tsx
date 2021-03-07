import React, { useState } from "react";
import "./Kalender.css";

import FullCalendar, {
  EventClickArg,
  EventSourceInput,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import localeDe from "@fullcalendar/core/locales/de";
import { useSelector } from "react-redux";
import { Termin } from "../model/model";
import { selectTermineEnriched } from "../state/selectors";

import store from "../index";
import { markiereTermin } from "../state/actions";
import UserChooser from "./UserChooser";
import { createNewTermin, deleteTermin } from "../integration/integration";
import { isPseudoRegex } from "../state/id-utils";

const Kalender = () => {
  const [pendingDate, setDate] = useState<Date | null>(null);

  const calculateBackgroundColor = (
    marked: boolean | undefined,
    id: string
  ) => {
    return marked ? "red" : isPseudoRegex(id) ? "lightblue" : undefined;
  };

  const termine: EventSourceInput | undefined = useSelector(
    selectTermineEnriched
  )?.map((termin: Termin) => ({
    title: termin.mieterName + (termin.marked ? " löschen" : ""),
    start: termin.terminBeginn,
    end: termin.terminEnde,
    extendedProps: { id: termin.id, marked: termin.marked },
    backgroundColor: calculateBackgroundColor(termin.marked, termin.id),
  }));

  const handleDateClick = (dateClickArg: DateClickArg) => {
    setDate(() => dateClickArg.date);
  };

  const createTermin = (parteiId: string | null) => {
    if (pendingDate && parteiId) {
      store.dispatch(createNewTermin(parteiId, pendingDate));
    }
    setDate(() => null);
  };

  const handleClick = (arg: EventClickArg) => {
    const terminId: string = arg.event._def.extendedProps.id;
    const marked: boolean = arg.event._def.extendedProps.marked;
    if (marked) {
      if (confirm("soll der Termin gelöscht werden?")) {
        store.dispatch(deleteTermin(terminId));
      } else {
        store.dispatch(markiereTermin(terminId));
      }
    } else {
      store.dispatch(markiereTermin(terminId));
    }
  };

  const handleDrop = (e: any) => {
    console.log('Hello drop');
  }

  return (
    <div className={"calendarWrapper"}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        locale={localeDe}
        themeSystem={"standart"}
        droppable={true}
        weekends={false}
        slotMinTime={"07:00:00"}
        slotMaxTime={"22:00:00"}
        events={termine}
        eventOverlap={false}
        editable={true}
        dateClick={handleDateClick}
        eventClick={handleClick}
        drop={handleDrop}
      >
        loading...
      </FullCalendar>
      <UserChooser open={pendingDate !== null} userChanged={createTermin} />
    </div>
  );
};

export default Kalender;
