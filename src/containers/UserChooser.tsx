import React from "react";
import { Button, Dialog, DialogTitle, List, ListItem } from "@material-ui/core";
import { useSelector } from "react-redux";

import { selectMieter } from "../state/selectors";
import { MieterDto } from "../model/model";

export type UserChooserProps = {
  open: boolean;
  userChanged: (userid: string | null) => void;
};

export default function UserChooser(props: UserChooserProps) {
  const mieter = useSelector(selectMieter);

  return (
    <Dialog open={props.open}>
      <DialogTitle>Für wen soll der Termin gebucht werden?</DialogTitle>
      <List>
        {mieter?.mieter.map((mieter: MieterDto) => (
          <ListItem key={mieter.id}>
            <Button onClick={() => props.userChanged(mieter.id)}>
              {mieter.name}
            </Button>
          </ListItem>
        ))}
      </List>
      <Button onClick={() => props.userChanged(null)}>Abbrechen</Button>
    </Dialog>
  );
}
