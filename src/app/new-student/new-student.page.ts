import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {

  public student: Student;
  public students: Student[];
  public myForm: FormGroup;
  public idelim;
  public bandera: boolean = true;
  public validationMessages: object;

  constructor(private studentService: StudentService, private fb: FormBuilder, private router: Router, private firestore: AngularFirestore, private activatedRoute: ActivatedRoute, private alertController: AlertController, private tc: ToastController) {
    
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.bandera = params.t;
      this.idelim = params.id;
      this.studentService.getStudentById(params.id).subscribe(item => {
        this.student = item as Student;
        this.myForm.setValue({ controlnumber: this.student.controlnumber, name: this.student.name, curp: this.student.curp, age: this.student.age, nip: this.student.nip, email: this.student.email, career: this.student.career, photo: this.student.photo });
      });
    });

    this.myForm = this.fb.group({
      /*controlnumber:["", Validators.compose([Validators.minLength(8), Validators.required, Validators.pattern('^[0-9]+$')])],
      name:["", Validators.required],
      curp:["", Validators.compose([Validators.required, Validators.pattern('^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$')])],
      age:[0, Validators.compose([Validators.required, Validators.min(17)])],
      nip:[0, Validators.compose([Validators.required, Validators.min(10)])],
      email:["", Validators.compose([Validators.required, Validators.email])],
      career:["", Validators.required],
      photo:["", Validators.compose([Validators.required])]*/
      controlnumber: ["", Validators.compose([Validators.minLength(8), Validators.required, Validators.pattern('^[0-9]+$')])],
      name:["", Validators.required],
      curp: ["", Validators.compose([Validators.required, Validators.pattern('[\A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[BCDFGHJKLMNPQRSTVWXYZ]{3}([A-Z]{1})?([0-9]{1})?')])],
      age:[0, Validators.compose([Validators.required, Validators.min(17)])],
      nip:[0, Validators.compose([Validators.required, Validators.min(10)])],
      email:["", Validators.compose([Validators.required, Validators.email])],
      career:["", Validators.required],
      photo:["", Validators.compose([Validators.required])]
    });

    this.validationMessages = {
      'controlnumber': [
        { type: 'required', message: "Debe capturar el n??mero de control"},
        { type: 'minlength', message: "El n??mero de control parece estar mal formado"},
        { type: 'pattern', message: "El n??mero de control debe contener s??lo n??meros"}
      ],
      'name': [
        { type: 'required', message: "Debe capturar el nombre"}
      ],
      'curp': [
        { type: 'required', message: "Debe capturar la CURP"},
        { type: 'pattern', message: "La CURP parece estar mal formada"}
      ],
      'age': [
        { type: 'required', message: "Debe capturar la edad"},
        { type: 'min', message: "La edad es incorrecta"}
      ],
      'nip': [
        { type: 'required', message: "Debe capturar el NIP"},
        { type: 'min', message: "El NIP debe ser mayor a 9"}
      ],
      'email': [
        { type: 'required', message: "Debe capturar el email"},
        { type: 'email', message: "El email parece estar mal formado"}
      ],
      'career': [
        { type: 'required', message: "Debe capturar la carrera"}
      ],
      'photo': [
        { type: 'required', message: "Debe capturar la url de la fotograf??a"}
      ]
    }
  }

  public newStudent() {
    this.student = {
      controlnumber: this.myForm.controls.controlnumber.value,
      name: this.myForm.controls.name.value,
      curp: this.myForm.controls.curp.value,
      age: this.myForm.controls.age.value,
      nip: this.myForm.controls.nip.value,
      email: this.myForm.controls.email.value,
      career: this.myForm.controls.career.value,
      photo: this.myForm.controls.photo.value,
    }
    this.studentService.newStudent(this.student);
    this.toast('Estudiante Agregado');
    this.back();
  }

  async toast(message: string) {
    let toast = await this.tc.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  public updateStudent() {
    let newStudent = {
      controlnumber: this.myForm.get('controlnumber').value,
      name: this.myForm.get('name').value,
      curp: this.myForm.get('curp').value,
      age: this.myForm.get('age').value,
      nip: this.myForm.get('nip').value,
      email: this.myForm.get('email').value,
      career: this.myForm.get('career').value,
      photo: this.myForm.get('photo').value
    }
    this.studentService.updateStudent(this.idelim, newStudent);
    this.myForm.setValue({ controlnumber: '', name: '', curp: '', age: '', nip: '', email: '', career: '', photo: '' });
    this.toast('Estudiante Actualizado');
    this.back();
  }
  public back(): void {
    this.router.navigate(["home"]);
  }
}
