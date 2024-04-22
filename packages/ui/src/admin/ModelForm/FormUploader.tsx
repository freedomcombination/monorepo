
import React, { useState } from 'react';

import { Box, Button, FormControl, FormLabel, Select } from '@chakra-ui/react';

const FormUploader = ({ onUpload }) => {
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState('');

  const handleUpload = (urls) => {
    setUploadedUrls(urls);
    setSelectedUrl(urls[0]); // Choose first url by default
    onUpload(urls);
  };

  const handleClear = () => {
    setUploadedUrls([]);
    setSelectedUrl('');
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Select Image URL:</FormLabel>
        <Select value={selectedUrl} onChange={(e) => setSelectedUrl(e.target.value)}>
          {uploadedUrls.map((url, index) => (
            <option key={index} value={url}>{url}</option>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleClear}>Clear</Button>
    </Box>
  );
};

export default FormUploader;
