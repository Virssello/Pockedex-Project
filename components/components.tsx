import {
  Box,
  Button,
  DialogActions,
  DialogContentText,
  Modal,
  Typography,
} from "@mui/material";

import InfoIcon from '@mui/icons-material/Info';
import { Pokemon } from "../interfaces/interfaces";
import React from "react";

export const ModalBox: React.FC<{ activePokemon: Pokemon }> = ({
  activePokemon,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  console.log(activePokemon);

  return (
    <div className="ModalBoxInfo">
      <Button variant="contained"
      color="primary"
      startIcon={<InfoIcon />}
      size="small"
      onClick={handleOpen}>More info about {activePokemon?.name}</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="BoxInfo"
        sx={{p: 2,
          border: "1px dashed grey",
          borderColor: "primary.main",}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h4>{activePokemon?.name}</h4>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <img
              src={activePokemon.sprites.front_default}
              alt="Pokemon image"
              width="300px"
              height="300px"
            />
            <p>Weight: {activePokemon?.weight}</p>
            <p>Height: {activePokemon?.height}</p>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
