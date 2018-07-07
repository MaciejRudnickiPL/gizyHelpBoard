let config = {
        loadPosition: true,// czy ma być wczytywana ostatnio zapisana pozycja okna
        miniBoard: false,// czy okno ma być wyświetlane jako mini
        position: {x: 260, y: 100},//domyślna pozycja okna
        prefix: 'gizy_',//prefix dla zpaisu w starage
        showVarText: true,//czy przy opisach zmiannych ma być kopiowana nazwa zmiennej
        clearAfterRestart: true,// po wczytaniu dane kasowane
        moveNewWindow: {x: 20, y: -20},// o ile mają być przesunięte nowe okna
        cssPath: 'assets\\myHelpBoard\\gizyBoardCss.css',
        
    }
;

let helpValue
    = {
    type: {
        helpButton: 'button',
        board: 'board',
        textInfo: 'info',
        field: 'field',
        stoper: 'stoper',
        checkButton: 'check',
        list: 'list',
        config: 'conf'
    }
};

let eventList = [];
let id = 0;

function getMyId(name) {
    id++;
    return name + id;
}

let myEvents = {
    addEvent: function (id, event, myFunction) {
        let eventData = {
            id, event, myFunction
        };
        
        if (eventList.indexOf(eventData) === -1) {
            eventList.push(eventData);
        }
    },
    startEvent: function () {
        for (let key in eventList) {
            if (eventList[key].id === 0) {
            } else {
                document.getElementById(eventList[key].id).addEventListener(eventList[key].event, eventList[key].myFunction, true);
                eventList[key].id = 0;
            }
        }
    }
};

function HelpStorage() {
    this.storageData = {};
    this.addTo = function (elementName, type, value) {
        this.storageData[type + elementName] = value;
    };
    
    this.getFrom = function (storageName, name, type) {
        let myData = JSON.parse(localStorage.getItem(config.prefix + storageName));
        if (myData) {
            return myData[type + name];
        }
    };
    
    this.getFromByType = function (storageName, type) {
        let myData = [];
        let dataStorage = JSON.parse(localStorage.getItem(config.prefix + storageName));
        for (let key in dataStorage) {
            let obj = {date: dataStorage[key].date, board: dataStorage[key].board, type: dataStorage[key].type, value: dataStorage[key].value};
            if (obj.type === type) {
                myData.push(obj);
            }
        }
        return myData;
    };
    
    this.getFromAll = function (storageName) {// wyśiwetlanie wszystkich danych wszystkich okien
        let myData = [];
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).indexOf('gizy') >= 0) {
                let dataStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));
                for (let key in dataStorage) {
                    let obj = {date: dataStorage[key].date, board: dataStorage[key].board, type: dataStorage[key].type, value: dataStorage[key].value};
                    myData.push(obj);
                }
            }
        }
        return myData;
    };
    
    this.save = function (storageName) {
        let saveData = JSON.stringify(this.storageData);
        localStorage.setItem(config.prefix + storageName, saveData);
    };
    
    this.loadStorage = function (storageName) {
        let storageData = JSON.parse(localStorage.getItem(config.prefix + storageName));
        
        if (storageData) {
            this.storageData = storageData;
        }
    };
    
    this.deleteByType = function (storageName, type) {
        let storageData = JSON.parse(localStorage.getItem(config.prefix + storageName));
        if (storageData) {
            for (let key in storageData) {
                if (storageData[key].type === type) {
                    delete storageData[key];
                }
            }
            this.storageData = storageData;
            this.save(storageName);
        }
    };
    
    this.deleteAllData = function (storageName) {
        this.storageData = {};
        localStorage.clear();
    };
    
    this.deleteElement = function (storageName, name, type) {
        localStorage.removeItem(name + '_' + type);
    };
}

let HelpOptions = function () {
    this.id = '';
};

function HelpTabTools() {
    let buttons = [];
    this.option = new HelpOptions();
    this.add = function (buttonObject) {
        buttons.push(buttonObject);
    };
    
    this.get = function () {
        if (isStorage()) {
            let btnList = '';
            for (let key in buttons) {
                let btn = buttons[key];
                btn.isTools = false;
                btn.isShort = true;
                btn.option.class = 'gizyToolsTabBtn';
                btnList = btnList + btn.get();
            }
            
            let tab = '<div ' + isIdToAdd(this.option.id) + isStyleToAdd(this.option.cssAdd)
                + ' class="gizyToolsTab gizyHideElement">' + btnList + '<textarea '
                + isIdToAdd(this.option.id + 'Txt')
                + ' class="gizyToolsTabValue">text</textarea></div>';
            return tab;
        }
        else {
            return 'Not Storage Tools!'
        }
    };
}

function HelpObject() {
    this.config = {data: 'pusty'};
    this.isShow = false;
    this.storage = null;
    this.myDiv = null;
    this.parentDiv = null;
    
    let gwVarListWindow = new GizyWindow('Dane');
    this.parentName = '';
    this.setMyDiv = function () {
        this.myDiv = document.getElementById(this.option.id);
    };
    this.helpDataSave = function (type, elemnetName) {
        if (isStorage()) {
            let saveID = 1;
            let time = new Date();
            let value = event.target.offsetParent.childNodes[3].value;
            let valueSave, dateSave;
            
            dateSave = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + '_' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
            let typeSave = dateSave + '_' + type;
            
            if (this.config) {
                if (this.config.lastSaveId) {
                    saveID = this.config.lastSaveId;
                    saveID++;
                } else {
                    this.config.lastSaveId = saveID;
                }
                
                if (this.config.fullDateInSave === false) {
                    typeSave = saveID + ')...' + type;
                }
            }
            this.config.lastSaveId = saveID;
            valueSave = {value: value, type: type, date: dateSave, board: this.parentName};
            this.storage.addTo(elemnetName.replace(/\s/g, ''), typeSave, valueSave);
            this.storage.save(this.parentName.replace(/\s/g, ''));
        }
    };
    
    this.formatContent = function (dataStorage) {
        let ret = '';
        let table;
        table = '<table class="gizyTable"><tr><th>Tablica</th><th>Czas</th><th>Zmienna</th><th>Wartość</th></tr><tbody>';
        
        for (let key in dataStorage) {
            if (!isEmpty(dataStorage[key].date)) {
                let row = '<tr><td>' + dataStorage[key].board + '</td>' + '<td>' + dataStorage[key].date + '</td>' + '<td>' + dataStorage[key].type + '</td>' + '<td>' + dataStorage[key].value + '</td></tr>';
                ret = ret + row;
            }
        }
        
        table = table + ret + '</tbody></table>';
        return table;
    };
    
    this.helpDataShow = function () {
        if (gwVarListWindow.visable === null) {
            gwVarListWindow.modal = true;
            let gwContent = this.storage.getFromByType(this.parentName, this.option.type);
            
            gwVarListWindow.addContent(this.formatContent(gwContent));
            
            gwVarListWindow.get();
            gwVarListWindow.show();
            gwVarListWindow.setPositiom(moveBy(config.moveNewWindow, this.parentDiv, 700), 'px');
            gwVarListWindow.setSize('700px', 'auto');
            gwVarListWindow.visable = true;
        } else {
            
            if (gwVarListWindow.visable) {
                gwVarListWindow.hide();
            } else {
                let gwContent = this.storage.getFromByType(this.parentName, this.option.type);
                gwVarListWindow.show();
                gwVarListWindow.changeContent(this.formatContent(gwContent));
                gwVarListWindow.setPositiom(moveBy(config.moveNewWindow, this.parentDiv, 700), 'px');
            }
        }
    };
    
    
    this.helpDataClear = function () {
        let c = confirm('Usunąć dane?');
        if (c) {
            this.storage.deleteByType(this.parentName, this.option.type);
        }
        
    };
    
    this.showToolsButtons = function (idElement) {
        let buttonsTab = document.getElementById(idElement + '_tab');
        
        if (config.showVarText) {
            document.getElementById(idElement + '_tabTxt').innerText = this.getText();
        } else {
            document.getElementById(idElement + '_tabTxt').innerText = this.getValue();
        }
        
        buttonsTab.classList.toggle('gizyHideElement');
    };
    this.getMini = function (idElelemnt) {
        let mini = '<div id="' + idElelemnt + 'mini' + '" class="gizyMiniBtn"></div>';
        myEvents.addEvent(idElelemnt + 'mini', 'click', this.showToolsButtons.bind(this, idElelemnt));
        return mini;
    };
    this.setT = function (text) {
        this.changeTextValue(text);
    };
    this.changeTextValue = function (text) {
        this.myDiv.innerText = text;
    };
    this.addToolsButtons = function (text) {
        
        if (isStorage()) {
            let toolsTab = new HelpTabTools();
            
            let btnSave = new HelpButton('Dodaj', this.helpDataSave.bind(this, this.option.type, text));
            btnSave.isTools = false;
            btnSave.isShort = true;
            btnSave.option.class = 'gizyToolsTabBtn';
            
            toolsTab.add(btnSave);
            
            let btnShow = new HelpButton('Pokaż', this.helpDataShow.bind(this));
            btnShow.isTools = false;
            btnShow.isShort = true;
            btnShow.option.class = 'gizyToolsTabBtn';
            
            toolsTab.add(btnShow);
            
            let btnClear = new HelpButton('Usuń', this.helpDataClear.bind(this));
            btnClear.isTools = false;
            btnClear.isShort = true;
            btnClear.option.class = 'gizyToolsTabBtn';
            
            toolsTab.add(btnClear);
            
            toolsTab.option.id = this.option.id + '_tab';
            return toolsTab.get();
        }
        
    };
    this.setSize = function (width, height) {
        this.myDiv.style.width = width + 'px';
        this.myDiv.style.height = height + 'px';
    }
}

HelpBoard.prototype = new HelpObject();

function HelpBoard(name) {
    
    addCSS(config.cssPath);
    this.config = {data: 'board'};
    this.storage = new HelpStorage();
    this.option = new HelpOptions();
    this.boardName = 'HelpBoard';
    
    if (!isEmpty(name)) {
        this.boardName = name;
    }
    if (isEmpty(this.option.id)) {
        this.option.id = getMyId('idBoard');
    }
    
    let myBody = new GizyWindow(this.boardName);
    let gwHelp = new GizyWindow('Pomoc GW');
    let gwDataStorageWindow = new GizyWindow('Wszystkie dane:');
    
    let gwConfig = new GizyWindow('Config: ' + this.boardName);
    let checkSavePosition;
    
    this.option.class = 'gizyHObj gizyHBoard';
    this.add = function (helpObject) {
        if (!this.isShow) {
            
            this.get();
            this.addTools();
        }
        helpObject.storage = this.storage;
        helpObject.config = this.config;
        helpObject.parentName = this.boardName;
        helpObject.parentDiv = this.myDiv;
        this.myDiv.insertAdjacentHTML('beforeend', helpObject.get());
        myEvents.startEvent();
    };
    this.get = function () {
        this.loadConfig();
        this.storage.loadStorage(this.boardName);
        
        myBody.get();
        myBody.show();
        this.myDiv = myBody.myDiv;
        this.isShow = true;
        
        myBody.setPositiom(this.config.position, 'px');
    };
    this.addTools = function () {
        let optT = new HelpOptions();
        optT.class = 'gizyHObj gizyTools';
        
        let btnSave = new HelpToolsButton('mrConfig', this.saveConfigWindow.bind(this));
        btnSave.option.class = 'gizyToolsBtn';
        
        let btnShow = new HelpToolsButton('mrShow', this.infoShow.bind(this));
        btnShow.option.class = 'gizyToolsBtn';
        
        let btnClear = new HelpToolsButton('mrHelp', this.help.bind(this));
        btnClear.option.class = 'gizyToolsBtn';
        
        let myTools = divWarp(btnSave.get() + btnShow.get() + btnClear.get(), optT);
        this.myDiv.insertAdjacentHTML('beforeend', myTools);
    };
    
    
    this.infoShow = function () {
        //todo: wyswietlanie wszystk
        
        if (gwDataStorageWindow.visable === null) {
            let gwContent = this.storage.getFromAll(this.boardName);
            gwDataStorageWindow.addContent(this.formatContent(gwContent));
            gwDataStorageWindow.get();
            gwDataStorageWindow.show();
            gwDataStorageWindow.setPositiom(moveBy(config.moveNewWindow, this.myDiv, 700), 'px');
            gwDataStorageWindow.setSize('700px', 'auto');
            gwDataStorageWindow.visable = true;
        } else {
            
            if (gwDataStorageWindow.visable) {
                gwDataStorageWindow.hide();
            } else {
                let gwContent = this.storage.getFromAll(this.boardName);
                gwDataStorageWindow.show();
                gwDataStorageWindow.changeContent(this.formatContent(gwContent));
                gwDataStorageWindow.setPositiom(moveBy(config.moveNewWindow, this.myDiv, 700), 'px');
            }
            
        }
        
    };
    this.addDataConfig = function (key, value) {
        
        let tem = {};//todo: ???? czy ok zpis
        if (!isEmpty(this.config)) {
            tem = this.config;
        }
        tem[key] = value;
        this.config = tem;
        
    };
    this.checkChangeAutoLoad = function (myData, event) {
        this.addDataConfig(myData, event.srcElement.checked);//todo: ???srcElement ??
    };
    
    this.checkChangeMini = function (myData, event) {
        this.addDataConfig(myData, event.srcElement.checked);//todo: ???srcElement ??
    };
    
    this.checkSavePosition = function (myData, event) {
        if (event.srcElement.checked) {
            this.addDataConfig(myData, myBody.getPosition());
        }
    };
    
    this.checkClearAfterRestart = function (myData, event) {
        this.addDataConfig(myData, event.srcElement.checked);
    };
    
    this.checkShowDate = function (myData, event) {
        this.addDataConfig(myData, event.srcElement.checked);
    };
    
    this.saveConfigWindow = function () {
        
        if (gwConfig.visable === null) {
            gwConfig.modal = true;
            let checkLoadPosition, checkMini, btnClear, btnSave, btnCancel, checkClearAfterRestart, checkShowDate;
            
            checkClearAfterRestart = new HelpCheckButton('Wyczyść po restarcie', this.checkClearAfterRestart.bind(this, 'clearAfterRestart'));
            if (this.config.clearAfterRestart) {
                checkClearAfterRestart.checked = 'checked'
            } else {
                checkClearAfterRestart.checked = ''
            }
            gwConfig.addContent(checkClearAfterRestart.get());
            
            
            checkShowDate = new HelpCheckButton('Pokazuj date', this.checkShowDate.bind(this, 'showDate'));
            
            if (this.config.clearAfterRestart) {
                checkShowDate.checked = 'checked'
            } else {
                checkShowDate.checked = ''
            }
            gwConfig.addContent(checkShowDate.get());
            
            
            checkLoadPosition = new HelpCheckButton('Auto odczyt pozycj', this.checkChangeAutoLoad.bind(this, 'loadPosition'));
            
            if (this.config.loadPosition) {
                checkLoadPosition.checked = 'checked'
            } else {
                checkLoadPosition.checked = ''
            }
            gwConfig.addContent(checkLoadPosition.get());
            
            checkMini = new HelpCheckButton('Miniaturka', this.checkChangeMini.bind(this, 'miniBoard'));
            if (this.config.miniBoard) {
                checkMini.checked = 'checked'
            } else {
                checkMini.checked = ''
            }
            gwConfig.addContent(checkMini.get());
            
            checkSavePosition = new HelpCheckButton('Zapisz pozycje', this.checkSavePosition.bind(this, 'position'));
            
            checkSavePosition.checked = '';
            gwConfig.addContent(checkSavePosition.get());
            
            btnClear = new HelpButton('Wyczysc', this.infoClear.bind(this));
            btnClear.isShort = true;
            gwConfig.addContent(btnClear.get());
            
            btnSave = new HelpButton('Zapisz CONF', this.saveConfig.bind(this));
            btnSave.isShort = true;
            gwConfig.addContent(btnSave.get());
            
            btnCancel = new HelpButton('Anuluj', gwConfig.hide.bind(gwConfig));
            btnCancel.isShort = true;
            gwConfig.addContent(btnCancel.get());
            
            gwConfig.get();
            
            myEvents.startEvent();
            gwConfig.show();
        } else {
            
            if (gwConfig.visable) {
                gwConfig.hide();
            } else {
                checkSavePosition.changeValue(false);
                gwConfig.show();
            }
        }
        
        gwConfig.setPositiom(moveBy(config.moveNewWindow, this.myDiv, 150), 'px');
    };
    this.loadConfig = function () {
        
        this.config = this.storage.getFrom(this.boardName, this.boardName, helpValue.type.config);
        if (!this.config) {
            this.config = config;
        }
        
        if (this.config.clearAfterLoad) {
        
        }
    };
    
    this.saveConfig = function () {
        this.storage.addTo(this.boardName, helpValue.type.config, this.config);
        this.storage.save(this.boardName);
        gwConfig.hide();
    };
    
    
    this.infoClear = function () {
        let toClear = confirm('Czy usunąć dane?');
        if (toClear) {
            this.storage.deleteAllData();
        }
    };
    
    this.help = function () {
        if (gwHelp.visable === null) {
            let btnClose = new HelpButton('Zamknij', gwHelp.hide.bind(gwHelp));
            btnClose.isShort = true;
            let helpOptions = new HelpOptions();
            helpOptions.class = 'gizyHelpText';
            gwHelp.addContent(divWarp(help, helpOptions));
            gwHelp.addContent(btnClose.get());
            gwHelp.get();
            gwHelp.show();
            let pos = moveBy(config.moveNewWindow, this.myDiv, 500);
            gwHelp.setPositiom(pos, 'px');
            gwHelp.setSize('500px', 'auto');
            myEvents.startEvent();
        } else {
            let pos = moveBy(config.moveNewWindow, this.myDiv, 500);
            gwHelp.setPositiom(pos, 'px');
            gwHelp.show();
        }
    };
}

function GizyWindow(title) {
    this.option = null;
    this.config = {pos: {x: '0px', y: '0px'}};
    this.modal = false;
    this.myDiv = '';
    this.position = null;
    this.size = null;
    this.visable = null;
    this.winContent = '';
    
    
    this.clearContent = function () {
        this.content = null;
    };
    
    this.get = function () {
        this.option = new HelpOptions();
        this.option.id = getMyId('gizyWindow');
        this.option.class = 'gizyWindow gizyHideElement';
        let gwHtml = divWarp(this.getBar(title) + this.winContent, this.option);
        
        if (this.modal) {
            gwHtml = '<div class="modal">' + gwHtml + '</div>';
            
        }
        
        
        document.body.insertAdjacentHTML('beforeend', gwHtml);
        this.myDiv = document.getElementById(this.option.id);
        myEvents.startEvent();
    };
    
    this.getBar = function (title) {
        let option = new HelpOptions();
        option.class = 'gizyWindowBar';
        option.id = this.option.id + 'Bar';
        return divWarp(title + this.getCloseButton(this.option.id, 'X'), option);
    };
    
    this.getCloseButton = function (idElement, nameButton) {
        let mini = '<div id="' + idElement + 'Close' + '" class="gizyCloseBtn">' + nameButton + '</div>';
        myEvents.addEvent(idElement + 'Close', 'click', this.hide.bind(this));
        return mini;
    };
    
    this.show = function () {
        this.visable = true;
        
        if (this.modal) {
            this.myDiv.parentNode.classList.remove('gizyHideElement');
        }
        
        this.myDiv.classList.remove('gizyHideElement');
        dragElement(this.myDiv);
        return this.option.id;
    };
    
    this.hide = function () {
        
        if (this.modal) {
            this.myDiv.parentNode.classList.add('gizyHideElement');
        }
        this.myDiv.classList.add('gizyHideElement');
        this.visable = false;
    };
    
    
    this.addContent = function (content) {
        this.winContent = this.winContent + this.getWinContent(content);
    };
    
    this.changeContent = function (content) {
        this.myDiv.children[1].innerHTML = content;
    };
    
    
    this.getWinContent = function (content) {
        let option = new HelpOptions();
        option.class = 'gizyWindowContent';
        option.id = getMyId('contentWin');
        
        
        return divWarp(content, option);
    };
    
    this.loadConfig = function (saveName) {
        this.config = JSON.parse(localStorage.getItem('conf' + saveName));
    };
    
    this.setConfig = function () {
        this.setPositiom(this.config.pos, 'px');
    };
    
    
    this.setPositiom = function (positionXY, unit) {
        
        // let unit = 'px';
        this.myDiv.style.left = positionXY.x + unit;
        this.myDiv.style.top = positionXY.y + unit;
    };
    
    this.saveConfigWindow = function (saveName) {
        if (isStorage()) {
            let saveData = JSON.stringify(this.config);
            localStorage.setItem('conf' + saveName, saveData);
        }
    };
    
    this.getPosition = function () {
        let posX = parseInt(this.myDiv.style.left);
        let posY = parseInt(this.myDiv.style.top);
        
        return {x: posX, y: posY}
    };
    
    this.getSize = function () {
        let size = {};
        size.width = this.myDiv.style.width;
        size.height = this.myDiv.style.height;
        
        return size;
    };
    
    
    this.setSize = function (width, height) {
        this.myDiv.style.width = width;
        this.myDiv.style.height = height;
    };
    
}

HelpButton.prototype = new HelpObject();

function HelpButton(text, myFunction) {
    this.isTools = true;
    this.isShort = false;
    this.option = new HelpOptions;
    if (text) {
        this.option.text = text;
    }
    
    if (myFunction) {
        this.option.myFunction = myFunction;
    }
    
    this.option.type = helpValue.type.helpButton;
    this.option.class = 'gizyHObj gizyHButton';
    this.get = function () {
        let options = new HelpOptions();
        let toolsTab = '';
        if (isEmpty(this.option.id)) {
            this.option.id = getMyId('idBtn');
        }
        
        if (!this.isShort) {
            this.option.text = this.option.text + ' => ' + this.option.myFunction.name + '()'
        }
        
        if (this.isTools) {
            toolsTab = this.addToolsButtons(text);
        }
        
        options.id = this.option.id + '_txt';
        options.class = 'gizyTextField';
        options.cssAdd = 'justify-content: center; width:100%; ';
        myEvents.addEvent(this.option.id, 'click', this.option.myFunction);
        return divWarp(this.option.text + toolsTab, this.option);
    };
    
    this.changeTextValue = function (text) {
        document.getElementById(this.option.id).innerText = text;
    };
}

HelpCheckButton.prototype = new HelpObject();

function HelpCheckButton(text, myFunction) {
    
    this.option = new HelpOptions;
    this.option.type = helpValue.type.textInfo;
    this.option.text = text;
    this.checked = '';
    this.option.class = 'gizyHCheckButton';
    this.myDivValue = null;
    this.option.id = getMyId('idBtn');
    
    if (myFunction) {
        this.option.myFunction = myFunction;
    }
    
    this.get = function () {
        if (isEmpty(this.option.id)) {
            this.option.id = getMyId('idBtn');
        }
        
        let textOptions = new HelpOptions();
        textOptions.class = 'gizyHCheckButtonField';
        textOptions.id = this.option.id + '_txt';
        let inf = divWarp(this.option.text, textOptions);
        
        let optionValue = new HelpOptions();
        optionValue.class = 'gizyHObj gizyHCheckButtonValue';
        
        if (typeof (this.option.value) === 'object') {
            this.option.value = this.exploreObject(this.option.value);
        }
        
        let value = '<input ' + isIdToAdd(this.option.id + '_val') + this.checked + ' type="checkbox">';
        value = divWarp(isEmptyReturn(value, 'Brak danych'), optionValue);
        myEvents.addEvent(this.option.id + '_val', 'change', this.option.myFunction);
        return divWarp(inf + value, this.option);
        
    };
    
    
    this.getText = function () {
        return this.option.text + ' : ' + this.option.value;
    };
    
    this.getValue = function () {
        return document.getElementById(this.option.id + '_val').checked;
    };
    
    this.getValue = function () {
        if (this.myDivValue === null) {
            document.getElementById(this.option.id + '_val').checked = value;
        } else {
            return this.myDivValue.checked;
        }
    };
    
    this.changeTextValue = function (text) {
        document.getElementById(this.option.id + '_txt').innerText = text;
    };
    this.setV = function (value) {
        this.changeValue(value);
    };
    this.changeValue = function (value) {
        this.option.value = value;
        document.getElementById(this.option.id + '_val').checked = value;
    };
    
    
}

HelpToolsButton.prototype = new HelpObject();

function HelpToolsButton(text, myFunction) {
    this.option = new HelpOptions;
    if (text) {
        this.option.text = text;
    }
    
    if (myFunction) {
        this.option.myFunction = myFunction;
    }
    
    this.option.type = helpValue.type.helpButton;
    this.option.class = 'gizyHObj gizyHButton';
    this.get = function () {
        if (this.option.id === '') {
            this.option.id = getMyId('idBtn');
        }
        
        let options = new HelpOptions();
        options.id = this.option.id + '_txt';
        options.class = 'gizyTextField';
        options.cssAdd = 'justify-content: center; width:100%; ';
        let content = divWarp(this.option.text, options);
        myEvents.addEvent(this.option.id, 'click', this.option.myFunction);
        return divWarp(content, this.option);
        
        
    };
}

HelpStoper.prototype = new HelpObject();

function HelpStoper(text) {
    this.timeStart = 0;
    this.myTime = 0;
    
    this.option = new HelpOptions;
    this.option.text = 'Start:';
    this.option.class = 'gizyHObj gizyHStoper';
    if (text) {
        this.option.text = text;
    }
    this.option.type = helpValue.type.stoper;
    this.start = function () {
        this.timeStart = performance.now();
        document.getElementById(this.option.id + '_timeValue').innerText = msToTime(Date.now());
    };
    this.stop = function () {
        this.myTime = performance.now() - this.timeStart;
        document.getElementById(this.option.id + '_timeValue').innerText = this.myTime + ' ms';
    };
    
    
    this.getText = function () {
        return this.option.text + ' czas:' + this.myTime + ' ms';
    };
    
    
    this.getValue = function () {
        return this.myTime + ' ms';
    };
    this.get = function () {
        if (isEmpty(this.option.id)) {
            this.option.id = getMyId('idBtn');
        }
        
        this.option.class = 'gizyHObj gizyHStoper';
        let options = new HelpOptions();
        
        
        options.class = 'gizyValueField';
        options.id = this.option.id + '_timeValue';
        options.cssAdd = 'width: 100%;';
        let timeFieldValue = divWarp('??:??', options);
        
        options.class = 'gizyTextField';
        options.cssAdd = 'width: auto;';
        options.id = this.option.id + '_timeText';
        let timeFieldText = divWarp('Czas:', options);
        
        options.id = '';
        options.cssAdd = 'width: 100%;';
        let stoperTime = divWarp(timeFieldText + timeFieldValue, options);
        
        options.id = this.option.id + '_txt';
        options.class = 'gizyHObj gizyHInfo';
        let nameText = divWarp(this.option.text, options);
        
        
        return divWarp(this.getMini(this.option.id) + nameText + stoperTime + this.addToolsButtons(text), this.option);
        
    };
    
    
}

HelpFields.prototype = new HelpObject();

function HelpFields(text) {
    this.option = new HelpOptions;
    if (!isEmpty(text)) {
        this.option.text = text;
    }
    
    if (isEmpty(this.option.value)) {
        this.option.value = '??';
    }
    this.setV = function (value) {
        this.changeValue(value);
    };
    this.option.class = 'gizyHObj gizyHValueField';
    this.option.type = helpValue.type.field;
    this.changeValue = function (text) {
        document.getElementById(this.option.id + '_val').innerText = text;
    };
    
    this.get = function () {
        if (isEmpty(this.option.id)) {
            this.option.id = getMyId('idBtn');
        }
        
        this.option.class = 'gizyHObj gizyHFields';
        
        let options = new HelpOptions();
        options.class = 'gizyTextField';
        options.id = this.option.id + '_txt';
        options.cssAdd = 'justify-content: flex-end;width: 50%;';
        
        let field = divWarp(this.option.text, options);
        
        options.class = 'gizyValueField';
        options.cssAdd = 'justify-content: flex-start;width: 50%;';
        options.id = this.option.id + '_val';
        let value = divWarp(this.option.value, options);
        
        return divWarp(this.getMini(this.option.id) + field + value + this.addToolsButtons(text), this.option);
    };
    
    this.getText = function () {
        return this.option.text + ' : ' + this.option.value;
    };
    
    this.getValue = function () {
        return this.option.value;
    };
    
}

HelpInfo.prototype = new HelpObject();

function HelpInfo(text) {
    
    this.option = new HelpOptions;
    this.option.type = helpValue.type.textInfo;
    this.option.text = text;
    this.option.class = 'gizyHObj gizyHInfo';
    this.option.cssAdd = ' margin: 2px 0 0 0;';
    
    this.get = function () {
        if (isEmpty(this.option.id)) {
            this.option.id = getMyId('idBtn');
        }
        let inf = divWarp(this.option.text, this.option);
        let optionValue = new HelpOptions();
        optionValue.position = '';
        optionValue.id = this.option.id + '_val';
        optionValue.class = 'gizyHObj gizyHInfoValue';
        
        if (typeof (this.option.value) === 'object') {
            this.option.value = this.exploreObject(this.option.value);
        }
        
        let value = divWarp(isEmptyReturn(this.option.value, 'Brak danych'), optionValue);
        return divWarp(this.getMini(this.option.id) + this.addToolsButtons(text) + inf + value, this.option);
        
    };
    
    
    this.getText = function () {
        return this.option.text + ' : ' + this.option.value;
    };
    
    this.getValue = function () {
        return this.option.value;
    };
    
    this.setV = function (value) {
        this.changeValue(value);
    };
    this.changeValue = function (value) {
        this.option.value = value;
        if (typeof  this.option.value === 'object') {
            this.option.value = this.exploreObject(this.option.value)
        }
        document.getElementById(this.option.id + '_val').innerText = this.option.value;
    };
    
    this.exploreObject = function (object) {
        
        var str = '';
        for (var p in object) {
            if (object.hasOwnProperty(p)) {
                str += p + '::' + object[p] + '\n';
            }
        }
        return str;
    }
}


HelpInfoList.prototype = new HelpObject();

function HelpInfoList(text) {
    this.option = new HelpOptions;
    this.option.type = helpValue.type.textInfo;
    this.option.text = text;
    this.counter = 0;
    this.content = '';
    this.option.class = 'gizyHObj gizyHInfo';
    this.option.cssAdd = ' margin: 2px 0 0 0;';
    
    this.get = function () {
        if (isEmpty(this.option.id)) {
            this.option.id = getMyId('idBtn');
        }
        let inf = divWarp(this.option.text, this.option);
        let optionValue = new HelpOptions();
        optionValue.position = '';
        optionValue.id = this.option.id + '_val';
        optionValue.class = 'gizyHObj gizyHInfoValue';
        
        let value = divWarp(isEmptyReturn(this.content, 'Brak danych'), optionValue);
        let infoObj = {};
        
        
        return divWarp(this.getMini(this.option.id) + this.addToolsButtons(text) + inf + value, this.option);
        
    };
    
    
    this.getText = function () {
        return this.option.text + ' : ' + this.content.replace(/(<([^>]+)>)/ig, "");
    };
    
    this.getValue = function () {
        return this.content.replace(/(<([^>]+)>)/ig, "");
    };
    
    this.setV = function (value) {
        this.changeValue(value);
    };
    this.changeValue = function (value) {
        this.option.value = value;
        if (typeof  this.option.value === 'object') {
            this.option.value = this.exploreObject(this.option.value)
        }
        document.getElementById(this.option.id + '_val').innerText = this.option.value;
    };
    
    this.addV = function (content) {
        this.counter++;
        this.content = this.content + this.getContent(content);
        document.getElementById(this.option.id + '_val').innerHTML = this.content;
    };
    this.getContent = function (content) {
        let option = new HelpOptions();
        option.class = 'gizyListContent';
        return divWarp(' (' + this.counter + ') : ' + content, option);
    };
    
    
}

function divWarp(content, optionObject) {
    return '<div ' +
        isIdToAdd(optionObject.id) +
        isClassToAdd(optionObject.class) +
        isStyleToAdd(isElementToAdd(optionObject.cssAdd) + isElementToAdd(optionObject.position)) +
        '>' +
        content + '</div>';
}


// funkcje pomocnicze


// zamiana czasu
function msToTime(duration) {
    var milliseconds = parseInt((duration % 10000))
        , seconds = parseInt((duration / 1000) % 60)
        , minutes = parseInt((duration / (1000 * 60)) % 60)
        , hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}


function isCss(element, value) {
    if (isEmpty(value)) {
        return '';
    }
    return element + ':' + value + ';';
    
}

function isClassToAdd(myClass) {
    if (isEmpty(myClass)) {
        return '';
    }
    return ' class="' + myClass + '" ';
}

function isIdToAdd(myID) {
    if (isEmpty(myID)) {
        return '';
    }
    return ' id="' + myID + '" ';
}

function isStyleToAdd(myStyle) {
    
    if (isEmpty(myStyle)) {
        return '';
    }
    return ' style="' + myStyle + '"';
    
}

function isElementToAdd(myElement) {
    
    if (isEmpty(myElement)) {
        return '';
    }
    return myElement;
}

function isStorage() {
    return typeof(Storage) !== "undefined";
}

function isEmptyReturn(value, backValue) {
    if (isEmpty(value)) {
        return backValue
    }
    return value;
    
}

function isEmpty(object) {
    
    if (object && object.length > 0 && object[0] && object[0].length > 0) {
    
    } else {
    
    }
    let wynik = (!object || 0 === object.length);
    
    return wynik;
}

// dodawanie css do strony
function addCSS(filename) {
    let head = document.getElementsByTagName('head')[0];
    
    let style = document.createElement('link');
    style.href = filename;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    head.append(style);
}

// przenoszenie elementów
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    if (document.getElementById(element.id + "Bar")) {
        document.getElementById(element.id + "Bar").onmousedown = dragMouseDown;
    }
    
    function dragMouseDown(e) {
        e = e || window.event;
        
        
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


// pozycje okien aby nie wychodziły poza ekran
function moveBy(moveObj, parentElement, sizeWidthElement) {
    
    let leftParentElement, topParentElement, sizeWidthParent;
    let pos = {x: 0, y: 0};
    
    topParentElement = parseInt(parentElement.offsetTop);
    leftParentElement = parseInt(parentElement.offsetLeft);
    sizeWidthParent = parseInt(parentElement.clientWidth);
    
    if (moveObj.x > 0) {
        pos.x = leftParentElement + sizeWidthParent + moveObj.x;
        
        if (pos.x + parseInt(sizeWidthElement) > parseInt(screen.width)) {
            pos.x = leftParentElement - (moveObj.x + sizeWidthElement);
        }
        
    } else {
        pos.x = leftParentElement - sizeWidthElement + moveObj.x;
        if (pos.x < 0) {
            pos.x = leftParentElement + sizeWidthElement + moveObj.x + sizeWidthParent;
        }
    }
    
    pos.y = topParentElement + moveObj.y;
    return pos;
}


const help = 'Pomoc <br>Jak używać:<br><strong>var board = new HelpBoard; - stworzenie nowej tablicy danych.</strong><br>' +
    '<strong>var btnFn = new HelpButton(\'Nazwa_przycisku\', moja_funkcja);</strong> //stworzenie nowego przycisku funkcyjnego uruchamiającego moja_funkcja<br><br>' +
    '<strong>var btnInfo = new HelpInfo(\'nazwa\');</strong><br> //wyświetla parę nazwę i wartość.<br><br>' +
    'Użycie: btn.setT(\'Nowa_wartosc\') - zmiana wartości <br>' +
    'Użycie: btn.setV(\'Nowa_wartosc\') - zmiana wartości <br>' +
    '';


export {HelpButton, HelpInfo, HelpFields, HelpStoper, HelpCheckButton, HelpInfoList}
export {HelpBoard, helpValue, GizyWindow}



