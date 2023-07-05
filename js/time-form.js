//время в форме
const dateControl = document.querySelector('input[type="datetime-local"]');
const today = new Date();
const timezoneOffset = today.getTimezoneOffset();
const now = new Date(today.getTime() - timezoneOffset * 60 * 1000)
    .toISOString()
    .slice(0, 16);
dateControl.value = now;
dateControl.min = now;
