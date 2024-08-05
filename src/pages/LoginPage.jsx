import React, { lazy, Suspense } from 'react'

const Login=lazy(()=>import("../components/Login"));
 const LoginPage = () => {
  return (
    
    
    <Suspense>
      <Login></Login>
    </Suspense>
   

  )
}

export default LoginPage;
