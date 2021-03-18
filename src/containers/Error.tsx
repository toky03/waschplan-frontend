import React from 'react'
import { Snackbar } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectErrors } from '../state/selectors'

export const ErrorAlert: React.FC = () => {
    const errors = useSelector(selectErrors)

    return <Snackbar />
}
