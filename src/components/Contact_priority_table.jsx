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
  IconButton,
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
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes} sx={{ height: 10, p: 0 }}>
      <TableCell>
        <IconButton {...listeners} size="small">
          <svg viewBox="0 0 20 20" width="15">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
          </svg>
        </IconButton>
      </TableCell>
      {props.children}
    </TableRow>
  );
};

const ContactPriorityTable = ({ sampleData }) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [data, setData] = useState(sampleData );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setData((items) => {
        const oldIndex = items.findIndex((item) => item.Deal_Name === active.id);
        const newIndex = items.findIndex((item) => item.Deal_Name === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="inherit" variant="p" component="div" sx={{ fontWeight: 700, fontSize: "x-large" }}>
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
          <SortableContext items={data.map((item) => item.Deal_Name)} strategy={verticalListSortingStrategy}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Deal Name</TableCell>
                  <TableCell>Expected Revenue</TableCell>
                  <TableCell>Updated</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Last Activity Time</TableCell>
                  <TableCell>Stage</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Overall Sales Duration</TableCell>
                  <TableCell>Modified Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row, index) => (
                  <SortableItem key={index} id={row?.Deal_Name}>
                    <TableCell>{row?.Deal_Name}</TableCell>
                    <TableCell>{row?.Expected_Revenue}</TableCell>
                    <TableCell>{row?.Updated ? "Yes" : "No"}</TableCell>
                    <TableCell>{row?.Description}</TableCell>
                    <TableCell>{row?.Email}</TableCell>
                    <TableCell>{row?.Last_Activity_Time}</TableCell>
                    <TableCell>{row?.Stage}</TableCell>
                    <TableCell>{row?.Amount}</TableCell>
                    <TableCell>{row?.Overall_Sales_Duration}</TableCell>
                    <TableCell>{row?.Modified_Time}</TableCell>
                    <TableCell>{row?.$status}</TableCell>
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

export default ContactPriorityTable;
