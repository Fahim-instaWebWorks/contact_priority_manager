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
  IconButton
} from "@mui/material";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Create_contact from "./create_contact/Create_contact";
import { data as initialData } from "../data/data";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes}>
      <TableCell>
        <IconButton {...listeners}>
          <DragIndicatorIcon />
        </IconButton>
      </TableCell>
      {props.children}
    </TableRow>
  );
};

const Test = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [data, setData] = useState(initialData);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setData((items) => {
        const oldIndex = items.findIndex((item) => item.contact_name === active.id);
        const newIndex = items.findIndex((item) => item.contact_name === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          color="inherit"
          variant="p"
          component="div"
          sx={{ fontWeight: 700, fontSize: "x-large" }}
        >
          Contact Priority Manager
        </Typography>
        <Tooltip title="Delete">
          <Button variant="contained" size="small" onClick={() => setOpenCreateModal(true)}>
            Add Contact
          </Button>
        </Tooltip>
      </Toolbar>
      <TableContainer component={Paper}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={data.map(item => item.contact_name)} strategy={verticalListSortingStrategy}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Drag</TableCell>
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
                  <SortableItem key={row.contact_name} id={row.contact_name}>
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
                  </SortableItem>
                ))}
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>
      </TableContainer>
      {openCreateModal && <Create_contact open={openCreateModal} setOpen={setOpenCreateModal} />}
    </Paper>
  );
};

export default Test;
