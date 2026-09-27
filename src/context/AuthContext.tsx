import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  updateProfile,
  doc,
  getDoc,
  setDoc,
  User
} from '../lib/firebase';
import { NEStateId } from '../types/flood';

export interface UserProfileData {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role: 'citizen' | 'researcher' | 'officer' | 'analyst';
  statePreference: NEStateId;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfileData | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, displayName: string, role?: UserProfileData['role'], statePref?: NEStateId) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  updateStatePreference: (stateId: NEStateId) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sync auth state & load profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const snap = await getDoc(userRef);

          if (snap.exists()) {
            setUserProfile(snap.data() as UserProfileData);
          } else {
            // Create initial profile
            const newProfile: UserProfileData = {
              uid: currentUser.uid,
              displayName: currentUser.displayName || (currentUser.isAnonymous ? 'Guest Hydrologist' : currentUser.email?.split('@')[0] || 'User'),
              email: currentUser.email || 'guest@jaldrishti-ne.local',
              photoURL: currentUser.photoURL || '',
              role: currentUser.isAnonymous ? 'citizen' : 'researcher',
              statePreference: 'assam',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            await setDoc(userRef, newProfile);
            setUserProfile(newProfile);
          }
        } catch (err) {
          console.error('Error fetching or creating user profile in Firestore:', err);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearError = () => setError(null);

  const signInWithGoogle = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      // If popup blocked or iframe issue, suggest email or guest
      if (err?.code === 'auth/popup-blocked') {
        setError('Popup was blocked by your browser. Please allow popups or use email sign-in.');
      } else {
        setError(err?.message || 'Failed to sign in with Google.');
      }
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err: any) {
      console.error('Email Sign In Error:', err);
      if (err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password' || err?.code === 'auth/invalid-credential') {
        setError('Invalid email or password. If you do not have an account, please switch to Sign Up.');
      } else {
        setError(err?.message || 'Failed to sign in with email.');
      }
      throw err;
    }
  };

  const signUpWithEmail = async (
    email: string,
    pass: string,
    displayName: string,
    role: UserProfileData['role'] = 'researcher',
    statePref: NEStateId = 'assam'
  ) => {
    setError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user, { displayName });

      const newProfile: UserProfileData = {
        uid: cred.user.uid,
        displayName: displayName || email.split('@')[0],
        email: email,
        photoURL: '',
        role: role,
        statePreference: statePref,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', cred.user.uid), newProfile);
      setUserProfile(newProfile);
    } catch (err: any) {
      console.error('Email Sign Up Error:', err);
      if (err?.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Please sign in instead.');
      } else {
        setError(err?.message || 'Failed to register account.');
      }
      throw err;
    }
  };

  const signInAsGuest = async () => {
    setError(null);
    try {
      await signInAnonymously(auth);
    } catch (err: any) {
      console.error('Guest Sign In Error:', err);
      setError(err?.message || 'Failed to initialize guest session.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  const updateStatePreference = async (stateId: NEStateId) => {
    if (!user || !userProfile) return;
    try {
      const updated = {
        ...userProfile,
        statePreference: stateId,
        updatedAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', user.uid), updated);
      setUserProfile(updated);
    } catch (err) {
      console.error('Failed to update state preference:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        error,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signInAsGuest,
        logout,
        updateStatePreference,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
