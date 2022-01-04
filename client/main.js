const date = document.querySelector('#date')
const typeWorkout = document.querySelector('#typeWorkout')
const exercise = document.querySelector('#exercise')
const sets = document.querySelector('#sets')
const reps = document.querySelector('#reps')
const workoutCont = document.querySelector('#workoutCont')

const submitBtn = document.querySelector('#submitBtn')
const body = document.querySelector('body')

window.onload = displayWorkouts()

function displayWorkouts(){
    //create divs that display inside of the workoutCont
    //will have to make a get req to db
    deleteChildNodes(workoutCont)
    fetch('https://warm-depths-22438.herokuapp.com/workouts')
    .then(response => response.json())
    .then(data => console.log(data));
    const div = document.createElement('div')

}

function deleteChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

submitBtn.addEventListener('click', ()=>{
    //making the post request here
})