document.addEventListener('DOMContentLoaded', (event) => {
    displayLastTook();

    let acetaminophenButton = document.getElementById('acetaminophen-btn');
    let ibuprofenButton = document.getElementById('ibuprofen-btn');

    acetaminophenButton.addEventListener('click', updateMedicineLastTaken);
    ibuprofenButton.addEventListener('click', updateMedicineLastTaken);
});


function displayLastTook() {
    let span = document.getElementById('last-taken-medicine');
    let nextMedSpan = document.getElementById('next-medicine-to-take');
    let timeSpan = document.getElementById('took-at');
    let nextDoseTimeSpan = document.getElementById('take-next-med-at');

    let medicineLastTaken = localStorage.getItem('lastMedicine');
    let medicineTookAtString = localStorage.getItem('medicineTookAt');
    let nextMedicineDoseString = localStorage.getItem('nextDoseTime');

    if (medicineLastTaken != null) {
        span.innerText = medicineLastTaken;
        
        if (medicineLastTaken == "Ibuprofen") {
            nextMedSpan.innerText = 'Acetaminophen';
        } else {
            nextMedSpan.innerText = 'Ibuprofen';
        }
    }

    if (medicineTookAtString != null) {
        let medicineTookAt = JSON.parse(medicineTookAtString);
        let hour = medicineTookAt.hour;
        
        let timeOfDay = 'PM';

        if (hour < 12) {
            timeOfDay = "AM";
        }

        if (hour > 12) {
            hour = medicineTookAt.hour - 12;
        } else if (hour < 1) {
            hour = 12;
        }
        timeSpan.innerText = `${medicineTookAt.month + 1}/${medicineTookAt.day}/${medicineTookAt.year} ` + hour + ':' + medicineTookAt.minute + ' ' + timeOfDay;
    }

    if (nextMedicineDoseString != null) {
        let nextDoseDate = JSON.parse(nextMedicineDoseString);

        let nextDoseHour = nextDoseDate.hour;

        if (nextDoseHour > 12) {
            nextDoseHour = nextDoseDate.hour - 12;
        } else if (nextDoseHour < 1) {
            nextDoseHour = 12;
        }

        let nextDoseTimeOfDay = 'PM';

        if (nextDoseHour < 12) {
            nextDoseTimeOfDay = 'AM';
        }

        nextDoseTimeSpan.innerText = `${nextDoseDate.month + 1}/${nextDoseDate.day}/${nextDoseDate.year} ` + nextDoseHour + ':' + nextDoseDate.minute + ` ${nextDoseTimeOfDay}`;
    }
};

function updateMedicineLastTaken(event) {

    let span = document.getElementById('last-taken-medicine');
    let nextMedSpan = document.getElementById('next-medicine-to-take');
    let timeSpan = document.getElementById('took-at');
    let nextDoseTimeSpan = document.getElementById('take-next-med-at');

    let buttonSelected = event.srcElement.id;

    if (buttonSelected == 'acetaminophen-btn') {
        localStorage.setItem('lastMedicine', 'Acetaminophen')
        span.innerText = "Acetaminophen";
        nextMedSpan.innerText = 'Ibuprofen';
    } else {
        localStorage.setItem('lastMedicine', 'Ibuprofen')
        span.innerText = "Ibuprofen";
        nextMedSpan.innerText = 'Acetaminophen';
    }

    let currentDate = new Date();
    
    let nextDoseDate = new Date(currentDate.getTime() + 21600000);
     

    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();

    let timeOfDay = 'PM';

    if (hour < 12) {
        timeOfDay = "AM";
    }

    if (hour > 12) {
        hour = currentDate.getHours() - 12;
    } else if (hour < 1) {
        hour = 12;
    }

    let nextDoseTimeOfDay = 'PM';

    if (nextDoseDate.getHours() < 12) {
        nextDoseTimeOfDay = 'AM';
    }

    let nextDoseHour = nextDoseDate.getHours();

    if (nextDoseHour > 12) {
        nextDoseHour = nextDoseDate.getHours() - 12;
    } else if (hour < 1) {
        nextDoseHour = 12;
    }

    let timeObject = {};
    timeObject.month = currentDate.getMonth();
    timeObject.day = currentDate.getDate();
    timeObject.year = currentDate.getFullYear();
    timeObject.hour = currentDate.getHours();
    timeObject.minute = minute < 10 ? '0' + minute : minute;

    let nextDoseTimeObject = {};
    nextDoseTimeObject.month = nextDoseDate.getMonth();
    nextDoseTimeObject.day = nextDoseDate.getDate();
    
    nextDoseTimeObject.year = nextDoseDate.getFullYear();
    nextDoseTimeObject.hour = nextDoseDate.getHours();
    nextDoseTimeObject.minute = nextDoseDate.minute < 10 ? '0' + nextDoseDate.minute : nextDoseDate.getMinutes();

    timeSpan.innerText = `${timeObject.month + 1}/${timeObject.day}/${timeObject.year} ` + hour + ':' + timeObject.minute + ' ' + timeOfDay;;
    nextDoseTimeSpan.innerText = `${nextDoseTimeObject.month + 1}/${nextDoseTimeObject.day}/${nextDoseTimeObject.year} ` + nextDoseHour + ':' + nextDoseTimeObject.minute + ` ${nextDoseTimeOfDay}`;
    
    localStorage.setItem('medicineTookAt', JSON.stringify(timeObject));
    localStorage.setItem('nextDoseTime', JSON.stringify(nextDoseTimeObject));
}

