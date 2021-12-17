import React, { useCallback, useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import useData from '../../../hooks/useData';

const Vis2 = () => {
  const [data, setData] = useState(null);
  const applyData = useCallback((data) => setData(data), []);
  const { sendRequest } = useData(applyData);

  useEffect(() => {
    sendRequest({
      url: 'https://gist.githubusercontent.com/thomasbrettell/486753411816d7b78bf965c8a8643dc2/raw/fd0e7c240759191732aa7c45876a3e9b9f380cda/country-energy-sources.json',
    });
  }, [sendRequest]);

  if (!data) {
    return <pre>Fetching data</pre>;
  }
  console.log(data);

  return <p>Vis2</p>;
};

export default Vis2;
