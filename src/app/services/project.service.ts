import {Injectable} from '@angular/core';
import {firstValueFrom, from, Observable, of, Subject, switchMap, take} from 'rxjs';
import {
  collection,
  doc,
  Firestore,
  getDocs, orderBy,
  query,
  setDoc,
  where
} from '@angular/fire/firestore';
import Project from '../types/Project';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly PROJECT_COLLECTION = 'Projects';
  private projectsCreated = new Subject<void>();
  projectsCreated$ = this.projectsCreated.asObservable();


  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {
  }

  private formatDateToString(date: Date | string): string {
    if (typeof date === 'string') {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return new Date().toISOString().split('T')[0];
      }
      return date.includes('T') ? date.split('T')[0] : date;
    }
    return date.toISOString().split('T')[0];
  }

  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (user) {
        const projectCollection = collection(this.firestore, this.PROJECT_COLLECTION);
        const projectToSave = {
          ...project,
          id: '',
          ownerId: user.uid,
          dueDate: this.formatDateToString(project.dueDate),
          createdAt: this.formatDateToString(new Date()),
          updatedAt: this.formatDateToString(new Date()),
          lastUpdate: this.formatDateToString(new Date()),

        }
        const newDocRef = doc(projectCollection);
        projectToSave.id = newDocRef.id;
        const projectId = newDocRef.id;
        await setDoc(newDocRef, projectToSave);
        this.projectsCreated.next();
        return {
          ...projectToSave,
          id: projectId,
          dueDate: new Date(projectToSave.dueDate),
          createdAt: new Date(),
          updatedAt: new Date(),
          lastUpdate: new Date(),
        } as Project;
      } else {
        throw new Error('No authenticated user found');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  getMyProjects(): Observable<Project[]> {
    return this.authService.currentUser.pipe(
      switchMap(user => {
        if (!user) {
          return of([]);
        }
        const projectCollection = collection(this.firestore, this.PROJECT_COLLECTION);
        const q = query(
          projectCollection,
          where('ownerId', '==', user.uid),
          orderBy('dueDate', 'asc')
        );
        return from(getDocs(q)).pipe(
          map(querySnapshot => {
            const projects: Project[] = [];
            querySnapshot.forEach(doc => {
              projects.push({...doc.data(), id: doc.id} as Project);
            });
            return projects;
          })
        )
      }));
  }

  /**
   * Get a project by ID
   * @param id Project ID
   * @returns Observable with the project data or null if not found
   */
  getProjectById(id: string): Observable<Project | null> {
    return this.authService.currentUser.pipe(
      switchMap(user => {
        if (!user) {
          return of(null);
        }
        const projectCollection = collection(this.firestore, this.PROJECT_COLLECTION);
        const q = query(
          projectCollection,
          where('id', '==', id)
        );
        return from(getDocs(q)).pipe(
          map(querySnapshot => {
            if (querySnapshot.empty) {
              return null;
            }
            const doc = querySnapshot.docs[0];
            return { ...doc.data(), id: doc.id } as Project;
          })
        )
      }));
  }

}
