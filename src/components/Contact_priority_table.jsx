import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import { data } from "../data/data";
import Create_contact from "./create_contact/Create_contact";

const Contact_priority_table = () => {
    const [openCreatModal,setOpenCreateModal] = useState(false)
  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <Toolbar sx={{ display:'flex',justifyContent:'space-between' }}>
        <Typography
          color="inherit"
          variant="p"
          component="div"
          sx={{fontWeight:700,fontSize:'x-large'}}
        >
          Contact Priority Manager
        </Typography>
        <Tooltip title="Delete">
          <Button variant="contained" size="small" onClick={()=>setOpenCreateModal(true)}>
            Add Contact
          </Button>
        </Tooltip>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Contact Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Deceased</TableCell>
              <TableCell>Property Relationship Name</TableCell>
              <TableCell>Relationship</TableCell>
              <TableCell>Mailing Street</TableCell>
              <TableCell>Mailing City</TableCell>
              <TableCell>Mailing State</TableCell>
              <TableCell>Mailing Zip</TableCell>
              <TableCell>Skip Trace Date</TableCell>
              <TableCell>Skip Trace Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.contact_name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.deceased ? "Yes" : "No"}</TableCell>
                <TableCell>{row.property_relationship_name}</TableCell>
                <TableCell>{row.relationship}</TableCell>
                <TableCell>{row.mailing_street}</TableCell>
                <TableCell>{row.mailing_city}</TableCell>
                <TableCell>{row.mailing_state}</TableCell>
                <TableCell>{row.mailing_zip}</TableCell>
                <TableCell>{row.skip_trace_date}</TableCell>
                <TableCell>{row.skip_trace_result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openCreatModal && <Create_contact open={openCreatModal} setOpen={setOpenCreateModal}/>}
    </Paper>
  );
};

export default Contact_priority_table;
