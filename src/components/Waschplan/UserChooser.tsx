import React from 'react'
import './UserChooser.css'
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@material-ui/core'
import { useSelector } from 'react-redux'

import { selectMieter } from '../../state/selectors'
import { MieterDto } from '../../model/model'
import { selectAvatar } from '../../utils/date-utils'
import { buttonStyles } from '../App'

export type UserChooserProps = {
    open: boolean
    userChanged: (userid: string | null) => void
}

const UserChooser: React.FC<UserChooserProps> = (props: UserChooserProps) => {
    const classes = buttonStyles()
    const mieter = useSelector(selectMieter)

    return (
        <Dialog open={props.open}>
            <DialogTitle className={'Chooser'}>
                Für welchen Mieter soll der Termin gebucht werden?
            </DialogTitle>
            <DialogContent className={'Chooser'}>
                <List>
                    {mieter?.mieter.map((mieter: MieterDto) => (
                        <ListItem
                            key={mieter.id}
                            button
                            onClick={() => props.userChanged(mieter.id)}
                        >
                            <ListItemAvatar>
                                <Avatar src={selectAvatar(mieter.name)} />
                            </ListItemAvatar>
                            <ListItemText primary={mieter.name} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions className={'Chooser'}>
                <Button
                    className={classes.root}
                    onClick={() => props.userChanged(null)}
                >
                    Abbrechen
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserChooser
