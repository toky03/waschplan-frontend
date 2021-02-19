import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import localeDe from "@fullcalendar/core/locales/de";
import React from "react";
import { useSelector } from "react-redux";

const initialEvents = [
  { title: "event 1", start: "2020-12-15T01:30:00+01:00" },
  { title: "event 2", date: "2019-04-02" },
];

const handleDateClick = (arg: any) => {
  console.log(arg);
  alert(arg.date);
};

const Kalender = () => {
  const termine = useSelector((state: any) => state.termine);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      locale={localeDe}
      themeSystem={"standart"}
      droppable={true}
      weekends={false}
      slotMinTime={"07:00:00"}
      slotMaxTime={"22:00:00"}
      events={initialEvents}
      dateClick={handleDateClick}
    >
      loading...
    </FullCalendar>
  );
};

export default Kalender;
