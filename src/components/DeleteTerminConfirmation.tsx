import React, { useEffect, useState } from 'react'
import './DeleteTerminConfirmation.css'
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
import { buttonStyles } from './App'
import store from '../index'
import { deleteTermin, unmarkTermin } from '../state/effects'

type LoeschenProps = {
    terminId: string | null
    abortDelete: () => void
}

const LoescheTermin: React.FC<LoeschenProps> = (props: LoeschenProps) => {
    const [open, setOpen] = React.useState(false)
    const [dialogMessage, setDialogMessage] = useState<string | null>(null)
    const termine: Termin[] | undefined = useSelector(selectTermineEnriched)
    const classes = buttonStyles()

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

    const abort: FuncWrapper<void, void> = () => {
        if (props.terminId) {
            store.dispatch(unmarkTermin(props.terminId))
            props.abortDelete()
            setOpen(() => false)
        }
    }

    const executeDeletion: FuncWrapper<void, void> = () => {
        if (props.terminId) {
            store.dispatch(deleteTermin(props.terminId))
            setOpen(() => false)
        }
    }

    return (
        <Dialog open={open}>
            <DialogTitle className={'DeleteTerminConfirmation'}>
                {'Termin Löschen'}
            </DialogTitle>
            <DialogContent className={'DeleteTerminConfirmation'}>
                <DialogContentText>{dialogMessage}</DialogContentText>
            </DialogContent>
            <DialogActions className={'DeleteTerminConfirmation'}>
                <Button
                    className={classes.root}
                    onClick={() => abort()}
                    color="primary"
                >
                    Nein
                </Button>
                <Button
                    className={classes.root}
                    onClick={() => executeDeletion()}
                    color="primary"
                    autoFocus
                >
                    Ja
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default LoescheTermin
