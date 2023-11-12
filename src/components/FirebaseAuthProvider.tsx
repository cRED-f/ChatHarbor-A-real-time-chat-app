"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../firebase/firebase";

async function syncFirebaseUserWithFirestore(session: Session) {
  if (session && session.firebaseToken) {
    try {
      await signInWithCustomToken(auth, session.firebaseToken);
    } catch (e) {
      console.log("Error with sign in", e);
    }
  } else {
    auth.signOut();
  }
}

export default function FirebaseAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    syncFirebaseUserWithFirestore(session);
  }, [session]);

  return <> {children}</>;
}
