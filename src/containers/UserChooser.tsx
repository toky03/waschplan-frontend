import { Button, Dialog, DialogTitle, List, ListItem } from "@material-ui/core";
import { useSelector } from "react-redux";

import { mieterSelector } from "../state/selectors";
import { MieterDto } from "../model/model";

export type UserChooserProps = {
  open: boolean;
  userChanged: (userid: string | null) => void;
};

export default function UserChooser(props: UserChooserProps) {
  const mieter = useSelector(mieterSelector);

  return (
    <Dialog open={props.open}>
      <DialogTitle>Wer sind sie?</DialogTitle>
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
