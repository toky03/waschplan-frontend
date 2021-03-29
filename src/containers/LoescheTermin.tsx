import React, { useEffect, useState } from 'react'
import './LoescheTermin.css'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core'
import { FuncWrapper, FuncWrapperTwoArgs, Termin } from '../model/model'
import { useSelector } from 'react-redux'
import { selectTermineEnriched } from '../state/selectors'
import { buttonStyles } from '../components/App'
import store from '../index'
import { deleteTermin, markTermin } from '../state/effects'

type LoeschenProps = {
    terminId: string | null
}

export const confirmDeletion: FuncWrapperTwoArgs<boolean, string, void> = (
    agree: boolean,
    terminId: string
) => {
    const [terminToDelete, setTerminToDelete] = useState<string | null>(null)

    if (agree) {
        store.dispatch(deleteTermin(terminId))
    } else {
        store.dispatch(markTermin(terminId))
    }
    setTerminToDelete(null)
}

const LoescheTermin: React.FC<LoeschenProps> = (
    props: LoeschenProps
) => {
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

    const abort = () => {
        setOpen(() => false)
    }

    const executeDeletion = () => {
        if (props.terminId) {
            store.dispatch(deleteTermin(props.terminId))
            setOpen(() => false)
        }
    }

    return (
        <Dialog open={open}>
            <DialogTitle className={'LoeschenDialog'}>
                {'Termin Löschen'}
            </DialogTitle>
            <DialogContent className={'LoeschenDialog'}>
                <DialogContentText>{dialogMessage}</DialogContentText>
            </DialogContent>
            <DialogActions className={'LoeschenDialog'}>
                <Button
                    className={classes.root}
                    onClick={() => abort}
                    color="primary"
                >
                    Nein
                </Button>
                <Button
                    className={classes.root}
                    onClick={() => executeDeletion}
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
