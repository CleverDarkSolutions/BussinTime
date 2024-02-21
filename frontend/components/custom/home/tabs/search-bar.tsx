import {InputAdornment, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onChange, value }: any) => {
  return (
    <div className="ml-4 w-[93%]">
      <TextField
        fullWidth
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
