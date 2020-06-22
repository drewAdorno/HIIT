// 1. Taking time from user for the training
// let restTime = parseInt('4');
// let workoutTime = parseInt('4');
// let breakTime = parseInt('4');

let restTime = parseInt("{{request.session.rest_time}}");
let workoutTime = parseInt("{{request.session.workout_time}}");
let breakTime = parseInt("{{request.session.break_time}}");

// 2. Taking exercises from user as an array of images. When user clicks on image it'd add image to array.
let training_exercises = ['slide_1', 'slide_2', 'slide_3', 'slide_4', 'slide_5', 'slide_6']

function countDown(count_time, status, exersise){
    return new Promise((resolve) =>{
        let timerNumber = setInterval(() => {
            count_time--;
            $("#timerNumber").html(count_time);
            $("#workout_status").html(status);
            $('#exercise_photo_container').html(`<img id="exersise" src='images/${exersise}.jpg'/>`)
            if (status == "WORKOUT" || status == "PREPARE"){
                $("#timerNumber").css('color', 'red')
                $("#workout_status").css('color', 'red')
            }
            else if(status == "BREAK"){
                $("#timerNumber").css('color', 'green')
                $("#workout_status").css('color', 'green')
            }
            if (count_time <= 0){
                clearInterval(timerNumber);
                resolve();
            } 
        }, 1000);
    })
} 
// WHOLE TRAINING
async function training(){
    await countDown(restTime, 'PREPARE', training_exercises[0])
    for(let i=0; i<18; i++)
    {
        if(i % 6==0 && i !=0)
        {
            await countDown(breakTime, "BREAK", training_exercises[0])
        }
        await countDown(workoutTime, "WORKOUT", training_exercises[i%6])
        if(i != 5 && i !=11 && i !=17) // we rest as long as there isnt a break coming next
        {
            await countDown(restTime, 'REST', training_exercises[i%6+1])
        }
    }
    await countDown(restTime, "DONE", 'finish')
}

window.onload = () =>{
  training();
}