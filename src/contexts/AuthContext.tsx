import { useState, createContext, useEffect, ReactNode } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, UserInfo } from "firebase/auth";

type UserType = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: UserType | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserType>();
  const auth = getAuth();

  function _setUser(user: UserInfo) {
    const { displayName, photoURL, uid } = user;

    if (!displayName || !photoURL) {
      throw new Error("Missing information from Google account.");
    }

    setUser({
      id: uid,
      name: displayName,
      avatar: photoURL
    });
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        _setUser(user);
      }
    });

    return () => unsubscribe();
  }, [])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      if (user) {
        _setUser(user);
      }
    }
    catch (error) {
      throw new Error("Error on authenticate with Google");
      // Handle Errors here.
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      // The email of the user's account used.
      //   const email = error.email;
      // The AuthCredential type that was used.
      //   const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      { children }
    </AuthContext.Provider>
  )
}