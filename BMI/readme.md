////////////////////User BMI Calculation system //////////////////////
here node.js,express,mongoDb(for storage) used as a techstack

step 1. register api https://ranjanbmi.herokuapp.com/register

with the help of registration values name, email, password we can register,after registering we get message if 'register successfull||email already exhist' and save data to mongoDB atlas clustor

step 2.Login api, https://ranjanbmi.herokuapp.com/login

with the credential we put during the register we can login(email,password) and search data to mongoDB atlas clustor then it will return message login "success&token||Wrong credentials"

step 3.getProfile api https://ranjanbmi.herokuapp.com/getProfile

for get profile for current user we have to authenticate the user token(use inside header with key:auth value:Bearer token)that are created during the login so simply we encrypt our token to get userId of the current user with the help of middleware and we can find all the data of the current user

step 4.calculateBMI api https://ranjanbmi.herokuapp.com/calculateBMI

same process will flow as previously for authentication.and take input from body and calculte bmi and return bmi.value and all the input data and bmi data and add (ind:new Date.getTime()) for to trace the recent data will be saved inside mongoDB cluster using current userId for next time getting data for particular user

step 5.getCalculation Hestory api https://ranjanbmi.herokuapp.com/getCalculation

same process will flow as previously for authentication.and we will find bmidata according to userId and sort it with ind decreasing order so we can get first postition of array data is recent Bmi calculation data
