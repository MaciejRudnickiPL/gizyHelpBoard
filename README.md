# gizyHelpBoard
> Panel pomocniczy wyświetlający wartości zmiennych js w mini modułach tekstowych. Zawartość panelu konfigurowalna poprzez dodawanie poszczególnych modułów. Skrypt napisany w ES6 jako element nauki programowania w JavaScript. 
__English version of the descriptions after finishing.__


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

## Technologies
* ES6
* CSS
* Html
* --> Chrome

## Setup
```
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
```
Describe how to install / setup your local environement / add link to demo version.

## Code Examples
```* HelpBoard - tablica 
let gBoard=new HelpBoard('nazwa_tablicy');   

// HelpButton - moduł przycisk umożliwiający uruchomienie własnych funkcji js  
let bBtn = new HelpButton('Uruchom', function_name);     // utworzenie - (opis przycisku, nazwa funkcji do uruchomienia bez nawiasów)  
gBoard.add(gBtn);   // dodanie do panelu 

// HelpFields - moduł pole informacyjne wyświetlające opis i wartość zmiennej  
let gFields = new HelpFields('Opis_zmiennej');     // utworzenie  (opis zmiennej)  
gBoard.add(gFields);  // dodanie do panelu  
gFields.setV('nowa_wartosc');  // zmiana wyświetlanej wartości  

// HelpStoper - moduł stopera umożliwiający odliczanie czasu między wykonanymi zadaniami  
let gStoper = new HelpStoper('Stoper');     // utworzenie (nazwa)  
gBoard.add(gStoper); // dodanie do panelu  
gStoper.start(); //rozpoczęcie odliczania  
gStoper.stop();  //zakończenie odliczania   

// HelpInfo - wyswietlanie opisu i zmiennej w tym zawartości tablic i obiektów.  
let gInfo = new HelpInfo('Info');    //utworzenie (nazwa)  
gBoard.add(gInfo);    // dodanie do panelu 
gInfo.setV(array_Object);    // wyświetlenie zmiennej  

// HelpFields - moduł mini pola do wyświetlania wartości pojedynczych zmiennych  
let gFields = new HelpFields('Pola');    //utworzenie (nazwa)  
gBoard.add(gFields);    // dodanie do panelu  
gFields.setV('nowa_wartosc');    //wyświetlenie zmiennej 

// HelpInfoList - pole zmiennych numerujące poszczególne zmiany zmiennej  
let gInfoList = new HelpInfoList('Lista');  
gBoard.add(gInfoList);    // dodanie do panelu  
gInfoList.addV('nowa_wart');    // dodanie kolejnej wartości  
```

## Features
__List of features ready and TODOs for future development__

* tablica z możliwością podglądu zmiennych poprzez dodawane moduły
  - możliwość przenoszenia w dowolne miejsce
  - możliwość tworzenia kilku instancji
  - wyświetlanie wszystkich zapisanych danych
  - usuwanie wszystkich zapisanych danych
  
* moduł przycisku uruchamiający przypisane funkcje

* moduł wyświetlania zmiennych
  - wyświetlanie wartości zmiennych
  - zmiana nazwy
  - przypisanie nowej wartości
  - zapis wyników
  - dodawanie komentrzay do wyników
  - odczyt wyników
  
* moduł wyświetlania tablic i obiektów
  - wyświetlanie zawartości tablic i obiektów
  - przypisanie nowych wartości
  - zapis wyników
  - dodawanie komentarzy do wyników
  - odczyt wyników
  
* moduł listy zmiennych
  - wyświetlanie wartości zmiennych w numerowanej liście
  - zapis zmiennych
  - usuwanie zmiennych
  - dodawnie komentarzy do zmiennych
  
* moduł stopera
  - rozpoczęcie pomiaru czasu  
  - zakończenie pomiaru czasu  
  - zapis wyników  
  - dodawanie komentarzy do wyników  
  - odczyt wyników  
  - usuwanie zapisu danych stopera  
  
* konfiguracja modułu
  - zapis miejsca wyświetlania  
  - odczyt miejsca wyświetlania  
  - odawanie daty do nazwy zmiennej  
  - wyświetlanie okien w zależności od położenia panelu   

__To-do list:__
* HelpInfo - dodanie rekurencji 
* wyczyść po restarcie
* przezroczystość on/off
* testy na innych przeglądarkach 

## Status
Projekt w trakcie testów.

## Contact
Created by [maciejrudnickipl@gmail.com] - feel free to contact me!



