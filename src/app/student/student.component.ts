import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Istd } from "../shared/model/student";
import { MatSnackBar } from "@angular/material/snack-bar";



@Component({
    selector : 'app-student',
    templateUrl : './student.component.html',
    styleUrls : ['./student.component.scss']
})



export class StudentComponent implements OnInit{

    stdArr : Array<Istd> = [
        {
            fname : 'Jhon',
            lname : 'Doe',
            email : 'jhon@gamil.com',
            contact : 7894561237,
            stdId : '11'
        },
        {
            fname : 'Jasmin',
            lname : 'Doe',
            email : 'jasnim@gamil.com',
            contact : 4567561237,
            stdId : '12'
        },
        {
            fname : 'June',
            lname : 'Doe',
            email : 'june@gamil.com',
            contact : 7894561237,
            stdId : '13'
        }
    ]

    isInEditMode : boolean = false

    @ViewChild('fname') fname !: ElementRef;
    @ViewChild('lname') lname !: ElementRef;
    @ViewChild('email') email !: ElementRef;
    @ViewChild('contact') contact !: ElementRef;



    constructor(private _snackBar : MatSnackBar){}

    ngOnInit(): void {
        
    }

    trackById(index : number, item : Istd){
        return item.stdId

    }

    onStdAdd(){

        let Std_obj :Istd = {
            fname : this.fname.nativeElement.value,
            lname : this.lname.nativeElement.value,
            email : this.email.nativeElement.value,
            contact : this.contact.nativeElement.value,
            stdId : Date.now().toString()
        }
        console.log(Std_obj)

        this.stdArr.push(Std_obj)

         this.fname.nativeElement.value = ''
         this.lname.nativeElement.value = ''
         this.email.nativeElement.value = ''
         this.contact.nativeElement.value = ''

         this._snackBar.open(`The todo item is created successfully!!!`,'Close',{
        horizontalPosition : "left",
        verticalPosition : "top",
        duration : 3000
      })

    }

    onStdUpdate(){
        
    }
}