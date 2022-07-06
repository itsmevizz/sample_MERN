import React, { createContext, useState } from 'react'

export const userDataContext = createContext(null)

function UserContext({children}) {
    const [userData, setUserData] = useState('')
  return (
    <userDataContext.Provider value={{userData, setUserData}} >
        {children}
    </userDataContext.Provider>
  )
}

export default UserContext