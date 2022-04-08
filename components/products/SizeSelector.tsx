import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { ISize } from '../../interfaces';

interface Props {
    selectedSize: ISize |undefined;
    sizes: ISize[];
    onSelectedSize: (size: ISize) => void;
}
export const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
    return (
        <Box>
            {sizes.map((size) => (
                <Button
                    onClick={() => onSelectedSize(size)}
                    key={size}
                    size="small"
                    color={size === selectedSize ? 'primary' : 'info'}
                >
                    {size}
                </Button>
            ))}
        </Box>
    );
};
