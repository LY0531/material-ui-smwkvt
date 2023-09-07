import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
  ListItemText,
} from '@material-ui/core';

function App() {
  const options = ['オプション1', 'オプション2', 'オプション3'];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleOptionChange = (event) => {
    const value = event.target.value;

    // "全選択" チェックボックスをクリックした場合
    if (value === 'all') {
      if (selectAll) {
        setSelectedOptions([]);
      } else {
        setSelectedOptions(options);
      }
      setSelectAll(!selectAll);
    } else {
      // 個別のオプションをクリックした場合
      const currentIndex = selectedOptions.indexOf(value);
      const newSelectedOptions = [...selectedOptions];

      if (currentIndex === -1) {
        newSelectedOptions.push(value);
      } else {
        newSelectedOptions.splice(currentIndex, 1);
      }

      setSelectedOptions(newSelectedOptions);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('選択されたオプション:', selectedOptions);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="select-label">選択してください</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            multiple
            value={selectedOptions}
            onChange={handleOptionChange}
            label="選択してください"
            renderValue={(selected) => selected.join(', ')}
          >
            <MenuItem value="all">
              <Checkbox checked={selectAll} />
              <ListItemText primary="全選択" />
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={selectedOptions.includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          送信
        </Button>
      </form>
    </div>
  );
}

export default App;
render(<App />, document.getElementById('root'));
