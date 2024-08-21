import {FC, useState, useEffect} from 'react'

import { Alert, AlertIcon } from '@chakra-ui/react';
export const EmptyResultAlert: FC = () =>{
    const [showMessage, setShowMessage] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
          setShowMessage(true);
        }, 700); 
    
        return () => clearTimeout(timer); 
      }, []);
    
      return showMessage ? (
        <Alert status='info'>
                      <AlertIcon />
                        nothing was found
                    </Alert>
      ) : null;
}