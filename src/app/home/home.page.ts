import { Component } from '@angular/core';
import { Student } from "../models/student";
import { StudentService } from "../services/student.service";
import { AlertController } from "@ionic/angular";
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public students: Student[];

  constructor(private studentService: StudentService, private alertController: AlertController, private router: Router, private tc: ToastController) {
    this.studentService.getStudents().subscribe(res => {
      this.students = res;
      console.log(this.students);
    });
  }
  async toast(message: string) {
    let toast = await this.tc.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  public async removeStudent(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.students = this.studentService.removeStudent(id);
            this.toast('Estudiante Eliminado');
          }
        }
      ]
    });

    await alert.present();
  }

  public getStudentByControlNumber(cn: string): void {
    this.router.navigate(['/view-student'], {
      queryParams: { cn: cn },
    });
  }

  public getStudentByIdxd(id: string, t:boolean): void {
    this.router.navigate(['/new-student'], {
      queryParams: { id: id, t: t },
    });
  }

  public goToNewStudent(): void {
    this.router.navigate(['/new-student']);
  }

  public getStudentById(id: string) {
    this.router.navigate(['/view-student'], {
      queryParams: {id:id},
      });
  }

}
