const dateT = document.querySelector('#date')
const typeWorkoutT = document.querySelector('#typeWorkout')
const exerciseT = document.querySelector('#exercise')
const setsT = document.querySelector('#sets')
const repsT = document.querySelector('#reps')
const workoutsCont = document.querySelector('#workoutCont')
const deleteT = document.querySelector('#deleteT')
const deleteBtn = document.querySelector('#deleteBtn')
const submitBtn = document.querySelector('#submitBtn')

const editId = document.querySelector('#editId')
const editDate = document.querySelector('#editDate')
const editTypeWorkout = document.querySelector('#editTypeWorkout')
const editExercise = document.querySelector('#editExercise')
const editSets = document.querySelector('#editSets')
const editReps = document.querySelector('#editReps')
const editSubmit = document.querySelector('#editSubmit')
const body = document.querySelector('body')

window.onload = displayWorkouts()

function displayWorkouts(){
    //create divs that display inside of the workoutCont
    //will have to make a get req to db
    // deleteChildNodes(workoutsCont)
    fetch('https://warm-depths-22438.herokuapp.com/workouts')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        createSlides(data)
    })
    .catch((err)=>{
        console.log(err)
    })

}

submitBtn.addEventListener('click', ()=>{
    //making the post request here
    const postObj = {
        "the_day": dateT.value,
        "type_workout": typeWorkoutT.value,
        "exercise": exerciseT.value,
        "sets": setsT.value,
        "reps": repsT.value
    }
    
    
    fetch('https://warm-depths-22438.herokuapp.com/workouts', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(postObj)})
    .then(results => results.json())
    .then(console.log)
    .catch((err)=>{
        console.log(err)
    })

    window.location.reload(true);
})

function createSlides(data){
    data.forEach(elem => {
        const workoutCont = $('<div></div>').addClass('workoutCont')
        $(workoutCont).appendTo(workoutsCont)

        const id = $('<div></div>').addClass('id').text(`ID: ${elem.id}`)
        $(id).appendTo(workoutCont)

        const theDay = $('<div></div>').addClass('theDay workoutSlide').text(`Date: ${elem.the_day}`)
        $(theDay).appendTo(workoutCont)

        const typeWorkout = $('<div></div>').addClass('workoutTypeDiv workoutSlide').text(`Type of Workout: ${elem.type_workout}`)
        $(typeWorkout).appendTo(workoutCont)

        const exercise = $('<div></div>').addClass('exerciseDiv workoutSlide').text(`Exercise: ${elem.exercise}`)
        $(exercise).appendTo(workoutCont)

        const reps = $('<div></div>').addClass('repsDiv workoutSlide').text(`Reps: ${elem.reps}`)
        $(reps).appendTo(workoutCont)

        const sets = $('<div></div>').addClass('setsDiv workoutSlide').text(`Sets: ${elem.sets}`)
        $(sets).appendTo(workoutCont)

    });
}

editSubmit.addEventListener('click', ()=>{
    const editObj = {}

    if(editId.value || isNaN(editId.value)){
        alert('Enter a number for ID')
        return;
    }

    if(editDate.value){editObj["the_day"] = editDate.value}
    if(editTypeWorkout.value){editObj["type_workout"] = editTypeWorkout.value}
    if(editReps.value){editObj["reps"] = editReps.value}
    if(editSets.value){editObj["sets"] = editSets.value}
    if(editExercise.value){editObj["exercise"] = editExercise.value}

    fetch(`https://warm-depths-22438.herokuapp.com/workouts/${editId.value}`, {method: 'PATCH', body: JSON.stringify(editObj)})
    .catch((err)=>{
        console.log(err)
    })
})


deleteBtn.addEventListener('click', ()=>{
    if(isNaN(deleteT.value)){
        alert('Please enter a valid number')
        return;
    }
    const url = `https://warm-depths-22438.herokuapp.com/workouts/${deleteT.value}`
    fetch(url, {method: 'DELETE'})
    .catch((err)=>{
        console.log(err, url)
    })
    // .then(console.log)
    
    window.location.reload(true);
})


function deleteChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}
