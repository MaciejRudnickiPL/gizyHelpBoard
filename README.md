# gizyHelpBoard
> Tablica pomocnicza wyświetlająca wartości zmiennych js.  
>Helper for shoving var in JS!

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
Tablica pomocnicza umożliwiająca podgląd wartości zmiennych używanych we własnym kodzie js. Tablica wyświetla wskazane wartości w bocznym panelu oraz wywoływanie funkcji po przez przypisane do nich przyciski. 

## Technologies
* ES6
* CSS
* Html

## Setup
import {
    HelpInfo, HelpBoard, HelpFields, HelpButton,
    HelpStoper, helpValue, HelpToolsMenu, GizyWindow, HelpCheckButton, HelpInfoList
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
Show examples of usage:
`put-your-code-here`

## Features
List of features ready and TODOs for future development
* Awesome feature 1
* Awesome feature 2
* Awesome feature 3

To-do list:
* Wow improvement to be done 1
* Wow improvement to be done 2

## Status
Project is: _in progress_, _finished_, _no longer continue_ and why?

## Inspiration
Add here credits. Project inspired by..., based on...

## Contact
Created by [@flynerdpl](https://www.flynerd.pl/) - feel free to contact me!
