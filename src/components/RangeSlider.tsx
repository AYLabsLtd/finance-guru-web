import { Slider, TextField, Box, Typography } from '@mui/material';

interface RangeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  placeholder?: string;
}

function RangeSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  placeholder,
}: RangeSliderProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography component="label" fontWeight={600} display="block" mb={1}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          type="number"
          value={value}
          onChange={(e) => {
            const newValue = parseFloat(e.target.value);
            if (!isNaN(newValue)) {
              onChange(Math.min(Math.max(newValue, min), max));
            }
          }}
          placeholder={placeholder}
          size="small"
          sx={{ width: 150 }}
          InputProps={{
            endAdornment: unit ? <Typography>{unit}</Typography> : undefined,
          }}
        />
        <Slider
          value={value}
          onChange={(_, newValue) => onChange(newValue as number)}
          min={min}
          max={max}
          step={step}
          sx={{ flex: 1 }}
        />
      </Box>
    </Box>
  );
}

export default RangeSlider; 