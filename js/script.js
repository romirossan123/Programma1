'use strict';

let sum, percent;


let expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementById('income-value'),
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');


const appData = {
    budget: 0,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: 0,
    savings: false
};

function start(data) {
    let time = prompt('Введите дату в формате YYYY-MM-DD', '');
    let money = +prompt('Ваш бюджет на месяц?', '');

    while (!money || isNaN(money)) {
        money = prompt('Ваш бюджет?', '');
    }
    data.budget = money;
    data.timeData = time;
    document.getElementById('budget-value').textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    document.getElementById('expenses-item-btn').disabled = false;
    document.getElementById('optionalexpenses-btn').disabled = false;
    document.getElementById('count-budget-btn').disabled = false;
}

function expensesBtnClick(data) {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if (!!a && !!b && a.length < 50) {
            data.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        }
        expensesValue.textContent = sum;
    }
}

function optionalExpensesBtnClick(data) {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        data.optionalExpenses[i] = optionalExpensesItem[i].value;
        optionalExpensesValue.textContent += data.optionalExpenses[i] + ' ';
    }
}

function countBtnClick(data) {
    let dayBudgetValue = document.getElementById('daybudget-value');
    if (data.budget || data.budget >= 0) {
        data.moneyPerDay = ((data.budget - +expensesValue.textContent) / 30).toFixed();
        dayBudgetValue.textContent = data.moneyPerDay;

        let levelValue = document.getElementsByClassName('level-value')[0];

        if (data.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (data.moneyPerDay >= 100 && data.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка!';
        } else {
            levelValue.textContent = 'Высокий уровень достатка!';
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }
}

function checkSavingsClick(data) {
    data.savings = data.savings !== true;
}

function incomeItemKeyUp(value, data) {
    if (value && isNaN(value)) {
        data.income = value.split(', ');
        incomeValue.textContent = data.income;
    }
}

function sumValueKeyUp(value, data) {
    sum = +value;
    calculateSavings(data);
}

function percentValueKeyUp(value, data) {
    percent = +value;
    calculateSavings(data);
}

function calculateSavings(data) {
    if (data.savings) {
        data.monthIncome = sum / 100 / 12 * percent;
        data.yearIncome = sum / 100 * percent;
        monthSavingsValue.textContent = data.monthIncome.toFixed(1);
        yearSavingsValue.textContent = data.yearIncome.toFixed(1);
    }
}
