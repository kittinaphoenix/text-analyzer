const openaiModule = require("../services/openai");

//classify
exports.classify = async (req, res) => {
  const inputText = req.body.inputText;
  try {
    var rulesRAW = 'Ensure strict adherence to these rules. Send ONLY a valid JSON in this exact format: {"name":"","why":"","percent":0} STRICTLY follow: if text is a. Legal matters: "LEGAL" b. Financial topics: "FINANCIAL" c. Medical topics: "MEDICAL" d. Politics: "POLITICS" e. Entertainment: "ENTERTAINMENT" f. Science: "SCIENCE" g. Other topics: "OTHER" - key name: ONLY "LEGAL", "FINANCIAL", "MEDICAL", "POLITICS", "ENTERTAINMENT", "SCIENCE", or "OTHER" - key why: 1-2 sentences explanation - key percent: 0-100 accuracy of the conclusion. All text must be provided in English independent of the input text, text to analyze:';
    const resultGPT = await openaiModule.doService(rulesRAW,inputText);

    let result = {
      success:true,
      result:JSON.parse(resultGPT)
    }
    console.log("classify successCall")
    res.status(200).json(result);
  } catch (err) {
    console.log("classify errorCall")
    res.status(500).json({ error: err });
  }
}
//getsummary
exports.summary = async (req, res) => {
  const inputText = req.body.inputText;
  try {
    var rulesRAW = 'Ensure strict adherence to these rules. Send ONLY a valid JSON in this exact format: {"summary":"","language":""} - key summary: 4-6 sentences long - key language: detected from document. Document text to analyze is:';
    const resultGPT = await openaiModule.doService(rulesRAW,inputText);

    let result = {
      success:true,
      result:JSON.parse(resultGPT)
    }
    console.log("summary successCall")
    res.status(200).json(result);
  } catch (err) {
    console.log("summary errorCall")
    res.status(500).json({ error: err });
  }
}
//sentiment
exports.sentiment = async (req, res) => {
  const inputText = req.body.inputText;
  try {
    var rulesRAW = 'Ensure strict adherence to these rules. Send ONLY a valid JSON in this exact format: {"name":"","why":"","percent":0} STRICTLY follow - a. Positive: "POSITIVE" b. Negative: "NEGATIVE" c. Neutral: "NEUTRAL" - key name: "POSITIVE", "NEGATIVE", or "NEUTRAL" - key why: 1-2 sentences explanation - key percent: 0-100 accuracy of the conclusion. Answer must be provided in english independent of the input text, text to analyze:';
    const resultGPT = await openaiModule.doService(rulesRAW,inputText);

    let result = {
      success:true,
      result:JSON.parse(resultGPT)
    }
    console.log("sentiment successCall")
    res.status(200).json(result);
  } catch (err) {
    console.log("sentiment errorCall")
    res.status(500).json({ error: err });
  }
}
//sensitivity
exports.sensitivity = async (req, res) => {
  const inputText = req.body.inputText;
  try {
    var ruleConfidential = 'Contains personally identifiable information, confidential financial, medical, legal, or business information, or includes a named individual and is not intended for general public consumption.';
    var ruleInternal = 'Contains non-public financial or sensitive information about an organization or is intended for internal use only and does not fall under the category of confidential.';
    var rulePublic = 'Intended for general public consumption, does not contain sensitive or confidential information, and does not include personally identifiable information or confidential financial, medical, legal, or business information.';
    var rulesRAW = 'Ensure strict adherence to these rules. Send ONLY a valid JSON in this exact format: {"name":"","why":"","percent":0}. STRICTLY follow: if text is a. ' + ruleConfidential + ': "CONFIDENTIAL" b. ' + ruleInternal + ': "INTERNAL" c. ' + rulePublic + ': "PUBLIC". - key name: ONLY "CONFIDENTIAL", "INTERNAL", or "PUBLIC". - key why: 2-3 sentence explanation. - key percent: 0-100 accuracy of the conclusion. All text must be provided in English, independent of the input text. Text to analyze: ';

    const resultGPT = await openaiModule.doService(rulesRAW,inputText);

    let result = {
      success:true,
      result:JSON.parse(resultGPT)
    }
    console.log("sentiment successCall")
    res.status(200).json(result);
  } catch (err) {
    console.log("sentiment errorCall")
    res.status(500).json({ error: err });
  }
}
//keywords
exports.keywords = async (req, res) => {
  const inputText = req.body.inputText;
  try {
    var rulesRAW = 'Ensure strict adherence to these rules. Send ONLY a valid JSON in this exact format (deviations will break code): {"keywords":} - parameter keywords: top 10 important words based on the analysis, ordered by importance document text to analyze is:';
    const resultGPT = await openaiModule.doService(rulesRAW,inputText);

    let result = {
      success:true,
      result:JSON.parse(resultGPT)
    }
    console.log("keywords successCall")
    res.status(200).json(result);
  } catch (err) {
    console.log("keywords errorCall")
    res.status(500).json({ error: err });
  }
}