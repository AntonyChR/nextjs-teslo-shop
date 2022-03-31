import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { IProduct } from '../../interfaces';
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const toggleMouseHovered = () => setIsHovered(!isHovered);

    const productImage = useMemo(() => {
        return isHovered ? `products/${product.images[1]}` : `products/${product.images[0]}`;
    }, [isHovered, product.images]);

    return (
        <Grid item xs={6} sm={4} onMouseEnter={toggleMouseHovered} onMouseLeave={toggleMouseHovered}>
            <Card>
                <NextLink href="/product/slug" passHref prefetch={false}>
                    <Link>
                        <CardActionArea>
                            <CardMedia
                                className="fadeIn"
                                component="img"
                                image={productImage}
                                alt={product.title}
                                title={product.title}
                            />
                        </CardActionArea>
                    </Link>
                </NextLink>
            </Card>
            <Box sx={{ mt: 1 }} className="fadeIn">
                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={500}>${product.price}</Typography>
            </Box>
        </Grid>
    );
};
