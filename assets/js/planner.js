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
          cell.title = (labels[type] || type) + (c.option ? " (one of several options)" : "") + ": open " + c.code + " in the Handbook";
          var code = el("span", "pp-code", c.code);
          if (c.option) code.appendChild(el("sup", "pp-star", "*"));
          cell.appendChild(code);
          if (c.alt) cell.appendChild(el("span", "pp-alt", "or " + c.alt));
        } else {
          var id = "y" + yi + "s" + si + "c" + ci;
          cell = el("input", "pp-cell pp-" + type + " pp-input");
          cell.type = "text";
          cell.maxLength = 12;
          cell.placeholder = "Elective";
          cell.setAttribute("aria-label", year.name + ", semester " + (si + 1) + ": your elective");
          cell.value = saved[id] || "";
          cell.addEventListener("input", function () {
            var v = cell.value.toUpperCase();
            if (v !== cell.value) cell.value = v;
            if (v) saved[id] = v; else delete saved[id];
            save();
          });
        }
        sem.appendChild(cell);
      });
      sems.appendChild(sem);
    });

    col.appendChild(sems);
    grid.appendChild(col);
  });

  root.appendChild(grid);

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
  var clear = el("button", "pp-btn", "Clear my electives");
  clear.type = "button";
  clear.addEventListener("click", function () {
    saved = {};
    save();
    root.querySelectorAll(".pp-input").forEach(function (i) { i.value = ""; });
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
