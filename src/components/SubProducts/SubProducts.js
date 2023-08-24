import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function ActionAreaCard() {
  return (
    <div className='subProducts'>
        <Card sx={{ minWidth: 250 }} className='saleCard'>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image="/images/shoes.jpg"
                alt="green iguana"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Flat 70% OFF
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

        <Card sx={{ minWidth: 250 }}className='saleCard'>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image="/images/watches.jpg"
                alt="green iguana"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Watches
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

        <Card sx={{ minWidth: 250 }}className='saleCard'>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image="/images/perfume.jpg"
                alt="green iguana"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Perfumes
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    </div>
  );
}



