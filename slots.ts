import { Metadata } from './types';

const apiURL = 'https://contributions.guardianapis.com/epic';

const reminderUrl = 'https://contribution-reminders-code.support.guardianapis.com/remind-me'; // CODE

const checkForErrors = (response: any): any => {
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
    const isEmailAddressValid = (email: string): boolean => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Form States:
    // default
    // .invalid
    // .submitting
    // .error
    // .success
    const epicReminder = document.querySelector<HTMLElement>(
        '[data-target="contributions-epic-reminder"]',
    );
    if (epicReminder) {
        const epicReminderSubmit = document.querySelector<HTMLButtonElement>(
            '[data-target="submit"]',
        );
        if (epicReminderSubmit) {
            epicReminderSubmit.addEventListener('click', () => {
                const epicReminderInput = document.querySelector<HTMLInputElement>(
                    '[data-target="input"]',
                );
                if (epicReminderInput) {
                    // Valid input field
                    const inputValue = epicReminderInput.value.trim();
                    if (!inputValue || !isEmailAddressValid(inputValue)) {
                        epicReminder.classList.add('invalid');
                        return;
                    }

                    epicReminder.classList.add('submitting');
                    epicReminder.classList.remove('invalid');
                    const formValues = {
                        email: inputValue,
                        reminderDate: epicReminderSubmit.getAttribute('data-reminder-date'),
                        isPreContribution: true,
                    };
                    fetch(reminderUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formValues),
                    })
                        .then(checkForErrors)
                        .then(response => response.json())
                        .then(json => {
                            if (json !== 'OK') {
                                throw Error('Server error');
                            }
                            epicReminder.classList.add('success');
                        })
                        .catch(error => {
                            console.log('Error creating reminder: ', error);
                            epicReminder.classList.add('error');
                        })
                        .finally(() => epicReminder.classList.remove('submitting'));
                }
            });
        }
    }
};
