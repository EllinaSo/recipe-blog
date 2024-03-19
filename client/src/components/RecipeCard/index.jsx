import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { CardActionArea } from '@mui/material';

import CategoriesList from '../../components/CategoriesList';

const RecipeCard = ({ categories, title, preview, description, _id: id }) => (
  <Card sx={{ width: '100%' }}>
    <CardActionArea
      component={RouterLink}
      to={`/recipes/${id}`}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
    >
      <CardMedia component="img" height="140" image={preview} alt={`Preview of ${title}`} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <Divider sx={{ mt: 'auto' }} />
      <CardContent>
        <CategoriesList categories={categories} />
      </CardContent>
    </CardActionArea>
  </Card>
);

export default RecipeCard;
