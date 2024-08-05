import React, { lazy, Suspense } from 'react'

const SignUp=lazy(()=>import("../components/SignUp"))

const SignupPage = () => {
  return (
   
    <Suspense>
      <SignUp></SignUp>
    </Suspense>
    
  
  )
}

export default SignupPage;