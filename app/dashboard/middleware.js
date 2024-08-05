import { NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';

export async function middleware(req) {
    const auth = getAuth(app);
  
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // If logged in, allow access to the page
          resolve(NextResponse.next());
        } else {
          // If not logged in, redirect to the landing page
          resolve(NextResponse.redirect(new URL('/', req.url)));
        }
      });
    });
  }