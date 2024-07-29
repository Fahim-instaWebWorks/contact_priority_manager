import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from "react-hook-form";

const fields = [
    { label: "First Name", id: "firstName", type: "text" },
    { label: "Last Name", id: "lastName", type: "text" },
    { label: "Deceased", id: "Deceased", type: "number" },
    { label: "Mailing Address", id: "Mailing Address", type: "text" },
    { label: "Mailing City", id: "Mailing City", type: "text" },
    { label: "Mailing State", id: "Mailing State", type: "text" },
    { label: "Mailing Zip", id: "Mailing Zip", type: "number" },
    { label: "Skiptrace Result", id: "Skiptrace Result", type: "text" },
    { label: "Property_Relationship Module", id: "Property_Relationship Module", type: "text" },
    { label: "Rank", id: "Rank", type: "text" },
    { label: "Relationship", id: "Relationship", type: "text" },
    { label: "Case", id: "Case", type: "text" },
    
  ];

const Create_contact = ({open, setOpen}) => {
    // const [open, setOpen] = useState(false);
    const { handleSubmit, control, reset } = useForm();

    const handleClose = () => {
      setOpen(false);
    };
  
    const onSubmit = (data) => {
      console.log(data);
    //   handleClose();
      reset();
    };
  
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            position: 'absolute',
            top: 0,
            margin: 0,
            padding: 0,
            width: '100%'
          }
        }}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Quick Create Contact
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              {fields.map((field, index) => (
                <Box key={index} display="flex" alignItems="center" height={20} my={0.5}>
                  <Typography variant="body1" sx={{ minWidth: '120px' }}>{field.label}</Typography>
                  <Controller
                    name={field.id}
                    control={control}
                    defaultValue=""
                    render={({ field: controllerField }) => (
                      <TextField
                        {...controllerField}
                        margin="dense"
                        type={field.type}
                        variant="outlined"
                        size="small"
                        sx={{ ml: 2, flex: 1 }}
                      />
                    )}
                  />
                </Box>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
};

export default Create_contact;
