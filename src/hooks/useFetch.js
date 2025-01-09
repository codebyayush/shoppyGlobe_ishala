import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    //we'll cancel the request using axios.CancelToken
    //if there's already pending request
    const source = axios.CancelToken.source();
    
    //passing cancel token to the request
    axios.get(url, { cancelToken: source.token }) 
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        //if the request gets canceled we'll log error
        if (axios.isCancel(err)) {
          console.log('request canceled', err.message);
        } else {
          setError('error occurred');
        }
      }).finally(() => {
        setLoading(false);
      })
      
      //cleanup function to cancel the request if the component unmounts
      return () => {
      source.cancel('operation canceled');
    };
  }, [url]);
  
  return { data, loading, error }; }

export default useFetch;