"use strict";
var exports = {};
var _typeof =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(a) {
                return typeof a;
            }
            : function(a) {
                return a &&
                "function" == typeof Symbol &&
                a.constructor === Symbol &&
                a !== Symbol.prototype
                    ? "symbol"
                    : typeof a;
            },
    config = {
        loadPosition: !0,
        miniBoard: !1,
        position: { x: 260, y: 100 },
        prefix: "gizy_",
        showVarText: !0,
        clearAfterRestart: !0,
        moveNewWindow: { x: 20, y: -20 },
        cssPath: "build\\gizyBoardCss.css",
        transparentBody: !1
    },
    helpValue = {
        type: {
            helpButton: "button",
            board: "board",
            textInfo: "info",
            field: "field",
            stoper: "stoper",
            checkButton: "check",
            list: "list",
            config: "conf"
        }
    },
    eventList = [],
    id = 0;
Object.defineProperty(exports, "__esModule", { value: !0 });
function getMyId(a) {
    return id++, a + id;
}
var myEvents = {
    addEvent: function addEvent(a, b, d) {
        var f = { id: a, event: b, myFunction: d };
        -1 === eventList.indexOf(f) && eventList.push(f);
    },
    startEvent: function startEvent() {
        for (var a in eventList)
            if (0 === eventList[a].id);
            else
                document
                    .getElementById(eventList[a].id)
                    .addEventListener(eventList[a].event, eventList[a].myFunction, !0),
                    (eventList[a].id = 0);
    }
};
function HelpStorage() {
    (this.storageData = {}),
        (this.addTo = function(a, b, d) {
            this.storageData[b + a] = d;
        }),
        (this.getFrom = function(a, b, d) {
            var f = JSON.parse(localStorage.getItem(config.prefix + a));
            if (f) return f[d + b];
        }),
        (this.getFromByType = function(a, b) {
            var d = [],
                f = JSON.parse(localStorage.getItem(config.prefix + a));
            for (var g in f) {
                var h = {
                    date: f[g].date,
                    board: f[g].board,
                    type: f[g].type,
                    value: f[g].value
                };
                h.type === b && d.push(h);
            }
            return d;
        }),
        (this.getFromAll = function() {
            for (var b = [], d = 0; d < localStorage.length; d++)
                if (0 <= localStorage.key(d).indexOf("gizy")) {
                    var f = JSON.parse(localStorage.getItem(localStorage.key(d)));
                    for (var g in f) {
                        var h = {
                            date: f[g].date,
                            board: f[g].board,
                            type: f[g].type,
                            value: f[g].value
                        };
                        b.push(h);
                    }
                }
            return b;
        }),
        (this.save = function(a) {
            var b = JSON.stringify(this.storageData);
            localStorage.setItem(config.prefix + a, b);
        }),
        (this.loadStorage = function(a) {
            var b = JSON.parse(localStorage.getItem(config.prefix + a));
            b && (this.storageData = b);
        }),
        (this.deleteByType = function(a, b) {
            var d = JSON.parse(localStorage.getItem(config.prefix + a));
            if (d) {
                for (var f in d) d[f].type === b && delete d[f];
                (this.storageData = d), this.save(a);
            }
        }),
        (this.deleteAllData = function() {
            (this.storageData = {}), localStorage.clear();
        }),
        (this.deleteElement = function(a, b, d) {
            localStorage.removeItem(b + "_" + d);
        });
}
var HelpOptions = function() {
    this.id = "";
};
function HelpTabTools() {
    var a = [];
    (this.option = new HelpOptions()),
        (this.add = function(b) {
            a.push(b);
        }),
        (this.get = function() {
            if (isStorage()) {
                var b = "";
                for (var d in a) {
                    var f = a[d];
                    (f.isTools = !1),
                        (f.isShort = !0),
                        (f.option.class = "gizyToolsTabBtn"),
                        (b += f.get());
                }
                var g =
                    "<div " +
                    isIdToAdd(this.option.id) +
                    isStyleToAdd(this.option.cssAdd) +
                    ' class="gizyToolsTab gizyHideElement">' +
                    b +
                    "<textarea " +
                    isIdToAdd(this.option.id + "Txt") +
                    ' class="gizyToolsTabValue">text</textarea></div>';
                return g;
            }
            return "Not Storage Tools!";
        });
}
function HelpObject() {
    (this.config = { data: "pusty" }),
        (this.isShow = !1),
        (this.storage = null),
        (this.myDiv = null),
        (this.parentDiv = null);
    var a = new GizyWindow("Dane");
    (this.parentName = ""),
        (this.setMyDiv = function() {
            this.myDiv = document.getElementById(this.option.id);
        }),
        (this.helpDataSave = function(b, d) {
            if (isStorage()) {
                var f = 1,
                    g = new Date(),
                    h = event.target.offsetParent.childNodes[3].value,
                    j,
                    k;
                k =
                    g.getFullYear() +
                    "-" +
                    g.getMonth() +
                    "-" +
                    g.getDate() +
                    "_" +
                    g.getHours() +
                    ":" +
                    g.getMinutes() +
                    ":" +
                    g.getSeconds();
                var l = k + "_" + b;
                this.config &&
                (this.config.lastSaveId
                    ? ((f = this.config.lastSaveId), f++)
                    : (this.config.lastSaveId = f),
                !1 === this.config.fullDateInSave && (l = f + ")..." + b)),
                    (this.config.lastSaveId = f),
                    (j = { value: h, type: b, date: k, board: this.parentName }),
                    this.storage.addTo(d.replace(/\s/g, ""), l, j),
                    this.storage.save(this.parentName.replace(/\s/g, ""));
            }
        }),
        (this.formatContent = function(b) {
            var f,
                d = "";
            for (var g in ((f =
                '<table class="gizyTable"><tr><th>Tablica</th><th>Czas</th><th>Zmienna</th><th>Warto\u015B\u0107</th></tr><tbody>'),
                b))
                if (!isEmpty(b[g].date)) {
                    var h =
                        "<tr><td>" +
                        b[g].board +
                        "</td><td>" +
                        b[g].date +
                        "</td><td>" +
                        b[g].type +
                        "</td><td>" +
                        b[g].value +
                        "</td></tr>";
                    d += h;
                }
            return (f = f + d + "</tbody></table>"), f;
        }),
        (this.helpDataShow = function() {
            if (null === a.visable) {
                a.modal = !0;
                var b = this.storage.getFromByType(this.parentName, this.option.type);
                a.addContent(this.formatContent(b)),
                    a.get(),
                    a.show(),
                    a.setPositiom(
                        moveBy(config.moveNewWindow, this.parentDiv, 700),
                        "px"
                    ),
                    a.setSize("700px", "auto"),
                    (a.visable = !0);
            } else if (a.visable) a.hide();
            else {
                var d = this.storage.getFromByType(this.parentName, this.option.type);
                a.show(),
                    a.changeContent(this.formatContent(d)),
                    a.setPositiom(
                        moveBy(config.moveNewWindow, this.parentDiv, 700),
                        "px"
                    );
            }
        }),
        (this.helpDataClear = function() {
            var b = confirm("Usun\u0105\u0107 dane?");
            b && this.storage.deleteByType(this.parentName, this.option.type);
        }),
        (this.showToolsButtons = function(b) {
            var d = document.getElementById(b + "_tab");
            (document.getElementById(b + "_tabTxt").innerText = config.showVarText
                ? this.getText()
                : this.getValue()),
                d.classList.toggle("gizyHideElement");
        }),
        (this.getMini = function(b) {
            return (
                myEvents.addEvent(
                    b + "mini",
                    "click",
                    this.showToolsButtons.bind(this, b)
                ),
                '<div id="' + b + 'mini" class="gizyMiniBtn">+</div>'
            );
        }),
        (this.setT = function(b) {
            this.changeTextValue(b);
        }),
        (this.changeTextValue = function(b) {
            this.myDiv.innerText = b;
        }),
        (this.addToolsButtons = function(b) {
            if (isStorage()) {
                var d = new HelpTabTools(),
                    f = new HelpButton(
                        "Dodaj",
                        this.helpDataSave.bind(this, this.option.type, b)
                    );
                (f.isTools = !1),
                    (f.isShort = !0),
                    (f.option.class = "gizyToolsTabBtn"),
                    d.add(f);
                var g = new HelpButton("Poka\u017C", this.helpDataShow.bind(this));
                (g.isTools = !1),
                    (g.isShort = !0),
                    (g.option.class = "gizyToolsTabBtn"),
                    d.add(g);
                var h = new HelpButton("Usu\u0144", this.helpDataClear.bind(this));
                return (
                    (h.isTools = !1),
                        (h.isShort = !0),
                        (h.option.class = "gizyToolsTabBtn"),
                        d.add(h),
                        (d.option.id = this.option.id + "_tab"),
                        d.get()
                );
            }
        }),
        (this.setSize = function(b, d) {
            (this.myDiv.style.width = b + "px"), (this.myDiv.style.height = d + "px");
        });
}
HelpBoard.prototype = new HelpObject();
function HelpBoard(a) {
    addCSS(config.cssPath),
        (this.config = { data: "board" }),
        (this.storage = new HelpStorage()),
        (this.option = new HelpOptions()),
        (this.boardName = "HelpBoard"),
    isEmpty(a) || (this.boardName = a),
    isEmpty(this.option.id) && (this.option.id = getMyId("idBoard"));
    var b = new GizyWindow(this.boardName),
        d = new GizyWindow("Pomoc GW"),
        f = new GizyWindow("Wszystkie dane:"),
        g = new GizyWindow("Config: " + this.boardName),
        h;
    (this.option.class = "gizyHObj"),
        (this.add = function(j) {
            this.isShow || (this.get(), this.addTools()),
                (j.storage = this.storage),
                (j.config = this.config),
                (j.parentName = this.boardName),
                (j.parentDiv = this.myDiv),
                this.myDiv.insertAdjacentHTML("beforeend", j.get()),
                myEvents.startEvent();
        }),
        (this.get = function() {
            this.loadConfig(),
                this.storage.loadStorage(this.boardName),
                b.get(),
                b.show(),
                (this.myDiv = b.myDiv),
                (this.isShow = !0),
                b.setPositiom(this.config.position, "px"),
                (this.myDiv.style.opacity = this.config.transparentBody ? "0.7" : "1");
        }),
        (this.addTools = function() {
            var j = new HelpOptions();
            j.class = "gizyHObj gizyTools";
            var k = new HelpToolsButton("Konfig", this.saveConfigWindow.bind(this));
            k.option.class = "gizyToolsBtn  1";
            var l = new HelpToolsButton("Poka\u017C", this.infoShow.bind(this));
            l.option.class = "gizyToolsBtn";
            var m = new HelpToolsButton("Pomoc", this.help.bind(this));
            m.option.class = "gizyToolsBtn";
            var n = divWarp(k.get() + l.get() + m.get(), j);
            this.myDiv.insertAdjacentHTML("beforeend", n);
        }),
        (this.infoShow = function() {
            if (null === f.visable) {
                var j = this.storage.getFromAll(this.boardName);
                f.addContent(this.formatContent(j)),
                    f.get(),
                    f.show(),
                    f.setPositiom(moveBy(config.moveNewWindow, this.myDiv, 700), "px"),
                    f.setSize("700px", "auto"),
                    (f.visable = !0);
            } else if (f.visable) f.hide();
            else {
                var k = this.storage.getFromAll(this.boardName);
                f.show(),
                    f.changeContent(this.formatContent(k)),
                    f.setPositiom(moveBy(config.moveNewWindow, this.myDiv, 700), "px");
            }
        }),
        (this.addDataConfig = function(j, k) {
            var l = {};
            isEmpty(this.config) || (l = this.config), (l[j] = k), (this.config = l);
        }),
        (this.checkChangeAutoLoad = function(j, k) {
            this.addDataConfig(j, k.srcElement.checked);
        }),
        (this.transparentBodyChange = function(j, k) {
            this.addDataConfig(j, k.srcElement.checked);
        }),
        (this.checkSavePosition = function(j, k) {
            k.srcElement.checked && this.addDataConfig(j, b.getPosition());
        }),
        (this.checkClearAfterRestart = function(j, k) {
            this.addDataConfig(j, k.srcElement.checked);
        }),
        (this.checkShowDate = function(j, k) {
            this.addDataConfig(j, k.srcElement.checked);
        }),
        (this.saveConfigWindow = function() {
            if (null === g.visable) {
                g.modal = !0;
                var j, k, l, m, n, o, q;
                (o = new HelpCheckButton(
                    "Wyczy\u015B\u0107 po restarcie",
                    this.checkClearAfterRestart.bind(this, "clearAfterRestart")
                )),
                    (o.checked = this.config.clearAfterRestart ? "checked" : ""),
                    g.addContent(o.get()),
                    (q = new HelpCheckButton(
                        "Pokazuj date",
                        this.checkShowDate.bind(this, "showDate")
                    )),
                    (q.checked = this.config.clearAfterRestart ? "checked" : ""),
                    g.addContent(q.get()),
                    (j = new HelpCheckButton(
                        "Auto odczyt pozycj",
                        this.checkChangeAutoLoad.bind(this, "loadPosition")
                    )),
                    (j.checked = this.config.loadPosition ? "checked" : ""),
                    g.addContent(j.get()),
                    (k = new HelpCheckButton(
                        "Przezroczysto\u015B\u0107",
                        this.transparentBodyChange.bind(this, "transparentBody")
                    )),
                    (k.checked = this.config.miniBoard ? "checked" : ""),
                    g.addContent(k.get()),
                    (h = new HelpCheckButton(
                        "Zapisz pozycje",
                        this.checkSavePosition.bind(this, "position")
                    )),
                    (h.checked = ""),
                    g.addContent(h.get()),
                    (l = new HelpButton("Wyczysc", this.infoClear.bind(this))),
                    (l.isShort = !0),
                    g.addContent(l.get()),
                    (m = new HelpButton("Zapisz CONF", this.saveConfig.bind(this))),
                    (m.isShort = !0),
                    g.addContent(m.get()),
                    (n = new HelpButton("Anuluj", g.hide.bind(g))),
                    (n.isShort = !0),
                    g.addContent(n.get()),
                    g.get(),
                    myEvents.startEvent(),
                    g.show();
            } else g.visable ? g.hide() : (h.changeValue(!1), g.show());
            g.setPositiom(moveBy(config.moveNewWindow, this.myDiv, 150), "px");
        }),
        (this.loadConfig = function() {
            (this.config = this.storage.getFrom(
                this.boardName,
                this.boardName,
                helpValue.type.config
            )),
            this.config || (this.config = config),
                this.config.clearAfterLoad;
        }),
        (this.saveConfig = function() {
            this.storage.addTo(this.boardName, helpValue.type.config, this.config),
                this.storage.save(this.boardName),
                g.hide();
        }),
        (this.infoClear = function() {
            var j = confirm("Czy usun\u0105\u0107 dane?");
            j && this.storage.deleteAllData();
        }),
        (this.help = function() {
            if (null === d.visable) {
                var j = new HelpButton("Zamknij", d.hide.bind(d));
                j.isShort = !0;
                var k = new HelpOptions();
                (k.class = "gizyHelpText"),
                    d.addContent(divWarp(help, k)),
                    d.addContent(j.get()),
                    d.get(),
                    d.show();
                var l = moveBy(config.moveNewWindow, this.myDiv, 500);
                d.setPositiom(l, "px"),
                    d.setSize("500px", "auto"),
                    myEvents.startEvent();
            } else {
                var m = moveBy(config.moveNewWindow, this.myDiv, 500);
                d.setPositiom(m, "px"), d.show();
            }
        });
}
function GizyWindow(a) {
    (this.option = null),
        (this.config = { pos: { x: "0px", y: "0px" } }),
        (this.modal = !1),
        (this.myDiv = ""),
        (this.position = null),
        (this.size = null),
        (this.visable = null),
        (this.winContent = ""),
        (this.clearContent = function() {
            this.content = null;
        }),
        (this.get = function() {
            (this.option = new HelpOptions()),
                (this.option.id = getMyId("gizyWindow")),
                (this.option.class = "gizyWindow gizyHideElement");
            var b = divWarp(this.getBar(a) + this.winContent, this.option);
            this.modal && (b = '<div class="modal">' + b + "</div>"),
                document.body.insertAdjacentHTML("beforeend", b),
                (this.myDiv = document.getElementById(this.option.id)),
                myEvents.startEvent();
        }),
        (this.getBar = function(b) {
            var d = new HelpOptions();
            return (
                (d.class = "gizyWindowBar"),
                    (d.id = this.option.id + "Bar"),
                    divWarp(b + this.getCloseButton(this.option.id, "X"), d)
            );
        }),
        (this.getCloseButton = function(b, d) {
            return (
                myEvents.addEvent(b + "Close", "click", this.hide.bind(this)),
                '<div id="' + b + 'Close" class="gizyCloseBtn">' + d + "</div>"
            );
        }),
        (this.show = function() {
            return (
                (this.visable = !0),
                this.modal && this.myDiv.parentNode.classList.remove("gizyHideElement"),
                    this.myDiv.classList.remove("gizyHideElement"),
                    dragElement(this.myDiv),
                    this.option.id
            );
        }),
        (this.hide = function() {
            this.modal && this.myDiv.parentNode.classList.add("gizyHideElement"),
                this.myDiv.classList.add("gizyHideElement"),
                (this.visable = !1);
        }),
        (this.addContent = function(b) {
            this.winContent += this.getWinContent(b);
        }),
        (this.changeContent = function(b) {
            this.myDiv.children[1].innerHTML = b;
        }),
        (this.getWinContent = function(b) {
            var d = new HelpOptions();
            return (
                (d.class = "gizyWindowContent"),
                    (d.id = getMyId("contentWin")),
                    divWarp(b, d)
            );
        }),
        (this.loadConfig = function(b) {
            this.config = JSON.parse(localStorage.getItem("conf" + b));
        }),
        (this.setConfig = function() {
            this.setPositiom(this.config.pos, "px");
        }),
        (this.setPositiom = function(b, d) {
            (this.myDiv.style.left = b.x + d), (this.myDiv.style.top = b.y + d);
        }),
        (this.saveConfigWindow = function(b) {
            if (isStorage()) {
                var d = JSON.stringify(this.config);
                localStorage.setItem("conf" + b, d);
            }
        }),
        (this.getPosition = function() {
            var b = parseInt(this.myDiv.style.left),
                d = parseInt(this.myDiv.style.top);
            return { x: b, y: d };
        }),
        (this.getSize = function() {
            var b = {
                width: this.myDiv.style.width,
                height: this.myDiv.style.height
            };
            return b;
        }),
        (this.setSize = function(b, d) {
            (this.myDiv.style.width = b), (this.myDiv.style.height = d);
        });
}
HelpButton.prototype = new HelpObject();
function HelpButton(a, b) {
    (this.isTools = !0),
        (this.isShort = !1),
        (this.option = new HelpOptions()),
    a && (this.option.text = a),
    b && (this.option.myFunction = b),
        (this.option.type = helpValue.type.helpButton),
        (this.option.class = "gizyHObj gizyHButton"),
        (this.get = function() {
            var d = new HelpOptions(),
                f = "";
            return (
                isEmpty(this.option.id) && (this.option.id = getMyId("idBtn")),
                this.isShort ||
                (this.option.text =
                    this.option.text + " => " + this.option.myFunction.name + "()"),
                this.isTools && (f = this.addToolsButtons(a)),
                    (d.id = this.option.id + "_txt"),
                    (d.class = "gizyTextField"),
                    (d.cssAdd = "justify-content: center; width:100%; "),
                    myEvents.addEvent(this.option.id, "click", this.option.myFunction),
                    divWarp(this.option.text + f, this.option)
            );
        }),
        (this.changeTextValue = function(d) {
            document.getElementById(this.option.id).innerText = d;
        });
}
HelpCheckButton.prototype = new HelpObject();
function HelpCheckButton(a, b) {
    (this.option = new HelpOptions()),
        (this.option.type = helpValue.type.textInfo),
        (this.option.text = a),
        (this.checked = ""),
        (this.option.class = "gizyHCheckButton"),
        (this.myDivValue = null),
        (this.option.id = getMyId("idBtn")),
    b && (this.option.myFunction = b),
        (this.get = function() {
            isEmpty(this.option.id) && (this.option.id = getMyId("idBtn"));
            var d = new HelpOptions();
            (d.class = "gizyHCheckButtonField"), (d.id = this.option.id + "_txt");
            var f = divWarp(this.option.text, d),
                g = new HelpOptions();
            (g.class = "gizyHObj gizyHCheckButtonValue"),
            "object" === _typeof(this.option.value) &&
            (this.option.value = this.exploreObject(this.option.value));
            var h =
                "<input " +
                isIdToAdd(this.option.id + "_val") +
                this.checked +
                ' type="checkbox">';
            return (
                (h = divWarp(isEmptyReturn(h, "Brak danych"), g)),
                    myEvents.addEvent(
                        this.option.id + "_val",
                        "change",
                        this.option.myFunction
                    ),
                    divWarp(f + h, this.option)
            );
        }),
        (this.getText = function() {
            return this.option.text + " : " + this.option.value;
        }),
        (this.getValue = function() {
            return document.getElementById(this.option.id + "_val").checked;
        }),
        (this.getValue = function() {
            return null === this.myDivValue
                ? void (document.getElementById(
                    this.option.id + "_val"
                ).checked = value)
                : this.myDivValue.checked;
        }),
        (this.changeTextValue = function(d) {
            document.getElementById(this.option.id + "_txt").innerText = d;
        }),
        (this.setV = function(d) {
            this.changeValue(d);
        }),
        (this.changeValue = function(d) {
            (this.option.value = d),
                (document.getElementById(this.option.id + "_val").checked = d);
        });
}
HelpToolsButton.prototype = new HelpObject();
function HelpToolsButton(a, b) {
    (this.option = new HelpOptions()),
    a && (this.option.text = a),
    b && (this.option.myFunction = b),
        (this.option.type = helpValue.type.helpButton),
        (this.option.class = "gizyHObj gizyHButton"),
        (this.get = function() {
            "" === this.option.id && (this.option.id = getMyId("idBtn"));
            var d = new HelpOptions();
            (d.id = this.option.id + "_txt"),
                (d.class = "gizyTextField"),
                (d.cssAdd = "justify-content: center; width:100%; ");
            var f = divWarp(this.option.text, d);
            return (
                myEvents.addEvent(this.option.id, "click", this.option.myFunction),
                    divWarp(f, this.option)
            );
        });
}
HelpStoper.prototype = new HelpObject();
function HelpStoper(a) {
    (this.timeStart = 0),
        (this.myTime = 0),
        (this.option = new HelpOptions()),
        (this.option.text = "Start:"),
        (this.option.class = "gizyHObj gizyHStoper"),
    a && (this.option.text = a),
        (this.option.type = helpValue.type.stoper),
        (this.start = function() {
            (this.timeStart = performance.now()),
                (document.getElementById(
                    this.option.id + "_timeValue"
                ).innerText = msToTime(Date.now()));
        }),
        (this.stop = function() {
            (this.myTime = performance.now() - this.timeStart),
                (document.getElementById(this.option.id + "_timeValue").innerText =
                    this.myTime + " ms");
        }),
        (this.getText = function() {
            return this.option.text + " czas:" + this.myTime + " ms";
        }),
        (this.getValue = function() {
            return this.myTime + " ms";
        }),
        (this.get = function() {
            isEmpty(this.option.id) && (this.option.id = getMyId("idBtn")),
                (this.option.class = "gizyHObj gizyHStoper");
            var b = new HelpOptions();
            (b.class = "gizyValueField"),
                (b.id = this.option.id + "_timeValue"),
                (b.cssAdd = "width: 100%;");
            var d = divWarp("??:??", b);
            (b.class = "gizyTextField"),
                (b.cssAdd = "width: auto;  background-color: var(--back-collor-info);"),
                (b.id = this.option.id + "_timeText");
            var f = divWarp("Czas:", b);
            (b.id = ""), (b.cssAdd = "width: 100%;");
            var g = divWarp(f + d, b);
            return (
                (b.id = this.option.id + "_txt"),
                    (b.class = "gizyHObj gizyHInfo"),
                    divWarp(
                        this.getMini(this.option.id) +
                        divWarp(this.option.text, b) +
                        g +
                        this.addToolsButtons(a),
                        this.option
                    )
            );
        });
}
HelpFields.prototype = new HelpObject();
function HelpFields(a) {
    (this.option = new HelpOptions()),
    isEmpty(a) || (this.option.text = a),
    isEmpty(this.option.value) && (this.option.value = "??"),
        (this.setV = function(b) {
            this.changeValue(b);
        }),
        (this.option.class = "gizyHObj gizyHValueField"),
        (this.option.cssAdd = "height: 21px;"),
        (this.option.type = helpValue.type.field),
        (this.changeValue = function(b) {
            (document.getElementById(this.option.id + "_val").innerText = b),
                (this.option.value = b);
        }),
        (this.get = function() {
            isEmpty(this.option.id) && (this.option.id = getMyId("idBtn")),
                (this.option.class = "gizyHObj gizyHFields");
            var b = new HelpOptions();
            (b.class = "gizyTextField"),
                (b.id = this.option.id + "_txt"),
                (b.cssAdd =
                    "height:17px; justify-content: flex-end;width: 50%; background-color: var(--back-collor-info);");
            var d = divWarp(this.option.text + ":", b);
            (b.class = "gizyValueField"),
                (b.cssAdd = "height:17px; justify-content: flex-start;width: 50%; "),
                (b.id = this.option.id + "_val");
            var f = divWarp(this.option.value, b);
            return divWarp(
                this.getMini(this.option.id) + d + f + this.addToolsButtons(a),
                this.option
            );
        }),
        (this.getText = function() {
            return this.option.text + " : " + this.option.value;
        }),
        (this.getValue = function() {
            return this.option.value;
        });
}
HelpInfo.prototype = new HelpObject();
function HelpInfo(a) {
    (this.option = new HelpOptions()),
        (this.option.type = helpValue.type.textInfo),
        (this.option.text = a),
        (this.option.class = "gizyHObj gizyHInfo"),
        (this.option.cssAdd = " margin: 2px 0 0 0;"),
        (this.get = function() {
            isEmpty(this.option.id) && (this.option.id = getMyId("idBtn"));
            var b = divWarp(this.option.text, this.option),
                d = new HelpOptions();
            (d.position = ""),
                (d.id = this.option.id + "_val"),
                (d.class = "gizyHObj gizyHInfoValue"),
            "object" === _typeof(this.option.value) &&
            (this.option.value = this.exploreObject(this.option.value));
            var f = divWarp(isEmptyReturn(this.option.value, "Brak danych"), d);
            return divWarp(
                this.getMini(this.option.id) + this.addToolsButtons(a) + b + f,
                this.option
            );
        }),
        (this.getText = function() {
            return this.option.text + " : " + this.option.value;
        }),
        (this.getValue = function() {
            return this.option.value;
        }),
        (this.setV = function(b) {
            this.changeValue(b);
        }),
        (this.changeValue = function(b) {
            (this.option.value = b),
            "object" === _typeof(this.option.value) &&
            (this.option.value = this.exploreObject(this.option.value)),
                (document.getElementById(
                    this.option.id + "_val"
                ).innerText = this.option.value);
        }),
        (this.exploreObject = function(b) {
            var d = "";
            for (var f in b) b.hasOwnProperty(f) && (d += f + "::" + b[f] + "\n");
            return d;
        });
}
HelpInfoList.prototype = new HelpObject();
function HelpInfoList(a) {
    (this.option = new HelpOptions()),
        (this.option.type = helpValue.type.textInfo),
        (this.option.text = a),
        (this.counter = 0),
        (this.content = ""),
        (this.option.class = "gizyHObj gizyHInfo"),
        (this.option.cssAdd = " margin: 2px 0 0 0;"),
        (this.get = function() {
            isEmpty(this.option.id) && (this.option.id = getMyId("idBtn"));
            var b = divWarp(this.option.text, this.option),
                d = new HelpOptions();
            (d.position = ""),
                (d.id = this.option.id + "_val"),
                (d.class = "gizyHObj gizyHInfoValue");
            var f = divWarp(isEmptyReturn(this.content, "Brak danych"), d);
            return divWarp(
                this.getMini(this.option.id) + this.addToolsButtons(a) + b + f,
                this.option
            );
        }),
        (this.getText = function() {
            return (
                this.option.text + " : " + this.content.replace(/(<([^>]+)>)/gi, "")
            );
        }),
        (this.getValue = function() {
            return this.content.replace(/(<([^>]+)>)/gi, "");
        }),
        (this.setV = function(b) {
            this.changeValue(b);
        }),
        (this.changeValue = function(b) {
            (this.option.value = b),
            "object" === _typeof(this.option.value) &&
            (this.option.value = this.exploreObject(this.option.value)),
                (document.getElementById(
                    this.option.id + "_val"
                ).innerText = this.option.value);
        }),
        (this.addV = function(b) {
            this.counter++,
                (this.content += this.getContent(b)),
                (document.getElementById(
                    this.option.id + "_val"
                ).innerHTML = this.content);
        }),
        (this.getContent = function(b) {
            var d = new HelpOptions();
            return (
                (d.class = "gizyListContent"),
                    divWarp(" (" + this.counter + ") : " + b, d)
            );
        });
}
function divWarp(a, b) {
    return (
        "<div " +
        isIdToAdd(b.id) +
        isClassToAdd(b.class) +
        isStyleToAdd(isElementToAdd(b.cssAdd) + isElementToAdd(b.position)) +
        ">" +
        a +
        "</div>"
    );
}
function msToTime(a) {
    var b = parseInt(a % 1e4),
        d = parseInt((a / 1e3) % 60),
        f = parseInt((a / 60000) % 60),
        g = parseInt((a / 3600000) % 24);
    return (
        (g = 10 > g ? "0" + g : g),
            (f = 10 > f ? "0" + f : f),
            (d = 10 > d ? "0" + d : d),
        g + ":" + f + ":" + d + "." + b
    );
}
function isCss(a, b) {
    return isEmpty(b) ? "" : a + ":" + b + ";";
}
function isClassToAdd(a) {
    return isEmpty(a) ? "" : ' class="' + a + '" ';
}
function isIdToAdd(a) {
    return isEmpty(a) ? "" : ' id="' + a + '" ';
}
function isStyleToAdd(a) {
    return isEmpty(a) ? "" : ' style="' + a + '"';
}
function isElementToAdd(a) {
    return isEmpty(a) ? "" : a;
}
function isStorage() {
    return "undefined" != typeof Storage;
}
function isEmptyReturn(a, b) {
    return isEmpty(a) ? b : a;
}
function isEmpty(a) {
    a && 0 < a.length && a[0] && 0 < a[0].length;
    var b = !a || 0 === a.length;
    return b;
}
function addCSS(a) {
    var b = document.getElementsByTagName("head")[0],
        d = document.createElement("link");
    (d.href = a), (d.type = "text/css"), (d.rel = "stylesheet"), b.append(d);
}
function dragElement(a) {
    function d(l) {
        (l = l || window.event),
            (g = j - l.clientX),
            (h = k - l.clientY),
            (j = l.clientX),
            (k = l.clientY),
            (a.style.top = a.offsetTop - h + "px"),
            (a.style.left = a.offsetLeft - g + "px");
    }
    function f() {
        (document.onmouseup = null), (document.onmousemove = null);
    }
    var g = 0,
        h = 0,
        j = 0,
        k = 0;
    document.getElementById(a.id + "Bar") &&
    (document.getElementById(a.id + "Bar").onmousedown = function(l) {
        (l = l || window.event),
            (j = l.clientX),
            (k = l.clientY),
            (document.onmouseup = f),
            (document.onmousemove = d);
    });
}
function moveBy(a, b, d) {
    var f,
        g,
        h,
        j = { x: 0, y: 0 };
    return (
        (g = parseInt(b.offsetTop)),
            (f = parseInt(b.offsetLeft)),
            (h = parseInt(b.clientWidth)),
            0 < a.x
                ? ((j.x = f + h + a.x),
                j.x + parseInt(d) > parseInt(screen.width) && (j.x = f - (a.x + d)))
                : ((j.x = f - d + a.x), 0 > j.x && (j.x = f + d + a.x + h)),
            (j.y = g + a.y),
            j
    );
}
var help =
    "Pomoc <br>Jak u\u017Cywa\u0107:<br><strong>var board = new HelpBoard; - stworzenie nowej tablicy danych.</strong><br><strong>var btnFn = new HelpButton('Nazwa_przycisku', moja_funkcja);</strong> //stworzenie nowego przycisku funkcyjnego uruchamiaj\u0105cego moja_funkcja<br><br><strong>var btnInfo = new HelpInfo('nazwa');</strong><br> //wy\u015Bwietla par\u0119 nazw\u0119 i warto\u015B\u0107.<br><br>U\u017Cycie: btn.setT('Nowa_wartosc') - zmiana warto\u015Bci <br>U\u017Cycie: btn.setV('Nowa_wartosc') - zmiana warto\u015Bci <br>";
(exports.HelpButton = HelpButton),
    (exports.HelpInfo = HelpInfo),
    (exports.HelpFields = HelpFields),
    (exports.HelpStoper = HelpStoper),
    (exports.HelpCheckButton = HelpCheckButton),
    (exports.HelpInfoList = HelpInfoList),
    (exports.HelpBoard = HelpBoard),
    (exports.helpValue = helpValue),
    (exports.GizyWindow = GizyWindow);
