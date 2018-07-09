# gizyHelpBoard
> Panel pomocniczy wyświetlający wartości zmiennych js w mini modułach tekstowych. Zawartość panelu konfigurowalna poprzez dodawanie poszczególnych modułów.
English version of the descriptions after finishing.


## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
Panel pomocniczy wyświetlający wartości zmiennych js w mini modułach tekstowych. Zawartość panelu konfigurowalna poprzez dodawanie poszczególnych modułów. 
Panel umożliwia: 
* uruchamianie funkcji js 
* wyświetlanie wartości zmiennych js
* odczyt i zapis zmiennych
* zapis położenia okna 
* konfigurator

## Technologies
* ES6
* CSS
* Html

## Setup
import {  
    HelpInfo, HelpBoard, HelpFields, HelpButton, HelpStoper, HelpCheckButton, HelpInfoList  
} from "../gizyBoard";  

let gBoard = new HelpBoard('Tablica');  
let bBtn = new HelpButton('Uruchom', function_name);  
let gInfo = new HelpInfo('Info');  
let gStoper = new HelpStoper('Stoper');  
let gFields = new HelpFields('Pola');  
let gInfoList = new HelpInfoList('Lista');  
let gCheckButton = new HelpCheckButton('Check', function_name);  

gBoard.add(bBtn);  
gBoard.add(gInfo);  
gBoard.add(gStoper);  
gBoard.add(gFields);  
gBoard.add(gInfoList);  
gBoard.add(gCheckButton);  

Describe how to install / setup your local environement / add link to demo version.

## Code Examples
* HelpBoard - tablica 
let gBoard=new HelpBoard('nazwa_tablicy');   

* HelpButton - moduł przycisk umożliwiający uruchomienie własnych funkcji js  
let bBtn = new HelpButton('Uruchom', function_name);     // utworzenie - (opis przycisku, nazwa funkcji do uruchomienia bez nawiasów)  
gBoard.add(gBtn);   // dodanie do panelu 
* HelpFields - moduł pole informacyjne wyświetlające opis i wartość zmiennej  
let gFields = new HelpFields('Opis_zmiennej');     // utworzenie  (opis zmiennej)  
gBoard.add(gFields);  // dodanie do panelu  
gFields.setV('nowa_wartosc');  // zmiana wyświetlanej wartości  
* HelpStoper - moduł stopera umożliwiający odliczanie czasu między wykonanymi zadaniami  
let gStoper = new HelpStoper('Stoper');     // utworzenie (nazwa)  
gBoard.add(gStoper); // dodanie do panelu  
gStoper.start(); //rozpoczęcie odliczania  
gStoper.stop();  //zakończenie odliczania   
* HelpInfo - wyswietlanie opisu i zmiennej w tym zawartości tablic i obiektów.  
let gInfo = new HelpInfo('Info');    //utworzenie (nazwa)  
gBoard.add(gInfo);    // dodanie do panelu 
gInfo.setV(array_Object);    // wyświetlenie zmiennej  
* HelpFields - moduł mini pola do wyświetlania wartości pojedynczych zmiennych  
let gFields = new HelpFields('Pola');    //utworzenie (nazwa)  
gBoard.add(gFields);    // dodanie do tablicy  
gFields.setV('nowa_wartosc');    //wyświetlenie zmiennej  
* HelpInfoList - pole zmiennych numerujące poszczególne zmiany zmiennej  
let gInfoList = new HelpInfoList('Lista');  
gBoard.add(gInfoList);    // dodanie do tablicy  
gInfoList.addV('nowa_wart');    // dodanie kolejnej wartości  


## Features
List of features ready and TODOs for future development
* tablica z możliwością podglądu zmiennych poprzez dodawane moduły
* moduł przycisku uruchamiający przypisane funkcje
* 
* Awesome feature 3

To-do list:
* HelpInfo - dodanie rekurencji 
* Wow improvement to be done 2

## Status
Projekt w trakcie testów.

## Contact
Created by [maciejrudnickipl@gmail.com] - feel free to contact me!


