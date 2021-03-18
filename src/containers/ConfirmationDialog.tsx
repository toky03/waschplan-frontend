import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core'
import { FuncWrapper, Termin } from '../model/model'
import { useSelector } from 'react-redux'
import { selectTermineEnriched } from '../state/selectors'

type ConfirmationProps = {
    terminId: string | null
    confirm: (agree: boolean, mieterId: string) => void
}

const ConfirmationDialog: React.FC<ConfirmationProps> = (
    props: ConfirmationProps
) => {
    const [open, setOpen] = React.useState(false)
    const [dialogMessage, setDialogMessage] = useState<string | null>(null)
    const termine: Termin[] | undefined = useSelector(selectTermineEnriched)

    useEffect(() => {
        if (props.terminId) {
            const termin: Termin | undefined = termine?.find(
                (termin: Termin) => termin.id === props.terminId
            )
            setDialogMessage(
                () =>
                    `Soll der Termin von ${termin?.mieterName} wirklich gelöscht werden?`
            )
            setOpen(() => true)
        }
    }, [props.terminId])

    const handleClose: FuncWrapper<boolean, void> = (agree: boolean) => {
        if (props.terminId) {
            setOpen(() => false)
            props.confirm(agree, props.terminId)
        }
    }

    return (
        <Dialog open={open}>
            <DialogTitle>{'Termin Löschen'}</DialogTitle>
            <DialogContent>
                <DialogContentText>{dialogMessage}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(false)} color="primary">
                    Nein
                </Button>
                <Button
                    onClick={() => handleClose(true)}
                    color="primary"
                    autoFocus
                >
                    Ja
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog
