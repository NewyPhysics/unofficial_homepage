/*
 * Program planner for the Undergraduate Physics page.
 * Reads the plan from the JSON block written by _includes/program-planner.html
 * (from _data/program_planner.yml) and draws the year-by-year grid.
 * Free elective boxes can be filled in by students; choices are kept in
 * their own browser only.
 */
(function () {
  "use strict";

  var root = document.getElementById("planner");
  var dataEl = document.getElementById("planner-data");
  if (!root || !dataEl) return;

  var plan;
  try { plan = JSON.parse(dataEl.textContent); } catch (e) { return; }

  var STORE = "newyphysics-planner-v1";
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORE) || "{}") || {}; } catch (e) { saved = {}; }
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(saved)); } catch (e) { /* storage unavailable: choices last for this visit only */ }
  }

  var labels = {};
  (plan.categories || []).forEach(function (c) { labels[c.key] = c.label; });

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function handbookUrl(code) {
    var y = plan.handbook_year;
    return "https://handbook.newcastle.edu.au/course/" + y + "/" + encodeURIComponent(code) + "?year=" + y;
  }


  // Suggested electives: names for display, and a shared dropdown list.
  var suggestions = {};
  (plan.suggested_electives || []).forEach(function (e) { suggestions[e.code] = e.name; });
  var listId = "pp-suggestions";
  var datalist = el("datalist");
  datalist.id = listId;
  (plan.suggested_electives || []).forEach(function (e) {
    var o = document.createElement("option");
    o.value = e.code;
    o.label = e.name;
    datalist.appendChild(o);
  });
  var CODE = /^[A-Z]{4}[0-9]{4}$/;

  // An elective box: "Elective" label, an editable course code, and the course title when known.
  function electiveBox(c, id, where) {
    var box = el("div", "pp-cell pp-elective pp-editable");
    box.appendChild(el("span", "pp-label", "Elective"));
    var input = el("input", "pp-input");
    input.type = "text";
    input.maxLength = 12;
    input.placeholder = "Your choice";
    input.setAttribute("list", listId);
    input.setAttribute("aria-label", where + ": elective" + (c.suggest ? " (suggested: " + c.suggest + ")" : ""));
    var name = el("span", "pp-name");
    var link = el("a", "pp-link", "\u2197");
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    function refresh() {
      var v = input.value.trim();
      name.textContent = suggestions[v] || "";
      if (CODE.test(v)) {
        link.href = handbookUrl(v);
        link.title = "Open " + v + " in the Handbook";
        link.hidden = false;
      } else {
        link.hidden = true;
      }
    }
    input.value = Object.prototype.hasOwnProperty.call(saved, id) ? saved[id] : (c.suggest || "");
    input.addEventListener("input", function () {
      var v = input.value.toUpperCase();
      if (v !== input.value) input.value = v;
      saved[id] = v;
      save();
      refresh();
    });
    var row = el("span", "pp-input-row");
    row.appendChild(input);
    row.appendChild(link);
    box.appendChild(row);
    box.appendChild(name);
    box.addEventListener("click", function (e) { if (e.target !== link) input.focus(); });
    box._reset = function () { input.value = c.suggest || ""; refresh(); };
    refresh();
    return box;
  }

  var grid = el("div", "pp-grid");

  (plan.years || []).forEach(function (year, yi) {
    var col = el("section", "pp-year");
    col.setAttribute("aria-label", year.name);
    col.appendChild(el("h3", "pp-year-title", year.name));
    var sems = el("div", "pp-sems");

    (year.semesters || []).forEach(function (courses, si) {
      var sem = el("div", "pp-sem");
      sem.appendChild(el("p", "pp-sem-title", "Semester " + (si + 1)));

      (courses || []).forEach(function (c, ci) {
        var type = c.type || "elective";
        var cell;
        if (c.code) {
          cell = el("a", "pp-cell pp-" + type);
          cell.href = handbookUrl(c.code);
          cell.target = "_blank";
          cell.rel = "noopener noreferrer";
          cell.title = (c.name ? c.code + " " + c.name + ". " : "") + (labels[type] || type) + (c.option ? " (one of several options)" : "") + ": open " + c.code + " in the Handbook";
          var code = el("span", "pp-code", c.code);
          if (c.option) code.appendChild(el("sup", "pp-star", "*"));
          cell.appendChild(code);
          if (c.name) cell.appendChild(el("span", "pp-name", c.name));
          if (c.alt) cell.appendChild(el("span", "pp-alt", "or " + c.alt));
        } else {
          cell = electiveBox(c, "y" + yi + "s" + si + "c" + ci, year.name + ", semester " + (si + 1));
        }
        sem.appendChild(cell);
      });
      sems.appendChild(sem);
    });

    col.appendChild(sems);
    grid.appendChild(col);
  });

  root.appendChild(grid);
  root.appendChild(datalist);

  // Key: what each colour means
  var key = el("div", "pp-key");
  (plan.categories || []).forEach(function (c) {
    var item = el("div", "pp-key-item pp-" + c.key);
    item.appendChild(el("strong", null, c.label));
    item.appendChild(el("span", null, " " + c.note));
    key.appendChild(item);
  });
  root.appendChild(key);

  // Actions
  var bar = el("div", "pp-actions");
  var clear = el("button", "pp-btn", "Reset electives");
  clear.type = "button";
  clear.addEventListener("click", function () {
    saved = {};
    save();
    root.querySelectorAll(".pp-editable").forEach(function (b) { b._reset(); });
  });
  var print = el("button", "pp-btn", "Print my plan");
  print.type = "button";
  print.addEventListener("click", function () {
    document.body.classList.add("pp-printing");
    window.print();
  });
  window.addEventListener("afterprint", function () { document.body.classList.remove("pp-printing"); });
  bar.appendChild(clear);
  bar.appendChild(print);
  root.appendChild(bar);
})();
