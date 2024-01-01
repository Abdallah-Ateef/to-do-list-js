let taskscontainer=document.querySelector('.tasks');
let addtask=document.querySelector('.add-task');
let divtask=document.querySelector('.task');
// let taskslist=[{title:'انهاء المشروع النهائي',date:'29/1/2024',isDone:false}];
/* export data form local storage */
taskslist=JSON.parse(localStorage.getItem('tasks'))?JSON.parse(localStorage.getItem('tasks')):[];

/* drawUi */

function drawUi(tasks){
    taskscontainer.innerHTML='';
    localStorage.setItem('tasks',JSON.stringify(tasks));
    let index=0;
   tasks.forEach(ele => {
    taskscontainer.innerHTML+=`
        <div class="task ${ele.isDone?'isDone':''}">
            <div class="info">
                <h2>${ele.title}</h2>
                <div>
                    <i class="fa-solid fa-calendar-days"></i>
                    <span>${ele.date}</span>
                </div>
            </div>
            <div class="actions">
                <button class="circular btt-delet" onclick="deletitem(${index})"><i class="fa-solid fa-trash"></i></button>
                ${ ele.isDone?`
                     <button class="circular btt-finsh" onclick="isDone(${index})"style='background-color:rgb(118, 0, 101);'><i class="fa-solid fa-xmark"></i></button>
                `:`
                    <button class="circular btt-finsh" onclick="isDone(${index})"><i class="fa-solid fa-check"></i></button> 
                `}
                <button class="circular btt-edit" onclick="modifytask(${index})"><i class="fa-solid fa-pen"></i></button>
                
            </div>
        
       </div>
    `
    index++;
   });
}

drawUi(taskslist);

/* add task */

addtask.addEventListener('click',additem);

function additem(){
    let item=prompt('الرجاء ادخال المهمة');
    if(item=='')alert('يجب ادخال مهمة');
    else{
         
        let now=new Date();
        let date=`${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
        let obj={
            title:item,
            date:date,
            isDone:false,
        }
        taskslist.push(obj);
        drawUi(taskslist);


    }
}

/* delet task */

function deletitem(id){
    let isconfirmed=confirm(`هل انت متاكد من حذف مهمة : ${taskslist[id].title}؟؟`);
    if(isconfirmed){
        taskslist.splice(id,1);
        drawUi(taskslist);
    }
}

/* modify task */

function modifytask(id){
    let newtext=prompt('الرجاء تحديد عنوان المهمة الجديد',taskslist[id].title);
    if(newtext !='' && newtext!=null)taskslist[id].title=newtext;
    drawUi(taskslist);
}


/* IsDone  OR Not */

function isDone(id){
    let done=taskslist[id];
    done.isDone = !done.isDone;
   drawUi(taskslist);
}


