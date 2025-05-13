// Navigation Menu
const nav = [
    { label: "Homepage", link: "index.html" },
];

// Welcome Section
const welcome = [
    {
        label: "Welcome to Our Educational Platform",
        paragraph: "Discover the journey of learning in programming and new technologies! Whether you are a beginner or an experienced professional, we have courses and materials for you. To provide you with the tools to succeed in the world of technology!"
    }
];

// Footer Links
const footer = [
    { link: "p3220201@aueb.gr" },
    { link: "p3210031@aueb.gr" }
];

function toggleLoading(isLoading) {
    const loadingElement = document.getElementById('loading');
    if (isLoading) {
        loadingElement.style.display = 'block';
    } else {
        loadingElement.style.display = 'none';
    }
}

function createFooter(link1, link2) {
    const footerElement = document.querySelector('footer'); // Select the actual footer element
    if (!footerElement) {
        console.warn('Warning: Footer element not found in the DOM.');
        return;
    }

    const link1Element = document.createElement('a');
    link1Element.href = `mailto:${link1}`;
    link1Element.textContent = link1;

    const link2Element = document.createElement('a');
    link2Element.href = `mailto:${link2}`;
    link2Element.textContent = link2;

    footerElement.appendChild(document.createTextNode("Contact us: "));
    footerElement.appendChild(link1Element);
    footerElement.appendChild(document.createTextNode(" | "));
    footerElement.appendChild(link2Element);
}

function createNavBar() {
    const navBar = document.getElementById('nav_bar');
    if (!navBar) {
        console.warn("Warning: #nav_bar element not found.");
        return;
    }

    const navItems = nav;

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const row = document.createElement('tr');

    navItems.forEach(item => {
        const td = document.createElement('td');
        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.label;
        link.target = "_self";
        td.appendChild(link);
        row.appendChild(td);
    });

    tbody.appendChild(row);
    table.appendChild(tbody);
    navBar.appendChild(table);
}
