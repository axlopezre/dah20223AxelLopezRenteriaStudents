import { Injectable } from '@angular/core';
import { Student } from "../models/student";
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];

  constructor(private firestore: AngularFirestore) {
    this.students = [
      {
        controlnumber: "02400391",
        age: 38,
        career: "ISC",
        curp: "AOVI840917HNTRZS09",
        email: "iarjona@ittepic.edu.mx",
        name: "Israel Arjona Vizcaíno",
        nip: 717,
        photo: 'https://picsum.photos/600/?random=1'
      }, 
      {
        controlnumber: "12400391",
        age: 28,
        career: "IM",
        curp: "AOCI840917HNTRZS09",
        email: "iarjona2@ittepic.edu.mx",
        name: "Israel Arjona Castañeda",
        nip: 818,
        photo: 'https://picsum.photos/600/?random=2'
      },
      {
        controlnumber: "22400391",
        age: 18,
        career: "IC",
        curp: "OOCI840917HNTRZS09",
        email: "iarjona3@ittepic.edu.mx",
        name: "Israel Arjona Méndez",
        nip: 919,
        photo: 'https://picsum.photos/600/?random=3'
      }
    ];
  }

  public getStudents(): Observable<Student[]>{
    return this.firestore.collection('students').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          console.log(a);
          const data = a.payload.doc.data() as Student;
          console.log(data);
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public removeStudent(id: string){
    this.firestore.collection('students').doc(id).delete();
    return this.students;
  }

  public getStudentByControlNumber(controlnumber: string): Student {
    let item: Student = this.students.find((student)=> {
      return student.controlnumber===controlnumber;
    });
    return item;
  }
  public updateStudent(id: string, student: Student){
      this.firestore.collection('students').doc(id).update(student);
      return this.students;
  }

  public getStudentById(id: string) {
    let result = this.firestore.collection('students').doc(id).valueChanges();
    return result;
  }

  public newStudent(student: Student) {
    this.firestore.collection('students').add(student);
  }
}
