import React, {useState} from "react";
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {Termin} from "../model/model";
import {useSelector} from "react-redux";
import {selectTermineEnriched} from "../state/selectors";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {TableHead} from "@material-ui/core";
import {format, parseISO} from "date-fns";
import store from "../index";
import {deleteTermin} from "../integration/integration";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
        table: {
            marginTop: '50px',
            marginBottom: 'auto',
            marginInline: 'auto',
            width: "80%",
            backgroundColor: 'transparent'
        },
    }),
);

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles();
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
}

interface TerminRow {
    id: string,
    name: string,
    start: string;
    ende: string;
}

const removeTermin = (id: string) => {
    store.dispatch(deleteTermin(id));
};

function createData(termin: Termin): TerminRow {
    return {
        id: termin.id,
        name: termin.mieterName,
        start: prettyPrintDate(termin.terminBeginn),
        ende: prettyPrintDate(termin.terminEnde)
    };
}

function prettyPrintDate(date: string): string {
    return format(parseISO(date), "dd.MM.yyyy HH:mm")
}

const Termine = () => {
    const classes = useStyles();

    const termine: Termin[] | undefined = useSelector(selectTermineEnriched);
    const columnHeader = ["Mietername", "Beginn", "Ende", "Editieren"]

    const terminRows = termine!.map((termin: Termin) => createData(termin));

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, terminRows.length - page * rowsPerPage);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(() => newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(() => parseInt(event.target.value, 10));
        setPage(() => 0);
    };

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        {columnHeader.map((column: string) => (
                            <TableCell key={column} align={"center"}>{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(terminRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell style={{width: 160}} component="th" scope="row" align="center">
                                {row.name}
                            </TableCell>
                            <TableCell style={{width: 160}} align="center">
                                {row.start}
                            </TableCell>
                            <TableCell style={{width: 160}} align="center">
                                {row.ende}
                            </TableCell>
                            <TableCell style={{width: 160}} align="center">
                                <IconButton onClick={() => removeTermin(row.id)} aria-label="delete" color="secondary">
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton aria-label="edit">
                                    <EditIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{height: 53 * emptyRows}}>
                            <TableCell colSpan={6}/>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                            colSpan={3}
                            count={terminRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {'aria-label': 'rows per page'},
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default Termine;
