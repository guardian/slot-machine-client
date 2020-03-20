import { Metadata } from './types';

const apiURL = 'https://contributions.guardianapis.com/epic';

const reminderUrl = 'https://contribution-reminders-code.support.guardianapis.com/remind-me'; // CODE

const checkForErrors = (response: any) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

export const getBodyEnd = (meta: Metadata, url: string = apiURL): Promise<Response> => {
    const json = JSON.stringify(meta);
    return fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: json,
    });
};

export const initSlot = (): void => {
    const epicReminder = document.querySelector('#epicReminder');
    if (epicReminder) {
        const epicReminderSubmit = document.querySelector('#epicReminderSubmit');
        if (epicReminderSubmit) {
            epicReminderSubmit.addEventListener('click', () => {
                const epicReminderInput = document.querySelector('#epicReminderInput');
                if (epicReminderInput && epicReminderInput.value) {
                    const values = JSON.stringify({
                        email: epicReminderInput.value,
                        reminderDate: epicReminderSubmit.getAttribute('data-reminder-date'),
                        isPreContribution: true,
                    });
                    fetch(reminderUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: values,
                    })
                        .then(checkForErrors)
                        .then(response => response.json())
                        .then(json => {
                            if (json !== 'OK') {
                                throw Error('Server error');
                            }
                            epicReminder.classList.add('submitted');
                        })
                        .catch(error => console.error('Error: ', error));
                }
            });
        }
    }
};
