// script.js

// Positive Factors Initialization
const positiveFactors = [
  {
    name: 'Pardon',
    abbreviation: 'P',
    sliderId: 'pardon-slider',
    valueNum: document.getElementById('pardon-value-num'),
    weightSliderId: 'pardon-weight-slider',
    weightNum: document.getElementById('pardon-weight-num'),
  },
  {
    name: 'Reconciliation',
    abbreviation: 'R',
    sliderId: 'reconciliation-slider',
    valueNum: document.getElementById('reconciliation-value-num'),
    weightSliderId: 'reconciliation-weight-slider',
    weightNum: document.getElementById('reconciliation-weight-num'),
  },
  {
    name: 'Release from Burden',
    abbreviation: 'B',
    sliderId: 'release-slider',
    valueNum: document.getElementById('release-value-num'),
    weightSliderId: 'release-weight-slider',
    weightNum: document.getElementById('release-weight-num'),
  },
  {
    name: 'Love',
    abbreviation: 'L',
    sliderId: 'love-slider',
    valueNum: document.getElementById('love-value-num'),
    weightSliderId: 'love-weight-slider',
    weightNum: document.getElementById('love-weight-num'),
  },
  {
    name: 'Compassion',
    abbreviation: 'C',
    sliderId: 'compassion-slider',
    valueNum: document.getElementById('compassion-value-num'),
    weightSliderId: 'compassion-weight-slider',
    weightNum: document.getElementById('compassion-weight-num'),
  },
  {
    name: 'Mindfulness',
    abbreviation: 'M',
    sliderId: 'mindfulness-slider',
    valueNum: document.getElementById('mindfulness-value-num'),
    weightSliderId: 'mindfulness-weight-slider',
    weightNum: document.getElementById('mindfulness-weight-num'),
  },
  {
    name: 'Self-Reflection',
    abbreviation: 'SR',
    sliderId: 'self-reflection-slider',
    valueNum: document.getElementById('self-reflection-value-num'),
    weightSliderId: 'self-reflection-weight-slider',
    weightNum: document.getElementById('self-reflection-weight-num'),
  },
  {
    name: 'Personal Growth',
    abbreviation: 'PG',
    sliderId: 'personal-growth-slider',
    valueNum: document.getElementById('personal-growth-value-num'),
    weightSliderId: 'personal-growth-weight-slider',
    weightNum: document.getElementById('personal-growth-weight-num'),
  },
];

// Negative Factors Initialization
const negativeFactors = [
  {
    name: 'Retribution',
    abbreviation: 'Re',
    sliderId: 'retribution-slider',
    valueNum: document.getElementById('retribution-value-num'),
    weightSliderId: 'retribution-weight-slider',
    weightNum: document.getElementById('retribution-weight-num'),
  },
  {
    name: 'Resentment',
    abbreviation: 'Rs',
    sliderId: 'resentment-slider',
    valueNum: document.getElementById('resentment-value-num'),
    weightSliderId: 'resentment-weight-slider',
    weightNum: document.getElementById('resentment-weight-num'),
  },
  {
    name: 'Emotional Pain',
    abbreviation: 'EP',
    sliderId: 'emotional-pain-slider',
    valueNum: document.getElementById('emotional-pain-value-num'),
    weightSliderId: 'emotional-pain-weight-slider',
    weightNum: document.getElementById('emotional-pain-weight-num'),
  },
  {
    name: 'Self-Destruction',
    abbreviation: 'SD',
    sliderId: 'self-destruction-slider',
    valueNum: document.getElementById('self-destruction-value-num'),
    weightSliderId: 'self-destruction-weight-slider',
    weightNum: document.getElementById('self-destruction-weight-num'),
  },
  {
    name: 'Guilt',
    abbreviation: 'Gu',
    sliderId: 'guilt-slider',
    valueNum: document.getElementById('guilt-value-num'),
    weightSliderId: 'guilt-weight-slider',
    weightNum: document.getElementById('guilt-weight-num'),
  },
  {
    name: 'Shame',
    abbreviation: 'Sh',
    sliderId: 'shame-slider',
    valueNum: document.getElementById('shame-value-num'),
    weightSliderId: 'shame-weight-slider',
    weightNum: document.getElementById('shame-weight-num'),
  },
  {
    name: 'Forgotten Memories',
    abbreviation: 'FM',
    sliderId: 'forgotten-memories-slider',
    valueNum: document.getElementById('forgotten-memories-value-num'),
    weightSliderId: 'forgotten-memories-weight-slider',
    weightNum: document.getElementById('forgotten-memories-weight-num'),
  },
];

// Initialize Sliders for Positive Factors
positiveFactors.forEach(factor => {
  // Value Slider
  noUiSlider.create(document.getElementById(factor.sliderId), {
    start: [parseFloat(factor.valueNum.value)],
    step: 0.1,
    range: {
      'min': [0],
      'max': [10]
    },
    tooltips: true,
    // Removed pips to simplify the slider
  });

  // Sync Slider with Number Input
  const valueSlider = document.getElementById(factor.sliderId);
  valueSlider.noUiSlider.on('update', function(values, handle) {
    factor.valueNum.value = values[handle];
  });
  factor.valueNum.addEventListener('change', function() {
    valueSlider.noUiSlider.set(this.value);
  });

  // Weight Slider
  noUiSlider.create(document.getElementById(factor.weightSliderId), {
    start: [parseFloat(factor.weightNum.value)],
    step: 0.1,
    range: {
      'min': [0],
      'max': [1]
    },
    tooltips: true,
    // Removed pips to simplify the slider
  });

  // Sync Slider with Number Input
  const weightSlider = document.getElementById(factor.weightSliderId);
  weightSlider.noUiSlider.on('update', function(values, handle) {
    factor.weightNum.value = values[handle];
  });
  factor.weightNum.addEventListener('change', function() {
    weightSlider.noUiSlider.set(this.value);
  });
});

// Initialize Sliders for Negative Factors
negativeFactors.forEach(factor => {
  // Value Slider
  noUiSlider.create(document.getElementById(factor.sliderId), {
    start: [parseFloat(factor.valueNum.value)],
    step: 0.1,
    range: {
      'min': [0],
      'max': [10]
    },
    tooltips: true,
    // Removed pips to simplify the slider
  });

  // Sync Slider with Number Input
  const valueSlider = document.getElementById(factor.sliderId);
  valueSlider.noUiSlider.on('update', function(values, handle) {
    factor.valueNum.value = values[handle];
  });
  factor.valueNum.addEventListener('change', function() {
    valueSlider.noUiSlider.set(this.value);
  });

  // Weight Slider
  noUiSlider.create(document.getElementById(factor.weightSliderId), {
    start: [parseFloat(factor.weightNum.value)],
    step: 0.1,
    range: {
      'min': [0],
      'max': [1]
    },
    tooltips: true,
    // Removed pips to simplify the slider
  });

  // Sync Slider with Number Input
  const weightSlider = document.getElementById(factor.weightSliderId);
  weightSlider.noUiSlider.on('update', function(values, handle) {
    factor.weightNum.value = values[handle];
  });
  factor.weightNum.addEventListener('change', function() {
    weightSlider.noUiSlider.set(this.value);
  });
});

// Compute Forgiveness Score
document.getElementById('compute-score').addEventListener('click', computeForgivenessScore);

function computeForgivenessScore() {
  let positiveSum = 0;
  let negativeSum = 0;

  // Store individual contributions for the report
  let factorContributions = [];

  positiveFactors.forEach(factor => {
    const value = parseFloat(factor.valueNum.value);
    const weight = parseFloat(factor.weightNum.value);
    const contribution = value * weight;
    positiveSum += contribution;
    factorContributions.push({
      name: factor.name,
      type: 'Positive',
      contribution: contribution,
      maxContribution: 10 * 1, // max value * max weight
    });
  });

  negativeFactors.forEach(factor => {
    const value = parseFloat(factor.valueNum.value);
    const weight = parseFloat(factor.weightNum.value);
    const contribution = value * weight;
    negativeSum += contribution;
    factorContributions.push({
      name: factor.name,
      type: 'Negative',
      contribution: contribution,
      maxContribution: 10 * 1,
    });
  });

  const totalSum = positiveSum + negativeSum;

  // Avoid division by zero
  const forgivenessScore = totalSum ? (positiveSum / totalSum) : 0;

  // Display the result
  const scorePercentage = (forgivenessScore * 100).toFixed(2);
  document.getElementById('forgiveness-score').textContent = `${scorePercentage}%`;

  // Provide interpretation
  let interpretation = '';
  if (forgivenessScore >= 0.8) {
    interpretation = 'High level of forgiveness.';
  } else if (forgivenessScore >= 0.5) {
    interpretation = 'Moderate level of forgiveness.';
  } else {
    interpretation = 'Low level of forgiveness.';
  }
  document.getElementById('score-interpretation').textContent = interpretation;

  // Generate the detailed report
  generateReport(forgivenessScore, factorContributions);
}

function generateReport(forgivenessScore, factorContributions) {
  const reportSection = document.getElementById('detailed-report');
  reportSection.innerHTML = ''; // Clear previous report if any

  // Create a heading
  const heading = document.createElement('h3');
  heading.textContent = 'Detailed Report';
  reportSection.appendChild(heading);

  // Display overall forgiveness score
  const scorePara = document.createElement('p');
  scorePara.textContent = `Your forgiveness score is ${ (forgivenessScore * 100).toFixed(2) }%.`;
  reportSection.appendChild(scorePara);

  // Identify factors with the highest negative impact
  const negativeContributions = factorContributions.filter(factor => factor.type === 'Negative');
  negativeContributions.sort((a, b) => b.contribution - a.contribution); // Sort descending

  // Identify factors with the lowest positive impact
  const positiveContributions = factorContributions.filter(factor => factor.type === 'Positive');
  positiveContributions.sort((a, b) => a.contribution - b.contribution); // Sort ascending

  // Provide recommendations
  const recommendations = document.createElement('div');
  recommendations.innerHTML = '<h4>Recommendations to Improve Your Forgiveness Score:</h4>';
  
  // Suggest reducing the top negative factors
  const topNegativeFactors = negativeContributions.slice(0, 3);
  if (topNegativeFactors.length > 0) {
    const negList = document.createElement('ul');
    topNegativeFactors.forEach(factor => {
      const listItem = document.createElement('li');
      const advice = getAdvice(factor.name);
      listItem.textContent = `Work on reducing ${factor.name} (${factor.contribution.toFixed(2)} out of ${factor.maxContribution}). ${advice}`;
      negList.appendChild(listItem);
    });
    recommendations.appendChild(negList);
  }

  // Suggest enhancing the top positive factors
  const lowPositiveFactors = positiveContributions.slice(0, 3);
  if (lowPositiveFactors.length > 0) {
    const posList = document.createElement('ul');
    lowPositiveFactors.forEach(factor => {
      const listItem = document.createElement('li');
      const advice = getAdvice(factor.name);
      listItem.textContent = `Consider improving ${factor.name} (${factor.contribution.toFixed(2)} out of ${factor.maxContribution}). ${advice}`;
      posList.appendChild(listItem);
    });
    recommendations.appendChild(posList);
  }

  reportSection.appendChild(recommendations);
}

function getAdvice(factorName) {
  const advice = {
    // Negative Factors
    'Retribution': 'Practice empathy and try to let go of the desire for revenge.',
    'Resentment': 'Express your feelings constructively and consider journaling to process emotions.',
    'Emotional Pain': 'Seek support from friends, family, or a professional counselor.',
    'Self-Destruction': 'Engage in self-care activities and mindfulness practices.',
    'Guilt': 'Acknowledge your feelings and consider making amends if appropriate.',
    'Shame': 'Work on building self-esteem and recognizing your inherent worth.',
    'Forgotten Memories': 'Reflect on past experiences and consider therapy to process unresolved issues.',
    // Positive Factors
    'Pardon': 'Practice forgiveness by letting go of grudges.',
    'Reconciliation': 'Consider reaching out to mend relationships.',
    'Release from Burden': 'Focus on liberating yourself from past hurts.',
    'Love': 'Cultivate empathy and kindness towards others.',
    'Compassion': 'Try to understand and share others\' feelings.',
    'Mindfulness': 'Stay present and aware of your thoughts and emotions.',
    'Self-Reflection': 'Engage in introspective practices like meditation.',
    'Personal Growth': 'Seek opportunities to develop new skills and perspectives.',
  };
  return advice[factorName] || 'Consider seeking ways to address this factor.';
}
