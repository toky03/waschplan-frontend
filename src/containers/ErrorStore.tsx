import React from 'react'
import { useSelector } from 'react-redux'
import { selectErrors } from '../state/selectors'
import { WaschplanError } from '../state/metaReducer'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { FuncWrapper } from '../model/model'
import store from '../index'
import { removeError } from '../state/actions'

export const ErrorAlert: React.FC = () => {
    const errors: WaschplanError[] | undefined = useSelector(selectErrors)
    const closeError: FuncWrapper<string, void> = (errorId: string) => {
        store.dispatch(removeError(errorId))
    }
    return (
        <div>
            {errors?.map((error: WaschplanError) => (
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={true}
                    key={error.errorId}
                    message={error.errorMessage}
                >
                    <Alert
                        onClose={() => closeError(error.errorId)}
                        severity="error"
                    >
                        {error.errorMessage}
                    </Alert>
                </Snackbar>
            ))}
        </div>
    )
}
