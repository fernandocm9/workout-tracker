const dateT = document.querySelector('#date')
const typeWorkoutT = document.querySelector('#typeWorkout')
const exerciseT = document.querySelector('#exercise')
const setsT = document.querySelector('#sets')
// $('#sets')
const repsT = document.querySelector('#reps')
const workoutsCont = document.querySelector('#workoutCont')

const submitBtn = document.querySelector('#submitBtn')
const body = document.querySelector('body')

window.onload = displayWorkouts()

function displayWorkouts(){
    //create divs that display inside of the workoutCont
    //will have to make a get req to db
    deleteChildNodes(workoutCont)
    fetch('https://warm-depths-22438.herokuapp.com/workouts')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        createSlides(data)
    });

}

function createSlides(data){
    data.forEach(elem => {
        const workoutCont = $('<div></div>').addClass('workoutsCont')
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

function deleteChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

submitBtn.addEventListener('click', ()=>{
    //making the post request here
})