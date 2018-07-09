# gizyHelpBoard
> Tablica pomocnicza wyświetlająca wartości zmiennych js.  


## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
Tablica pomocnicza umożliwiająca podgląd wartości zmiennych używanych we własnym kodzie js.   
Tablica umożliwia: 
* uruchamianie funkcji js
* wyświetlanie wartości zmiennych js
* odczyt i zapis zmiennych

## Technologies
* ES6
* CSS
* Html

## Setup
import {  
    HelpInfo, HelpBoard, HelpFields, HelpButton,  
    HelpStoper, HelpCheckButton, HelpInfoList  
} from "../myHelpBoard/gizyBoard";  


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

* HelpButton - przycisk umozliwiający uruchomienie własnych funkcji js  
let bBtn = new HelpButton('Uruchom', function_name);  // utworzenie - (opis przycisku, nazwa funkcji do uruchomienia bez nawiasów)  
gBoard.add(gBtn);   // dodanie do tablicy  
* HelpFields - pole informacyjne wyświetlające opis i wartość zmiennej  
let gFields = new HelpFields('Opis_zmiennej');  // utworzenie  (opis zmiennej)  
gBoard.add(gFields);  //dodanie do tablicy  
gFields.setV('nowa_wartosc');  //zmiana wyświetlanej wartości  
* HelpStoper - umozliwiający odliczanie czasu między wykonanymi zadaniami  
let gStoper = new HelpStoper('Stoper');  //utworzenie (nazwa)  
gBoard.add(gStoper); //dodanie do tablicy  
gStoper.start(); //rozpoczęcie odliczania  
gStoper.stop();  //zakończenie odliczania   
* HelpInfo - wyswietlanie opisu i zmiennej w tym zawartości tablic i obiektów.



## Features
List of features ready and TODOs for future development
* Awesome feature 1
* Awesome feature 2
* Awesome feature 3

To-do list:
* HelpInfo - dodanie rekurencji 
* Wow improvement to be done 2

## Status
Projekt w trakcie testów.

## Contact
Created by [maciejrudnickipl@gmail.com] - feel free to contact me!
