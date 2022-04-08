import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";

interface Props {
    currentValue: number;
    updatedQuantity: (quantity: number) => void;
    maxValue: number;
}

export const ItemCounter:FC<Props> = ({currentValue: quantity, updatedQuantity,maxValue}) => {

  const handleChangeQuantity = (increment: number) => {
    const newQuantity = quantity + increment;
    if (newQuantity > 0 && newQuantity<=maxValue) updatedQuantity(newQuantity);
  }
  return (
    <Box display='flex' alignItems='center'>
        <IconButton onClick={()=>handleChangeQuantity(-1)}>
            <RemoveCircleOutline/>
        </IconButton>
            <Typography sx={{width:40, textAlign:'center'}}>{quantity}</Typography>
        <IconButton onClick={()=>handleChangeQuantity(1)}>
            <AddCircleOutline/>
        </IconButton>
    </Box>
  )
}
