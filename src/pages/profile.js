import { getCompany, getWorker } from '../database/firebaseFunctions';
import { useState, useEffect } from 'react';
import Button from '../components/Button';

export default function Profile(props) {
  let type = 'worker';
  if (type === 'company') {
    return companyProfile(props);
  } else {
    return workerProfile(props);
  }
}

function workerProfile(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedData, setLoadedData] = useState({
      name: 'default',
      age: -1,
      email: 'default',
      location: 'default',
      numReviews: -1,
      avgReview: -1,
      password: 'default',
      phone: 'default',
      profilePicture: 'https://firebasestorage.googleapis.com/v0/b/gighub-c8dcf.appspot.com/o/profile_pics%2FFrame%204(1).png?alt=media&token=d7e2e7ec-b7ad-43e4-a1c5-ddd10fb7fbee',
      resume: 'https://firebasestorage.googleapis.com/v0/b/gighub-c8dcf.appspot.com/o/resumes%2FPlaceholder%20resume.pdf?alt=media&token=d3fb483c-24e5-48e4-b5f6-bc074fc9d7ee',
      skills: ['defualt']
    });
  useEffect(() => {
    getWorker(props.id).then((doc) => {
      setLoadedData(doc);
      setIsLoading(false);
    });
  }, {});

  if (isLoading) {
      return (<p>Loading...</p>);
  }

  let workerName = loadedData.name;
  return (
      <p>DONE LOADING</p>
      /*
      ACTUAL PAGE CODE
      */
  );
}

function companyProfile(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedData, setLoadedData] = useState({});
    useEffect(() => {
      getCompany(props.id).then((doc) => {
        setLoadedData(doc);
        setIsLoading(false);
      });
    }, {});
  
    if (isLoading) {
        return (<p>Loading...</p>);
    }

    
  
    return (
        <p>DONE LOADING</p>
        /*
        ACTUAL PAGE CODE
        */
    );
}
