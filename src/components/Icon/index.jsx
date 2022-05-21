import React from 'react';
import { createIconSetFromFontello } from '@expo/vector-icons';
import shelterConfig from '../../../assets/fonts/config.json';

const Icon = createIconSetFromFontello(shelterConfig, 'shelter', 'shelter.ttf');

export default Icon;
