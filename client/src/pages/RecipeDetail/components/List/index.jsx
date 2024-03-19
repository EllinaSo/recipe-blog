import Stack from '@mui/material/Stack';

const List = ({ as = 'ul', list }) => {
  return (
    <Stack as={as} sx={{ m: 0, pl: 3 }} gap={1}>
      {list.map((item, index) => (
        <li key={index} style={{ paddingLeft: 12 }}>
          {item}
        </li>
      ))}
    </Stack>
  );
};

export default List;
