// CountrySelector.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { twoLettersCountriesIso31661Objects } from '../utils/twoLettersCountriesIso31661'; 

interface CountrySelectorProps {
  selectedCountry: string;
  onSelectCountry: (countryCode: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ selectedCountry, onSelectCountry }) => {
  return (
    <View>
      <Picker
        selectedValue={selectedCountry}
        onValueChange={(itemValue: string) => onSelectCountry(itemValue)} 
      >
        {twoLettersCountriesIso31661Objects.map((country) => (
          <Picker.Item key={country.abbreviation} label={country.name} value={country.abbreviation} />
        ))}
      </Picker>
    </View>
  );
};

export default CountrySelector;