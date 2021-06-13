import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Show() {
  const classes = useStyles();

  const [studentsList, setStudentList] = useState([])

  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`).then( () => {
      window.location.reload(false);
    })
  }

  useEffect(() => {
      axios.get('http://localhost:5000/students').then( (allStudents) => {
          setStudentList(allStudents.data);
      } )
  }, [])

  return (
    <>
    <h2>Show</h2>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Registration Number</StyledTableCell>
            <StyledTableCell align="right">Grade</StyledTableCell>
            <StyledTableCell align="right">Section</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentsList.map((student, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell component="th" scope="row">
                {student.studentName}
              </StyledTableCell>
              <StyledTableCell align="right">{student.regNo}</StyledTableCell>
              <StyledTableCell align="right">{student.grade}</StyledTableCell>
              <StyledTableCell align="right">{student.section}</StyledTableCell>
              <StyledTableCell align="right">
              <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteStudent(student._id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
