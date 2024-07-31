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
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { data as initialData } from "../data/data";
import Create_contact from "./create_contact/Create_contact";

const DragHandle = (props) => {
  const { attributes, listeners } = props;

  return (
    <IconButton {...attributes} {...listeners}>
      <svg viewBox="0 0 20 20" width="12">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
      </svg>
    </IconButton>
  );
};

const SortableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : "auto",
    background: isDragging ? "white" : "inherit",
    boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
    width: "100%",
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes}>
      <TableCell>
        <DragHandle attributes={attributes} listeners={listeners} />
      </TableCell>
      {children}
    </TableRow>
  );
};

const Test = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [data, setData] = useState(initialData);
  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over.id) {
      setData((items) => {
        const oldIndex = items.findIndex(
          (item) => item.contact_name === active.id
        );
        const newIndex = items.findIndex(
          (item) => item.contact_name === over.id
        );
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const activeItem = data.find((item) => item.contact_name === activeId);

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
        <Tooltip title="Add Contact">
          <Button
            variant="contained"
            size="small"
            onClick={() => setOpenCreateModal(true)}
          >
            Add Contact
          </Button>
        </Tooltip>
      </Toolbar>
      <TableContainer component={Paper}>
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={data.map((item) => item.contact_name)}
            strategy={verticalListSortingStrategy}
          >
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
                {data.map((row) => (
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
          <DragOverlay
            className="my-drag-overlay"
            style={{
              width: "100%",
              display: "flex",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "10px",
              borderRadius: "4px",
              background:'white'
            }}
          >
            {activeItem ? (
              <TableRow>
                <TableCell>
                  <DragHandle />
                </TableCell>
                <TableCell>{activeItem.contact_name}</TableCell>
                <TableCell>{activeItem.age}</TableCell>
                <TableCell>{activeItem.deceased ? "Yes" : "No"}</TableCell>
                <TableCell>{activeItem.property_relationship_name}</TableCell>
                <TableCell>{activeItem.relationship}</TableCell>
                <TableCell>{activeItem.mailing_street}</TableCell>
                <TableCell>{activeItem.mailing_city}</TableCell>
                <TableCell>{activeItem.mailing_state}</TableCell>
                <TableCell>{activeItem.mailing_zip}</TableCell>
                <TableCell>{activeItem.skip_trace_date}</TableCell>
                <TableCell>{activeItem.skip_trace_result}</TableCell>
              </TableRow>
            ) : null}
          </DragOverlay>
        </DndContext>
      </TableContainer>
      {openCreateModal && (
        <Create_contact open={openCreateModal} setOpen={setOpenCreateModal} />
      )}
    </Paper>
  );
};

export default Test;
