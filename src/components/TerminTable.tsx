import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTermineEnriched } from '../state/selectors'

import Paper from '@material-ui/core/Paper'
import {
    IconButton,
    Table,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    TableBody,
} from '@material-ui/core'
import { prettyPrintDate, unPrettifyDate } from '../utils/date-utils'
import { FuncWrapperTwoArgs, Termin, TerminRow } from '../model/model'
import TerminTableHead from './TermineTableHead'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import LoescheTermin from '../containers/LoescheTermin'
import { confirmDeletion } from '../containers/LoescheTermin'

export const createData = (termin: Termin): TerminRow => {
    return {
        id: termin.id,
        name: termin.mieterName ? termin.mieterName : '',
        start: prettyPrintDate(termin.terminBeginn),
        ende: prettyPrintDate(termin.terminEnde),
        deleteUserId: termin.id,
    }
}

const descendingComparator = (
    left: TerminRow,
    right: TerminRow,
    orderBy: keyof TerminRow
) => {
    const isKeyDate: boolean = orderBy === 'start' || orderBy === 'ende'
    const valueLeft = isKeyDate ? unPrettifyDate(left[orderBy]) : left[orderBy]
    const valueRight = isKeyDate
        ? unPrettifyDate(right[orderBy])
        : right[orderBy]

    if (valueRight < valueLeft) {
        return -1
    }
    if (valueRight > valueLeft) {
        return 1
    }
    return 0
}

export type Order = 'asc' | 'desc'

const getComparator = <Key extends keyof TerminRow>(
    order: Order,
    orderBy: Key
): ((left: TerminRow, right: TerminRow) => number) =>
    order === 'desc'
        ? (left: TerminRow, right: TerminRow) =>
              descendingComparator(left, right, orderBy)
        : (left: TerminRow, right: TerminRow) =>
              -descendingComparator(left, right, orderBy)

const stableSort = (
    array: TerminRow[],
    comparatorFn: FuncWrapperTwoArgs<TerminRow, TerminRow, number>
) => {
    const indexedArray = array.map(
        (terminRow: TerminRow, index: number) =>
            [terminRow, index] as [TerminRow, number]
    )
    indexedArray.sort(
        (leftTermin: [TerminRow, number], rightTermin: [TerminRow, number]) => {
            const order = comparatorFn(leftTermin[0], rightTermin[0])
            if (order !== 0) return order
            return leftTermin[1] - rightTermin[1]
        }
    )
    return indexedArray.map((terminRow: [TerminRow, number]) => terminRow[0])
}

export const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: '#edcfb7',
        },
        paper: {
            marginTop: '50px',
            marginBottom: 'auto',
            marginInline: 'auto',
            width: '95%',
            backgroundColor: 'burlywood',
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        tablecell: {
            padding: 10,
        },
    })
)

const TerminTable: React.FC = () => {
    const classes = useStyles()
    const [order, setOrder] = React.useState<Order>('asc')
    const [orderBy, setOrderBy] = React.useState<keyof TerminRow>('name')
    const [selected] = React.useState<string[]>([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [terminToDelete, setTerminToDelete] = useState<string | null>(null)

    const termine: Termin[] | undefined = useSelector(selectTermineEnriched)
    const terminRows = termine
        ? termine.map((termin: Termin) => createData(termin))
        : []

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof TerminRow
    ) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, terminRows.length - page * rowsPerPage)

    const removeTermin = (id: string) => {
        setTerminToDelete(id)
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={6}>
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <TerminTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={terminRows.length}
                        />
                        <TableBody>
                            {stableSort(
                                terminRows,
                                getComparator(order, orderBy)
                            )
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row: TerminRow, index: number) => {
                                    const labelId = `enhanced-table-checkbox-${index}`

                                    return (
                                        <TableRow
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            <TableCell
                                                className={classes.tablecell}
                                            />
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.start}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.ende}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    onClick={() =>
                                                        removeTermin(row.id)
                                                    }
                                                    aria-label="delete"
                                                    color="secondary"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    labelRowsPerPage={'Einträge'}
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={terminRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <LoescheTermin
                terminId={terminToDelete}
                confirm={confirmDeletion}
            />
        </div>
    )
}

export default TerminTable
