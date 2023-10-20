import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function PaymentsTable({ rows = [] }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 850 }} aria-label="simple table">
                <TableHead>
                    <TableRow>

                        <TableCell className="tableCell">Amount</TableCell>
                        <TableCell className="tableCell">Date</TableCell>
                        <TableCell className="tableCell">Debit Id</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow>
                            <TableCell className="tableCell">{row.Amount}</TableCell>
                            <TableCell className="tableCell">{row.Date}</TableCell>
                            <TableCell className="tableCell">{row.Deb_id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}



