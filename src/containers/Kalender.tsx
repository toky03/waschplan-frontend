import React, { useState } from "react";

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
import { markiereTermin, erfasseTermin, loescheTermin } from "../state/actions";
import UserChooser from "./UserChooser";
import { formatISO, setHours, setMinutes } from "date-fns";

const Kalender = () => {
  const [pendingDate, setDate] = useState<Date | null>(null);

  // TODO muss dies in einen Effect verschoben werden?
  const termine: EventSourceInput | undefined = useSelector(
    selectTermineEnriched
  )?.map((termin: Termin) => ({
    title: termin.mieterName + (termin.marked? " löschen": ""),
    start: termin.terminBeginn,
    end: termin.terminEnde,
    extendedProps: { id: termin.id, marked: termin.marked },
    backgroundColor: termin.marked ? "red" : undefined,
  }));

  const handleDateClick = (dateClickArg: DateClickArg) => {
    setDate(() => dateClickArg.date);
  };

  const createTermin = (parteiId: string | null) => {
    if (pendingDate && parteiId) {
      store.dispatch(
        erfasseTermin(
          "<0>", // TODO muss weggenommen werden
          parteiId,
          formatISO(setMinutes(setHours(pendingDate, 7), 0)),
          formatISO(setMinutes(setHours(pendingDate, 22), 0))
        )
      );
    }
    setDate(() => null);
  };

  const handleClick = (arg: EventClickArg) => {
    const terminId: string = arg.event._def.extendedProps.id;
    const marked: boolean = arg.event._def.extendedProps.marked;
    if (marked) {
      if (confirm("soll der Termin gelöscht werden?")) {
        store.dispatch(loescheTermin(terminId));
      } else {
        store.dispatch(markiereTermin(terminId));
      }
    } else {
      store.dispatch(markiereTermin(terminId));
    }
  };

  return (
    <div>
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
      >
        loading...
      </FullCalendar>
      <UserChooser open={pendingDate !== null} userChanged={createTermin} />
    </div>
  );
};

export default Kalender;
