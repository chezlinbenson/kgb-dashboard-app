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
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>

                        <TableCell className="tableCell">Name</TableCell>
                        <TableCell className="tableCell">Surname</TableCell>
                        <TableCell className="tableCell">Email</TableCell>
                        <TableCell className="tableCell">Password</TableCell>
                        <TableCell className="tableCell">Debit Id</TableCell>
                        <TableCell className="tableCell">User Id</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow

                        >

                            <TableCell className="tableCell">{row.Name}</TableCell>
                            <TableCell className="tableCell">{row.Surname}</TableCell>
                            <TableCell className="tableCell">{row.Email}</TableCell>
                            <TableCell className="tableCell">{row.Password}</TableCell>
                            <TableCell className="tableCell">{row.deb_id}</TableCell>
                            <TableCell className="tableCell">{row.id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

//   <p>Name: {currentUserData.Name}</p>
//           <p>Surname: {currentUserData.Surname}</p>
//           <p>Email: {currentUserData.Email}</p>
//           <p>Password: {currentUserData.Password}</p>
//           <p>Debit id: {currentUserData.deb_id}</p>
//           <p>User Id: {currentUserData.id}</p>

