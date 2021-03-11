import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { Chip, Avatar } from "@material-ui/core";
import Kalender from "./Kalender";

import { Draggable } from "@fullcalendar/interaction";
import "./ErfasseTermin.css";
import {selectBackendSynced, selectMieter} from "../state/selectors";
import { MieterDto } from "../model/model";
import SyncIcon from '@material-ui/icons/Sync';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';

import avatar1 from "./avatars/Hugo.jpg";
import avatar2 from "./avatars/FamRamseier.jpg";
import avatar3 from "./avatars/FrauBrönnimann.png";
import avatar4 from "./avatars/BeatLisa.jpg";
import {green, red} from "@material-ui/core/colors";

const ErfasseTermin = () => {
  const containerElRef = useRef<HTMLDivElement>(null);
  const mieter = useSelector(selectMieter);
  const isSynced: boolean | undefined = useSelector(selectBackendSynced);

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
  // TODO: Frage Jonas: Geht das so?
  function selectAvatar(mieterName: string) {
    switch (mieterName) {
      case "Hugo":
        return avatar1;
      case "Familie Ramseier":
        return avatar2;
      case "Frau Brönnimann":
        return avatar3;
      case "Beat & Lisa":
        return avatar4;
      default:
        avatar1;
    }
  }

  return (
    <div className={"termin-erfassung"}>
      <div className={"anleitungContainer"}>
        <div className={"anleitung"}>
          ANLEITUNG: DU KANNST DEN NAMEN IN DEN KALENDER SCHIEBEN UM EINEN
          WASCHTAG ZU BUCHEN!
        </div>
        {
          isSynced? <SyncIcon style={{ color: green[500] }} />: <SyncDisabledIcon style={{ color: red[500] }}/>
        }
      </div>
      <div className={"mieterContainer"} ref={containerElRef}>
        {mieter?.mieter.map((mieter: MieterDto) => (
          <div key={mieter.id} className={"mieter"}>
            <Chip
              className={"draggable"}
              draggable={"true"}
              label={mieter.name}
              variant={"outlined"}
              avatar={<Avatar src={selectAvatar(mieter.name)} />}
            />
            <div className="spaceBetweenIcons" />
          </div>
        ))}
      </div>
      <div className={"calendarWrapper"}>
        <Kalender />
      </div>
    </div>
  );
};

export default ErfasseTermin;
