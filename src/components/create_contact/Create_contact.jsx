import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const fields = [
  { label: "First Name", id: "firstName", type: "text" },
  { label: "Last Name", id: "lastName", type: "text" },
  { label: "Deceased", id: "Deceased", type: "number" },
  { label: "Skiptrace Result", id: "Skiptrace Result", type: "text" },
  {
    label: "Property_Relationship Module",
    id: "Property_Relationship Module",
    type: "text",
  },
  { label: "Rank", id: "Rank", type: "text" },
  { label: "Relationship", id: "Relationship", type: "text" },
  { label: "Case", id: "Case", type: "text" },
  { label: "Mailing Address", id: "Mailing Address", type: "text" },
  { label: "Mailing City", id: "Mailing City", type: "text" },
  { label: "Mailing State", id: "Mailing State", type: "text" },
  { label: "Mailing Zip", id: "Mailing Zip", type: "number" },
];

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Create_contact = ({ open, setOpen }) => {
  // const [open, setOpen] = useState(false);
  const [map, setMap] = useState(null);
  const { handleSubmit, control, reset } = useForm();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY",
  });

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

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
          position: "absolute",
          top: 0,
          margin: 0,
          padding: 0,
          width: "80%",
        },
      }}
      maxWidth={false}
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Quick Create Contact
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
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
          {/* <Box display="flex" flexDirection="column" gap={2} mt={1}> */}
          <Grid container columns={12} spacing={2}>
            {fields.map((field, index) => (
              <Grid item xs={field.label === "Mailing Address" ? 12 : 6}>
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  height={20}
                  my={0.5}
                >
                  <Typography variant="body1" sx={{ minWidth: "120px" }}>
                    {field.label}
                  </Typography>
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
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={10}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {/* Child components, such as markers, info windows, etc. */}
                  <></>
                </GoogleMap>
              </Grid>
            ))}
          </Grid>
          {/* </Box> */}
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
