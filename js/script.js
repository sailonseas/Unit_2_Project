/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


//Initialize global variables
const pageHeader = document.getElementsByClassName("page-header cf")[0];
const studentList = document.querySelector('.student-list');
const list = studentList.children;
const numPerPage = 10;  // This number can be modified to allow desired number of items to be shown on page
const pageButton = '';
let resultFound = false;

//START SEARCH FUNCTIONALITY
//Create a DIV block for the student-search functionality
const searchForm = document.createElement('FORM');
   searchForm.className = "student-search";
   pageHeader.appendChild(searchForm);

//Create the Student Search Button
const searchButton = document.createElement('BUTTON');
   searchButton.className = 'student-search button';
   searchButton.type = 'submit';
   searchButton.name = 'submit';
   searchButton.textContent = 'Search';
   searchForm.appendChild(searchButton);

//Create the searchInput element
const searchInput = document.createElement('INPUT');
   searchInput.className = 'student-search input';
   searchInput.type = 'text';
   searchInput.name = 'name';
   searchInput.placeholder = "Search for a student";
   searchForm.appendChild(searchInput);

//Create element to store message output when no search results are returned.
let noResults = document.createElement('p')
   noResults.align = 'center';
   noResults.innerHTML = 'Sorry, there were no results found.  Please try your search again.';
   pageHeader.appendChild(noResults);
   noResults.style.display = 'none'

// Create function to process the search using input from searchInput value (via whole name, first or last name, or email address)
function searchStudents(studentName) { 
      resultFound = false;
      for (i = 0; i < list.length; i += 1){
         let search = document.getElementsByTagName('h3')[i].innerHTML
         let email = document.getElementsByClassName('email')[i].innerHTML
         let names = search.split(' ');         
         if(studentName === search || studentName === names[0] || studentName === names[1] || studentName === names[2] || email === studentName){
            list[i].style.display = 'block';
            resultFound = true;
         }else{
            list[i].style.display = 'none';
         }  
      }

      if(resultFound === true) {
         noResults.style.display = 'none';
      }else {
         noResults.style.display = 'block';
      }
   }

searchForm.addEventListener('submit', (e) => {
   e.preventDefault();
   let studentName = searchInput.value;
   searchInput.value = '';
   searchStudents(studentName);   
})
//END SEARCH FUNCTIONALITY

//BEGIN FUNCTIONALITY TO DIVIDE THE STUDENT LIST INTO SECTIONS OF 10 STUDENTS PER PAGE

// Determine the total number of pages needed
let numOfPages = Math.ceil(list.length / numPerPage);

let showPage = (list, page) => {
   let pageStart = (page -1) * numPerPage ;
   let pageEnd = Math.min(page * numPerPage, list.length) - 1;   
   for (i = 0; i < list.length; i += 1){
      if(i >= pageStart && i <= pageEnd){
         list[i].style.display = 'block';
      }else {
         list[i].style.display = 'none';
      }
    }
   }
//END FUNCTIONALITY TO DIVIDE THE STUDENT LIST INTO SECTIONS OF 10 STUDENTS PER PAGE

//Display the first page of 10 students when page initially loads
showPage(list, 2);

//BEGIN FUNCTIONALITY TO GENERATE, APPEND AND ADD PAGINATION BUTTONS
function appendPageLinks(list) {
   let page = document.querySelector('.page');
   let buttonsLi = document.createElement('UL');
   buttonsLi.className = 'pagination';
   page.appendChild(buttonsLi);
   for(i = 0; i < numOfPages; i += 1) {
      let li = buttonsLi.appendChild(document.createElement('LI'));
      let pageButton = document.createElement('BUTTON');
      pageButton.type = 'button';
      pageButton.innerHTML = i+1;
      pageButton.className = 'pagination, li, a'
      pageButton.id = i + 1;
      li.appendChild(pageButton);   

      pageButton.addEventListener('click', (e) => {
      let pageClicked = parseInt(e.target.innerHTML);
      showPage(list, pageClicked);
      noResults.style.display = 'none';
      })   
    }
    };
//END FUNCTIONALITY TO GENERATE, APPEND AND ADD PAGINATION BUTTONS

// Run function to generate the page links
appendPageLinks(list);



