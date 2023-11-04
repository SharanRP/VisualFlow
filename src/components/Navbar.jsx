import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../index.css"
//import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
//   return (
//    <div>
//       <div className=" mw-100  bg-bluey border-b-2 container fixed top-0 z-50 p-1">
//       <a href="#home" className=" fw-bolder text-white navbar-brand ">
//       <span className="fam fontFam text-[38px] pl-4 text-center font-bold bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300 hover:from-purple-400 hover:via-pink-300 hover:to-blue-400   bg-clip-text text-transparent m-0 fs-2">VisualFlow</span>
//       </a>
//       </div>
//       <div className =" inline-flex items-start">
//       <a href="#home" data-rr-ui-event-key="#home" className="m-0 text-white nav-link">Home</a>
//       <a href="#code" data-rr-ui-event-key="#code" className="m-0 text-white nav-link">Code</a>
//       </div>
//    </div>   
      
//    );

    return (
      <div>
         
<nav class="mw-100 bg-bluey border-b-2 container fixed top-0 z-50 p-1 w-screen">
  <div class="max-w-full flex flex-wrap items-center justify-between mx-auto p-2">
    <a  class="flex items-center">
        <span className="fam fontFam text-5xl text-center font-bold bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300 hover:from-purple-400 hover:via-pink-300 hover:to-blue-400   bg-clip-text text-transparent ">VisualFlow</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto ml-3" id="navbar-default">
      <ul class="font-medium flex flex-col p-8 md:py-0 mt-4 bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" class="block text-2xl py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" class="block text-2xl py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
          <a href="#myPreTag" class="block text-2xl py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Code</a>
        </li>
        {/* <li>
          <a href="#" class="block text-2xl py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="#" class="block text-2xl py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li> */}
      </ul>
    </div>
  </div>
</nav>

      </div>
    )
}

export default BasicExample;

