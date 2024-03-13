import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { CardActionArea } from '@mui/material';

const RecipeCard = ({ categories, title, preview, description }) => (
  <Card sx={{ width: '100%' }}>
    <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <CardMedia component="img" height="140" image={preview} alt={`Preview of ${title}`} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <Divider sx={{ mt: 'auto' }} />
      <CardContent>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {categories.map((category) => (
            <Chip key={category._id} label={category.name} size="small" />
          ))}
        </Stack>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default RecipeCard;
