import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";


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


const Create_contact = ({ open, setOpen }) => {
  const { handleSubmit, control, reset, setValue } = useForm();
  const [country] = useState("us");

  const { placesService, placePredictions } = usePlacesService({
    apiKey: process.env.REACT_APP_GOOGLE,
  });
  const AutocompleteInput = forwardRef((props, ref) => (
    <ReactGoogleAutocomplete
      {...props}
      ref={ref}
    />
  ));

  useEffect(() => {
    if (placePredictions.length) {
      placesService.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails) => {
          console.log(placeDetails);
        }
      );
    }
  }, [placePredictions, placesService]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    reset();
    handleClose();
  };

  const extractAddressComponent = (addressComponents, type) => {
    // console.log(addressComponents)
    const component = addressComponents.find((component) =>
      component.types.includes(type)
    );
    return component ? component.long_name : "";
  };

  const handlePlaceSelected = (place) => {
    console.log(place);
    const addressComponents = place.address_components;

    const city = extractAddressComponent(addressComponents, "locality");
    const state = extractAddressComponent(
      addressComponents,
      "administrative_area_level_1"
    );
    const zip = extractAddressComponent(addressComponents, "postal_code");
    setValue("Mailing Address", place.formatted_address);
    setValue("Mailing City", city);
    setValue("Mailing State", state);
    setValue("Mailing Zip", zip);
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
          <Grid container columns={12} spacing={2}>
            {fields.map((field, index) => (
              <Grid
                key={index}
                item
                xs={field.label === "Mailing Address" ? 12 : 6}
              >
                <Box display="flex" alignItems="center" height={20} my={0.5} p={0}>
                  <Typography variant="body1" sx={{ minWidth: "120px" }}>
                    {field.label}
                  </Typography>
                  <Controller
                    name={field.id}
                    control={control}
                    defaultValue=""
                    render={({ field: controllerField }) =>
                      field.label === "Mailing Address" ? (
                        <>
                          {/* <Input
                        
                          fullWidth
                          margin="dense"
                          color="primary"
                          size="small"
                          disableUnderline
                          
                          sx={{border:'1px solid #C4C4C4' ,borderRadius:1,ml:2,flex:1,pl:0.8,height:35,paddingBlock:"1px",paddingInline:"2px","&:hover":{border:'1px solid black'}}}
                          inputComponent={({
                            inputRef,
                            onFocus,
                            onBlur,
                            ...props
                          }) => (
                            <ReactGoogleAutocomplete
                              apiKey=process.env.REACT_APP_GOOGLE
                              {...props}
                              onPlaceSelected={handlePlaceSelected}
                              options={{
                                types: ["address"],
                                componentRestrictions: { country },
                              }}
                              defaultValue={controllerField.value}
                              style={{ width: "100%" }}
                            />
                          )}
                        /> */}
                          {/* <TextField
                            margin="dense"
                            variant="outlined"
                            size="small"
                            sx={{ ml: 2, flex: 1 }}
                            InputProps={{
                              inputComponent: ({ inputRef, ...props }) => (
                                <ReactGoogleAutocomplete
                                  apiKey=process.env.REACT_APP_GOOGLE
                                  {...props}
                                  onPlaceSelected={handlePlaceSelected}
                                  options={{
                                    types: ["address"],
                                    componentRestrictions: { country },
                                  }}
                                  style={{ width: "100%" }}
                                  defaultValue={controllerField.value}
                                />
                              ),
                            }}
                          /> */}

                          <TextField
                            {...controllerField}
                            margin="dense"
                            variant="outlined"
                            size="small"
                            sx={{ ml: 2, flex: 1 }}
                            InputProps={{
                              inputComponent: AutocompleteInput,
                              inputProps: {
                                apiKey:process.env.REACT_APP_GOOGLE,
                                onPlaceSelected: handlePlaceSelected,
                                options: {
                                  types: ["address"],
                                  componentRestrictions: { country },
                                },
                                style: { width: "100%" },
                                defaultValue: controllerField.value,
                              },
                            }}
                          />
                        </>
                      ) : (
                        <TextField
                          {...controllerField}
                          margin="dense"
                          type={field.type}
                          variant="outlined"
                          size="small"
                          sx={{ ml: 2, flex: 1,"& .MuiTextField-root":{padding:0}}}
                        />
                      )
                    }
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
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
