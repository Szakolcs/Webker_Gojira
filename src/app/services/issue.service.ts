import {Injectable} from '@angular/core';
import {Observable, from, of, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  query,
  where,
  setDoc
} from '@angular/fire/firestore';
import Issue from '../types/Issue';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private readonly ISSUE_COLLECTION = 'Issues';
  private issueCreated = new Subject<void>();
  issueCreated$ = this.issueCreated.asObservable();

  constructor(private firestore: Firestore) {
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

  async createIssue(issue: Omit<Issue, 'id'>): Promise<Issue> {
    const issueCollection = collection(this.firestore, this.ISSUE_COLLECTION);
    const now = new Date();
    const issueWithTimestamps = {
      ...issue,
      id: '',
      createdAt: this.formatDateToString(now),
      updatedAt: this.formatDateToString(now),
      labels: issue.labels || []
    };
    const newDocRef = doc(issueCollection);
    issueWithTimestamps.id = newDocRef.id;
    const issueid = newDocRef.id;
    await setDoc(newDocRef, issueWithTimestamps);
    this.issueCreated.next();

    return {
      ...issueWithTimestamps,
      id: issueid,
      createdAt: now,
      updatedAt: now,
    } as Issue;
  }

  getIssuesByProjectId(projectId: string): Observable<Issue[]> {
    const issueCollection = collection(this.firestore, this.ISSUE_COLLECTION);
    const q = query(issueCollection, where('projectId', '==', projectId));

    return from(getDocs(q)).pipe(
      map(querySnapshot => {
        const issues: Issue[] = [];
        querySnapshot.forEach(doc => {
          issues.push({...doc.data(), id: doc.id} as Issue);
        });
        return issues;
      }),
      catchError(error => {
        console.error('Error getting issues by project:', error);
        return of([]);
      })
    );
  }

  getIssuesById(issueId: string): Observable<Issue | null> {
    const issueCollection = collection(this.firestore, this.ISSUE_COLLECTION);
    const q = query(issueCollection, where('id', '==', issueId));
    return from(getDocs(q)).pipe(
      map(querySnapshot => {
        if (querySnapshot.empty) {
          return null;
        }
        const doc = querySnapshot.docs[0];
        return {...doc.data(), id: doc.id} as Issue;
      })
    )
  }
}
