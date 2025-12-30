import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Istd } from "../shared/model/student";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { GetConfirmComponent } from "../get-confirm/get-confirm.component";



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
    editId !: string
    @ViewChild('fname') fname !: ElementRef;
    @ViewChild('lname') lname !: ElementRef;
    @ViewChild('email') email !: ElementRef;
    @ViewChild('contact') contact !: ElementRef;



    constructor(
        private _matDilogue : MatDialog,
        private _snackBar : MatSnackBar){}

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

    onRemove(id : string){
        // let getconfirm = confirm(`Are youn sure want to REMOVE ?`)

        let matConfig = new MatDialogConfig()
        matConfig.disableClose = true
        matConfig.width = '500px'
       let matRef = this._matDilogue.open(GetConfirmComponent, matConfig)
       matRef.afterClosed()
        .subscribe(res =>{
            console.log(res)
            if(res){
                let getIndex = this.stdArr.findIndex(f => f.stdId === id)
                let std = this.stdArr.splice(getIndex, 1)
                this._snackBar.open(`The student ${std[0].fname} is Removed Successfully !!!`, `close`,{
                    horizontalPosition :"center",
                    verticalPosition : "top",
                    duration : 3000
                })
            }
        })
       
    }

    onEdit(std : Istd){
        this.fname.nativeElement.value = std.fname
        this.lname.nativeElement.value = std.lname
        this.email.nativeElement.value = std.email
        this.contact.nativeElement.value = std.contact
        this.editId = std.stdId
        this.isInEditMode = true

    }

    onStdUpdate(){

        let Update_obj : Istd ={
            fname : this.fname.nativeElement.value,
            lname : this.lname.nativeElement.value,
            email : this.email.nativeElement.value,
            contact : this.contact.nativeElement.value,
            stdId : this.editId
        }

        this.fname.nativeElement.value = ''
         this.lname.nativeElement.value = ''
         this.email.nativeElement.value = ''
         this.contact.nativeElement.value = ''


        let getIndex = this.stdArr.findIndex(f => f.stdId === this.editId)
        this.stdArr[getIndex] = Update_obj

        this.isInEditMode = false

        this._snackBar.open(`The Information is updated Successfully !`, `close`, {
            horizontalPosition : "center",
            verticalPosition : "top",
            duration : 3000
        })
        
    }
}