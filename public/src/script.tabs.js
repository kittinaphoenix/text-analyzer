const tabArray = [
  { label: 'Word Cloud', id: 'word-cloud', color: '#26a69a' }
];

function createTabs() {
  const tabWrapper = document.getElementById('tab-wrapper');
  const tabNavContainer = document.createElement('nav');
  tabNavContainer.classList.add("nav-custom");
  const tabDivContainer = document.createElement('div');
  tabDivContainer.className = 'nav-wrapper';

  const tabContainer = document.createElement('ul');
  tabContainer.classList.add('left');

  tabNavContainer.appendChild(tabDivContainer);
  tabDivContainer.appendChild(tabContainer);

  tabWrapper.appendChild(tabNavContainer);
  
  tabArray.forEach(tab => {
    const tabContainerButton = document.createElement('li');
    const tabButton = document.createElement('a');
    tabContainerButton.appendChild(tabButton);
    tabButton.innerText = tab.label;
    tabButton.addEventListener('click', () => { showTabContent(tab.id); });

    tabContainer.appendChild(tabContainerButton);

    const tabContent = document.createElement('div');
    tabContent.id = tab.id;
    tabContent.className = 'tab-content';
    //tabContent.style.backgroundColor = tab.color;
    tabWrapper.appendChild(tabContent);
  });

  
  showTabContent(tabArray[0].id);
}

function showTabContent(id) {
  tabArray.forEach(tab => {
    const tabContent = document.getElementById(tab.id);
    tabContent.style.display = tab.id === id ? 'block' : 'none';
  });
}
 