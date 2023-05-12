
var gridIndex;

const options = [
    {
        id:"classification",
        label:"Classification",
        tooltip:'These rules are designed to classify text based on the topic it covers. The classification categories include<br><b>LEGAL, FINANCIAL, MEDICAL, POLITICS, ENTERTAINMENT, SCIENCE, or OTHER</b>.<br> The classification process follows a set of rules to determine the most relevant category for the given text.',
        endpoint:"http://localhost:4000/api/classify",
        value:true
    },
    {
        id:"summary",
        label:"Summary",
        tooltip:"This option generates a brief summary of the input text consisting of three to six sentences.",
        endpoint:"http://localhost:4000/api/summary",
        value:true
    },
    {
        id:"sentiment",
        label:"Sentiment Analysis",
        tooltip:'This option analyzes the sentiment of the input text and provides a classification of either <br><b>POSITIVE, NEGATIVE or NEUTRAL</b>',
        endpoint:"http://localhost:4000/api/sentiment",
        value:true
    },
    {
        id:"sensitivity",
        label:"Sensitivity",
        tooltip:'Classify ther text based on the sensitivity of its content. It will provide a classification  <br><b>CONFIDENTIAL, INTERNAL, or PUBLIC</b>.<br>. The classification considers personal/corporate information, user data, and non-sensitive information.',
        endpoint:"http://localhost:4000/api/sensitivity",
        value:true
    },
    {
        id:"keywords",
        label:"Key Topics",
        tooltip:"This option identifies the ten most important topics in the input text and displays them in order of relevance.",
        endpoint:"http://localhost:4000/api/keywords",
        value:true
    }
];

const views = [
    {
        grid:{x:0,y:0, w: 4, h: 3},
        id:"ClassificationPanel",
        content:createUpPanelGrid("classTITLE","classDESC","classBAR")
    },
    {
        grid:{x:4,y:0, w: 4, h: 3},
        id:" SentimentPanel",
        content:createUpPanelGrid("sentTITLE","sentDESC","sentBAR")
    },
    {
        grid:{x:8,y:0, w: 4, h: 3},
        id:"KeywordsPanel",
        content:createUpPanelKeywordsGrid()
    },
    {
        grid:{x:0,y:3, w: 4, h: 3},
        id:"SensitivityPanel",
        content:createUpPanelGrid("sensTITLE","sensDESC","sensBAR")
    },
    {
        grid:{x:0,y:6, w: 4, h: 6},
        id:"SummaryPanel",
        content:createSummaryGrid()
    },
    {
        grid:{x:4,y:3, w: 8, h: 9},
        id:"graphsPanel",
        content:createGraphsGrid(
            {
                tabs:[
                    {
                        id:"wordcloud",
                        label:"Word Cloud",
                        classStyle:"graphClass",
                        divid:"word-cloud"
                    }
                ]
            }
        )
    }
]

function populateGridIndex(views) {
    gridIndexItems = [];
    //views
    for (let i = 0; i < views.length; i++) {
        let gridposition =  {x:0,y:0, w: 12, h: 1 };
        if (views[i].grid && views[i].grid.x) gridposition.x = views[i].grid.x;
        if (views[i].grid && views[i].grid.y) gridposition.y = views[i].grid.y;
        if (views[i].grid && views[i].grid.w) gridposition.w = views[i].grid.w;
        if (views[i].grid && views[i].grid.h) gridposition.h = views[i].grid.h;
        gridIndexItems.push({noMove:true, noResize:true, x: gridposition.x, y: gridposition.y, w: gridposition.w, h:gridposition.h, content: createPanelGrid(views[i])});
    }
}
function createIndexGrid() {
    const maxHeight = window.innerHeight;
    const cellHeight = maxHeight / 12;
    gridIndex = GridStack.init({
        cellHeight: 'initial', // start square but will set to % of window width later
        animate: true, // show immediate (animate: true is nice for user dragging though)
        disableOneColumnMode: true,//, // will manually do 1 column
        cellHeight:cellHeight
    });
    gridIndex.on("change", function(event, items) {
        saveGrid();
        if (map) map.invalidateSize()
    });
    gridIndex.load(gridIndexItems);
}

function createPanelGrid(content) {
    let result  =           '<div class="grid-item">';
    result      = result +  '<div class="grid-item-container" id="panel'+content.id+'">';

    result      = result +  content.content;

    result      = result +  '</div>';
    result      = result +  '</div>';
    
    return result;
}

function createUpPanelGrid(titleID,descID,barID) {
    let result  =           '<div class="widget">';
    result      = result +  '  <div class="widget-title" id="'+titleID+'">';
    result      = result +  '  </div>';
    result      = result +  '  <div class="widget-description" id="'+descID+'">';
    result      = result +  '  </div>';
    result      = result +  '  <div class="widget-progress">';
    result      = result +  '    <div class="widget-progress-bar" id="'+barID+'">';
    result      = result +  '    </div>';
    result      = result +  '  </div>';
    result      = result +  '</div>';

    return result;
}
function createUpPanelKeywordsGrid() {
    let result  =           '<div class="widget">';
    result      = result +  '  <div class="widget-title" id="keywordsTitle" style="margin-top:0px !important;">';
    result      = result +  '  </div>';
    result      = result +  '  <div class="widget-description" id="keywords" style="margin-top:10px !important;">';
    result      = result +  '  </div>';
    result      = result +  '</div>';

    return result;
}
function createSummaryGrid() {
    let result  =           '<div class="summaryClass" id="summaryDIV">';
    result      = result +  '</div>';
    
    return result;
}
function createGraphsGrid(data) {
    let result  =           '<div class="graphClass" id="tab-wrapper"></div>';
    return result;
}


window.onload = function() {
    populateGridIndex(views);
    createIndexGrid();
    createTabs();
    createModal();
}

function createModal() {
    let container = document.getElementById("modal-body");

    //options title
    let optionsTitle = document.createElement("h5");
    optionsTitle.innerText = "Text Analysis Settings";
    container.appendChild(optionsTitle);

    let optionsLine = document.createElement("div");
    optionsLine.classList.add("divider")
    container.appendChild(optionsLine);

    let optionsSpace = document.createElement("br");
    container.appendChild(optionsSpace);

    options.forEach((option) => {
        // Create option container
        let optionContainer = document.createElement("div");
        optionContainer.classList.add("form-field", "col-6");
    
        // Create label
        let label = document.createElement("label");
        optionContainer.appendChild(label);
    
        // Create checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = option.id;
        checkbox.value = option.value;
        if (option.value) checkbox.checked = true;
        label.appendChild(checkbox);
    
        // Create label text
        let span = document.createElement("span");
        span.innerHTML = option.label + "&nbsp;";
        label.appendChild(span);
    
        // Create info button
        let infoBtn = document.createElement("a");
        infoBtn.href = "#";
        infoBtn.classList.add("tooltipped");
        infoBtn.setAttribute("data-position", "right");
        infoBtn.setAttribute("data-tooltip", option.tooltip);
        let infoIcon = document.createElement("i");
        infoIcon.classList.add("fas", "fa-info-circle");
        infoBtn.appendChild(infoIcon);
        label.appendChild(infoBtn);
    
        // Add option container to parent element
        container.appendChild(optionContainer);
    });
    
    // Initialize tooltips
    M.Tooltip.init(document.querySelectorAll(".tooltipped"));

    //text area title
    let textTitle = document.createElement("h5");
    textTitle.innerText = "Input Text";
    container.appendChild(textTitle);

    let textLine = document.createElement("div");
    textLine.classList.add("divider");
    container.appendChild(textLine);

    let textSpace = document.createElement("br");
    container.appendChild(textSpace);

    //text area
    let textContainer = document.createElement("div");
    textContainer.classList.add("form-field");
    container.appendChild(textContainer);

    let textAreaContainer = document.createElement("div");
    textAreaContainer.classList.add("input-field","col","s12");
    textContainer.appendChild(textAreaContainer);

    let textArea = document.createElement("textarea");
    textArea.classList.add("materialize-textarea");
    textArea.id = "textareaDIV";
    textArea.style.height = "150px";
    textArea.style.minHeight = "150px";
    textArea.style.maxHeight = "150px";
    textAreaContainer.appendChild(textArea);

    let textAreaLabel = document.createElement("label");
    textAreaLabel.for = "textareaDIV";
    textAreaLabel.innerText = "Paste document/text or type the text to analyze"
    textAreaContainer.appendChild(textAreaLabel);

    let textAreaSpace = document.createElement("br");
    container.appendChild(textAreaSpace);

    //button
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("form-field");
    container.appendChild(buttonContainer);

    let buttonElement = document.createElement("button");
    buttonElement.classList.add("btn-large","waves-effect","waves-dark","light-blue");
    buttonElement.style = "width:100%";
    buttonElement.innerText = "Start Text/Document Analysis";
    buttonContainer.appendChild(buttonElement);

    buttonElement.addEventListener('click', () => {
        let checkboxes = document.querySelectorAll("input[type='checkbox']");

        // Loop through the checkboxes and log the checked status
        checkboxes.forEach((checkbox) => {
        console.log(`${checkbox.name}: ${checkbox.checked}`);
        });
        processData(checkboxes);
    });
}

async function processData(checkboxes) {
    document.getElementById("input-modal").style.display = "none";
    document.getElementById("full-screen").style.display = "flex";

    let enabledOptions = options.filter((option, index) => checkboxes[index].checked);
    createSteps(enabledOptions);
  
    const textData = document.getElementById("textareaDIV").value;
    let total = enabledOptions.length;
    let completed = 0;

    let result = {
        classification:{},
        sentiment:{},
        keywords:[],
        summary:"",
        ner:{},
        tm:{}
    };
  
    for (let i = 0; i < enabledOptions.length; i++) {
      let option = enabledOptions[i];
      let stepElement = document.getElementById(`step-${i + 1}`);
      stepElement.style.backgroundColor = 'orange';
      document.getElementById('step-text').innerText = option.label;
      document.getElementById('step-icon').innerHtml = '<i class="fas fa-sync" id="step-icon"></i>';
      document.getElementById('step-icon').classList.add('rotate-animation');
  
      const data = { inputText: textData };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
  
      try {
        let res = await fetch(option.endpoint, requestOptions);
        let apiResult = await res.json();
        if (apiResult.success) {
            completed++;
            stepElement.style.backgroundColor = 'rgba(76, 175, 80, 0.7)';
            let progressPercentage = (completed / total) * 100;
            document.getElementById('total-progress').style.width = progressPercentage + '%';
            document.getElementById('progress-text').innerText = Math.round(progressPercentage) + '%';

            // Update the result object based on the option id
            switch (option.id) {
                case 'classification':
                result.classification = apiResult.result;
                break;
                case 'summary':
                result.summary = apiResult.result.summary;
                break;
                case 'sentiment':
                result.sentiment = apiResult.result;
                break;
                case 'keywords':
                result.keywords = apiResult.result.keywords;
                break;
                case 'sensitivity':
                result.sensitivity = apiResult.result;
                break;
                default:
                break;
            }
          } else {
            completed++;
            stepElement.style.backgroundColor = 'rgba(244, 67, 54, 0.7)';
            let progressPercentage = (completed / total) * 100;
            document.getElementById('total-progress').style.width = progressPercentage + '%';
            document.getElementById('progress-text').innerText = Math.round(progressPercentage) + '%';
          }
      } catch (error) {
        
        stepElement.style.backgroundColor = 'red';
      }
      document.getElementById('step-icon').classList.remove('rotate-animation');
    }
    document.getElementById('full-screen').style.display = 'none';
    loadData(result,textData);
  }



  function createSteps(enabledOptions) {
    const stepsRow = document.getElementById("steps-row");
    stepsRow.innerHTML = ''; // Clear the previous steps if any
  
    for (let i = 0; i < enabledOptions.length; i++) {
      let stepDiv = document.createElement("div");
      stepDiv.className = "col s" + (12 / enabledOptions.length);
      stepDiv.id = `step-${i + 1}`;
      stepDiv.classList.add("step");
  
      let stepText = document.createElement("span");
      stepText.innerText = enabledOptions[i].label;
      stepDiv.appendChild(stepText);
  
      stepsRow.appendChild(stepDiv);
    }
  }

  function checkNestedKeys(obj, keys) {
    let currentObj = obj;
  
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
  
      if (currentObj && currentObj.hasOwnProperty(key)) {
        currentObj = currentObj[key];
      } else {
        return false;
      }
    }
  
    return true;
  }

  function loadData(result,textData) {
    startCloud(textData,"word-cloud");
    
    //Classification
    if (checkNestedKeys(result, ['classification', 'name'])) document.getElementById("classTITLE").innerHTML = '<i class="fas fa-file-alt"></i> &nbsp; &nbsp; '+result.classification.name;
    if (checkNestedKeys(result, ['classification', 'why'])) document.getElementById("classDESC").innerText = result.classification.why;

    if (checkNestedKeys(result, ['classification', 'percent'])) {
        document.getElementById("classBAR").innerText   = result.classification.percent + "%";
        document.getElementById("classBAR").style.width =result.classification.percent + "%";
    }

    //Sentiment
    if (checkNestedKeys(result, ['sentiment', 'name'])) document.getElementById("sentTITLE").innerHTML = '<i class="fas fa-file-alt"></i> &nbsp; &nbsp; '+result.sentiment.name;
    if (checkNestedKeys(result, ['sentiment', 'why'])) document.getElementById("sentDESC").innerText = result.sentiment.why;

    if (checkNestedKeys(result, ['sentiment', 'percent'])) {
        document.getElementById("sentBAR").innerText = result.sentiment.percent + "%";
        document.getElementById("sentBAR").style.width=result.sentiment.percent + "%";
    }

    //keyboards
    document.getElementById("keywordsTitle").innerText = "Top Key Topics";
    let keywords = document.getElementById("keywords");
    if (checkNestedKeys(result, ['keywords']))
    {
        words = result.keywords;
        if (!words.length) return;
        for (let i = 0; i < words.length; i++) {
            let span = document.createElement("span");
            span.classList.add("btn-small","btn-light", "custom-pill");
            span.style.margin = "2"
            span.innerText = words[i];
            keywords.appendChild(span);
        }
    }
    //Sensitivity
    if (checkNestedKeys(result, ['sensitivity', 'name'])) document.getElementById("sensTITLE").innerHTML = '<i class="fas fa-file-alt"></i> &nbsp; &nbsp; '+result.sensitivity.name;
    if (checkNestedKeys(result, ['sensitivity', 'why'])) document.getElementById("sensDESC").innerText = result.sensitivity.why;

    if (checkNestedKeys(result, ['sensitivity', 'percent'])) {
        document.getElementById("sensBAR").innerText = result.sensitivity.percent + "%";
        document.getElementById("sensBAR").style.width=result.sensitivity.percent + "%";
    }

    //summary
    if (checkNestedKeys(result, ['summary'])) document.getElementById("summaryDIV").innerText = result.summary;
  }