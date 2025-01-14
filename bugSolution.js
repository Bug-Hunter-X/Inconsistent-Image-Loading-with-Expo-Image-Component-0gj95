```javascript
import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';

const MyImage = ({ uri }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retries, setRetries] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    const load = async () => {
      try {
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = uri;
        });
        setIsLoading(false);
      } catch (e) {
        if (retries < maxRetries) {
          setRetries(retries + 1);
          setTimeout(load, 1000);
        } else {
          setError(e);
          setIsLoading(false);
        }
      }
    };
    load();
  }, [uri, retries]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading image: {error.message}</Text>;
  }

  return (
    <Image source={{ uri }} style={{ width: 200, height: 200 }} />
  );
};

// ... rest of the code
```