import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  authState,
  User as FirebaseUser,
  UserCredential,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  doc,
  setDoc, getDoc
} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import { Router } from '@angular/router';
import  User from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<FirebaseUser | null>;
  UserData = new BehaviorSubject<User | null>(null);

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.currentUser = authState(this.auth);
    this.currentUser.subscribe(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = doc(this.firestore, 'Users', firebaseUser.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          this.UserData.next(userSnapshot.data() as User);
        }
      } else {
        this.UserData.next(null);
      }
    });
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signOut(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false');
    await signOut(this.auth);
    await this.router.navigateByUrl('/login');
  }

  async signUp(email: string, password: string, userData: Partial<User>): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        name: userData.name,
        skillLevel: userData.skillLevel,
        teamIds: []
      });

      return userCredential;
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
      throw error;
    }
  }

  private async createUserData(userId: string, userData: Partial<User>): Promise<void> {
    const userRef = doc(collection(this.firestore, 'Users'), userId);

    return setDoc(userRef, userData);
  }

  isLoggedIn(): Observable<FirebaseUser | null> {
    return this.currentUser;
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }

  updateUser(updatedUser: User) {
    return false;
  }
}
