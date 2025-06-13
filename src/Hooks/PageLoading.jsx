import React, { useEffect, useState } from "react";
import Loader from "../pages/Loader/Loader"


const PageLoading = ({children}) => {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{window.scrollTo(0,0)},[])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);

  }, []);

  if(loading) return <Loader></Loader>

  return <>{children}
  </>;
};

export default PageLoading;
