import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { IProduct } from '../../interfaces';
import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from '@mui/material';

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const toggleMouseHovered = () => setIsHovered(!isHovered);

    const productImage = useMemo(() => {
        return isHovered ? `/products/${product.images[1]}` : `/products/${product.images[0]}`;
    }, [isHovered, product.images]);

    return (
        <Grid item xs={6} sm={4} onMouseEnter={toggleMouseHovered} onMouseLeave={toggleMouseHovered}>
            <Card>
                <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                    <Link>
                        <CardActionArea>
                            {!product.inStock && (
                                <Chip
                                    color="warning"
                                    label="Agotado"
                                    sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                                />
                            )}
                            <CardMedia
                                className="fadeIn"
                                component="img"
                                image={productImage}
                                alt={product.title}
                                title={product.title}
                                onLoad={() => setIsImageLoaded(true)}
                            />
                        </CardActionArea>
                    </Link>
                </NextLink>
            </Card>
            <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className="fadeIn">
                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={500}>${product.price}</Typography>
            </Box>
        </Grid>
    );
};
