import React from 'react'
import { TerminRow } from '../model/model'
import { Order, useStyles } from './TerminTable'
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@material-ui/core'

interface HeadCell {
    disablePadding: boolean
    id: keyof TerminRow
    label: string
    numeric: boolean
}

const headCells: HeadCell[] = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Mieter Name' },
    { id: 'start', numeric: true, disablePadding: false, label: 'Beginn' },
    { id: 'ende', numeric: true, disablePadding: false, label: 'Ende' },
    {
        id: 'deleteUserId',
        numeric: true,
        disablePadding: false,
        label: 'Löschen',
    },
]

interface TerminTableHeadProps {
    classes: ReturnType<typeof useStyles>
    numSelected: number
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof TerminRow
    ) => void
    order: Order
    orderBy: string
    rowCount: number
}

const TerminTableHead: React.FC<TerminTableHeadProps> = (
    props: TerminTableHeadProps
) => {
    const { classes, order, orderBy, onRequestSort } = props
    const createSortHandler = (property: keyof TerminRow) => (
        event: React.MouseEvent<unknown>
    ) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell className={classes.tablecell} />
                {headCells.map((headCell: HeadCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default TerminTableHead
